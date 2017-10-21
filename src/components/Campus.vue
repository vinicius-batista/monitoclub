<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12
                    md6 offset-md3
                    lg4 offset-lg4
            >
                <div class="text-md-center" v-if="campusLoaded">
                    <v-toolbar-title>{{ campus.name }}</v-toolbar-title>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12
                    md8 offset-md2
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
                    md8 offset-md2
                    style="padding-top: 2em; overflow:auto"
            >
                <v-list three-line v-if="loaded">
                    <v-list-group v-for="item in departamentsFiltred" :key="item.id">
                        <v-list-tile slot="item" @click="getSubjects(item.id)">
                            <v-list-tile-avatar>
                                <img :src="item.iconeUrl" :alt="item.name">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-icon>keyboard_arrow_down</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-list-tile v-for="subItem in subjects" :key="subItem.id"
                                     @click.prevent="changeRouteToSubject(subItem.id)"
                                     v-if="subjectsLoaded"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.descricao }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <div v-if="!subjectsLoaded">
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
    export default {
      created () {
        if (this.departaments.length === 0) {
          this.$store.dispatch('getCampusById', this.$route.params.id)
            .then((campus) => {
              this.campus = campus
              this.campusLoaded = true
            })
          this.$store.dispatch('getDepartaments', this.$route.params.id)
            .then((departaments) => {
              this.departaments = departaments
              this.loaded = true
            })
        } else {
          this.loaded = true
          this.campusLoaded = true
        }
      },
      data () {
        return {
          campus: this.$store.getters.oneCampus(this.$route.params.id),
          campusLoaded: false,
          departaments: [],
          loaded: false,
          search: '',
          subjectsLoaded: false,
          subjects: [],
          lastDepartamentId: ''
        }
      },
      computed: {
        departamentsFiltred () {
          if (this.departaments && this.search) {
            return this.departaments.filter((departament) => departament.name
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) >= 0)
          }
          return this.departaments
        }
      },
      methods: {
        getSubjects (departamentId) {
          if (departamentId !== this.lastDepartamentId) {
            return this.$store.dispatch('getSubjects', departamentId)
              .then((subjects) => {
                this.subjectsLoaded = true
                this.subjects = subjects
                this.lastDepartamentId = departamentId
              })
              .catch((err) => {
                this.subjectsLoaded = false
                return err
              })
          }
        },
        changeRouteToSubject (subjectId) {
          this.$router.push({name: 'subject', params: {id: subjectId}})
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>