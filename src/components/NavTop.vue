<template>
    <v-toolbar class="green darken-1" fixed>
        <v-toolbar-title  class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="showDrawer"></v-toolbar-side-icon>
            MonitoClub
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
                class="hidden-sm-and-down"
                single-line
                append-icon="search"
                solo
                placeholder="Search"
                v-model="search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon
               large
               @click.prevent="logout()">
            <v-icon>fa-sign-out</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
  
  export default {
    data () {
      return {
        search: ''
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