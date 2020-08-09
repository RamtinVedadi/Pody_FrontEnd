<template>
  <div class="fontMain" style="width: 100%;">
    <v-card flat height="90px">
      <v-row style="width: 100%;direction: ltr;">
        <v-col cols="1" class="pt-0 pl-0 pr-0 mr-0 ml-0" style="min-width: 90px; max-width: 90px;width: 90px;">
          <div v-for="(podcast,index) in allPodcast" :key="index" style="min-width: 90px; max-width: 90px;">
            <v-img v-bind:src=podcast.podcastImage @click="playPageNavigation(podcast.podcastId)"
                   height="90px" min-width="90px" max-width="90px" class="cursor"></v-img>
          </div>
        </v-col>
        <v-col cols="2" class="pl-0 pr-0 ml-0">
          <v-list>
            <v-list-item>
              <v-list-item-content class="pl-0 ml-0 pt-2">
                <div v-for="(podcast,index) in allPodcast" :key="index">
                  <marquee id="podcastTitle" scrollamount="5" behavior="circle">
                    <v-list-item-title class="pb-2 cursor"
                                       @click="playPageNavigation(podcast.podcastId)">
                      {{podcast.podcastTitle}}
                    </v-list-item-title>
                  </marquee>
                  <v-list-item-subtitle class="cursor"
                                        @click="userPageNavigation(podcast.userId)">
                    {{podcast.podcastChannel}}
                  </v-list-item-subtitle>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="1">
          <v-row class="justify-start align-center" v-if="isLike === false">
            <v-btn :hidden="!this.loaded" class="justify-end justify-center" fab width="30px"
                   @click="likeFunction" height="30px">
              <v-icon size="20" color="primary">mdi-heart-outline</v-icon>
            </v-btn>
          </v-row>
          <v-row v-else>
            <v-btn :hidden="!this.loaded" class="justify-end justify-center" fab width="30px"
                   height="30px" @click="disLikeFunction">
              <v-icon size="20" color="primary">mdi-heart</v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <!--Episode Controls-->
        <v-col cols="6" class="pl-0 pt-4 pr-0">
          <v-list>
            <v-list-item>
              <v-list-item-icon class="ml-0 mt-3">
                <v-btn :disabled="!this.loaded" icon @click="audioRewind">
                  <v-icon>mdi-rewind-10</v-icon>
                </v-btn>
              </v-list-item-icon>
              <v-list-item-icon class="mt-3">
                <div v-if="podcastIsPlaying == false">
                  <v-btn icon :disabled="!this.loaded" @click="playPodcast">
                    <v-icon color="#fd6702">
                      mdi-play
                    </v-icon>
                  </v-btn>
                </div>
                <div v-else-if="podcastIsPlaying == true">
                  <div v-if="loadingAudio === false ">
                    <v-btn icon>
                      <v-progress-circular
                        :disabled="!this.loaded"
                        :size="20"
                        :width="2"
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn icon @click="pausePodcast" @keydown.space="pausePodcast">
                      <v-icon color="#fd6702">mdi-pause</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-list-item-icon>
              <v-list-item-icon class="mt-3">
                <v-btn icon :disabled="!this.loaded" @click="audioForward">
                  <v-icon>mdi-fast-forward-30</v-icon>
                </v-btn>
              </v-list-item-icon>
              <v-list-item-content>
                <div style="width: 80%" class="pl-2 pr-2">
                  <vue-slider
                    :disabled="!this.loaded"
                    v-model="percentage"
                    :process-style="{ backgroundColor: '#fe731b' }"
                    :process="true"
                    :drag-on-click="true"
                    tooltip="none"
                    @click.native="setPosition()"
                  ></vue-slider>
                </div>
                <v-list-item-subtitle style="align-items: center;text-align: center">
                  <div class="justify-center">
                    {{this.currentHou}}:{{this.currentMin}}:{{this.currentSec}}/{{this.durationHou}}:{{this.durationMin}}:{{this.durationSec}}
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <!--Volume Control-->
        <v-col cols="2" class="pr-0 pl-0" style="direction: ltr">
          <v-list style="height: 78px;">
            <v-list-item>
              <v-list-item-content>
                <v-slider
                  v-model="podcastVolume"
                  append-icon="mdi-volume-low"
                  prepend-icon="mdi-volume-high"
                  :min="min"
                  :max="max"
                  v-on:change="changeVolume"
                  track-color="#ffa266"
                  always-dirty
                ></v-slider>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
    <LoginDialog :dialog="loginDialogAction" :message="loginDialogMessage"/>
  </div>
</template>

<script>
  import 'vue-slider-component/theme/default.css';
  import axios from 'axios';
  import LoginDialog from "../tools/LoginDialog";
  import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
  import 'vue-slider-component/dist-css/vue-slider-component.css'

  let audio;
  let podcastFile;
  let myInterval;
  let countSec = 0;
  let addViewInt;
  export default {
    name: "Player",
    components: {LoginDialog, VueSlider},
    props: [
      'isPlaying',
    ],
    data() {
      return {
        PlayerBar: true,
        firstPlay: true,
        isMuted: false,
        loaded: false,
        playing: false,
        paused: false,
        isLike: false,
        podcastVolume: 100,
        min: 0,
        max: 100,
        percentage: 0,
        currentTime: 0,
        durationSec: "00",
        durationMin: "00",
        durationHou: "00",
        currentMin: "00",
        currentSec: "00",
        currentHou: "00",
        currentPodcastFile: "",
        podcastDuration: 0,
        loadingAudio: false,
        podcastIsPlaying: this.$store.state.isPlaying.podcast,
        items: [
          {icon: 'mdi-view-dashboard'},
          {icon: 'mdi-image'},
          {icon: 'mdi-help-box'},
          {icon: 'mdi-heart-outline'},
          {icon: 'mdi-heart'},
        ],
        viewed: false,
        loginDialogAction: false,
        loginDialogMessage: '',
        PodcastID: '',
        USERID: '',
        nothing:false,

      }
    },
    methods: {
      playPageNavigation(id) {
        this.$router.push('/play/' + id);
      },
      userPageNavigation(id) {
        this.$router.push('/publisher/' + id);
      },
      getPodcastFile() {
        if (!this.loaded) {
          this.$store.state.podcast.forEach(pod => {
            podcastFile = pod.podcastFile;
            this.currentPodcastFile = pod.podcastFile;
            audio = null;
            audio = new Audio(podcastFile);
            // audio.play();
            this.playPodcast();
            this.loaded = true;
            this.podcastDuration = audio.duration;
            this.currentPodcastFile = pod.podcastFile;
          });
        } else {
          audio.play();
        }
        this.podcastIsPlaying = true;
        this.changePosition();
        this.checkPodcastFile();
      },
      marqueeMouseOver() {
        document.getElementById("podcastTitle").setAttribute("scrollamount", '5');
      },
      marqueeMouseOut() {
        document.getElementById("podcastTitle").setAttribute("scrollamount", '0');
      },
      playPodcast() {
        audio.play();
        this.podcastIsPlaying = true;
        if (this.$store.getters.userLogin === true) {
          this.checkIsLike();
        }
        this.addView();
        // this.addViewInterval();
      },
      pausePodcast() {
        audio.pause();
        this.loadingAudio = false;
        this.podcastIsPlaying = false;
      },
      audioForward() {
        if ((audio.currentTime + 30) < audio.duration) {
          audio.currentTime += 30;
        }
      },
      audioRewind() {
        if (this.currentSec >= 10) {
          audio.currentTime -= 10;
        }

      },
      changeVolume() {
        if (this.loaded) {
          audio.volume = this.podcastVolume / 100;
        }else {
          return false
        }
      },
      setPosition() {
        let newPerc = this.percentage;
        audio.currentTime = (audio.duration / 100) * newPerc;

      },
      changePosition() {
        setInterval(this.moveSlider, 1000);
      },
      moveSlider() {
        if (audio.duration !== '00:00:00' || audio.currentTime !== '00:00:00') {
          this.loadingAudio = true;
        }
        this.percentage = Math.round((audio.currentTime / audio.duration) * 100);
        let zero = "0";
        let hou = Math.floor(audio.currentTime / 3600);
        let min = Math.floor((audio.currentTime - hou * 3600) / 60);
        let sec = Math.floor(audio.currentTime % 60);

        if (sec < 10) {
          this.currentSec = zero.concat(sec.toString())
        } else {
          this.currentSec = sec;
        }

        if (min < 10) {
          this.currentMin = "0".concat(min.toString());
        } else if (min > 59) {
          min = min - 60;
          this.currentMin = "0".concat(min.toString());
        } else {
          this.currentMin = min;
        }

        if (hou < 10) {
          this.currentHou = "0".concat(hou.toString())
        } else {
          this.currentMin = hou;
        }

        let Ahou = Math.floor(audio.duration / 3600);
        let Amin = Math.floor((audio.duration - Ahou * 3600) / 60);
        let Asec = Math.floor(audio.duration % 60);

        if (Asec < 10 && !NaN) {
          this.durationSec = "0".concat(Asec.toString())
        } else if (Asec > 9) {
          this.durationSec = Asec;
        } else if (Asec == "NaN") {
          this.durationSec = "00";
        }

        if (Amin < 10 && !NaN) {
          this.durationMin = "0".concat(Amin.toString())
        } else if (Amin > 9) {
          this.durationMin = Amin;
        } else if (Amin == "NaN") {
          this.durationSec = "00";
        }

        if (Ahou < 10 && !NaN) {
          this.durationHou = "0".concat(Ahou.toString())
        } else if (Ahou > 9) {
          this.durationHou = Ahou;
        } else if (Ahou == "NaN") {
          this.durationSec = "00";
        }

        if (this.percentage == 100) {
          audio.currentTime = 0;
          audio.pause();
          this.podcastIsPlaying = false;
        }
      },
      checkPodcastFile() {
        setInterval(this.checkPodcastAddress, 1000);
      },
      checkPodcastAddress() {
        this.PodcastID = this.$store.state.podcast[0].podcastId;
        this.USERID = this.$store.state.user[0].userId;
        this.$store.state.podcast.forEach(pod => {
          if (this.currentPodcastFile == pod.podcastFile) {
            this.nothing = true;
          } else {
            audio.pause();
            this.loaded = false;
            this.loadingAudio = false;
            this.checkPodcastIs();
            clearInterval(this.checkPodcastFile);
          }
        })
      },
      checkPodcastInterval() {
        myInterval = setInterval(this.checkPodcastIs, 1000)
      },
      checkPodcastIs() {
        this.$store.state.podcast.forEach(pod => {
          if (pod.podcastFile === "") {
            this.podcastIsPlaying = false;
            this.loadingAudio = false;
          } else {
            if (!this.loaded) {
              podcastFile = pod.podcastFile;
              this.currentPodcastFile = pod.podcastFile;
              audio = null;
              audio = new Audio(podcastFile);
              // audio.play();
              this.playPodcast();
              if (this.$store.getters.userLogin === true) {
                this.checkIsLike();
              }
              this.changePosition();
              this.checkPodcastFile();
              this.loaded = true;
              this.podcastIsPlaying = true;
              this.podcastDuration = audio.duration;
              this.currentPodcastFile = pod.podcastFile;
              clearInterval(myInterval)
            } else {
              this.loadingAudio = false;
              audio.play();
            }
          }
          // this.podcastIsPlaying = true;

        })
      },
      addViewInterval() {
        addViewInt = setInterval(this.addView, 1000);
      },
      addView() {
        if (this.$store.getters.userLogin === false) {
          axios.post("http://localhost:8084/api/podcast/view", {
            first: this.$store.state.podcast[0].podcastId,
            second: null
          }).then(
            response => {
              if (response.data.message !== 'SUCCESSFUL') {
                countSec = 0;
                this.viewed = false;
              }
            }
          );
        } else {
          axios.post("http://localhost:8084/api/podcast/view", {
            first: this.$store.state.podcast[0].podcastId,
            second: this.$store.state.user[0].userId
          }).then(
            response => {
              if (response.data.message !== 'SUCCESSFUL') {
                countSec = 0;
                this.viewed = false;
              }
            }
          );
        }
      },
      likeFunction() {
        if (this.$store.getters.userLogin === false) {
          this.loginDialogAction = true;
          this.loginDialogMessage = 'برای لایک کردن این اپیزود باید در سایت ورود کرده باشید';
          setInterval(() => {
            this.loginDialogAction = false;
          }, 4000)
        } else {
          axios.post("http://localhost:8084/api/podcast/like", {
            first: this.$store.state.podcast[0].podcastId,
            second: this.$store.state.user[0].userId
          }).then(response => {
            if (response.data.message === 'SUCCESSFUL') {
              this.isLike = true;
              console.log(response.data.message + " :LIKED")

            }
          });
        }
      },
      disLikeFunction() {
        axios.post("http://localhost:8084/api/podcast/dislike", {
          first: this.$store.state.podcast[0].podcastId,
          second: this.$store.state.user[0].userId
        }).then(response => {
          if (response.data.message === 'SUCCESSFUL') {
            this.isLike = false;
          }
        });
      },
      checkIsLike() {
        axios.post("http://localhost:8084/api/podcast/like/check", {
          first: this.$store.state.podcast[0].podcastId,
          second: this.$store.state.user[0].userId,
        }).then(response => {
          if (response.data.message === 'TRUE') {
            this.isLike = true;
          } else {
            this.isLike = false;
          }
        });
      }
    },
    computed: {
      allPodcast() {
        return this.$store.getters.allPodcast;
      },
      isPlayingPodcast() {
        return this.$store.getters.podcastIsPlaying;
      },
    },
    mounted() {
      this.isLike = false;
      this.checkPodcastInterval();

    },
  }
</script>

<style scoped>
  @import "../../assets/Styles/FontiranSans.css";
  @import "../../assets/Styles/GlobalPurposeStyle.css";
</style>
