<template>
    <div class="initial-page">
        <v-layout row wrap style="padding-top: 10%">
            <v-flex md2 offset-md5
                    xs12 offset-xs0>
                <v-subheader class="display-3 white--text text--lighten-1 justify-center initial-page-title">MonitoClub</v-subheader>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="padding-top: 5rem">
            <v-flex md2 offset-md4
                    xs8 offset-xs2
                    style="margin-right: 2rem">
                <v-btn primary
                       round
                       block
                       @click.prevent="loginExternalProvider('facebook')">
                    <v-icon dark left>
                        fa-facebook-f
                    </v-icon>
                    Entre com Facebook
                </v-btn>
            </v-flex>
            <v-flex md2 offset-md0
                    xs8 offset-xs2 >
                <v-btn white
                       round
                       block
                       @click.prevent="loginExternalProvider('google')" >
                    <v-icon dark left>
                        fa-google
                    </v-icon>
                    Entre com Google
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="padding-top: 4rem">
            <v-flex md4 offset-md4
                    xs10 offset-xs1 >
                <v-form v-model="valid">
                    <v-alert error icon="warning" :value="errMessage.err">
                        {{ errMessage.message }}
                    </v-alert>
                    <br/>
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
                    <v-btn
                            @click.prevent="submit"
                            color="grey"
                            round
                            block
                            dark
                    >
                        Login
                        <v-icon right color="dark">send</v-icon>
                    </v-btn>
                </v-form>
            </v-flex>
        </v-layout>
        <v-flex md4 offset-lg5
                xs10 offset-xs2>
            <v-subheader class="subheading grey--text text--darken-3"
                         style="cursor: pointer"
                         @click.prevent="register"
            >
                Nao possui conta? Clique aqui
            </v-subheader>
        </v-flex>
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
          errMessage: {
            err: false,
            message: 'Usuario ou senha estao incorretos'
          }
        }
      },
      methods: {
        submit () {
          if (this.valid) {
            const user = {
              email: this.email,
              password: this.password
            }
            
            this.$store
              .dispatch('loginEmailPassword', user)
              .then((response) => {
                this.$router.push({name: 'dashboard'})
              })
              .catch((err) => {
                this.errMessage.err = true
                return err
              })
          }
        },
        register () {
          this.$router.push({name: 'auth.register'})
        },
        loginExternalProvider (provider) {
          this.$store
            .dispatch('loginExternalAuth', provider)
            .then((response) => {
              this.$router.push({name: 'dashboard'})
            })
            .catch((err) => {
              this.errMessage.err = true
              this.errMessage.message = 'Falha na comunicao com o servidor'
              return err
            })
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