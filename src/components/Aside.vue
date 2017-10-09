<template>
    <v-navigation-drawer
            class="pb-0"
            persistent
            height="100%"
            clipped
            absolute
            enable-resize-watcher
            v-model="drawer"
            drawer
            
    >
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img :src="user.photoURL" />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list class="pt-0" dense>
            <v-list-tile v-for="item in items"
                         :key="item.title"
                         @click.prevent="changeRoute(item.route)">
                <v-list-tile-action>
                    <v-icon> {{ item.icon }} </v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title> {{ item.title }} </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        user: {
          name: this.$store.state.auth.user.name,
          photoURL: this.$store.state.auth.user.photoURL
        },
        items: [
          {title: 'Profile', icon: 'account_box', route: 'profile'},
          {title: 'Forum', icon: 'forum', route: 'forum.main'},
          {title: 'Ajuda', icon: 'help', route: 'help'}
        ]
      }
    },
    computed: {
      drawer () {
        return this.$store.state.showDrawer
      }
    },
    methods: {
      changeRoute (route) {
        this.$router.push({name: route})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>