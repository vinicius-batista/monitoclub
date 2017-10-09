import Vue from 'vue'
import Router from 'vue-router'
import routes from './routerMap'
import store from '../store/index'

Vue.use(Router)

const router = new Router({routes})

router.beforeEach((to, from, next) => {
  if (!store.state.auth.check && to.meta.auth) {
    return router.push({name: 'InitialPage'})
  }
  next()
})

export default router
