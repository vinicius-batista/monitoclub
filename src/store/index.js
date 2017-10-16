import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import Cookie from '../services/cookie'

Vue.use(Vuex)

const state = {
  showDrawer: true,
  auth: {
    check: Cookie.get('token') != null,
    user: Cookie.getObject('user')
  },
  universities: [],
  campus: [],
  subjects: []
}

const getters = {
  oneCampus: (state) => (id) => state.campus.find((campus) => campus.id === id),
  oneSubject: (state) => (id) => state.subjects.find((subject) => subject.id === id)
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
