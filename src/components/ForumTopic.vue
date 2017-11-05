<template>
    <v-container grid-list-xs>
        <v-layout row wrap v-if="loaded">
            <v-flex
                    xs12
                    lg7 offset-lg1
                    style="padding-top: 2em"
            >
                <div class="headline">{{ topic.titulo }}</div>
                <v-divider></v-divider>
            </v-flex>
            <v-flex
                    xs12
                    lg7 offset-lg1
                    style="padding-top: 1em"
            >
                <v-avatar size="48px">
                    <img src="../assets/icon-user-default.png" v-if="topic.userPhotoURL === ''">
                    <img :src="topic.userPhotoURL" v-if="topic.userPhotoURL !== ''" />
                </v-avatar>
                <div class="body-1 userName">
                    {{ topic.userName }}
                    <v-spacer></v-spacer>
                    {{ intervalTime(topic.createdAt) }}
                </div>
            </v-flex>
            <v-flex
                    xs12
                    lg7 offset-lg1
            >
                <div class="body-2 textMessage" v-html="htmlfy(topic.corpo)"></div>
            </v-flex>
            <v-flex
                    xs12
                    lg7 offset-lg1
            >
                <div class="info-box">
                    <v-btn
                            flat
                            @click.native="showDialog = true"
                    >
                        <v-icon>reply</v-icon>
                        Responda
                    </v-btn>
                    <v-btn
                            flat
                            icon
                            @click.native="deleteTopic()"
                            v-if="topic.usuarioId === $store.state.auth.user.id"
                    >
                        <v-icon>cancel</v-icon>
                    </v-btn>
                </div>
                <v-divider></v-divider>
            </v-flex>
        </v-layout>
        <v-layout row wrap
                  v-for="reply in replys" v-if="replysLoaded" :key="reply.id"
        >
                <v-flex
                        xs12
                        lg7 offset-lg1
                        style="padding-top: 1em"
                >
                    <v-avatar size="48px">
                        <img src="../assets/icon-user-default.png" v-if="reply.userPhotoURL === ''">
                        <img :src="reply.userPhotoURL" v-if="reply.userPhotoURL !== ''" />
                    </v-avatar>
                    <div class="body-1 userName">
                        {{ reply.userName }}
                        <v-spacer></v-spacer>
                        {{ intervalTime(reply.createdAt) }}
                    </div>
                </v-flex>
                <v-flex
                        xs12
                        lg7 offset-lg1
                >
                    <div class="body-2 textMessage" v-html="htmlfy(reply.mensagem)"></div>
                    <v-divider></v-divider>
                </v-flex>
        </v-layout>
        <topic-new-reply
                        v-if="showDialog"
                        :show-dialog="showDialog"
                        @closeDialog="closeDialog"
                        @replySent="newReply"
        >
        </topic-new-reply>
    </v-container>
</template>

<script>
    import TopicNewReply from './ForumTopicNewReply.vue'
    import moment from 'moment'
    moment.locale('pt')
    
    export default {
      components: {
        'topic-new-reply': TopicNewReply
      },
      created () {
        if (this.$store.state.forum.topics.length === 0) {
          this.$store.dispatch('getTopicos', this.$store.state.auth.user.unidade_Academica_Id)
            .then(response => {
              this.topic = this.$store.getters.getTopicById(this.$route.params.id)
              this.loaded = true
            })
        }
        this.loaded = true
        this.$store.dispatch('getReplys', this.$route.params.id)
          .then((response) => {
            this.replys = response
            this.replysLoaded = true
          })
      },
      data () {
        return {
          topic: this.$store.getters.getTopicById(this.$route.params.id),
          loaded: false,
          showDialog: false,
          replysLoaded: false,
          replys: []
        }
      },
      methods: {
        htmlfy (str) {
          const strParagraph = `<p> ${str} </p>`
    
          return strParagraph
            .replace(/\n\n/, `</p><p>`)
            .replace(/\n/, `<br/>`)
        },
        closeDialog (event) {
          this.showDialog = false
        },
        newReply (event) {
          this.$store.dispatch('getReplys', this.$route.params.id)
            .then((response) => {
              this.replys = response
            })
          this.showDialog = false
        },
        intervalTime (date) {
          return moment(date).startOf('minute').fromNow()
        },
        deleteTopic: async function () {
          try {
            await this.$store.dispatch('deleteTopic', this.$route.params.id)
            await this.$store.dispatch('getTopicos', this.topic.unidadeAcademicaId)
            this.$router.push({
              name: 'forum.main',
              params: {
                id: this.topic.unidadeAcademicaId
              }
            })
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
    .userName {
        display: inline-block;
        padding-left: 1em;
    }
    .textMessage {
        padding-top: 1em;
        margin-left: 5em;
    }
    .info-box {
        background-color: #F9F9F9;
        margin: 1em 1em 1em 5em;
        border: 1px solid #cbcbcb;
        border-radius: 0.2em;
    }
</style>