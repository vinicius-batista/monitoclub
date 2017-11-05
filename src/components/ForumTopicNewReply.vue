<template>
    <v-dialog
            v-model="dialogShow"
            full-width
            max-width="500"
            persistent
    >
        <v-card>
            <v-card-title>
                <span class="headline">Nova Resposta</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-form v-model="valid">
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                        multi-line
                                        label="Resposta"
                                        hint="Escreva a sua resposta"
                                        v-model="reply"
                                        :rules="replyRules"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" flat @click.native="sendReply">Enviar</v-btn>
                <v-btn color="blue darken-1" flat @click.native="closeDialog()">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { replys } from '../services/firebase'
    
    export default {
      props: {
        showDialog: {
          type: Boolean
        }
      },
      data () {
        return {
          dialogShow: this.showDialog,
          reply: '',
          replyRules: [
            (v) => !!v || 'A resposta e obrigatoria'
          ],
          valid: false
        }
      },
      methods: {
        closeDialog () {
          this.$emit('closeDialog')
          this.dialogShow = false
        },
        sendReply: async function () {
          if (this.valid) {
            const newChild = replys.push()
            const newReply = {
              id: newChild.key,
              mensagem: this.reply,
              usuarioId: this.$store.state.auth.user.id,
              createdAt: new Date().toISOString(),
              topicId: this.$route.params.id
            }
            await newChild.set(newReply)
            
            this.$emit('replySent')
            this.dialogShow = false
          }
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>