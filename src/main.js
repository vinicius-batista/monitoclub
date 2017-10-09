// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import store from './store/index'
import Vuefire from 'vuefire'

Vue.use(Vuefire)

Vue.config.productionTip = false
Vue.use(Vuetify)
import '../node_modules/vuetify/dist/vuetify.min.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})