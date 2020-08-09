<template>
  <div class="login fontMain">
    <v-row>
      <v-col cols="1" lg="3" md="2" sm="0" xs="0" xl="2"></v-col>
      <v-col cols="10" lg="6" md="8" sm="12" xs="12" xl="8">
        <div>
          <v-form>
            <v-card>
              <v-card-title>
                <v-row class="justify-center">
                  <v-img src="http://pody.ir/defaultImages/pody/12.png" max-width="50px" max-height="50px"
                         width="50"
                         height="50"></v-img>
                  <span class="headline mt-4 mx-6 title-text">ورود کاربر</span>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-col>
                    <v-text-field v-model="EmailLoginUser" label="ایمیل">
                      <!--                                            :rules="[rules.required , rules.email]"-->
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="PasswordLoginUser"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="رمز عبور"
                      hint="حداقل 8 کاراکتر"
                      maxlength="30"
                      counter
                      @click:append="show1 = !show1"
                    >
                    </v-text-field>
                  </v-col>
                </v-container>
              </v-card-text>
              <v-row id="loginAlert" v-if="showAlert" justify="center">
                <v-alert type="error">
                  رمز عبور یا نام کاربری اشتباه می باشد.
                </v-alert>
              </v-row>
              <v-card-actions>
                <v-row>
                  <v-col>
                    <v-btn text large v-on:click="RedirectTo('/forgot')">رمز عبور خود را فراموش کرده
                      اید
                      ؟
                    </v-btn>
                    <v-btn v-on:click="RedirectTo('/rssLogin')" style=" color: #fe731b" text large>
                      ورود با آدرس RSS Feed
                    </v-btn>
                    <v-btn rounded color="#fe731b" v-on:click="RedirectTo('/register')"
                           style="color: #ffffff" large>
                      ثبت نام در پادی
                    </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-btn large depressed outlined rounded
                           class="primary white--text ma-4"
                           width="200" height="35" text
                           @click="login"
                    >ورود
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
              <v-row>
                <v-col cols="4" xs="4" sm="4" md="4" lg="4" xl="4"></v-col>
                <v-col cols="4" xs="4" sm="4" md="4" lg="4" xl="4">
                  <div class="loginItem">
                    <div class="loginPage-spilitLine">
                      یا
                    </div>
                  </div>
                </v-col>
                <v-col cols="4" xs="4" sm="4" md="4" lg="4" xl="4"></v-col>
              </v-row>
              <!-- social login XLARGE -->
              <div v-show="$vuetify.breakpoint.xlOnly">
                <v-row>
                  <v-col md="4" lg="4" xl="4"></v-col>
                  <v-col md="4" lg="4" xl="4">
                    <v-btn width="250px" height="35px" color="#FFFFFF">
                      <v-avatar size="30px" class="ml-8">
                        <v-img src="../../assets/googleLogin.svg"></v-img>
                      </v-avatar>
                      Login with GOOGLE
                    </v-btn>
                  </v-col>
                  <v-col md="4" lg="4" xl="4"></v-col>
                </v-row>

              </div>
              <!-- social login LARGE -->
              <div v-show="$vuetify.breakpoint.lgOnly">
                <v-row>
                  <v-col md="4" lg="4" xl="4"></v-col>
                  <v-col md="4" lg="4" xl="4">
                    <v-btn width="250px" height="35px" color="#FFFFFF">
                      <v-avatar size="30px" class="ml-8">
                        <v-img src="../../assets/googleLogin.svg"></v-img>
                      </v-avatar>
                      Login with GOOGLE
                    </v-btn>
                  </v-col>
                  <v-col md="4" lg="4" xl="4"></v-col>
                </v-row>

              </div>
              <!-- social login Medium down -->
              <div v-show="$vuetify.breakpoint.mdAndDown">
                <v-row>
                  <v-col md="1"></v-col>
                  <v-col md="3">
                    <v-btn width="155px" height="25px" color="#FFFFFF" style="font-size: x-small">
                      <v-avatar size="18px" class="ml-3">
                        <v-img src="../../assets/googleLogin.svg"></v-img>
                      </v-avatar>
                      Login with GOOGLE
                    </v-btn>
                  </v-col>
                  <v-col md="1"></v-col>
                </v-row>
                <v-row>
                  <v-col md="1"></v-col>
                  <v-col md="3">
                    <v-btn width="155px" height="25px" color="#3b5998" style="font-size: x-small">
                      <v-avatar size="12px" class="ml-3">
                        <v-img src="../../assets/facebook.svg"></v-img>
                      </v-avatar>
                      <span style="color: white">Login with FACEBOOK</span>
                    </v-btn>
                  </v-col>
                  <v-col md="1"></v-col>
                </v-row>
                <v-row>
                  <v-col md="1"></v-col>
                  <v-col md="3">
                    <v-btn width="155px" height="25px" color="#6ab3ea" style="font-size: x-small">
                      <v-avatar size="18px" class="ml-3">
                        <v-img src="../../assets/twitter.svg"></v-img>
                      </v-avatar>
                      <span style="color: white">Login with TWITTER</span>
                    </v-btn>
                  </v-col>
                  <v-col md="1"></v-col>
                </v-row>
              </div>
              <!-- Make Login button in form -->
            </v-card>
          </v-form>
        </div>
      </v-col>
      <v-col cols="1" lg="3" md="2" sm="0" xs="0" xl="2"></v-col>
    </v-row>
  </div>
</template>

<script>
  import axios from "axios";
  import Vue from "vue";
  import $ from "jquery";

  export default {
    name: "Login",
    data: () => {
      return {
        images: {},
        EmailLoginUser: '',
        PasswordLoginUser: '',
        LoginFlag: false,
        isLogin: '',
        show1: false,
        rules: {
          required: value => !!value || 'فیلد الزامی',
          min: v => v.length >= 7 || 'حداقل کلمه عبور 6 کاراکتر می باشد',
          passwordmatch: v => v.UserDataSignUp.password === v.UserDataSignUp.confirmpassword || "doesn't match",
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },

        },
        showAlert:false,
        clientId: '315826587026-17jksqap7jvqh6n6en090pnmjjp8ecdh.apps.googleusercontent.com',
      }
    },
    methods: {
      login() {
        this.showAlert = false;
        axios.post('http://localhost:8084/api/login', {
          username: this.EmailLoginUser,
          password: this.PasswordLoginUser
        }).then(response => {
          if (response.status === 200 && 'id' in response.data) {
            this.$session.start();
            this.$session.set('userId', response.data.id);
            this.$session.set('username', response.data.username);
            this.$session.set('userImage', response.data.profileImageAddress);
            this.$session.set('userTitle', response.data.userTitle);
            this.$session.set('isChannel', response.data.isChannel);
            // Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.id;
            this.isLogin = true;
            this.LoginFlag = true;
            // App.data().loginFlag=true;
            // window.location.href = "/";
            let routeData = this.$router.resolve({name: 'صفحه اصلی', path: "/"});
            window.open(routeData.href, "_self");
          }
        }).catch(e => {
          this.showLoginError()
          // this.errors.push(e);
          console.log(e)
        });
        return this.LoginFlag;
      },
      RedirectTo(url) {
        this.$router.push(url);
      },
      AuthProvider(provider) {

        const self = this

        this.$auth.authenticate(provider).then(response => {

          self.SocialLogin(provider, response)

        }).catch(err => {
          console.log(err)
        })

      },
      SocialLogin(provider, response) {
        console.log(response)

        this.$http.post('/sociallogin/' + provider, response).then(response => {
          console.log(response)

        }).catch(err => {
          console.log(err)
        })
      },
      OnGoogleAuthSuccess(idToken) {
        console.log(idToken)
        // Receive the idToken and make your magic with the backend
      },
      OnGoogleAuthFail(error) {
        console.log(error)
      },
      showLoginError() {
        this.showAlert = true;
      }
    },
    mounted() {
      // let googleLogin = document.createElement('script');
      // googleLogin.setAttribute('src', 'https://apis.google.com/js/platform.js');
      // document.head.appendChild(googleLogin);
    },
    created() {
    },
    head() {
      return {
        title: "پادی | ورود"
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/Styles/FontiranSans.css";

  .login {
    background: #f9f9f9;
    background: linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113));
    width: 105%;
    height: 105%;
    position: absolute;
  }

  .loginItem {
    cursor: pointer;
    text-align: center;
    margin: 12px 16px 0;
    float: none;
    display: block;
  }

  .loginPage-spilitLine {
    display: inline-block;
    font-size: 12px;
    height: 14px;
    line-height: 14px;
    color: rgba(0, 0, 0, .32);
    padding: 0 12px;
    margin: .2rem auto .16rem;
    position: relative;
  }

  .loginPage-spilitLine:before {
    left: -6rem;
    border-radius: .5px;
    margin-top: -.5px;
    position: absolute;
    content: " ";
    top: 50%;
    width: 6rem;
    height: 1px;
    background: rgba(0, 0, 0, .32);
  }

  .loginPage-spilitLine:after {
    right: -6rem;
    border-radius: .5px;
    margin-top: -.5px;
    position: absolute;
    content: " ";
    top: 50%;
    width: 6rem;
    height: 1px;
    background: rgba(0, 0, 0, .32);
  }
</style>
