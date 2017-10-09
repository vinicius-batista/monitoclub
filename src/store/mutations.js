import Cookie from '../services/cookie'

const mutations = {
  changeDrawer (state) {
    state.showDrawer = !state.showDrawer
  },
  setUser (state, user) {
    if (user.photoURL === null) {
      user.photoURL = require('../assets/icon-user-default.png')
    }
    
    Cookie.setObject('user', user, '1M')
    state.auth.user = user
  },
  authenticated (state, token) {
    Cookie.set('token', token, '1M')
    state.auth.check = true
  },
  unauthenticated (state) {
    Cookie.remove('token')
    Cookie.remove('user')
    state.auth.check = false
    state.auth.user = {}
  }
}

export default mutations
