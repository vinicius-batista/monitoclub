<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12
                    lg6 offset-lg2
            >
                <v-text-field
                        single-line
                        append-icon="search"
                        solo
                        placeholder="Search"
                        v-model="search"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12
                    lg8 offset-lg1
                    class="border"
            >
                <v-list three-line v-if="loaded">
                    <v-list-group v-for="item in universitiesFiltred" :key="item.id">
                        <v-list-tile slot="item" @click="getCampus(item.id)">
                            <v-list-tile-avatar>
                                <img :src="item.imagem_url" :alt="item.name">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-icon>keyboard_arrow_down</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-list-tile v-for="subItem in campus" :key="subItem.id"
                                     @click.prevent="changeRouteToCampus(subItem.id)"
                                     v-if="campusLoaded" >
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
                                <v-list-tile-sub-title>Localidade: {{subItem.localidade}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <div v-if="!campusLoaded">
                            <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
                        </div>
                    </v-list-group>
                </v-list>
                <div v-if="!loaded" class="text-sm-center">
                    <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import store from '../store/index'
    export default {
      created () {
        if (this.$store.state.auth.user.universidade_Id !== '') {
          const campusId = this.$store.state.auth.user.unidade_Academica_Id
          this.$router.push({name: 'campus', params: {id: campusId}})
        }
      },
      mounted () {
        if (this.universities.length === 0) {
          this.$store.dispatch('getAllUniversities')
            .then((response) => {
              this.loaded = true
            })
            .catch((err) => {
              this.loaded = false
              return err
            })
        } else {
          this.loaded = true
        }
      },
      data () {
        return {
          loaded: false,
          search: '',
          campus: [],
          campusLoaded: false,
          lastSearchedUniversity: ''
        }
      },
      computed: {
        universities: () => store.state.universityData.universities,
        universitiesFiltred () {
          if (this.universities && this.search) {
            return this.universities.filter((university) => university.name
                                                                    .toLowerCase()
                                                                    .indexOf(this.search.toLowerCase()) >= 0)
          }
          return this.universities
        }
      },
      methods: {
        changeRouteToCampus (campusId) {
          this.$router.push({name: 'campus', params: {id: campusId}})
        },
        getCampus (universityId) {
          if (universityId !== this.lastSearchedUniversity) {
            this.$store.dispatch('getCampus', universityId)
              .then((campus) => {
                this.campus = campus
                this.campusLoaded = true
                this.lastSearchedUniversity = universityId
              })
              .catch((err) => {
                this.campusLoaded = false
                return err
              })
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
</style>