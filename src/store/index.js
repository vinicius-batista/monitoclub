import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import moduleUser from './modules/moduleUser'
import moduleUniversities from './modules/moduleUniversities'

Vue.use(Vuex)

const state = {
  showDrawer: true
}

const getters = {
}

const modules = {
  auth: moduleUser,
  universityData: moduleUniversities
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
