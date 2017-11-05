<template>
    <v-dialog
        v-model="dialogShow"
        full-width
        max-width="500"
        persistent
    >
        <v-card>
            <v-card-title>
                <span class="headline">Novo Topico</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-form v-model="valid">
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Titulo"
                                        v-model="titulo"
                                        :rules="tituloRules"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-select
                                        autocomplete
                                        :items="departaments"
                                        :rules="departamentRules"
                                        v-model="departament"
                                        label="Departamento"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        multi-line
                                        label="Mensagem"
                                        hint="Descreva sua duvida"
                                        v-model="corpo"
                                        :rules="corpoRules"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" flat @click.native="newTopic()">Enviar</v-btn>
                <v-btn color="blue darken-1" flat @click.native="closeDialog()">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { topicos } from '../services/firebase'
    
    export default {
      props: {
        showDialog: {
          type: Boolean
        }
      },
      created () {
        this.$store.dispatch('getDepartaments', this.$route.params.id)
          .then((departaments) => {
            this.departaments = departaments.map(departament => departament.name)
          })
      },
      data () {
        return {
          dialogShow: this.showDialog,
          titulo: '',
          tituloRules: [
            (v) => !!v || 'Titulo e obrigatorio'
          ],
          corpo: '',
          corpoRules: [
            (v) => !!v || 'A sua mensagem e obrigatoria'
          ],
          departaments: [],
          departamentRules: [
            (v) => !!v || 'Departamento e obrigatorio'
          ],
          departament: '',
          valid: false
        }
      },
      methods: {
        closeDialog () {
          this.$emit('closeDialog')
          this.dialogShow = false
        },
        newTopic: async function () {
          if (this.valid) {
            const newChild = topicos.push()
            const newTopico = {
              id: newChild.key,
              titulo: this.titulo,
              corpo: this.corpo,
              usuarioId: this.$store.state.auth.user.id,
              unidadeAcademicaId: this.$route.params.id,
              createdAt: new Date().toISOString(),
              departamentoNome: this.departament
            }
            await newChild.set(newTopico)
  
            await this.$store.dispatch('getTopicos', this.$route.params.id)
  
            this.$emit('closeDialog')
            this.dialogShow = false
          }
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>