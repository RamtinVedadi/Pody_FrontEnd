<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <nav class="fontMain" style="z-index: 5">
    <v-app-bar class="hidden-xs-only hidden-sm-only" app color="primary" light flat>
      <router-link to="/">
        <v-img src="http://pody.ir/defaultImages/pody/12.png" width="72" height="72" max-width="72" max-height="72">
        </v-img>
      </router-link>

      <div class="align-center d-flex">
        <router-link to="/">
          <v-img src="http://pody.ir/defaultImages/pody/PODYYY1.png" max-width="80px" max-height="56px">
          </v-img>
        </router-link>

        <div class="hidden-sm-and-down">
          <div class="toolbar_items">
            <ul>
              <li>
                <router-link to="/category"> دسته بندی های پادی</router-link>
              </li>
              <li>
                <router-link to="/Channels"> ناشران پادی</router-link>
              </li>
              <li>
                <router-link to="/blog">پادی بلاگ</router-link>
              </li>
            </ul>
          </div>
        </div>
        <v-form v-on:submit.prevent="searchFunction">
          <v-text-field v-show="$vuetify.breakpoint.mdAndUp" v-if="this.$route.path !=='/search'"
                        solo flat hide-details autofocus rounded clearable
                        background-color="white" color="primary" label="جستجو"
                        prepend-inner-icon="mdi-magnify" v-model="searchTerm"
                        style="width:450px" class="hidden-sm-and-down hidden-md-and-down"
          >
          </v-text-field>
        </v-form>
      </div>
      <v-spacer>

      </v-spacer>
      <!-- Make Login Button -->
      <div>
        <div v-if="isLogin === true">
          <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{on}">
              <v-btn text v-on="on">
                <v-avatar size="36">
                  <img :src="userDetail.userImage">

                </v-avatar>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img :src="userDetail.userImage">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{userDetail.name}}</v-list-item-title>
                    <v-list-item-subtitle
                      v-if="userDetail.userTitle === null || userDetail.userTitle=== ''">
                      {{userDetail.username}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-else>{{userDetail.userTitle}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <template>
                      <v-row justify="center">
                        <v-btn text @click="buttonRedirect('/user')">
                          <v-icon style="color: #606060">mdi-account-edit-outline
                          </v-icon>
                        </v-btn>
                      </v-row>
                    </template>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-item disabled>
                  <v-list-item-action>
                    <v-switch v-model="Message" color="purple">

                    </v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Dark Mode</v-list-item-title>
                </v-list-item>

                <v-list-item-group>
                  <v-list-item v-for="item in userNavigation" :key="item.id"
                               :disabled="item.disable"
                               @click="buttonRedirect( item.url)">
                    <v-list-item-icon class="pr-4">
                      <v-icon :disabled="item.disable" v-text="item.icon" style="color: #606060">
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title" class="listTitle">
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>

                <v-list-item-group>
                  <v-list-item v-for="item in disableds" :key="item.id"
                               @click="buttonRedirect( item.url)" disabled>
                    <v-list-item-icon class="pr-4">
                      <v-icon v-text="item.icon" style="color: #606060" disabled></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title"
                                         class="listTitle"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>

                <v-list-item-group>
                  <v-list-item disabled>
                    <v-list-item-icon class="pr-4">
                      <v-icon style="color: #606060" disabled>mdi-cog</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="listTitle">تنظیمات</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-card-actions>
                <v-btn rounded outlined style="width: 98%; align-items: center;color:#fe731b"
                       @click="logout">
                  خروج
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
        <div v-else>
          <div v-if="!isInLoginPage">
            <v-btn x-large outlined dark height="35px"
                   @click="buttonRedirect('/Login')">
              <span>ورود</span>
              <span>/</span>
              <span>ثبت نام</span>
            </v-btn>
          </div>
        </div>
      </div>
    </v-app-bar>

    <v-app-bar app color="primary" light flat
               v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <router-link to="/">
        <v-img src="http://pody.ir/defaultImages/pody/12.png" max-width="72px" max-height="72px">
        </v-img>
      </router-link>

      <div class="align-center d-flex">
        <router-link to="/">
          <v-img src="http://pody.ir/defaultImages/pody/PODYYY1.png" max-width="80px" max-height="56px">
          </v-img>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <!-- Make Login Button -->
      <div>
        <div v-if="isLogin === true">
          <v-menu v-model="mobileMenu" :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{on}">
              <v-btn text v-on="on">
                <v-avatar size="36">
                  <img :src="userDetail.userImage">
                </v-avatar>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img :src="userDetail.userImage">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{userDetail.name}}</v-list-item-title>
                    <v-list-item-subtitle
                      v-if="userDetail.userTitle === null || userDetail.userTitle=== ''">
                      {{userDetail.username}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-else>{{userDetail.userTitle}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <template>
                      <v-row justify="center">
                        <v-btn text @click="buttonRedirect('/user')">
                          <v-icon style="color: #606060">mdi-account-edit-outline
                          </v-icon>
                        </v-btn>
                      </v-row>
                    </template>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
              <v-divider>

              </v-divider>
              <v-list>
                <v-list-item disabled>
                  <v-list-item-action>
                    <v-switch v-model="Message" color="purple">

                    </v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Dark Mode</v-list-item-title>
                </v-list-item>

                <v-list-item-group>
                  <v-list-item v-for="item in userNavigation" :key="item.id"
                               :disabled="item.disable"
                               @click="buttonRedirect( item.url)">
                    <v-list-item-icon class="pr-4">
                      <v-icon :disabled="item.disable" v-text="item.icon" style="color: #606060">
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title" class="listTitle">
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>

                <v-list-item-group>
                  <v-list-item v-for="item in disableds" :key="item.id"
                               @click="buttonRedirect( item.url)" disabled>
                    <v-list-item-icon class="pr-4">
                      <v-icon v-text="item.icon" style="color: #606060" disabled></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title"
                                         class="listTitle"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>

                <v-list-item-group>
                  <v-list-item disabled>
                    <v-list-item-icon class="pr-4">
                      <v-icon style="color: #606060" disabled>mdi-cog</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="listTitle">تنظیمات</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-card-actions>
                <v-btn rounded outlined style="width: 98%; align-items: center;color:#fe731b"
                       @click="logout">
                  خروج
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
        <div v-else>
          <div v-if="!isInLoginPage">
            <v-btn class="loginBtn" v-show="$vuetify.breakpoint.mdAndUp"
                   x-large
                   outlined
                   dark
                   height="35px"
                   @click="buttonRedirect('/Login')"
            >
              <span class="loginBtn">ورود</span>
              <span>/</span>
              <span class="loginBtn">ثبت نام</span>
            </v-btn>
            <v-btn v-show="$vuetify.breakpoint.mdAndDown"
                   large
                   outlined
                   dark
                   height="25px"
                   @click="buttonRedirect('/Login')"
            >
              <span>ورود</span>
              <span>/</span>
              <span>ثبت نام</span>
            </v-btn>
          </div>
          <div v-else></div>
        </div>
      </div>
    </v-app-bar>
  </nav>
</template>

<script>
  import $ from "jquery";

  export default {
    name: "Navbar",
    async asyncData(context){
      return {
        // currentUrl : context.route.params
      }
    },
    data: () => {
      return {
        menu: false,
        mobileMenu: false,
        isLogin: null,
        searchTerm: '',
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
        EmailLoginUser: '',
        PasswordLoginUser: '',
        userNavigation: [
          {
            id: 1,
            icon: 'mdi-upload',
            title: 'آپلود پادکست',
            url: '/upload/podcast',
            disable: true
          },
          {
            id: 2,
            icon: 'mdi-message-processing',
            title: 'آپلود پست',
            url: '/upload/post',
            disable: true
          },
          {
            id: 3,
            icon: 'mdi-post-outline',
            title: 'آپلود بلاگ',
            url: '/upload/blog',
            disable: true
          },
          {
            id: 4,
            icon: 'mdi-music-box-multiple',
            title: 'پادکست‎‌های من',
            url: '/myPodcasts',
            disable: false
          },
          {
            id: 5,
            icon: 'mdi-clock ',
            title: 'بعدا گوش میدم',
            url: '/listenLater',
            disable: false
          },
          {
            id: 6,
            icon: 'mdi-thumb-up',
            title: 'پسندیده های من',
            url: '/myLikes',
            disable: false
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
          id: 6,
          icon: 'mdi-align-horizontal-left',
          title: 'آمار های من',
          url: '/myStatistics'
        },],
        userDetail: null,
        userEdit: false,
        currentUrl: "",
        loginUrl: '/Login',
        registerUrl: '/register',
      };
    },
    computed: {
      isInLoginPage() {
        if (this.$route.path === "/Login") {
          // window.location.pathname === '/Login'
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
      submit() {
        this.$v.form.$touch();
        // if its still pending or an error is returned do not submit
        if (this.$v.form.$pending || this.$v.form.$error) return;
        // to form submit after this
        alert("Form submitted");
      },
      buttonRedirect(url) {
        if (url === '/upload/podcast') {
          this.$router.push('/upload/podcast');
        }
        if (url === '/upload/post') {
          this.$router.push('/upload/post');
        }
        if (url === '/upload/blog') {
          this.$router.push('/upload/blog');
        }
        if (url === '/myPodcasts') {
          this.$router.push('/myPodcasts');
        }
        if (url === '/myLikes') {
          this.$router.push('/myLikes');
        }
        if (url === '/listenLater') {
          this.$router.push('/listenLater');
        }
        if (url === '/user') {
          this.$router.push('/user');
        }
        if (url === '/Login') {
          window.location.href = '/Login';
        }
      },
      logout() {
        this.$session.destroy();
        this.isLogin = false;
        this.menu = false;
        this.LoginDialog = false;
        let routeData = this.$router.resolve({name: 'صفحه اصلی', path: "/"});
        window.open(routeData.href, "_self");

      },
      checkLogin() {
        if (this.$session.exists()) {
          this.isLogin = true;
          this.$store.state.loginState = true;
          this.userDetail = this.$session.getAll()
        } else {
          this.isLogin = false;
          this.$store.state.loginState = false;
        }
      },
      searchFunction() {
        if (this.searchTerm != null || this.searchTerm !== '') {
          this.$router.push('/search/' + this.searchTerm);
        }
      }
    },
    beforeMount() {

    },
    beforeCreate() {

    },
    updated() {
      if (this.currentUrl !== this.loginUrl || this.currentUrl !== this.registerUrl) {
        // document.getElementById('loginBtn').style.display = "none";
        $(".loginBtn").hide();
      }
    },
    mounted() {
      this.currentUrl = window.location.pathname;
      this.checkLogin();
    },
  };
</script>

<style scoped>
  @import "../assets/Styles/FontiranSans.css";

  .listTitle {
    font-size: 1.0rem;
    font-weight: 400;
    text-align: right;
    direction: rtl;
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
</style>
