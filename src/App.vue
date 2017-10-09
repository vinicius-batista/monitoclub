<template>
  <div id="app">
    <v-app toolbar>
        <my-aside v-if="logged"></my-aside>
        <my-nav-top v-if="logged"></my-nav-top>
        <main>
            <router-view></router-view>
        </main>
    </v-app>
  </div>
</template>

<script>
import AsideComponent from './components/Aside.vue'
import NavTopComponent from './components/NavTop.vue'

export default {
  name: 'app',
  components: {
    'my-aside': AsideComponent,
    'my-nav-top': NavTopComponent
  },
  data () {
    return {
    }
  },
  computed: {
    logged () {
      return this.$store.state.auth.check
    }
  }
}
</script>

<style>

</style>
