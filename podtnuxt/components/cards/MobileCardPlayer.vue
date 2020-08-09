<template>
  <v-card class="fontMain" flat height="150px">
    <v-row style="direction: ltr;">
      <v-col cols="4" class="mr-0 pr-0 pt-2">
        <div v-if="item.podcastImage !== null">
          <v-img class="podcastImage ml-2" :src="item.podcastImage" height="100%" max-width="100%"
                 min-width="100%">
            <div style="cursor: pointer; width: 100%"
                 @click="playPageNavigation(item.podcastId)"></div>
          </v-img>
        </div>
      </v-col>
      <v-col cols="8" class="ml-0 pl-0">
        <div v-if="checkIsPersian(item.title) === false">
          <v-card-title class="episodeTitle pt-0 pb-2" style="direction: ltr;position: relative;"
                        @click="playPageNavigation(item.podcastId)">
                        <span v-if="item.title.length >50">
                            {{item.title.slice(0,50)}}...
                        </span>
            <span v-else>
                            {{item.title}}
                        </span>
          </v-card-title>
        </div>
        <div v-else>
          <v-card-title class="episodeTitle pt-0 pb-2" style="direction: rtl;"
                        @click="playPageNavigation(item.podcastId)">
                        <span v-if="item.title.length >50">
                            {{item.title.slice(0,50)}}...
                        </span>
            <span v-else>
                            {{item.title}}
                        </span>
          </v-card-title>
          <!--<v-card-subtitle style="float: left">-->
          <!--<span>{{durationConverter(item.duration)}} </span>-->
          <!--<v-icon class="pt-0 pr-0" size="20px">mdi-progress-clock</v-icon>-->
          <!--</v-card-subtitle>-->
        </div>
        <v-row class="episodePublisher pr-5 pt-0 mt-0" style="direction: rtl">
          <div v-if="item.profileImageAddress !== null">
            <v-avatar size="38">
              <v-img :src='item.profileImageAddress' @click="userPageNavigation(item.userId)">
              </v-img>
            </v-avatar>
          </div>
          <v-card-subtitle class="pt-0 mt-0 pr-2" link="/" style="font-size: 14px"
                           v-if="item.userTitle === null || item.userTitle === ''"
                           :aria-label="item.username" :title="item.username"
                           @click="userPageNavigation(item.userId)">
                                <span v-if="item.username.length > 25">
                                {{item.username.slice(0,25)}}...
                                </span>
            <span v-else>
                                {{item.username}}
                                </span>
            <br/>
            <span> {{item.viewCount}} بازدید</span>
          </v-card-subtitle>
          <v-card-subtitle class="pt-0 mt-0 pr-2" style="font-size: 14px"
                           v-else
                           :aria-label="item.userTitle" :title="item.userTitle"
                           @click="userPageNavigation(item.userId)">
                                <span v-if="item.userTitle.length > 25">
                                {{item.userTitle.slice(0,25)}}...
                                </span>
            <span v-else>
                                {{item.userTitle}}
                                </span>
            <br/>
            <span> {{item.viewCount}} بازدید</span>
          </v-card-subtitle>
        </v-row>
        <v-row class="episodeControls ml-0 pl-5 mr-0 pl-0">
          <!--Play Button-->
          <div class="hidden-md-only hidden-md-and-down hidden-sm-and-down"
               v-show="$vuetify.breakpoint.mdAndUp">
            <PCModePlayerButton :item="item"/>
          </div>
          <div class="hidden-sm-only hidden-xs-only"
               v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
            <PCModePlayerButton :item="item"/>
          </div>
          <div v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
            <MobileModePlayerButton :item="item"/>
          </div>
          <!--Listen Later-->
          <div style="bottom: 8px;position: relative" class="pl-2">
            <div v-if="isListenLater === false">
              <v-btn fab small text @click="listenLaterAction(item.podcastId)">
                <v-icon dark>mdi-clock-time-three-outline</v-icon>
              </v-btn>
            </div>
            <div v-else>
              <v-btn fab small text @click="deleteListenLaterAction(item.podcastId)">
                <v-icon dark>mdi-check</v-icon>
              </v-btn>
            </div>
          </div>
          <!--Add Queue-->
          <div style="bottom: 8px;position: relative" class="pl-2">
            <div v-if="isQueue === false">
              <v-btn fab small text disabled>
                <v-icon dark>mdi-playlist-plus</v-icon>
              </v-btn>
            </div>
            <div v-else>
              <v-btn fab small text @click="isQueue = false">
                <v-icon dark>mdi-playlist-check</v-icon>
              </v-btn>
            </div>
          </div>
        </v-row>
        <LoginDialog :dialog="loginDialog" :message="loginDialogMessage"/>
        <Snackbar :snackbar="snackbarDialog" :snackbar-text="snackbarDialogMessage"/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import LoginDialog from "../tools/LoginDialog";
  import Snackbar from "../tools/Snackbar";
  import axios from 'axios';
  import MobileModePlayerButton from "../buttons/MobileModePlayerButton";
  import PCModePlayerButton from "../buttons/PCModePlayerButton";

  export default {
    name: "MobileCardPlayer",
    components: {PCModePlayerButton, MobileModePlayerButton, Snackbar, LoginDialog},
    props: {
      'item': {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isQueue: false,
        isListenLater: false,
        loginDialog: false,
        loginDialogMessage: '',
        snackbarDialog: false,
        snackbarDialogMessage: '',
      }
    },
    methods: {
      checkIsPersian(s) {
        let PersianOrASCII = /[آ-ی]|([a-zA-Z])/;
        let m;
        if ((m = s.match(PersianOrASCII)) !== null) {
          if (m[1]) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      },
      listenLaterAction(podcastId) {
        if (this.$store.getters.userLogin === false) {
          this.loginDialog = true;
          this.loginDialogMessage = 'شما برای اضافه کردن به لیست بعد گوش میدم هاتون باید در سایت ورود کنید'
        } else {
          axios.post('http://localhost:8084/api/podcast/listenLater', {
            first: podcastId,
            second: this.$store.state.user[0].userId
          }).then(response => {
            if (response.status === 200) {
              if (response.data.message === 'SUCCESSFUL') {
                this.snackbarDialog = true;
                this.isListenLater = true;
                this.snackbarDialogMessage = 'اپیزود به لیست اضافه شد';
              } else {
                this.snackbarDialog = true;
                this.isListenLater = false;
                this.snackbarDialogMessage = 'مشکلی پیش آمده باز تلاش کنید';
              }
            } else {
              this.snackbarDialog = true;
              this.isListenLater = false;
              this.snackbarDialogMessage = 'مشکلی در ارتباط رخ داده است';
            }
          });
        }
      },
      deleteListenLaterAction(podcastId) {
        axios.delete('http://localhost:8084/api/podcast/listenLater/delete', {
          data: {
            first: this.$store.state.user[0].userId,
            second: podcastId
          }
        }).then(response => {
          if (response.status === 200) {
            if (response.data.message === 'SUCCESSFUL') {
              this.snackbarDialog = true;
              this.isListenLater = false;
              this.snackbarDialogMessage = 'اپیزود از لیست حذف شد';
            } else {
              this.snackbarDialog = true;
              this.isListenLater = true;
              this.snackbarDialogMessage = 'مشکلی پیش آمده باز تلاش کنید';
            }
          } else {
            this.snackbarDialog = true;
            this.isListenLater = true;
            this.snackbarDialogMessage = 'مشکلی در ارتباط رخ داده است';
          }
        });
      },
      playPageNavigation(id) {
        this.$router.push('/play/' + id);
      },
      userPageNavigation(id) {
        this.$router.push('/publisher/' + id);
      },
    },
    created() {

    },
    mounted() {
      if (window.location.pathname === '/listenLater') {
        this.isListenLater = true;
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/Styles/MobilePlayCardStyle.css";
  @import "../../assets/Styles/FontiranSans.css";
</style>
