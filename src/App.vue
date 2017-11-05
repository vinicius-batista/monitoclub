<template>
  <div id="app">
    <v-app toolbar>
        <my-aside v-if="logged"></my-aside>
        <my-nav-top v-if="logged"></my-nav-top>
        <main class="bgcolor">
            <v-content v-if="logged">
                <router-view ></router-view>
            </v-content>
            <router-view v-else></router-view>
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
    .border {
        background-color: #ffffff;
        box-sizing: border-box;
        margin-top: 1.5em;
        -webkit-box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
        -moz-box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
    }
</style>
