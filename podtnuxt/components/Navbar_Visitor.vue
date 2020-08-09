<template>
  <nav class="fontMain" style="z-index: 5">
    <v-app-bar app color="primary" light>
      <!-- Logo of Pody in div -->
      <!--<div class="Logo-Image">-->
      <!--            <router-link to="/">-->
      <v-img @click="buttonRedirect('','/')" src="http://pody.ir/defaultImages/pody/12.png" max-width="72px" max-height="72px"
             style="cursor: pointer">
      </v-img>
      <!--            </router-link>-->
      <!--</div>-->
      <!-- make div for image in vuetify in div -->
      <div class="align-center d-flex">
        <div>
          <!--                    <router-link to="/">-->
          <v-img @click="buttonRedirect('','/')" src="http://pody.ir/defaultImages/pody/PODYYY1.png" max-width="80px"
                 max-height="56px" style="cursor: pointer">
          </v-img>
          <!--                    </router-link>-->
        </div>
        <div class="hidden-sm-and-down">
          <div class="toolbar_items">
            <ul>
              <li style="cursor: pointer;color: white" @click="buttonRedirect('','/category')">
                دسته بندی های پادی
              </li>
              <li style="cursor: pointer;color: white" @click="buttonRedirect('','/Channels')">
                ناشران پادی
              </li>
              <li style="cursor: pointer;color: white" @click="buttonRedirect('','/blog')">
                پادی بلاگ
              </li>
            </ul>
          </div>
        </div>
        <div v-show="$vuetify.breakpoint.smAndUp">
          <v-text-field
            solo
            flat
            hide-details
            autofocus
            rounded
            clearable
            background-color="white"
            color="primary"
            label="جستجو"
            prepend-inner-icon="mdi-magnify"
            v-model="searchTerm"
            style="width:450px"
          >

          </v-text-field>
        </div>
      </div>
      <v-spacer>

      </v-spacer>
    </v-app-bar>
  </nav>
</template>

<script>
  import axios from 'axios';
  import Vue from 'vue';

  export default {
    name: "Navbar_Visitor",
    data: () => {
      return {
        menu: false,
        isLogin: null,
        inLoginPage: null,
        drawer: false,
        clipped: false,
        Message: '',
        item: 0,
        items: [
          {text: 'خانه', icon: 'mdi-home', link: '/'},
          {text: 'دسته بندی', icon: 'mdi-format-list-bulleted', link: '/category'},
          {text: 'ناشران', icon: 'mdi-microphone-variant', link: '/publishers'},
          {text: 'بلاگ', icon: 'mdi-message', link: '/blog'},
          {text: 'تماس با ما', icon: 'mdi-phone-in-talk', link: '/contactus'},
        ],
        LoginDialog: false,
        SignUpDialog: false,
        show1: false,
        show2: false,
        searchTerm: "",
        signUpToolTip: false,
        logInToolTip: false,
        EmailLoginUser: '',
        PasswordLoginUser: '',
        UsernameSignUpUser: '',
        EmailSignUpUser: '',
        PasswordSignUpUser: '',
        ConfirmPasswordSignUpUser: '',
        userNavigation: [
          {
            id: 3,
            icon: 'mdi-upload',
            title: 'آپلود',
            url: '/upload'
          },
          {
            id: 4,
            icon: 'mdi-message-processing',
            title: 'آپلود خبر',
            url: '/news'
          },
          {
            id: 5,
            icon: 'mdi-library-music ',
            title: 'پادکست‎‌های من',
            url: '/myPodcasts'
          },
          {
            id: 6,
            icon: 'mdi-thumb-up',
            title: 'پسندیده های من',
            url: '/myLikes'
          },
        ],
        rules: {
          required: value => !!value || 'Required',
          min: v => v.length >= 7 || 'Required 8 character or more',
          passwordmatch: v => v.UserDataSignUp.password === v.UserDataSignUp.confirmpassword || "doesn't match",
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },

        },
        disableds: [{
          id: 7,
          icon: 'mdi-align-horizontal-left',
          title: 'آمار های من',
          url: '/myStatistics'
        },],
        icons: [
          {
            name: "fab fa-twitter",
            url: "",
            title: "ورود با توییتر",
            color: "#55acee"
            // target: "_blank"
          },
          {
            name: "fab fa-instagram",
            url: "",
            title: "ورود با اینستاگرام",
            color: "primary"
            // target: "_blank"
          },
          {
            name: "fab fa-google",
            url: "",
            title: "ورود با گوگل"
            // target: "_blank"
          }
        ],
        userDetail: null,
        userEdit: false,
        imagelink: {
          name: "linkforimage",
          route: "/PlayPage"
        },
        postBody: '',
        errors: [],
        signupResponse: null,
        loginResponse: null,
        firstLogo: "@/assets/12.png",
        secLogo: "@/assets/PODYYY1.png",
        currentUrl: "",
        // LoginFlag:this.$store.state,
      };
    },
    computed: {
      // comparePassword() {
      //     return this.PasswordSignUpUser !== this.ConfirmPasswordSignUpUser ? 'پسوورد یکی نیست' : ''
      // },
      isInLoginPage() {
        if (window.location.pathname === '/Login') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      loginformisvalid() {
        return this.EmailLoginUser !== '' &&
          this.PasswordLoginUser !== '' &&
          this.PasswordLoginUser.length <= 7
      },
      processForm: function () {
        // eslint-disable-next-line no-console
        alert('Processing!');
      },
      submit() {
        this.$v.form.$touch();
        // if its still pending or an error is returned do not submit
        if (this.$v.form.$pending || this.$v.form.$error) return;
        // to form submit after this
        alert("Form submitted");
      },
      buttonRedirect(id, url) {
        if (url === '/upload') {
          this.$router.push('/upload/' + id)
        }
        if (url === '/news') {
          this.$router.push('/news/' + id)
        }
        if (url === '/myPodcasts') {
          this.$router.push('/myPodcasts')
        }
        if (url === '/myLikes') {
          this.$router.push('/myLikes')
        }
        if (url === '/Login') {
          this.$router.push('/Login')
        }
        if (url === '/') {
          window.location.href = '/'
        }
        if (url === '/publisher') {
          window.location.href = '/publisher'
        }
        if (url === '/blog') {
          window.location.href = '/blog'
        }
      },
      register() {
        axios.post('http://localhost:8084/api/signup/email', {
          username: this.UsernameSignUpUser,
          email: this.EmailSignUpUser,
          password: this.PasswordSignUpUser
        }).then(response => {
          this.signupResponse = response.data
        }).catch(e => {
          this.errors.push(e)
        })
      },
      login() {
        axios.post('http://localhost:8084/api/login', {
          username: this.EmailLoginUser,
          password: this.PasswordLoginUser
        }).then(response => {
          if (response.status === 200 && 'id' in response.data) {
            this.$session.start();
            this.$session.set('userId', response.data.id);
            this.$session.set('username', response.data.username);
            this.$session.set('userImage', response.data.profileImageAddress);
            Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.id;

            this.$router.push('/');
          }
        }).catch(e => {
          this.errors.push(e);
        })
      },
      logout() {
        this.$session.destroy();
        this.isLogin = false;
        this.menu = false;
        this.LoginDialog = false;
        this.$router.push('/');
      },
      checkLogin() {
        if (this.$session.exists()) {
            this.isLogin = true
            this.userDetail = this.$session.getAll()
        } else {
            this.isLogin = false
        }
      }
    },
    beforeMount() {
      this.checkLogin()
    },
    created() {
    },
    beforeCreate() {

    },
    mounted() {
      this.currentUrl = window.location.pathname
      if (window.location.href == '/Login') {
        this.inLoginPage = true;
      } else {
        this.inLoginPage = false;
      }

    }
  }
</script>

<style scoped>
  @import "../assets/Styles/FontiranSans.css";

  .listTitle {
    font-size: 1.4rem;
    font-weight: 400;
    text-align: right;
    direction: rtl;
  }

  .title-text {
    color: #fd6702;
  }

  .toolbar_items ul {
    list-style: none;
    float: right;
    display: flex;
    padding: 15px 20px;
  }

  .toolbar_items li {
    padding: 0px 16px;
  }

  .toolbar_items li a {
    display: inline-block;
    text-decoration: none;
    color: #fff;
    position: relative;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    padding: 15px;
  }

  .toolbar_items li a:after {
    content: "";
    position: absolute;
    height: 2px;
    background-color: white;
    width: 0%;
    left: 50%;
    bottom: 0;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    -webkit-transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) all;
    transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) all;
  }

  .toolbar_items li a:hover:after {
    width: 100%;
  }

  .in_Login_Register {
    display: none;
  }
</style>
