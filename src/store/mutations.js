import Cookie from '../services/cookie'

const mutations = {
  changeDrawer (state) {
    state.showDrawer = !state.showDrawer
  },
  setUser (state, user) {
    state.auth.user = Cookie.setObject('user', user, '1M')
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
    state.universities = []
  },
  setUniversities (state, universities) {
    state.universities = universities
  },
  setOneCampus (state, campus) {
    if (state.campus.indexOf(campus) === -1) {
      state.campus.push(campus)
    }
  },
  setOneSubject (state, subject) {
    if (state.subjects.indexOf(subject) === -1) {
      state.subjects.push(subject)
    }
  }
}

export default mutations
