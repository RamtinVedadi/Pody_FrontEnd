<template>
    <div class="fontMain">
        <!--PC Mode-->
        <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
             v-show="$vuetify.breakpoint.mdAndUp">
            <!--      <div v-if="pageLoading === false">-->
            <!--        <Loader/>-->
            <!--      </div>-->
            <div>
                <v-row class="pt-4 pr-8 pb-3">
                    <h1>کانال های پادی</h1>
                </v-row>
                <div class="pr-5" v-for="(items, index) in channels" :key="index">
                    <v-row style="margin: 10px 0 30px 10px">
                        <div class="item-num">
                            <h2 class="item-index">{{index + 1}}</h2>
                        </div>
                        <div class="channel-image">
                            <div class="channel-image-container">
                                <v-img class="channel-image-data" :src="items.channelInfo.imageAddress"
                                       @click="userPageNavigation(items.channelInfo.id)">
                                </v-img>
                            </div>
                        </div>
                        <div class="channel-title">
                            <h2 class="item-title" @click="userPageNavigation(items.channelInfo.id)"
                                v-if="items.channelInfo.userTitle == null || items.channelInfo.userTitle === '' ">
                                {{items.channelInfo.username}}
                            </h2>
                            <h2 class="item-title" v-else @click="userPageNavigation(items.channelInfo.id)">
                                {{items.channelInfo.userTitle}}
                            </h2>
                            <span class="item-owner"
                                  v-if="items.channelInfo.firstName !== '' || items.channelInfo.lastName !== ''">
                        {{items.channelInfo.firstName + " " + items.channelInfo.lastName }}
                        </span>
                            <br>
                            <span class="item-info">{{items.channelInfo.followCount}} دنبال کننده</span>
                            <span class="item-info" style="margin: 0 4px">•</span>
                            <span class="item-info">{{items.episodeCount}} پادکست</span>
                            <span class="item-info" style="margin: 0 4px">•</span>
                            <span class="item-info">{{items.listenCount}} شنیده شده</span>
                            <v-row class="pt-1">
                                <div v-if="items.channelInfo.instagramUrl !== '' ">
                                    <div v-if="items.channelInfo.instagramUrl !== null ">
                                        <a class="mr-2" :href="items.channelInfo.instagramUrl " target="_blank"
                                           style="width: 32px;height: 32px">
                                            <img class="item-social" v-bind:src="social.instagram.icon"/>
                                        </a>
                                    </div>
                                </div>
                                <div v-if="items.channelInfo.twitterUrl !== ''">
                                    <div v-if="items.channelInfo.twitterUrl != null ">
                                        <a class="mr-2" :href="items.channelInfo.twitterUrl " target="_blank"
                                           style="width: 32px;height: 32px">
                                            <img class="item-social" v-bind:src="social.twitter.icon"/>
                                        </a>
                                    </div>
                                </div>
                                <div v-if="items.channelInfo.facebookUrl !== ''">
                                    <div v-if="items.channelInfo.facebookUrl != null">
                                        <a class="mr-2 " :href="items.channelInfo.facebookUrl " target="_blank"
                                           style="width: 32px;height: 32px">
                                            <img class="item-social" v-bind:src="social.facebook.icon"/>
                                        </a>
                                    </div>
                                </div>
                                <div v-if="items.channelInfo.youtubeUrl !== ''">
                                    <div v-if="items.channelInfo.youtubeUrl != null ">
                                        <a class="mr-2 " :href="items.channelInfo.youtubeUrl " target="_blank"
                                           style="width: 32px;height: 32px">
                                            <img class="item-social" v-bind:src="social.youtube.icon"/>
                                        </a>
                                    </div>
                                </div>
                                <div v-if="items.channelInfo.websiteUrl !== ''">
                                    <div v-if="items.channelInfo.websiteUrl != null ">
                                        <a class="mr-2 " :href="items.channelInfo.websiteUrl " target="_blank"
                                           style="width: 32px;height: 32px">
                                            <img class="item-social" v-bind:src="social.website.icon"/>
                                        </a>
                                    </div>
                                </div>
                            </v-row>
                        </div>
                        <div class="sub-icon">
                            <div class="displayBlock" v-if="items.isFollow === false">
                                <v-btn fab style="width: 50px;height: 50px;border-color: red;"
                                       @click="channelFollow(items.channelInfo.id ,index)">
                                    <v-icon color="red" size="25" class="sub-btn">mdi-bell</v-icon>
                                </v-btn>
                            </div>
                            <div v-else class="displayBlock">
                                <v-btn fab style="width: 50px;height: 50px;border-color: green"
                                       @click="channelUnFollow(items.channelInfo.id, index)">
                                    <v-icon color="green" size="25" class="sub-btn">mdi-bell-check</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-row>
                    <v-divider style="width: 55%"></v-divider>
                </div>
                <div v-if="isEnd === false">
                    <InfiniteLoading @infinite="loadMoreChannels" spinner="spiral"/>
                </div>
                <div v-else>
                    <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
                </div>
                <div style="height: 100px;"></div>
                <LoginDialog :dialog="loginErrorDialog" :message="loginErrorMessage"/>
                <Snackbar :snackbar="snackbarAction" :snackbar-text="snackbarActionMessage"/>
            </div>
        </div>
        <!--Tablet Mode-->
        <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
             v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
            <div v-if="pageLoading === false">
                <Loader/>
            </div>
            <div v-else>
                <v-row class="pt-4 pr-8 pb-3">
                    <h1>کانال ها</h1>
                </v-row>
                <div class="pr-5" v-for="(items, index) in channels" :key="index">
                    <v-row style="margin: 10px 0 30px 10px">
                        <div class="item-num">
                            <h2 class="item-index">{{index + 1}}</h2>
                        </div>
                        <div class="channel-image">
                            <div class="channel-image-container">
                                <v-img class="channel-image-data" :src="items.channelInfo.imageAddress"
                                       @click="userPageNavigation(items.channelInfo.id)">
                                </v-img>
                            </div>
                        </div>
                        <div class="channel-title">
                            <h2 class="item-title" @click="userPageNavigation(items.channelInfo.id)"
                                v-if="items.channelInfo.userTitle == null || items.channelInfo.userTitle === '' ">
                                {{items.channelInfo.username}}
                            </h2>
                            <h2 class="item-title" v-else @click="userPageNavigation(items.channelInfo.id)">
                                {{items.channelInfo.userTitle}}
                            </h2>
                            <span class="item-owner"
                                  v-if="items.channelInfo.firstName !== '' || items.channelInfo.lastName !== ''">
                        {{items.channelInfo.firstName + " " + items.channelInfo.lastName }}
                        </span>
                            <br>
                            <span class="item-info">{{items.channelInfo.followCount}} دنبال کننده</span>
                            <span class="item-info" style="margin: 0 4px">•</span>
                            <span class="item-info">{{items.episodeCount}} پادکست</span>
                            <span class="item-info" style="margin: 0 4px">•</span>
                            <span class="item-info">{{items.listenCount}} شنیده شده</span>
                            <v-row class="pt-1">
                                <div v-if="items.channelInfo.instagramUrl !== '' ">
                                    <div v-if="items.channelInfo.instagramUrl !== null ">
                                        <a class="mr-2" :href="items.channelInfo.instagramUrl " target="_blank"
                                           style="width: 32px;height: 32px">
                                            <img class="item-social" v-bind:src="social.instagram.icon"/>
                                        </a>
                                    </div>
                                </div>
                                <div v-if="items.channelInfo.twitterUrl !== ''">
                                    <div v-if="items.channelInfo.twitterUrl != null ">
                                        <a class="mr-2" :href="items.channelInfo.twitterUrl " target="_blank"
                                           style="width: 32px;height: 32px">
                                            <img class="item-social" v-bind:src="social.twitter.icon"/>
                                        </a>
                                    </div>
                                </div>
                                <div v-if="items.channelInfo.facebookUrl !== ''">
                                    <div v-if="items.channelInfo.facebookUrl != null">
                                        <a class="mr-2 " :href="items.channelInfo.facebookUrl " target="_blank"
                                           style="width: 32px;height: 32px">
                                            <img class="item-social" v-bind:src="social.facebook.icon"/>
                                        </a>
                                    </div>
                                </div>
                                <div v-if="items.channelInfo.youtubeUrl !== ''">
                                    <div v-if="items.channelInfo.youtubeUrl != null ">
                                        <a class="mr-2 " :href="items.channelInfo.youtubeUrl " target="_blank"
                                           style="width: 32px;height: 32px">
                                            <img class="item-social" v-bind:src="social.youtube.icon"/>
                                        </a>
                                    </div>
                                </div>
                                <div v-if="items.channelInfo.websiteUrl !== ''">
                                    <div v-if="items.channelInfo.websiteUrl != null ">
                                        <a class="mr-2 " :href="items.channelInfo.websiteUrl " target="_blank"
                                           style="width: 32px;height: 32px">
                                            <img class="item-social" v-bind:src="social.website.icon"/>
                                        </a>
                                    </div>
                                </div>
                            </v-row>
                        </div>
                        <div class="sub-icon">
                            <div class="displayBlock" v-if="items.isFollow === false">
                                <v-btn fab style="width: 50px;height: 50px;border-color: red;"
                                       @click="channelFollow(items.channelInfo.id ,index)">
                                    <v-icon color="red" size="25" class="sub-btn">mdi-bell</v-icon>
                                </v-btn>
                            </div>
                            <div v-else class="displayBlock">
                                <v-btn fab style="width: 50px;height: 50px;border-color: green"
                                       @click="channelUnFollow(items.channelInfo.id, index)">
                                    <v-icon color="green" size="25" class="sub-btn">mdi-bell-check</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-row>
                    <v-divider style="width: 55%"></v-divider>
                </div>
                <div v-if="isEnd === false">
                    <InfiniteLoading @infinite="loadMoreChannels" spinner="spiral"/>
                </div>
                <div v-else>
                    <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
                </div>
                <div style="height: 100px;"></div>
                <LoginDialog :dialog="loginErrorDialog" :message="loginErrorMessage"/>
                <Snackbar :snackbar="snackbarAction" :snackbar-text="snackbarActionMessage"/>
            </div>
        </div>
        <!--Mobile Mode-->
        <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
        </div>
    </div>
</template>

<script>
    import LoginDialog from "../../components/tools/LoginDialog";
    import InfiniteLoading from 'vue-infinite-loading';
    import Snackbar from "../../components/tools/Snackbar";
    import Loader from "../../components/tools/Loader";
    import axios from 'axios';

    export default {
        layout: "pody",
        name: "channels",
        components: {Snackbar, LoginDialog, Loader, InfiniteLoading},
        async asyncData(context) {
            if (context.$vuetify.breakpoint.xsOnly || context.$vuetify.breakpoint.smOnly || context.$vuetify.breakpoint.mdAndUp) {
                return axios.post("http://localhost:8084/api/user/list/channels/" + 0 + "/" + 20, {id: null}).then((response) => {
                    if (response.status === 200) {
                        return {
                            channels: response.data,
                            pageLoading: true,
                        }
                    }
                });
            }
        },
        data: () => ({
            social: {
                instagram: {
                    id: 1,
                    icon: "https://s3.castbox.fm/webstatic/images/instagram.689928b5.png",
                },
                twitter: {
                    id: 2,
                    icon: "https://s3.castbox.fm/webstatic/images/twitter.b3173321.png",
                },
                facebook: {
                    id: 3,
                    icon: "https://s3.castbox.fm/webstatic/images/facebook.db794bac.png",
                },
                youtube: {
                    id: 4,
                    icon: "https://s3.castbox.fm/webstatic/images/youtube.f041f131.png",
                },
                website: {
                    id: 5,
                    icon: "https://s3.castbox.fm/webstatic/images/homelink.fb715380.png",
                }
            },
            channels: [],
            page: 0,
            size: 20,
            pageLoading: false,
            loginErrorDialog: false,
            loginErrorMessage: '',
            snackbarAction: false,
            snackbarActionMessage: '',
            isEnd: false,
            getData: true
        }),
        methods: {
            userPageNavigation(id) {
                this.$router.push('/publisher/' + id);
            },
            channelFollow(userId, index) {
                if (this.$store.getters.userLogin === false) {
                    this.loginErrorDialog = true;
                    this.loginErrorMessage = 'شما برای دنبال کردن این کانال باید ورود کرده باشید';
                } else {
                    axios.post("http://localhost:8084/api/follow/user/create", {
                        follower: {
                            id: userId
                        },
                        user: {
                            id: this.$store.state.user[0].userId
                        }
                    }).then((response) => {
                            const result = response.data.message;
                            if (result === 'SUCCESSFUL') {
                                this.channels[index].isFollow = !this.channels[index].isFollow;
                                this.snackbarAction = true;
                                if (this.channels[index].channelInfo.title === null || this.channels[index].channelInfo.title === '') {
                                    this.snackbarActionMessage = "کانال " + this.channels[index].channelInfo.username + " دنبال شد";
                                } else {
                                    this.snackbarActionMessage = "کانال " + this.channels[index].channelInfo.userTitle + " دنبال شد";
                                }
                            } else {
                                this.snackbarAction = true;
                                this.snackbarActionMessage = 'مشکلی پیش آمده ست یک یار دیگر امتحان کنید';
                            }
                        }
                    );
                }
            },
            channelUnFollow(userId, index) {
                axios.delete("http://localhost:8084/api/follow/user/delete", {
                    data: {
                        first: this.$store.state.user[0].userId,
                        second: userId
                    }
                }).then((response) => {
                    const result = response.data.message;
                    if (result === 'SUCCESSFUL') {
                        this.channels[index].isFollow = !this.channels[index].isFollow;
                        this.snackbarAction = true;
                        this.snackbarActionMessage = 'کانال از لیست دنبال شده ها حذف گردید';
                    } else {
                        this.snackbarAction = true;
                        this.snackbarActionMessage = 'مشکلی پیش آمده ست یک یار دیگر امتحان کنید';
                    }
                });
            },
            loadMoreChannels($state) {
                this.page += 1;
                if (this.$store.getters.userLogin === false) {
                    axios.post("http://localhost:8084/api/user/list/channels/" + this.page + "/" + this.size, {id: null}).then((response) => {
                        if (response.status === 200) {
                            const result = response.data;
                            if (result.length > 0) {
                                this.channels = this.channels.concat(result);
                                $state.loaded();
                            } else {
                                this.isEnd = true;
                            }
                        }
                    });
                } else {
                    axios.post("http://localhost:8084/api/user/list/channels/" + this.page + "/" + this.size, {id: this.$store.state.user[0].userId}).then((response) => {
                        if (response.status === 200) {
                            const result = response.data;
                            if (result.length > 0) {
                                this.channels = this.channels.concat(result);
                                $state.loaded();
                            } else {
                                this.isEnd = true;
                            }
                        }
                    });
                }
            },
        },
        created() {
        },
        head() {
            return {
                title: "پادی | کانال ها ",
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";
    @import "../../assets/Styles/PageSizingStyle.css";
    @import "../../assets/Styles/GlobalPurposeStyle.css";

    .item-num {
        height: 80px;
        width: 40px;
        margin: 0;
        float: right
    }

    .item-index {
        height: 80px;
        width: 40px;
        text-align: right;
        float: right;
        font-size: 20px;
        line-height: 28px;
        padding-top: 20px;
    }

    .channel-image {
        width: 100px;
        height: 100px;
        float: right
    }

    .channel-title {
        text-align: right;
        width: 395px;
        float: right;
        height: 80px;
        padding: 0 20px;
        margin: 0;
        border-bottom: 0;
    }

    .channel-title::before {
        display: table;
        content: " ";
    }

    .channel-title::after {
        clear: both;
    }

    .channel-title-XS {
        color: rgb(0, 0, 0);
        cursor: pointer;
        display: -webkit-box;
        font-family: Roboto, Arial, sans-serif;
        font-size: 14px;
        font-weight: 400;
        height: 24px;
        line-height: 24px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .channel-subtitle-XS {
        color: rgb(170, 170, 170);
        cursor: pointer;
        display: -webkit-box;
        font-family: Roboto, Arial, sans-serif;
        font-size: 12px;
        font-weight: 400;
        height: 24px;
        line-height: 24px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .channel-image-container {
        display: inline-block;
        height: 100%;
        width: 100%;
        overflow: hidden;
        border-radius: 4px;
        background-color: inherit
    }

    .channel-image-data {
        background-image: url("../../assets/no_podcast.png");
        display: inline-block;
        width: 100%;
        height: 100%;
        opacity: 1;
        cursor: pointer;
    }

    .item-title {
        margin-top: 12px;
        font-size: 16px;
        color: #000;
        font-weight: 400;
        width: 100%;
        height: 1.2em;
        line-height: 1.2em;
        overflow: hidden;
        cursor: pointer;
    }

    .item-owner {
        margin-top: 8px;
        font-size: 12px;
        color: #9f9f9f;
        font-weight: 400;
        width: 100%;
        height: 1.4em;
        line-height: 1.2em;
        overflow: hidden;
    }

    .item-info {
        margin-top: 1px;
        font-size: 12px;
        color: #9f9f9f;
        font-weight: 400;
        width: 100%;
        height: 1.4em;
        line-height: 1.2em;
        overflow: hidden;
    }

    .item-info-XS {
        margin-top: 1px;
        font-size: 12px;
        color: #9f9f9f;
        font-weight: 400;
        height: 1.4em;
        line-height: 1.2em;
        overflow: hidden;
    }

    .item-social {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        margin-top: 5px;
    }

    .sub-icon {
        margin-left: 30px;
        width: 30px;
        height: 80px;
        position: relative;
        line-height: 5.2rem;
    }

    .sub-btn {
        padding: 0px 10px;
    }
</style>
