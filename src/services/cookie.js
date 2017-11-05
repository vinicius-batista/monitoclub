import Vue from 'vue'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie)

export default {
  set (key, value, time) {
    Vue.cookie.set(key, value, {expires: time})
    return this
  },
  get (key, value) {
    return Vue.cookie.get(key) || value
  },
  setObject (key, value, time) {
    Vue.cookie.set(key, JSON.stringify(value), {expires: time})
    return this.getObject(key)
  },
  getObject (key) {
    return Vue.cookie.get(key) ? JSON.parse(Vue.cookie.get(key)) : null
  },
  remove (key) {
    Vue.cookie.delete(key)
  }
}

