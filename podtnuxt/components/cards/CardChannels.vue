<template>
    <div>
        <v-card shaped raised class="channel-card">
            <v-col cols="4" justify="center" style="float: right;width: 30%;cursor: pointer;"
                   @click="userPageNavigation(item.id)">
                <img class="channelImage" :src="item.imageAddress" :alt="item.username" width="120px" height="120px"
                     style="border-radius: 70px">
            </v-col>
            <v-col cols="1" style="float: right"></v-col>
            <v-col cols="7" style="float: left">
                <v-row v-if="item.userTitle == null || item.userTitle === ''" justify="center"
                       @click="userPageNavigation(item.id)"
                       style="font-size: 16px;line-height: 1.8rem;font-weight: 400;cursor: pointer;">
                <span v-if="item.username.length >19" :aria-label="item.title" :title="item.title">
                        {{item.username.slice(0,19)}}...
                    </span>
                    <span v-else>{{item.username}}</span>
                </v-row>
                <v-row v-else justify="center" @click="userPageNavigation(item.id)"
                       style="font-size: 16px;line-height: 1.8rem;font-weight: 400;cursor: pointer;">
                <span v-if="item.userTitle.length >19" :aria-label="item.title" :title="item.title">
                        {{item.userTitle.slice(0,19)}}...
                    </span>
                    <span v-else>{{item.userTitle}}</span>
                </v-row>

                <v-row justify="center" style="margin-top: 10px;font-size: 13px;line-height: 1.5rem;font-weight: 300;">
                    <div>
                        <span rel="nofollow" class="item-info"> {{item.followCount}} دنبال کننده</span>
                        <span rel="nofollow" class="item-info" style="margin: 0 4px">•</span>
                        <span rel="nofollow" class="item-info"> {{listenCount}} شنیده شده</span>
                    </div>
                </v-row>

                <v-row justify="center" style="margin-top: 10%">
                    <div v-if="isChannelFollow === false">
                        <v-btn rel="nofollow" color="primary" @click="channelFollow(item.id)">
                            subscribe
                            <v-icon color="white" size="20" style="padding: 0px 10px">
                                {{icons[2].name}}
                            </v-icon>
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn rel="nofollow" outlined color="primary" @click="channelUnFollow(item.id)">
                            subscribed
                            <v-icon color="primary" size="19">
                                {{icons[3].name}}
                            </v-icon>
                        </v-btn>
                    </div>
                </v-row>
            </v-col>
        </v-card>
        <LoginDialog :dialog="loginErrorDialog" :message="loginErrorMessage"/>
        <Snackbar :snackbar="snackbarAction" :snackbar-text="snackbarActionMessage"/>
    </div>
</template>

<script>
    import LoginDialog from "../tools/LoginDialog";
    import Snackbar from "../tools/Snackbar";
    import axios from 'axios';

    export default {
        name: "CardChannels",
        components: {Snackbar, LoginDialog},
        props: {
            'item': {
                type: Object,
                required: true,
            },
            'listenCount': {
                type: Number,
                required: true,
            }
        },
        data: () => ({
            icons: [
                {
                    name: "fas fa-share-alt"
                },
                {
                    name: "mdi-play-circle"
                },
                {
                    name: "mdi-bell"
                },
                {
                    name: "mdi-check"
                },
                {
                    name: 'mdi-clock'
                },
                {
                    name: 'mdi-ear-hearing'
                },
                {
                    name: 'mdi-heart'
                },
                {
                    name: 'mdi-thumb-up'
                },
                {
                    name: 'mdi-thumb-down'
                }
            ],
            isChannelFollow: false,
            loginErrorDialog: false,
            loginErrorMessage: '',
            snackbarAction: false,
            snackbarActionMessage: ''
        }),
        methods: {
            userPageNavigation(id) {
                this.$router.push('/publisher/' + id);
            },
            channelFollow(userId) {
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
                                this.isChannelFollow = !this.isChannelFollow;
                                this.snackbarAction = true;
                                if (this.item.title === null || this.item.title === '') {
                                    this.snackbarActionMessage = "کانال " + this.item.username + " دنبال شد";
                                } else {
                                    this.snackbarActionMessage = "کانال " + this.item.userTitle + " دنبال شد";
                                }
                            } else {
                                this.snackbarAction = true;
                                this.snackbarActionMessage = 'مشکلی پیش آمده ست یک یار دیگر امتحان کنید';
                            }
                        }
                    );
                }
            },
            channelUnFollow(userId) {
                axios.delete("http://localhost:8084/api/follow/user/delete", {
                    data: {
                        first: this.$store.state.user[0].userId,
                        second: userId
                    }
                }).then((response) => {
                    const result = response.data.message;
                    if (result === 'SUCCESSFUL') {
                        this.isChannelFollow = !this.isChannelFollow;
                        this.snackbarAction = true;
                        this.snackbarActionMessage = 'کانال از لیست دنبال شده ها حذف گردید';
                    } else {
                        this.snackbarAction = true;
                        this.snackbarActionMessage = 'مشکلی پیش آمده ست یک یار دیگر امتحان کنید';
                    }
                });
            },
        },
        created() {
            if (this.$store.getters.userLogin !== false) {
                axios.post("http://localhost:8084/api/user/follow/check", {
                    first: this.item.id,
                    second: this.$store.state.user[0].userId
                }).then(response => {
                    if (response.data.message === 'SUCCESSFUL') {
                        this.isChannelFollow = true;
                    } else {
                        this.isChannelFollow = false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .channelImage {
        background-image: url("../../assets/no_podcast.png");
    }

    .channel-card {
        margin-right: 30px;
        height: 150px;
        width: 300px;
    }

    .item-info {
        margin-top: 0px;
        font-size: 9px;
        color: #9f9f9f;
        font-weight: 400;
        width: 49%;
        height: 1.4em;
        line-height: 1.2em;
        overflow: hidden;
    }
</style>
