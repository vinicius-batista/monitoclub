import Cookie from '../../services/cookie'
import firebaseApp from '../../services/firebase'

const userById = firebaseApp.userById
const auth = firebaseApp.auth
const googleProvider = firebaseApp.googleProvider
const facebookProvider = firebaseApp.facebookProvider
const monitors = firebaseApp.monitors
const subjects = firebaseApp.subjects

const state = {
  check: Cookie.get('token') != null,
  user: Cookie.getObject('user'),
  favoriteMonitors: []
}

const mutations = {
  setUser (state, user) {
    state.user = Cookie.setObject('user', user, '1M')
  },
  authenticated (state, token) {
    Cookie.set('token', token, '1M')
    state.check = true
  },
  unauthenticated (state) {
    Cookie.remove('token')
    Cookie.remove('user')
    state.check = false
    state.user = {}
    state.favoriteMonitors = []
  },
  setFavoriteMonitors (state, monitors) {
    state.favoriteMonitors = monitors
  }
}

const actions = {
  getUserInfo: async (context, userId) => {
    try {
      const response = await userById(userId).once('value')
      
      const user = response.val()
      return user
    } catch (err) {
      return err
    }
  },
  updateUserInfo: async (context, user) => {
    try {
      const response = await userById(user.id).set(user)
      
      context.commit('setUser', user)
      
      return response
    } catch (err) {
      return err
    }
  },
  loginEmailPassword: async (context, {email, password}) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password)
      
      const user = await context.dispatch('getUserInfo', response.uid)
      
      context.commit('setUser', user)
      context.commit('authenticated', response.refreshToken)
      return response
    } catch (err) {
      return err
    }
  },
  registerEmailPassword: async (context, {email, password, displayName}) => {
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password)
      
      const user = auth.currentUser
      user.updateProfile({
        displayName: displayName
      })
      
      return response
    } catch (err) {
      return err
    }
  },
  loginExternalAuth: async (context, provider) => {
    try {
      provider === 'google'
        ? provider = googleProvider
        : provider = facebookProvider
      
      const response = await auth.signInWithPopup(provider)
      
      const token = response.credential.accessToken
      const user = await context.dispatch('getUserInfo', response.user.uid)
      
      context.commit('setUser', user)
      context.commit('authenticated', token)
      return response
    } catch (err) {
      return err
    }
  },
  logout: async (context) => {
    try {
      const response = await auth.signOut()
      context.commit('unauthenticated')
      return response
    } catch (err) {
      return err
    }
  },
  addFavoriteMonitor: (context, monitorId) => {
    const user = context.state.user
    user.monitoriasFavoritas !== undefined
      ? user.monitoriasFavoritas.push(monitorId)
      : user.monitoriasFavoritas = [ monitorId ]
    
    context.dispatch('updateUserInfo', user)
      .then((response) => {
        context.dispatch('getFavoriteMonitorData')
      })
  },
  removeFavoriteMonitor: (context, monitorId) => {
    const user = context.state.user
    
    const indexMonitorId = user.monitoriasFavoritas.indexOf(monitorId)
    user.monitoriasFavoritas.splice(indexMonitorId, 1)
  
    context.dispatch('updateUserInfo', user)
      .then((response) => {
        context.dispatch('getFavoriteMonitorData')
      })
  },
  getFavoriteMonitorData: async (context) => {
    try {
      const searchMonitor = async (id) => {
        const response = await monitors.child(id).once('value')
        const monitor = response.val()
        
        const subject = await subjects.child(monitor.materiaId).once('value')
        monitor.subject = subject.val()
        
        return monitor
      }
      const favoriteMonitors = await Promise.all(context.state.user.monitoriasFavoritas.map(searchMonitor))
      
      context.commit('setFavoriteMonitors', favoriteMonitors)
      
      return favoriteMonitors
    } catch (err) {
      return err
    }
  }
}

const UserModules = {
  state,
  mutations,
  actions
}

export default UserModules
