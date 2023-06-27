<template>
    <div class="fontMain">
        <!--PC Mode-->
        <v-card id="sideNavigation" v-show="$vuetify.breakpoint.mdAndUp" flat
                class="appDrawer hidden-md-only hidden-md-and-down hidden-sm-and-down">
            <v-navigation-drawer>
                <v-list flat>
                    <v-list-item-group>
                        <v-list-item v-for="item in mainNavigation" :key="item.id"
                                     @click=" buttonRedirect(item.url)">
                            <v-list-item-icon class="pr-4" v-if="currentUrl ===  item.url">
                                <v-icon v-text="item.icon" color="primary">

                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-icon class="pr-4" v-else>
                                <v-icon v-text="item.icon" style="color: #606060">

                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <div class="hidden-sm-and-down">
                                    <v-list-item-title v-text="item.title" class="listTitle">

                                    </v-list-item-title>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <br>
                <v-divider :inset="false">

                </v-divider>
                <div v-if="isLogin === true">
                    <v-list flat>
                        <v-list-item-group>
                            <v-list-item v-for="item in userNavigation" :key="item.id"
                                         @click=" buttonRedirect(item.url)" :disabled="item.disable">
                                <v-list-item-icon class="pr-4" v-if="currentUrl == item.url">
                                    <v-icon v-text="item.icon" color="primary"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-icon class="pr-4" v-else>
                                    <v-icon v-text="item.icon" :disabled="item.disable" style="color: #606060"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <div class="hidden-sm-and-down">
                                        <v-list-item-title v-text="item.title" class="listTitle">
                                        </v-list-item-title>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                    <br>

                    <v-divider :inset="false"></v-divider>

                    <div class="hidden-md-and-down">

                        <v-subheader style="font-size: 1.1rem">اشتراک ها</v-subheader>

                        <v-list flat v-if="subscriptions.length !== 0">
                            <v-list-item v-for="item in subscriptions" :key="item.id"
                                         @click="userPageNavigation(item.id)" class="cursor">
                                <v-list-item-avatar>
                                    <v-img :src="item.imageAddress"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.username" :aria-label="item.username"
                                                       :title="item.username"
                                                       v-if="item.userTitle === null || item.userTitle === ''">
                                    </v-list-item-title>
                                    <v-list-item-title v-text="item.userTitle" :aria-label="item.userTitle"
                                                       :title="item.userTitle" v-else>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <v-list flat v-else>
                            <v-subheader style="font-size: .8rem;font-family: iranSans">
                                شما تا کنون کسی را دنبال نکرده اید
                            </v-subheader>
                        </v-list>
                    </div>
                </div>
                <div v-else>
                    <div class="hidden-sm-and-down">
                        <br>
                        <v-subheader style="font-size: .8rem;font-family: iranSans">در سایت پادی ورود کنید تا به لیست
                            های
                            بیشتری دسترسی داشته
                            باشید
                        </v-subheader>
                        <v-list flat>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-btn outlined color="primary" @click="buttonRedirect('/Login')">
                                        <v-icon> mdi-account-circle</v-icon>
                                        <span class="mr-2" style="font-size: 1.1rem;font-family: iranSans">ورود</span>
                                    </v-btn>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </div>
                <br>
                <v-list flat>
                    <v-list-item-group>
                        <v-list-item v-for="item in aboutNavigation" :key="item.id"
                                     @click=" buttonRedirect(item.url)">
                            <v-list-item-icon class="pr-4" v-if="currentUrl == item.url">
                                <v-icon v-text="item.icon" color="primary"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-icon class="pr-4" v-else>
                                <v-icon v-text="item.icon" style="color: #606060"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <div class="hidden-sm-and-down">
                                    <v-list-item-title v-text="item.title" class="listTitle">
                                    </v-list-item-title>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <v-list flat>
                    <v-divider :inset="false"></v-divider>
                    <v-list-item-content>
                        <v-list-item-title class="mb-2" style="text-align: center">پادی | 2020</v-list-item-title>
                        <v-col>
                            <v-row justify="center">
                                <v-btn icon depressed href="https://www.instagram.com/pody.ir" target="_blank">
                                    <v-icon size="25" color="#606060">
                                        mdi-instagram
                                    </v-icon>
                                </v-btn>
                                <v-btn icon depressed href="https://twitter.com/PodyTeam" target="_blank">
                                    <v-icon size="25" color="#606060">
                                        mdi-twitter
                                    </v-icon>
                                </v-btn>
                                <v-btn icon depressed href="https://t.me/PodyTeam" target="_blank">
                                    <v-icon size="25" color="#606060">
                                        mdi-telegram
                                    </v-icon>
                                </v-btn>
                                <v-btn icon depressed
                                       href="https://www.youtube.com/channel/UCR9jo_39OQsDaZ4rEwwTzsA/?guided_help_flow=5"
                                       target="_blank">
                                    <v-icon size="25" color="#606060">
                                        mdi-youtube
                                    </v-icon>
                                </v-btn>
                            </v-row>
                            <v-row justify="center">
                                <v-btn icon depressed href="https://www.facebook.com/pody.ir" target="_blank">
                                    <v-icon size="25" color="#606060">
                                        mdi-facebook
                                    </v-icon>
                                </v-btn>
                                <v-btn icon depressed href="https://www.linkedin.com/company/pody/" target="_blank">
                                    <v-icon size="25" color="#606060">
                                        mdi-linkedin
                                    </v-icon>
                                </v-btn>
                                <v-btn icon depressed href="mailto:pody.team@gmail.com" target="_blank">
                                    <v-icon size="25" color="#606060">
                                        mdi-gmail
                                    </v-icon>
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-list-item-content>
                </v-list>
                <div style="height: 135px"></div>
            </v-navigation-drawer>
            <br>
            <br>
        </v-card>
        <!--For Tablets-->
        <v-card v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly"
                flat class="miniAppDrawer hidden-xs-only hidden-sm-only ">
            <v-navigation-drawer :mini-variant.sync="mini" permanent>
                <v-list flat>
                    <v-list-item-group>
                        <v-list-item v-for="item in mainNavigationTwo" :key="item.id"
                                     @click=" buttonRedirect(item.url)">
                            <v-list-item-icon class="pr-md-1 pr-sm-1" v-if="currentUrl ===  item.url">
                                <v-icon v-text="item.icon" color="primary">
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-icon class="pr-md-1 pr-sm-1" v-else>
                                <v-icon v-text="item.icon" style="color: #606060">
                                </v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <div v-if="isLogin === true">
                    <v-divider :inset="false"></v-divider>
                    <v-list flat>
                        <v-list-item-group>
                            <v-list-item v-for="item in userNavigation" :key="item.id"
                                         @click=" buttonRedirect(item.url)">
                                <v-list-item-icon class="pr-md-1 pr-sm-1" v-if="currentUrl == item.url">
                                    <v-icon v-text="item.icon" color="primary"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-icon class="pr-md-1 pr-sm-1" v-else>
                                    <v-icon v-text="item.icon" style="color: #606060"></v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-navigation-drawer>
        </v-card>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "SideNav",
        data: () => ({
            activeBtn: 1,
            currentUrl: "",
            isLogin: "",
            drawer: false,
            items: [
                {title: 'Home', icon: 'mdi-home-city'},
                {title: 'My Account', icon: 'mdi-account'},
                {title: 'Users', icon: 'mdi-account-group-outline'},
            ],
            mini: true,
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
            ],
            mainNavigationTwo: [
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
            userNavigation: [
                {
                    id: 4,
                    icon: 'mdi-history ',
                    title: 'تاریخچه',
                    url: '/history',
                    disable: false
                },
                {
                    id: 5,
                    icon: 'mdi-music-box-multiple-outline',
                    title: 'پادکست‎‌های من',
                    url: '/myPodcasts',
                    disable: false
                },
                {
                    id: 6,
                    icon: 'mdi-clock ',
                    title: 'بعدا گوش میدم',
                    url: '/listenLater',
                    disable: false
                },
            ],
            aboutNavigation: [
                {
                    id: 7,
                    icon: 'mdi-phone-in-talk',
                    title: 'تماس با پادی',
                    url: '/contact-us'
                }
            ],
            subscriptions: [],
        }),
        methods: {
            userPageNavigation(id) {
                this.$router.push('/publisher/' + id);
            },
            buttonRedirect(url) {
                if (url === '/') {
                    this.$router.push('/')
                }
                if (url === '/history') {
                    this.$router.push('/history')
                }
                if (url === '/listenLater') {
                    this.$router.push('/listenLater')
                }
                if (url === '/myPodcasts') {
                    this.$router.push('/myPodcasts')
                }
                if (url === '/subscriptions') {
                    this.$router.push('/subscriptions')
                }
                if (url === '/contact-us') {
                    this.$router.push('/contact-us')
                }
                if (url === '/trending') {
                    this.$router.push('/trending')
                }
                if (url === '/Login') {
                    window.location.href = "/Login"
                }
                if (url === '/search') {
                    this.$router.push("/search/ ")
                }
            },
            userLogin() {
                this.isLogin = this.$store.getters.userLogin;
            }
        },
        computed: {
            userIsLogin() {
                return this.$store.getters.userLogin;
            }
        },
        mounted() {
            this.userLogin();
            this.currentUrl = window.location.pathname;

        },
        created() {
            setInterval(() => {
                if (this.$vuetify.breakpoint.mdAndUp) {
                    if (this.$store.getters.userLogin === true) {
                        axios.get("http://localhost:8084/api/user/list/subscriptions/sidenav/" + this.$store.state.user[0].userId).then(response => {
                            this.subscriptions = response.data;
                        });
                    }
                }
            }, 2000)
        },
    }
</script>

<style scoped>
    @import "../assets/Styles/FontiranSans.css";
    @import "../assets/Styles/GlobalPurposeStyle.css";

    .appDrawer {
        width: 15%;
        height: 100%;
        position: fixed;
        float: right;
        z-index: 1;
        background-color: #fff;
    }

    .miniAppDrawer {
        width: 5%;
        height: 100%;
        position: fixed;
        float: right;
        z-index: 1;
        background-color: #fff;
        overflow-y: auto;
    }

    #sideNavigation::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    #sideNavigation::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    #sideNavigation::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    #sideNavigation::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .listTitle {
        font-size: 1.0rem;
        font-weight: 300;
        text-align: right;
        direction: rtl;
    }
</style>
