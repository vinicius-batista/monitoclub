<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12
                    lg8 offset-lg1
            >
                <div class="text-xs-center" v-if="loadedSubject">
                    <v-toolbar-title>{{ subject.descricao }}</v-toolbar-title>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row  wrap>
            <v-flex xs12
                    lg8 offset-lg1
                    class="border"
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
                        <monitor-data-table
                                v-if="monitor.monitorias"
                                :dataTable="this.dataTable"
                        >
                        </monitor-data-table>
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
                <div v-if="!loaded" class="text-sm-center">
                    <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import MonitorDataTable from './MonitorDataTable.vue'
    
    export default {
      components: {
        'monitor-data-table': MonitorDataTable
      },
      created () {
        if (this.$store.state.universityData.subjects.length === 0) {
          this.getSubjectData()
        } else {
          this.subject = this.$store.getters.oneSubject(this.$route.params.id)
          this.loadedSubject = true
        }
        this.getMonitorData()
      },
      data () {
        return {
          monitor: null,
          loaded: false,
          loadedSubject: false,
          subject: {},
          dataTable: []
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
        getMonitorData () {
          this.$store.dispatch('getMonitor', this.$route.params.id)
            .then((monitor) => {
              this.monitor = monitor
              this.monitorTableData()
            })
            .catch((err) => {
              return err
            })
        },
        getSubjectData () {
          return this.$store
            .dispatch('getSubjectById', this.$route.params.id)
            .then((response) => {
              this.subject = response
              this.loadedSubject = true
            })
            .catch((err) => {
              return err
            })
        },
        addFavorite () {
          this.$store.dispatch('addFavoriteMonitor', this.monitor.id)
        },
        removeFavorite () {
          this.$store.dispatch('removeFavoriteMonitor', this.monitor.id)
        },
        monitorTableData () {
          const tableMap = (monitoria) => {
            return {
              value: false,
              horario: `${monitoria.inicio} - ${monitoria.fim}`,
              dayOfWeek: monitoria.diaSemana,
              local: monitoria.salas
            }
          }
          this.dataTable = this.monitor.monitorias.map(tableMap)
          this.loaded = true
        }
      }
    }
</script>

<style lang="scss" scoped>
    .border {
        -webkit-box-shadow: 0 1px 10px rgba(0,0,0,.12);
        -moz-box-shadow: 0 1px 10px rgba(0,0,0,.12);
        box-shadow: 0 1px 10px rgba(0,0,0,.12);
    }
</style>