<template>
    <div class="fontMain mobilePlayer" onload="init()">
        <v-row class="mr-2 justify-center" style="width: 100%">
            <div style="width: 85%;height: 20px">
                <v-slider
                        v-model="percentage"
                        :process-style="{ backgroundColor: '#fe731b' }"
                        :process="true"
                        :drag-on-click="true"
                        tooltip="none"
                        :disabled="!this.loaded"
                        @click.native="setPosition()">
                </v-slider>
            </div>
        </v-row>
        <v-row class="justify-start pr-5 mr-4">
            <div style="font-size: 10px;color: black;height: 15px">
                {{this.currentHou}}:{{this.currentMin}}:{{this.currentSec}}/{{this.durationHou}}:{{this.durationMin}}:{{this.durationSec}}
            </div>
        </v-row>
        <v-row style="width: 100%">
            <v-card flat height="55px" width="100%">
                <v-row class="align-start" style="width: 100%;direction: ltr;">
                    <v-col cols="2" style="float: left">
                        <div class="pr-0 " v-for="(podcast,index) in allPodcast" :key="index"
                             style="min-width: 50px; max-width: 50px;float: left">
                            <v-img v-bind:src=podcast.podcastImage @click="playPageNavigation(podcast.podcastId)"
                                   height="50px" min-width="50px" max-width="50px" style="float: left"></v-img>
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div v-for="(podcast,index) in allPodcast" :key="index">
                            <marquee id="podcastTitle" scrollamount="5" behavior="circle" direction = "right" width = "100%">
                                <v-list-item-title class="move-text" @click="playPageNavigation(podcast.podcastId)"
                                                   style="font-size: 12px">
                                    {{podcast.podcastTitle}}
                                </v-list-item-title>
                            </marquee>
                            <v-list-item-subtitle @click="userPageNavigation(podcast.userId)" style="font-size: 10px">
                                {{podcast.podcastChannel}}
                            </v-list-item-subtitle>
                        </div>
                    </v-col>
                    <v-col cols="1">
                        <v-row class="justify-start align-center" v-if="isLike === false">
                            <v-btn :hidden="!this.loaded" class="justify-end justify-center pt-4" fab width="30px"
                                   @click="likeFunction" height="30px">
                                <v-icon size="17" color="primary">mdi-heart-outline</v-icon>
                            </v-btn>
                        </v-row>
                        <v-row v-else>
                            <v-btn :hidden="!this.loaded" class="justify-end justify-center pt-4" fab width="30px"
                                   height="30px" @click="disLikeFunction">
                                <v-icon size="17" color="primary">mdi-heart</v-icon>
                            </v-btn>
                        </v-row>
                    </v-col>
                    <!--Episode Controls-->
                    <v-col cols="4">
                        <v-row>
                            <v-col cols="4">
                                <v-btn x-small icon text :disabled="!this.loaded" @click="audioRewind">
                                    <v-icon size="20">mdi-rewind-10</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <div v-if="podcastIsPlaying == false">
                                    <v-btn id="mobilePlaybtn1" x-small icon text :disabled="!this.loaded"
                                           @click="getPodcastFile">
                                        <v-icon size="20" color="#fd6702">
                                            mdi-play
                                        </v-icon>
                                    </v-btn>
                                </div>
                                <div v-else-if="podcastIsPlaying == true">
                                    <v-btn id="mobilePlaybtn2" x-small icon text :disabled="!this.loaded"
                                           @click="pausePodcast">
                                        <v-icon size="20" color="#fd6702">mdi-pause</v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <v-btn x-small icon text :disabled="!this.loaded" @click="audioForward">
                                    <v-icon size="20">mdi-fast-forward-30</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <!--Volume Control-->
                    <v-col cols="2"></v-col>
                </v-row>
            </v-card>
        </v-row>
        <LoginDialog :dialog="loginDialogAction" :message="loginDialogMessage"/>
    </div>
</template>

<script>
    import 'vue-slider-component/theme/default.css';
    import axios from 'axios';
    import LoginDialog from "../tools/LoginDialog";

    let MobileAudio;
    let podcastFile;
    let myInterval;
    let countSec = 0;
    let addViewInt;

    export default {
        name: "mobilePlayer",
        components: {LoginDialog},
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
                episode: 'episode 9',
                loadingAudio: false,
                podcastIsPlaying: this.$store.state.mobileIsPlaying.podcast,
                items: [
                    {icon: 'mdi-view-dashboard'},
                    {icon: 'mdi-image'},
                    {icon: 'mdi-help-box'},
                ],
                isLike: false,
                loginDialogAction: false,
                loginDialogMessage: '',
                PodcastID: '',
                USERID: '',
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
                    this.$store.state.podcastMobile.forEach(pod => {
                        podcastFile = null;
                        podcastFile = pod.podcastFile;
                        this.currentPodcastFile = pod.podcastFile;
                        MobileAudio = null;
                        MobileAudio = new Audio(podcastFile);
                        // MobileAudio.play();
                        this.playPodcast();
                        this.loaded = true;
                        this.podcastDuration = MobileAudio.duration;
                        this.currentPodcastFile = pod.podcastFile;
                    });
                } else {
                    MobileAudio.play();
                }
                this.podcastIsPlaying = true;
                this.changePosition();
                this.checkPodcastFile();
            },
            playPodcast() {
                // let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                let iOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
                if (iOS) {
                    MobileAudio.play();
                } else {
                    MobileAudio.play();
                    this.podcastIsPlaying = true;
                }
                if (this.$store.getters.userLogin === true) {
                    this.checkIsLike();
                }
                // this.changePosition();
                // this.checkPodcastFile();
                this.countdown();
                this.addViewInterval();
            },
            pausePodcast() {
                MobileAudio.pause();
                this.podcastIsPlaying = false;
            },
            audioForward() {
                MobileAudio.currentTime += 30;
            },
            audioRewind() {
                MobileAudio.currentTime -= 10;
            },
            changeVolume() {
                MobileAudio.volume = this.podcastVolume / 100;
            },
            setPosition() {
                let newPerc = this.percentage;
                MobileAudio.currentTime = (MobileAudio.duration / 100) * newPerc;

            },
            changePosition() {
                setInterval(this.moveSlider, 1000);
            },
            countdown() {
                let i = 30;
                const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
                array.forEach(() => {
                        setTimeout(() => {
                            if (i === 0) {

                                let podcastId = null;
                                this.$store.state.podcastMobile.forEach(pod => {
                                    podcastId = pod.podcastId;
                                });
                                axios.get("http://localhost:8084/api/podcast/view/" + podcastId).then((response) => {
                                    if (response.data.message === 'SUCCESSFUL') {
                                        console.log("")
                                    }
                                });
                            } else {
                                i--;

                            }
                        }, 1000);
                    }
                );

            },
            moveSlider() {
                if (MobileAudio.duration !== '00:00:00') {
                    this.loadingAudio = true;
                }
                this.percentage = Math.round((MobileAudio.currentTime / MobileAudio.duration) * 100);
                let zero = "0";
                let hou = Math.floor(MobileAudio.currentTime / 3600);
                let min = Math.floor((MobileAudio.currentTime - hou * 3600) / 60);
                let sec = Math.floor(MobileAudio.currentTime % 60);

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

                let Ahou = Math.floor(MobileAudio.duration / 3600);
                let Amin = Math.floor((MobileAudio.duration - Ahou * 3600) / 60);
                let Asec = Math.floor(MobileAudio.duration % 60);

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
                    MobileAudio.currentTime = 0;
                    MobileAudio.pause();
                    this.podcastIsPlaying = false;
                }
            },
            checkPodcastFile() {
                setInterval(this.checkPodcastAddress, 1000);
            },
            checkPodcastAddress() {
                this.$store.state.podcastMobile.forEach(pod => {
                    if (this.currentPodcastFile == pod.podcastFile) {
                        console.log("")
                    } else {
                        MobileAudio.pause();
                        this.loaded = false;
                        this.getPodcastFile();
                        clearInterval(this.checkPodcastFile);
                    }
                })
            },
            checkPodcastInterval() {
                myInterval = setInterval(this.checkPodcastIs, 1000)
            },
            checkPodcastIs() {
                this.$store.state.podcastMobile.forEach(pod => {
                    if (pod.podcastFile === "") {
                        this.podcastIsPlaying = false;
                        this.loadingAudio = false;
                    } else {
                        if (!this.loaded) {
                            podcastFile = pod.podcastFile;
                            this.currentPodcastFile = pod.podcastFile;
                            MobileAudio = null;
                            MobileAudio = new Audio(podcastFile);
                            // audio.play();
                            this.playPodcast();
                            if (this.$store.getters.userLogin === true) {
                                this.checkIsLike();
                            }
                            this.changePosition();
                            this.checkPodcastFile();
                            this.loaded = true;
                            let iOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
                            if (iOS) {
                                this.podcastIsPlaying = false;
                            } else {
                                this.podcastIsPlaying = true;
                            }
                            this.podcastDuration = MobileAudio.duration;
                            this.currentPodcastFile = pod.podcastFile;
                            clearInterval(myInterval)
                        } else {
                            this.loadingAudio = false;
                            MobileAudio.play();
                        }
                    }
                    // this.podcastIsPlaying = true;

                })
            },
            addViewInterval() {
                addViewInt = setInterval(this.addView, 1000);
            },
            addView() {
                countSec++;
                if (this.podcastIsPlaying) {
                    if (countSec > 45) {
                        this.viewed = true;
                        clearInterval(addViewInt);
                        clearInterval(this.addViewInterval);
                        if (this.$store.getters.userLogin === false) {
                            axios.post("http://localhost:8084/api/podcast/view", {
                                first: this.$store.state.podcastMobile[0].podcastId,
                                second: null
                            }).then(
                                response => {
                                    if (response.data.message !== 'SUCCESSFUL') {
                                        countSec = 0;
                                        this.viewed = false;
                                        console.log(response.data.message)
                                        this.addViewInterval();
                                    }
                                }
                            );
                        } else {
                            axios.post("http://localhost:8084/api/podcast/view", {
                                first: this.$store.state.podcastMobile[0].podcastId,
                                second: this.$store.state.user[0].userId
                            }).then(
                                response => {
                                    if (response.data.message !== 'SUCCESSFUL') {
                                        countSec = 0;
                                        this.viewed = false;
                                        this.addViewInterval();
                                    }
                                }
                            );
                        }
                    }
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
                        first: this.$store.state.podcastMobile[0].podcastId,
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
                    first: this.$store.state.podcastMobile[0].podcastId,
                    second: this.$store.state.user[0].userId
                }).then(response => {
                    if (response.data.message === 'SUCCESSFUL') {
                        this.isLike = false;
                    }
                });
            },
            checkIsLike() {
                axios.post("http://localhost:8084/api/podcast/like/check", {
                    first: this.$store.state.podcastMobile[0].podcastId,
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
                return this.$store.getters.mobileAllPodcast;
            },
            isPlayingPodcast() {
                return this.$store.getters.mobilePodcastIsPlaying;
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

    .move-text:hover {
        position: relative;
        white-space: nowrap;
        -webkit-animation: rightThenLeft 10s linear;
    }

    .mobilePlayer {
        width: 95%;
    }
</style>
