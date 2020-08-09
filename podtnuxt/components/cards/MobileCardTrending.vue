<template>
    <div>
        <v-card width="99%" min-height="225px">
            <v-col cols="4" style="float: right;max-height: 220px;overflow: scroll">
                <v-row class="mr-1" style="width: 100px">
                    <v-img :src="item.podcastImage" style="height:100px;width: 100px"
                           @click="playPageNavigation(item.podcastId)"></v-img>
                </v-row>
                <v-row class="mr-1">
                    <div>
                        <v-icon>mdi-play-circle</v-icon>
                        <span class="view-countXS">{{item.viewCount}}</span>
                    </div>
                </v-row>
                <!--<v-row class="mr-1">-->
                <!--<div>-->
                <!--<v-icon>mdi-calendar-range</v-icon>-->
                <!--<span class="time-agoXS">22 ساعت قبل</span>-->
                <!--</div>-->
                <!--</v-row>-->
                <v-row class="mr-1">
                    <div>
                        <v-icon>mdi-clock-outline</v-icon>
                        <span class="podcast-timeXS">
                                {{durationConverter(item.duration)}}
                                </span>
                    </div>
                </v-row>
                <v-row class="mr-1">
                    <div>
                        <v-icon>mdi-heart</v-icon>
                        <span class="podcast-likedXS">{{item.likeCount}}</span>
                    </div>
                </v-row>
            </v-col>
            <v-col cols="8" style="float: left;overflow: hidden">
                <v-row class="pb-3" style="max-height: 30px;" @click="playPageNavigation(item.podcastId)">
                    <div v-if="item.title.length>25">
                        <h3 style="font-size: 15px">{{item.title.slice(0,23)}}</h3>...
                    </div>
                    <div v-else>
                        <h3 style="font-size: 15px">{{item.title}}</h3>
                    </div>
                </v-row>
                <v-row class="pb-3">
                    <v-avatar size="30">
                        <v-img :src='item.profileImageAddress' @click="userPageNavigation(item.userId)">
                        </v-img>
                    </v-avatar>
                    <div class="pt-1">
                        <div class="channel_infoXS"
                             v-if="item.userTitle == null || item.userTitle === ''">
                                        <span class="cursor"
                                              @click="userPageNavigation(item.userId)"> {{item.username}}</span>
                        </div>
                        <div class="channel_infoXS" v-else>
                            <span class="cursor" @click="userPageNavigation(item.userId)"> {{item.userTitle}}</span>
                        </div>
                    </div>
                </v-row>
                <v-row style="height: 80px;max-height: 90px;">
                    <div class="podcast-descriptionXS">
                        <div v-if="item.shortDescription.length>135">
                            <span>{{item.shortDescription.slice(0,135)}}</span> ...
                        </div>
                        <div v-else>
                            <span>{{item.shortDescription}}</span>
                        </div>
                    </div>
                </v-row>
                <v-row style="height: 50px;">
                    <v-col cols="3" class="pr-0 mr-0">
                        <MobilePlayerButton :item="item"/>
                    </v-col>
                    <v-col cols="4" class="pt-4">
                        <div class="lesson-laterXS">
                            <v-btn small outlined rounded
                                   color="primary"
                                   v-if="episodeListenLater === false"
                                   @click="listenLaterAction(item.podcastId)">
                                بعدا گوش میدم
                            </v-btn>
                            <v-btn small rounded color="primary"
                                   v-else @click="deleteListenLaterAction(item.podcastId)">
                                <v-icon dark>mdi-check</v-icon>
                                بعدا گوش میدم
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col cols="5">
                    </v-col>
                </v-row>
            </v-col>
        </v-card>
        <LoginDialog :dialog="episodeDialogLogin" :message="episodeDialogLoginMessage"/>
        <Snackbar :snackbar="episodeSnackbar" :snackbar-text="episodeSnackbarMessage"/>
    </div>
</template>

<script>
    import MobilePlayerButton from "../buttons/MobilePlayerButton";
    import LoginDialog from "../tools/LoginDialog";
    import Snackbar from "../tools/Snackbar";
    import axios from 'axios'

    export default {
        name: "MobileCardTrending",
        components: {MobilePlayerButton, Snackbar, LoginDialog,},
        props: {
            'item': {
                type: Object,
                required: true,
            }
        },
        data: () => ({
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

    .channel_infoXS {
        margin-right: 8px;
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1.4rem;
    }

    .view-countXS {
        margin-right: 5px;
        font-size: 0.8rem;
        font-weight: 500;
        line-height: 1.4rem;
    }

    .time-agoXS {
        margin-right: 5px;
        font-size: 0.8rem;
        font-weight: 500;
        line-height: 1.4rem;
    }

    .podcast-likedXS {
        margin-right: 5px;
        font-size: 0.8rem;
        font-weight: 500;
        line-height: 1.4rem;
    }

    .podcast-descriptionXS {
        font-size: 14px;
        color: #777;
        font-weight: 400;
        text-align: justify;
        padding-right: 2px;
        padding-left: 5px;
        -webkit-transition: .3s;
        -o-transition: .3s;
        transition: .3s;
    }

    .podcast-timeXS {
        margin-right: 5px;
        font-size: 0.8rem;
        font-weight: 500;
        line-height: 1.4rem;
    }

    .lesson-laterXS {
    }
</style>
