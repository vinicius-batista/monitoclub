<template>
    <v-toolbar class="green darken-1" fixed clipped-left app>
        <v-toolbar-title  class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="showDrawer"></v-toolbar-side-icon>
            MonitoClub
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn icon
               @click.prevent="logout()">
            <v-icon medium>fa-sign-out</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
  
  export default {
    data () {
      return {
      }
    },
    methods: {
      showDrawer () {
        this.$store.commit('changeDrawer')
      },
      logout () {
        this.$store
          .dispatch('logout')
          .then((response) => {
            this.$router.push({name: 'InitialPage'})
            return response
          })
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>