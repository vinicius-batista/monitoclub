<template>
    <div class="initial-page">
        <v-layout row wrap style="padding-top: 10%">
            <v-flex md2 offset-md5
                    xs12 offset-xs0>
                <v-subheader class="display-3 white--text text--lighten-1 justify-center initial-page-title">MonitoClub</v-subheader>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="padding-top: 3.5em">
            <v-flex md4 offset-md4
                    xs10 offset-xs1 >
                <v-form v-model="valid">
                    <v-alert error :value="errMessage">
                        {{ errMessage }}
                    </v-alert>
                    <v-text-field
                            prepend-icon="email"
                            label="E-mail"
                            v-model="email"
                            :rules="emailRules"
                    ></v-text-field>
                    <v-text-field
                            prepend-icon="lock"
                            label="Senha"
                            v-model="password"
                            :rules="passwordRules"
                            type="password"
                    ></v-text-field>
                </v-form>
            </v-flex>
            <v-flex md1 offset-md4
                    xs4 offset-xs1
                    style="padding-right: 1em"
            >
                <v-btn
                        @click.prevent="backToInitialPage()"
                        round
                        color="grey"
                        block
                        dark
                >
                    <v-icon center dark>keyboard_arrow_left</v-icon>
                </v-btn>
            </v-flex>
            <v-flex md3 offset-md0
                    xs6 offset-xs0
            >
                <v-btn
                        @click.prevent="register"
                        color="grey"
                        round
                        block
                        dark
                >
                    Cadastrar
                    <v-icon right dark>send</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
      created () {
        if (this.$store.state.auth.check) {
          this.$router.push({name: 'dashboard'})
        }
      },
      data () {
        return {
          valid: false,
          email: '',
          emailRules: [
            (v) => !!v || 'E-mail e obrigatorio',
            (v) => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail precisa ser valido'
          ],
          password: '',
          passwordRules: [
            (v) => !!v || 'Senha e obrigatoria',
            (v) => v.length >= 8 || 'Senha precisa ter no minimo 8 caracteres'
          ],
          name: '',
          errMessage: ''
        }
      },
      methods: {
        register () {
          if (this.valid) {
            const user = {
              email: this.email,
              password: this.password,
              displayName: this.name
            }
            
            this.$store
              .dispatch('registerEmailPassword', user)
              .then((response) => {
                this.$router.push({name: 'InitialPage'})
              })
              .catch((error) => {
                this.errMessage = error.message
              })
          }
        },
        backToInitialPage () {
          this.$router.push({name: 'InitialPage'})
        }
      }
    }
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Zilla+Slab:400i');
    
    .initial-page{
        min-height: 100vh;
        min-width: 100vm;
        height: 100%;
        width: 100%;
        background: url("../assets/back-ground-3.jpg") center center fixed no-repeat;
        background-size: cover;
        overflow: hidden;
    }
    
    @media only screen and (max-width: 767px) {
        .initial-page {
            background: url("../assets/back-ground-3-cel.jpg") center top fixed no-repeat;
            -webkit-background-size: 280% auto;
            -moz-background-size: 280% auto;
            background-size: 280% auto;
        }
    }
    
    .initial-page-title{
        font-family: 'Zilla Slab', serif;
    }
</style>