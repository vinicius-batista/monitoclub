<template>
    <v-container grid-list-xs>
        <v-layout row wrap style="padding-top: 1em">
            <v-flex
                xs4
                md3
                lg2 offset-lg1
            >
                <v-btn
                        round
                        color="primary"
                        @click.native="showDialog = true"
                >
                    Criar um topico
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12
                    lg8 offset-lg1
                    class="border"
            >
               <v-list three-line v-if="loaded">
                   <template v-for="topico in topicos">
                        <v-list-tile
                                :key="topico.id"
                                :to="{name: 'forum.topic', params: {id: topico.id}}"
                        >
                            <v-list-tile-avatar>
                                <img src="../assets/icon-user-default.png" v-if="topico.userPhotoURL === ''">
                                <img :src="topico.userPhotoURL" v-if="topico.userPhotoURL !== ''" />
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ topico.titulo }}</v-list-tile-title>
                                <v-chip small >{{ topico.departamentoNome }}</v-chip>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                {{ intervalTime(topico.createdAt) }}
                            </v-list-tile-action>
                        </v-list-tile>
                       <v-divider></v-divider>
                   </template>
               </v-list>
                <div v-if="!loaded" class="text-sm-center">
                    <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12
                    lg8 offset-lg1
                    style="padding-top: 2em"
            >
                <v-card>
                    <v-card-text>
                        <div class="text-xs-center">
                            <v-pagination :length.number="$store.state.forum.pageCount"
                                          v-model="page"
                                          @next="nextPage"
                                          @previous="previousPage"
                            >
                            </v-pagination>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <new-topic-dialog
                v-if="showDialog"
                :showDialog="showDialog"
                @closeDialog="showDialog = false"
        >
        </new-topic-dialog>
    </v-container>
</template>

<script>
    import NewTopicDialog from './ForumNewTopic.vue'
    import moment from 'moment'
    moment.locale('pt')
    
    export default {
      components: {
        'new-topic-dialog': NewTopicDialog
      },
      created () {
        this.$store.dispatch('getTopicos', this.$route.params.id)
          .then((response) => {
            this.loaded = true
          })
      },
      data () {
        return {
          loaded: false,
          page: 1,
          showDialog: false
        }
      },
      methods: {
        nextPage () {
        },
        previousPage () {
        },
        intervalTime (date) {
          return moment(date).startOf('minute').fromNow()
        }
      },
      computed: {
        topicos () {
          return this.$store.getters.getTopicPage(this.page)
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>