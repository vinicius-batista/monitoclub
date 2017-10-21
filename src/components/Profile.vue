<template>
    <v-container fluid>
        <v-layout row wrap
                  style="padding-top: 4em"
        >
            <v-flex xs12
                    md8 offset-md2
                    class="box"
            >
                <v-layout row wrap >
                    <v-flex xs8 offset-xs2
                            md6 offset-md3
                            lg4 offset-lg4
                    >
                        <div class="text-md-center">
                            <v-toolbar-title>Dados pessoais</v-toolbar-title>
                        </div>
                    </v-flex>
                </v-layout>
                <v-layout row wrap
                          style="padding-top: 1.5em"  >
                    <v-flex md8 offset-md2
                            xs10
                    >
                        <v-form v-model="valid">
                            <v-alert error :value="errMessage">
                                {{ errMessage }}
                            </v-alert>
                            <v-text-field
                                    prepend-icon="person"
                                    label="Nome"
                                    v-model="user.nome"
                                    :rules="nameRules"
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="email"
                                    label="Email"
                                    v-model="user.email"
                                    disabled
                            ></v-text-field>
                            <v-select
                                    autocomplete
                                    prepend-icon="school"
                                    :items="universities"
                                    :rules="universityRules"
                                    v-model="university"
                                    label="Universidades"
                            ></v-select>
                            <v-select
                                    :loading="loading"
                                    autocomplete
                                    prepend-icon="school"
                                    :rules="campusRules"
                                    :items="campusNames"
                                    v-model="campusSelected"
                                    :search-input.sync="search"
                                    label="Unidade acadêmica"
                                    cache-items
                            ></v-select>
                        </v-form>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex md4 offset-md4
                            xs6 offset-xs3
                    >
                        <v-btn
                                @click.prevent="submit"
                                color="grey"
                                round
                                block
                                dark
                        >
                            Atualizar
                            <v-icon right dark>send</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
       
    </v-container>
</template>

<script>
    export default {
      created () {
        if (this.$store.state.universityData.universities.length === 0) {
          this.$store.dispatch('getAllUniversities')
            .then((response) => {
              this.universities = this.$store.getters.universitiesName
            })
        }
      },
      data () {
        return {
          valid: false,
          user: this.$store.state.auth.user,
          universities: this.$store.getters.universitiesName,
          university: '',
          nameRules: [
            (v) => !!v || 'Nome e obrigatorio'
          ],
          universityRules: [
            (v) => !!v || 'Universidade e obrigatorio'
          ],
          campusRules: [
            (v) => !!v || 'Campus e obrigatorio'
          ],
          errMessage: '',
          campusNames: [],
          campusSelected: '',
          loading: false,
          search: null
        }
      },
      computed: {
        universitySelectedId () {
          if (this.university !== '') {
            const universitySearch = (university) => university.name === this.university
            const universityFInd = this.$store.state.universityData.universities.find(universitySearch)
            return universityFInd.id
          } else {
            return ''
          }
        }
      },
      methods: {
        submit () {
          if (this.valid) {
            this.user.universidade_Id = this.universitySelectedId || ''
            this.user.unidade_Academica_Id = this.universitySelectedId
                                                                ? this.findCampusId()
                                                                : ''
            
            this.$store.dispatch('updateUserInfo', this.user)
              .then((response) => {
                this.$router.push({name: 'dashboard'})
              })
              .catch((err) => {
                this.errMessage = 'Falha na atualizacão'
                return err
              })
          }
        },
        findCampusId () {
          const campusSearch = campus => campus.name === this.campusSelected
          const campusFind = this.$store.state.universityData.campus.find(campusSearch)
          return campusFind.id
        }
      },
      watch: {
        universitySelectedId (val) {
          if (val !== '') {
            this.loading = true
            this.$store.dispatch('getCampus', val)
              .then((listCampus) => {
                this.campusNames = listCampus.map(campus => campus.name)
                this.loading = false
              })
          } else {
            this.campusNames = []
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
    .box{
        background-color: #fcfcfc;
        padding: 1.5em 0 1.5em 0;
        border-radius: 1em;
        -webkit-box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
        -moz-box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
    }
</style>