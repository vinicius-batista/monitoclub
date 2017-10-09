import firebaseApp from '../services/firebase'

const auth = firebaseApp.auth
const googleProvider = firebaseApp.googleProvider
const facebookProvider = firebaseApp.facebookProvider

const actions = {
  loginEmailPassword (context, {email, password}) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const user = {
          name: response.displayName,
          email: response.email,
          photoURL: response.photoURL
        }
        context.commit('setUser', user)
        context.commit('authenticated', response.refreshToken)
        return response
      })
  },
  registerEmailPassword (context, {email, password, displayName}) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const user = auth.currentUser
        
        user.updateProfile({
          displayName: displayName
        })
        
        return response
      })
  },
  loginExternalAuth (context, provider) {
    provider === 'google'
      ? provider = googleProvider
      : provider = facebookProvider
    
    return auth
      .signInWithPopup(provider)
      .then((response) => {
        const token = response.credential.accessToken
        
        const user = {
          name: response.user.displayName,
          email: response.user.email,
          photoURL: response.user.photoURL
        }
        
        context.commit('setUser', user)
        context.commit('authenticated', token)
        
        return response
      })
  },
  logout (context) {
    return auth
      .signOut()
      .then((response) => {
        context.commit('unauthenticated')
        return response
      })
  }
}

export default actions
