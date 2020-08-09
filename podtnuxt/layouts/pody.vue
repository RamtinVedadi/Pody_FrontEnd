<template>
    <v-app light>
        <v-main>
            <Content/>
        </v-main>
        <div v-if="currentUrl !== '/register'">
            <div v-if="currentUrl !== '/rssLogin'">
                <div v-if="currentUrl !== '/forgot'">
                    <div v-if="currentUrl !== '/Login'">
                        <v-bottom-navigation class="hidden-sm-only hidden-xs-only" fixed horizontal
                                             height="90px">
                            <Player/>
                        </v-bottom-navigation>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="currentUrl !== '/register'">
            <div v-if="currentUrl !== '/rssLogin'">
                <div v-if="currentUrl !== '/Login'">
                    <v-bottom-navigation
                            class="flex"
                            color="primary"
                            fixed
                            horizontal
                            height="160"
                            v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"
                    >
                        <v-row class="justify-center align-start">
                            <v-row id="mobilePlayerId" class="mobilePlayer justify-center align-center">
                                <mobilePlayer/>
                            </v-row>
                            <v-row class="dividerMobile">
                            </v-row>
                            <v-row class="mobileNavigator ml-4 justify-space-around  align-end">
                                <v-col cols="3">
                                    <!--Subscriptions-->
                                    <v-btn @click=" buttonRedirect(mainNavigation[2].url)">
                                        <span>{{mainNavigation[2].title}}</span>
                                        <v-icon v-text="mainNavigation[2].icon" style="color: #606060"></v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <!--Trending-->
                                    <v-btn @click=" buttonRedirect(mainNavigation[1].url)">
                                        <span>{{mainNavigation[1].title}}</span>
                                        <v-icon v-text="mainNavigation[1].icon" style="color: #606060"></v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <!--Search-->
                                    <v-btn @click=" buttonRedirect(mainNavigation[3].url)">
                                        <span>{{mainNavigation[3].title}}</span>
                                        <v-icon v-text="mainNavigation[3].icon" style="color: #606060"></v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <!--Home-->
                                    <v-btn v-on:click=" buttonRedirect(mainNavigation[0].url)">
                                        <span>{{mainNavigation[0].title}}</span>
                                        <v-icon v-text="mainNavigation[0].icon" style="color: #606060"></v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-bottom-navigation>
                </div>
            </div>
        </div>
        <nuxt/>
    </v-app>
</template>

<script>
    import Content from "../components/Content";
    import Player from "../components/players/Player";
    import VueSession from 'vue-session'
    import mobilePlayer from "../components/players/mobilePlayer";

    export default {
        name: "pody",
        components: {Player, Content, mobilePlayer, VueSession},
        data: () => ({
            currentUrl: "",
            drawer: true,
            mainNavigation: [
                {
                    id: 1,
                    icon: 'mdi-home',
                    title: 'خانه',
                    url: '/'
                },
                {
                    id: 2,
                    icon: 'mdi-fire',
                    title: 'پرطرفدارها',
                    url: '/trending'
                },
                {
                    id: 3,
                    icon: 'mdi-youtube-subscription',
                    title: 'اشتراک ها',
                    url: '/subscriptions'
                },
                {
                    id: 4,
                    icon: 'mdi-magnify',
                    title: 'جستجو',
                    url: '/search'
                },
            ],
            mobilePlayerShow: false,
        }),
        methods: {
            buttonRedirect(url) {
                if (url === '/') {
                    this.$router.push('/')
                }
                if (url === '/subscriptions') {
                    this.$router.push('/subscriptions')
                }
                if (url === '/trending') {
                    this.$router.push('/trending')
                }
                if (url === '/search') {
                    this.$router.push('/search/ ')
                }
                if (url === '/Login') {
                    this.$router.push('/Login')
                }
            },
        },
        computed: {
            CheckPlayer: function () {
                if (!this.mobilePlayerShow) {
                    document.getElementById("mobilePlayerId").style.display = "none";
                } else {
                    console.log("")
                }
                return this.mobilePlayerShow
            }
        },
        mounted() {
            if (this.$session.exists) {
                this.$store.state.user.forEach(u => {
                    u.userId = this.$session.get("userId");
                    u.username = this.$session.get("username");
                    u.userTitle = this.$session.get("userTitle");
                    u.userImage = this.$session.get("userImage");
                    u.isChannel = this.$session.get("isChannel");
                });
            } else {
                this.$store.state.user.forEach(u => {
                    u.userId = this.$session.get("");
                    u.username = this.$session.get("");
                    u.userTitle = this.$session.get("");
                    u.userImage = this.$session.get("");
                    u.isChannel = this.$session.get("");
                });
            }
            this.currentUrl = window.location.pathname;
        },
    }
</script>

<style scoped>
    .mobilePlayer {
        height: 40%;
    }

    .mobileNavigator {
        height: 40%;
    }

    .dividerMobile {
        height: 15px;
        width: 100%;
    }

    .v-application .align-center {
        width: 100%;
    }
</style>
