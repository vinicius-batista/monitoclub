<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12
                    md6 offset-md3
                    lg4 offset-lg4
            >
                <div class="text-xs-center" v-if="loadedSubject">
                    <v-toolbar-title>{{ subject.descricao }}</v-toolbar-title>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row  wrap>
            <v-flex xs12
                    md8 offset-md2
                    style="padding-top: 2em; overflow:auto"
            >
                <v-card v-if="loaded">
                    <v-card-title primary-title>
                        <div>
                            <span class="headline">Monitoria</span><br>
                            <span>Monitor: {{ monitor.name }}</span><br>
                            <span>Email: {{ monitor.email ? monitor.email : 'Nao informado' }}</span>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-list v-if="monitor.monitorias" three-line>
                            <v-list-tile
                                       v-for="(monitoria, i) in monitor.monitorias"
                                       :key="i"
                                       @click=""
                                       style="padding: 1em 0 1em 0"
                            >
                                <v-list-tile-content>
                                    <span>Inicio: {{ monitoria.inicio }}</span>
                                    <span>Fim: {{ monitoria.fim }}</span>
                                    <span>Dias: {{ monitoria.diaSemana }}</span>
                                    <span>Local: {{ monitoria.salas }}</span>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                        <div v-else>
                            <span>Dados sobre as monitorias nao foi informado</span>
                        </div>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-btn flat
                               @click="addFavorite()"
                               v-if="!isFavorited"
                        >
                            Adicionar aos favoritos
                        </v-btn>
                        <v-btn flat
                               color="red"
                               @click="removeFavorite()"
                               v-if="isFavorited"
                        >
                            Remover dos favoritos
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
      mounted () {
        if (this.$store.state.universityData.subjects.length === 0) {
          return this.$store
            .dispatch('getSubjectById', this.$route.params.id)
            .then((response) => {
              this.subject = response
              this.loadedSubject = true
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.subject = this.$store.getters.oneSubject(this.$route.params.id)
          this.loadedSubject = true
        }
        
        if (!this.monitor) {
          this.$store.dispatch('getMonitor', this.$route.params.id)
            .then((monitor) => {
              this.monitor = monitor
              this.loaded = true
            })
            .catch((err) => {
              return err
            })
        }
      },
      data () {
        return {
          monitor: null,
          loaded: false,
          loadedSubject: false,
          subject: {}
        }
      },
      computed: {
        isFavorited () {
          const searchMonitor = (monitor) => monitor.id === this.monitor.id
          const result = this.$store.state.auth.favoriteMonitors.find(searchMonitor)
          return result !== undefined
        }
      },
      methods: {
        addFavorite () {
          this.$store.dispatch('addFavoriteMonitor', this.monitor.id)
        },
        removeFavorite () {
          this.$store.dispatch('removeFavoriteMonitor', this.monitor.id)
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>