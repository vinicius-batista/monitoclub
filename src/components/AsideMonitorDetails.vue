<template>
    <v-dialog v-model="dialogShow"
              full-width
              max-width="500"
              persistent
    >
        <v-card>
            <v-card-title primary-title>
                <div>
                    <span class="headline">{{ monitorDetailsData.subject.descricao }}</span><br>
                    <span>Monitor: {{ monitorDetailsData.name }}</span><br>
                    <span>Email: {{ monitorDetailsData.email ? monitorDetailsData.email : 'Nao informado' }}</span>
                </div>
            </v-card-title>
            <v-card-text>
                <monitor-data-table
                        v-if="monitorDetailsData.monitorias"
                        :dataTable="this.monitorDataTable()"
                >
                </monitor-data-table>
                <div v-else>
                    <span>Dados sobre as monitorias nao foi informado</span>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue darken-1" flat @click.native="closeDialog()">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import MonitorDataTable from './MonitorDataTable.vue'
    export default {
      components: {
        'monitor-data-table': MonitorDataTable
      },
      props: {
        showDialog: {
          type: Boolean
        },
        monitorDetailsData: {
          type: Object,
          required: true
        }
      },
      data () {
        return {
          dialogShow: this.showDialog
        }
      },
      methods: {
        closeDialog () {
          this.$emit('closeDialog')
          this.dialogShow = false
        },
        monitorDataTable () {
          const tableMap = (monitoria) => {
            return {
              value: false,
              horario: `${monitoria.inicio} - ${monitoria.fim}`,
              dayOfWeek: monitoria.diaSemana,
              local: monitoria.salas
            }
          }
          return this.monitorDetailsData.monitorias.map(tableMap)
        }
      }
    }
</script>