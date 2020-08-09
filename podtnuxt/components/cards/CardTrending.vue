<template>
    <div>
        <v-card width="80%" class="mb-5 mr-4">
            <v-row>
                <v-col cols="3">
                    <v-img class="mr-4 defaultImage" :src="item.podcastImage" width="200" height="200">
                    </v-img>
                </v-col>
                <v-col cols="9">
                    <v-row class="pb-1" style="cursor: pointer;"
                           @click="playPageNavigation(item.podcastId)">
                        <h3>{{item.title}}</h3>
                    </v-row>
                    <v-row>
                        <div class="pl-6">
                            <div class="channel_info"
                                 v-if="item.userTitle == null || item.userTitle === ''">
                                <a @click="userPageNavigation(item.userId)"> {{item.username}}</a>
                            </div>
                            <div class="channel_info" v-else>
                                <a @click="userPageNavigation(item.userId)"> {{item.userTitle}}</a>
                            </div>
                        </div>
                        <div class="view-count">
                            <span>{{item.viewCount}}</span>
                            <span id="views" style="margin-right: 5px">بازدید</span>
                            <!--•-->
                        </div>
                        <!--<div class="time-ago"><span>22 ساعت قبل</span></div>-->
                    </v-row>
                    <v-row>
                        <div class="podcast-description pr-0">
                            <div v-if="checkIsPersian(item.shortDescription) === false">
                                            <span style="font-size: 15px;direction: ltr;position: relative;"
                                                  v-html="item.shortDescription">
                                            </span>
                            </div>
                            <div v-else>
                                            <span style="font-size: 15px;direction: rtl;"
                                                  v-html="item.shortDescription">
                                            </span>
                            </div>
                        </div>
                    </v-row>
                    <v-row class="pb-4 pt-2">
                        <div class="pr-2">
                            {{durationConverter(item.duration)}}
                            <v-icon right>mdi-clock-outline</v-icon>
                        </div>
                        <div class="podcast-liked">
                            {{item.likeCount}}
                            <v-icon right>mdi-heart</v-icon>
                        </div>
                    </v-row>
                    <v-row>
                        <PlayerButton :item="item"/>

                        <v-btn rounded style="bottom: 8px;right: 15px;" text height="55px" width="28px">
                            <v-icon color="primary" size="30px">mdi-share-variant</v-icon>
                        </v-btn>
                        <div class="lesson-later">
                            <v-btn outlined rounded style="bottom: -3px;right: 30px" width="55% "
                                   color="primary"
                                   v-if="episodeListenLater === false"
                                   @click="listenLaterAction(item.podcastId)">
                                بعدا گوش میدم
                            </v-btn>

                            <v-btn rounded style="bottom: -3px;right: 30px" width="55% " color="primary"
                                   v-else @click="deleteListenLaterAction(item.podcastId)">
                                <v-icon dark>mdi-check</v-icon>
                                بعدا گوش میدم
                            </v-btn>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
        <LoginDialog :dialog="episodeDialogLogin" :message="episodeDialogLoginMessage"/>
        <Snackbar :snackbar="episodeSnackbar" :snackbar-text="episodeSnackbarMessage"/>
    </div>
</template>

<script>
    import PlayerButton from "../buttons/PlayerButton";
    import LoginDialog from "../tools/LoginDialog";
    import Snackbar from "../tools/Snackbar";
    import axios from 'axios'

    export default {
        name: "CardTrending",
        components: {Snackbar, LoginDialog, PlayerButton},
        props: {
            'item': {
                type: Object,
                required: true,
            }
        },
        data: () => ({
            icons: [
                {
                    name: "mdi-play-circle"
                },
            ],
            pageLoading: false,
            episodeListenLater: false,
            episodeDialogLogin: false,
            episodeDialogLoginMessage: '',
            episodeSnackbar: false,
            episodeSnackbarMessage: ''
        }),
        methods: {
            durationConverter(seconds) {
                if (seconds.includes(":")) {
                    return seconds;
                } else {
                    return new Date(seconds * 1000).toISOString().substr(11, 8);
                }
            },
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
            playPageNavigation(id) {
                this.$router.push('/play/' + id);
            },
            userPageNavigation(id) {
                this.$router.push('/publisher/' + id);
            },
            listenLaterAction(podcastId) {
                if (this.$store.getters.userLogin === false) {
                    this.episodeDialogLogin = true;
                    this.episodeDialogLoginMessage = 'شما برای اضافه کردن به لیست بعد گوش میدم هاتون باید در سایت ورود کنید'
                } else {
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
        },
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";
    @import "../../assets/Styles/PageSizingStyle.css";
    @import "../../assets/Styles/GlobalPurposeStyle.css";

    .channel_info {
        margin-left: 8px;
        font-size: 0.8rem;
        font-weight: 300;
        line-height: 1.4rem;
    }

    .view-count {
        margin-left: 8px;
        font-size: 0.8rem;
        font-weight: 300;
        line-height: 1.4rem;
    }

    #views ::after {
        content: '•';
    }

    #viewsXS ::after {
        content: '•';
    }

    .podcast-description {
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1.7rem;
        width: 95%;
    }

    .lesson-later {
        left: 0px;
        width: 35%;
    }
</style>
