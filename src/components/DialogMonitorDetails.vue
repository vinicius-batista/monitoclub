<template>
    <v-dialog v-model="dialogShow"
              full-width
              max-width="500"
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
                <v-list v-if="monitorDetailsData.monitorias" three-line>
                    <v-list-tile
                            v-for="(monitoria, i) in monitorDetailsData.monitorias"
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
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue darken-1" flat @click.native="closeDialog()">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
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
        }
      }
    }
</script>