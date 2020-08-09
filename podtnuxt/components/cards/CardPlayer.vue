<template>
  <div>
    <v-card shaped class="mx-3" max-width="250px" height="420px" elevation="10">
      <div v-if="item.podcastImage !== null">
        <v-img class="pi" v-if="item !== null" :src="item.podcastImage" height="250px" :alt="item.title"
               :title="item.title">
          <div style="width: 250px;height:250px;cursor: pointer;"
               @click="playPageNavigation(item.podcastId)"></div>
          <div class="episode" v-if="item.episodeNumber != null">
            <div class="pr-6 pt-0">
              <span v-if="item.seasonNumber != null" style="float: right;"> فصل : {{item.seasonNumber}}</span>
              <span class="pl-6" style="float: left;"
                    v-if="item.seasonNumber != null"> قسمت : {{item.episodeNumber}}</span>
              <span class="pl-6" style="float: right;"
                    v-else> قسمت : {{item.episodeNumber}}</span>
            </div>
          </div>
        </v-img>
      </div>
      <div v-if="checkIsPersian(item.title) === false">
        <v-card-title class="vCardTitle pt-2 pb-4" style="direction: ltr;position: relative;"
                      @click="playPageNavigation(item.podcastId)">

          <h2 v-if="item.title.length >titleCount" :aria-label="item.title"
              :title="item.title">
            {{item.title.slice(0,titleCount)}}...
          </h2>

          <h2 v-else>{{item.title}}</h2>
        </v-card-title>
        <v-card-subtitle style="float: left">
          <span>{{durationConverter(item.duration)}} </span>
          <v-icon class="pt-0 pr-0" size="20px">mdi-progress-clock</v-icon>
        </v-card-subtitle>
      </div>
      <div v-else>
        <v-card-title class="vCardTitle pt-2 pb-4" style="direction: rtl;"
                      @click="playPageNavigation(item.podcastId)">
          <h2 v-if="item.title.length >titleCount" :aria-label="item.title" :title="item.title">
            {{item.title.slice(0,titleCount)}}...
          </h2>
          <h2 v-else>{{item.title}}</h2>
        </v-card-title>
        <v-card-subtitle style="float: left">
          <span>{{durationConverter(item.duration)}} </span>
          <v-icon class="pt-0 pr-0" size="20px">mdi-progress-clock</v-icon>
        </v-card-subtitle>
        <br>
      </div>

      <v-row class="pr-5 episodePublisherData">
        <v-avatar size="38" style="top:10px">
          <div v-if="item.profileImageAddress !== null">
            <v-img :src='item.profileImageAddress' @click="userPageNavigation(item.userId)"
                   :alt="item.userTitle">
            </v-img>
          </div>
        </v-avatar>
        <v-card-subtitle class="pt-2 pr-2" link="/" style="font-size: 15px"
                         v-if="item.userTitle === null || item.userTitle === ''"
                         :aria-label="item.username" :title="item.username"
                         @click="userPageNavigation(item.userId)">
                                <span v-if="item.username.length > 20">
                                {{item.username.slice(0,20)}}...
                                </span>
          <span v-else>
                                {{item.username}}
                                </span>
          <br/>
          <span rel="nofollow"> {{item.viewCount}} بازدید</span>
        </v-card-subtitle>
        <v-card-subtitle class="pt-2 pr-2" link="/" style="font-size: 15px"
                         v-else
                         :aria-label="item.userTitle" :title="item.userTitle"
                         @click="userPageNavigation(item.userId)">
                                <span v-if="item.userTitle.length > 20">
                                {{item.userTitle.slice(0,20)}}...
                                </span>
          <span v-else>
                                {{item.userTitle}}
                                </span>
          <br/>
          <span rel="nofollow"> {{item.viewCount}} بازدید</span>
        </v-card-subtitle>
      </v-row>

      <v-row class="episodeControlBar">
        <v-btn rounded style="bottom: 8px;right: 15px;" text height="55px" width="28px"
               @click="playPodcast(item.title,item.userTitle,item.username,item.podcastImage,item.audioAddress,item.podcastId, item.userId)">
          <v-icon color="primary" size="55px">
            {{icons[0].name}}
          </v-icon>
        </v-btn>

        <v-btn rel="nofollow" outlined rounded style="bottom: -3px;right: 30px" width="55% " color="primary"
               v-if="episodeListenLater === false" @click="listenLaterAction(item.podcastId)">
          بعدا گوش میدم
        </v-btn>

        <v-btn rel="nofollow" rounded style="bottom: -3px;right: 30px" width="55% " color="primary"
               v-else @click="deleteListenLaterAction(item.podcastId)">
          <v-icon dark>mdi-check</v-icon>
          بعدا گوش میدم
        </v-btn>
      </v-row>
    </v-card>
    <LoginDialog :dialog="episodeDialogLogin" :message="episodeDialogLoginMessage"/>
    <Snackbar :snackbar="episodeSnackbar" :snackbar-text="episodeSnackbarMessage"/>
  </div>
</template>

<script>
  import LoginDialog from "../tools/LoginDialog";
  import Snackbar from "../tools/Snackbar";
  import axios from 'axios';

  export default {
    name: "CardPlayer",
    components: {Snackbar, LoginDialog},
    props: {
      'item': {
        type: Object,
        required: true,
      },
      'titleCount': {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        episodeListenLater: false,
        episodeDialogLogin: false,
        episodeDialogLoginMessage: '',
        episodeSnackbar: false,
        episodeSnackbarMessage: '',
        icons: [
          {
            name: "mdi-play-circle"
          },
        ],
      }
    },
    methods: {
      checkIsPersian(s) {
        var PersianOrASCII = /[آ-ی]|([a-zA-Z])/;
        var m;
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
      durationConverter(seconds) {
        if (seconds === null) {
          return false
        } else {
          if (seconds.includes(':')) {
            return seconds;
          } else {
            return new Date(seconds * 1000).toISOString().substr(11, 8);
          }
        }

      },
      listenLaterAction(podcastId) {
        if (this.$store.getters.userLogin === false) {
          console.log(this.$store.getters.userLogin + " is not Login")
          this.episodeDialogLogin = true;
          this.episodeDialogLoginMessage = 'شما برای اضافه کردن به لیست بعد گوش میدم هاتون باید در سایت ورود کنید'
        } else {
          console.log(this.$store.getters.userLogin + " is Login")
          console.log(this.$store.state.user[0].userId + "  ID")
          axios.post('http://localhost:8084/api/podcast/listenLater', {
            first: podcastId,
            second: this.$store.state.user[0].userId
          }).then(response => {
            if (response.status === 200) {
              if (response.data.message === 'SUCCESSFUL') {
                this.episodeSnackbar = true;
                this.episodeListenLater = true;
                this.episodeSnackbarMessage = 'اپیزود به لیست اضافه شد';
              } else {
                this.episodeSnackbar = true;
                this.episodeListenLater = false;
                this.episodeSnackbarMessage = 'مشکلی پیش آمده باز تلاش کنید';
              }
            } else {
              this.episodeSnackbar = true;
              this.episodeListenLater = false;
              this.episodeSnackbarMessage = 'مشکلی در ارتباط رخ داده است';
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
              this.episodeSnackbar = true;
              this.episodeListenLater = false;
              this.episodeSnackbarMessage = 'اپیزود از لیست حذف شد';
            } else {
              this.episodeSnackbar = true;
              this.episodeListenLater = true;
              this.episodeSnackbarMessage = 'مشکلی پیش آمده باز تلاش کنید';
            }
          } else {
            this.episodeSnackbar = true;
            this.episodeListenLater = true;
            this.episodeSnackbarMessage = 'مشکلی در ارتباط رخ داده است';
          }
        });
      },
      playPageNavigation(id) {
        this.$router.push('/play/' + id);
      },
      userPageNavigation(id) {
        this.$router.push('/publisher/' + id);
      },
      playPodcast(title, userTitle, username, podcastImage, audioAddress, podcastId, userId) {
        this.$store.state.podcast.forEach(pod => {
          pod.podcastTitle = null;
          pod.podcastTitle = title;
        });
        this.$store.state.podcast.forEach(pod => {
          pod.podcastChannel = null;
          if (userTitle == null || userTitle === '') {
            pod.podcastChannel = username;
          } else {
            pod.podcastChannel = userTitle;
          }
        });
        this.$store.state.podcast.forEach(pod => {
          pod.podcastImage = null;
          pod.podcastImage = podcastImage;

        });
        this.$store.state.podcast.forEach(pod => {
          pod.podcastFile = null;
          pod.podcastFile = audioAddress;
        });
        this.$store.state.podcast.forEach(pod => {
          pod.podcastId = null;
          pod.podcastId = podcastId;
        });
        this.$store.state.podcast.forEach(pod => {
          pod.userId = null;
          pod.userId = userId;
        });
      },
    },
    created() {
      if (this.$route.pathname === '/listenLater') {
        this.episodeListenLater = true;
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/Styles/PlayCardStyle.css";
</style>
