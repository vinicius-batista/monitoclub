<template>
    <v-navigation-drawer
            app
            persistent
            height="100%"
            clipped
            :mobile-break-point="960"
            enable-resize-watcher
            v-model="drawer"
            drawer
            
    >
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../assets/icon-user-default.png" v-if="user.photoURL === ''">
                        <img :src="user.photoURL" v-if="user.photoURL !== ''" />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.nome }}</v-list-tile-title>
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
                        @click="showMonitorDetails (monitor)"
                >
                    <v-list-tile-action>
                        <v-icon color="yellow darken--3">star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title> {{ monitor.subject.descricao }} </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-else
                             :key="item.title"
                             @click.prevent="item.params
                             ? changeRouteParams(item.route, item.params)
                             : changeRoute(item.route)"
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
        <aside-monitor-details
                v-if="showDialog"
                @closeDialog="showDialog = false"
                :showDialog="showDialog"
                :monitorDetailsData="monitorDetailsData"
        >
        </aside-monitor-details>
    </v-navigation-drawer>
</template>

<script>
  import AsideMonitorDetailsComponent from './AsideMonitorDetails.vue'
  export default {
    components: {
      'aside-monitor-details': AsideMonitorDetailsComponent
    },
    created () {
      this.$store.dispatch('getFavoriteMonitorData')
    },
    data () {
      return {
        showDialog: false,
        monitorDetailsData: {}
      }
    },
    computed: {
      drawer () {
        return this.$store.state.showDrawer
      },
      favoritedMonitors () {
        return this.$store.state.auth.favoriteMonitors
      },
      user () {
        return this.$store.getters.getUser
      },
      items () {
        return [
          {title: 'Dashboard', icon: 'dashboard', route: 'dashboard'},
          {title: 'Perfil', icon: 'account_box', route: 'profile'},
          {divider: true},
          {heading: 'Monitorias Favoritas'},
          {favoritedMonitors: true},
          {divider: true},
          {title: 'Forum',
            icon: 'forum',
            route: 'forum.main',
            params: {id: this.user.unidade_Academica_Id}
          },
          {title: 'Sair', icon: 'fa-sign-out', route: 'logout'}
        ]
      } 
    },
    methods: {
      changeRouteParams (route, params) {
        this.$router.push({name: route, params})
      },
      changeRoute (route) {
        route === 'logout'
          ? this.$store.dispatch('logout')
              .then(response => this.$router.push({name: 'InitialPage'}))
          : this.$router.push({name: route})
      },
      showMonitorDetails (monitor) {
        this.monitorDetailsData = monitor
        this.showDialog = true
      }
    }
  }
</script>

<style lang="scss" scoped>
    .my-padding{
        padding-top: 1em;
    }
</style>