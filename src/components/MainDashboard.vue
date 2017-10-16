<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12
                    md8 offset-md2>
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
                    md8 offset-md2
                    style="padding-top: 2em"
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
                <div v-if="!loaded">
                    <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import store from '../store/index'
    export default {
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
        universities: () => store.state.universities,
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