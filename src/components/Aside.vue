<template>
    <v-navigation-drawer
            app
            persistent
            height="100%"
            clipped
            enable-resize-watcher
            v-model="drawer"
            drawer
            
    >
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../assets/icon-user-default.png" v-if="user.photoURL === null">
                        <img :src="user.photoURL" v-if="user.photoURL !== null" />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list  dense>
            <template v-for="(item, i) in items">
                <v-divider v-if="item.divider" :key="i" dark class="my-3"></v-divider>
                <v-subheader v-else-if="item.heading" :key="i"> {{ item.heading }}  </v-subheader>
                <v-list-tile
                        v-else-if="item.favoritedMonitors"
                        v-for="monitor in favoritedMonitors"
                        :key="monitor.id"
                        @click="showMonitorDetails (monitor.id)"
                >
                    <v-list-tile-action>
                        <v-icon color="yellow darken--3">star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title> {{ monitor.name }} </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-else
                             :key="item.title"
                             @click.prevent="changeRoute(item.route)"
                >
                    <v-list-tile-action>
                        <v-icon> {{ item.icon }} </v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title> {{ item.title }} </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
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
          {title: 'Dashboard', icon: 'dashboard', route: 'dashboard'},
          {title: 'Profile', icon: 'account_box', route: 'profile'},
          {divider: true},
          {heading: 'Monitorias Favoritas'},
          {favoritedMonitors: true},
          {divider: true},
          {title: 'Forum', icon: 'forum', route: 'forum.main'},
          {title: 'Ajuda', icon: 'help', route: 'help'}
        ]
      }
    },
    computed: {
      drawer () {
        return this.$store.state.showDrawer
      },
      favoritedMonitors () {
        return [
          {name: 'monitoria 1', id: 'id1'},
          {name: 'monitoria 2', id: 'id2'}
        ]
      }
    },
    methods: {
      changeRoute (route) {
        this.$router.push({name: route})
      },
      showMonitorDetails (monitorId) {
        // implement
      }
    }
  }
</script>

<style lang="scss" scoped>
    .my-padding{
        padding-top: 1em;
    }
</style>