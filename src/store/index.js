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
    user: {
      email: '',
      name: '',
      photoURL: ''
    }
  }
}

const getters = {

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
