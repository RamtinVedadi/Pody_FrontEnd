<template>
    <div>
        <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
             v-show="$vuetify.breakpoint.mdAndUp">
            <div v-if="siteLoading === false">
                <Loader/>
            </div>
            <div v-else>
                <CarouselSlider/>

                <div v-if="categories.length !== 0">
                    <div class="views">
                        <span class="mx-7">دسته بندی پادکست ها</span>
                        <v-spacer>

                        </v-spacer>
                        <router-link to="/category" class="viewAll mx-7">
                            <span>مشاهده همه >></span>
                        </router-link>
                    </div>
                    <div style="position: relative;width: 100%">
                        <v-row class="flexi mb-4 " id="smallBlog" draggable="true">
                            <v-layout style="z-index: 0;width: 100%">
                                <v-flex class="" shrink v-for="(items,index) in categories" :key="items.id">
                                    <v-btn text @click="categoryPageNavigation(items.id)" class="pl-1 pr-1">
                                        <v-chip class="primary" v-if="index %2 == 0" style="cursor: pointer">
                                            <v-icon right class="pl-8 pr-2">
                                                {{items.imageAddress}}
                                            </v-icon>
                                            {{items.name}}
                                        </v-chip>
                                        <v-chip color="#606060" v-else style="cursor: pointer">
                                            <v-icon right class="pl-8 pr-2" color="white">
                                                {{items.imageAddress}}
                                            </v-icon>
                                            <span style="color: white">{{items.name}}</span>
                                        </v-chip>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-row>
                        <v-layout
                                style="height: 50px;position: absolute;top: 0%;right: 0;z-index: 1;justify-items: start;align-items: start ">
                            <v-btn
                                    style="width: 40px;height: 40px;opacity: 0.7;background: linear-gradient(90deg, rgba(254,115,27,1) 0%, rgba(255,255,255,1) 100%);"
                                    class="ma-0" large raised fab color="#ffffff"
                                    v-on:click="moveRight">
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-layout>
                        <v-layout
                                style="height: 50px;position: absolute;top: 0%; left: 0 ;z-index: 1;justify-items: end;align-items: start ">
                            <v-btn
                                    style="width: 40px;height: 40px;opacity: 0.7;background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(254,115,27,1) 100%)"
                                    id="btn1" class="ma-0" large raised fab
                                    v-on:click="moveLeft">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                        </v-layout>
                    </div>
                </div>

                <div v-if="suggestions.length !== 0">
                    <div class="views">
                        <span class="mx-7">پادکست های پیشنهادی</span>
                        <v-spacer>
                        </v-spacer>
                        <router-link to="/suggestions" class="viewAll mx-7">
                            <span>مشاهده همه >></span>
                        </router-link>
                    </div>
                    <div class="flexi ma-4">
                        <v-flex shrink v-for="(item) in suggestions" :key="item.podcastId">
                            <CardPlayer :item="item" :title-count="18"/>
                            <br/>
                            <br/>
                        </v-flex>
                    </div>
                </div>

                <div v-if="posts.length !== 0">
                    <div class="views">
                        <span class="mx-7">آخرین اخبار پادکستر ها</span>
                        <v-spacer>

                        </v-spacer>
                        <router-link class="viewAll mx-7" to="/news">
                            <span>مشاهده همه >></span>
                        </router-link>
                    </div>

                    <div class="flexi ma-4">
                        <v-flex v-for="item in posts" :key="item.id" shrink>
                            <CardNews :item="item"/>
                            <br/>
                            <br/>
                        </v-flex>
                    </div>
                </div>

                <div v-if="newAdded.length !== 0">
                    <div class="views">
                        <span class="mx-7">جدیدترین پادکست ها</span>
                        <v-spacer>

                        </v-spacer>
                        <router-link class="viewAll mx-7" to="/Newest">
                            <span>مشاهده همه >></span>
                        </router-link>
                    </div>

                    <div class="flexi ma-4">
                        <v-flex v-for="(item) in newAdded" :key="item.podcastId" shrink>
                            <CardPlayer :item="item" :title-count="18"/>
                            <br/>
                            <br/>
                        </v-flex>
                    </div>
                </div>

                <div>
                    <div class="views">
                        <v-row class="pb-4">
                            <span class="mx-7">معرفی دسته بندی ها</span>
                        </v-row>
                    </div>
                    <v-row class="mr-4">
                        <v-card style="width: 95%" flat>
                            <v-tabs
                                    vertical
                                    v-model="currentItem"
                                    grow
                            >
                                <v-col cols="2" class="pr-4">
                                    <v-tab
                                            class="align-content-space-between mt-3 tabs-cat"
                                            v-for="(item,index) in introduction"
                                            :key="index"
                                            :href="'#tab-' + index"
                                            active-class="tab-active-class"
                                            style="color: black;width: 150px;border: 1px solid #9f9f9f;border-radius: 5px"
                                    >
                                        <v-row class=" align-center" justify="center">
                                            <div>
                                                <v-icon class="pl-2" size="18px"> {{item.imageAddress}}
                                                </v-icon>
                                            </div>
                                            <div>
                                            <span :aria-label="item.name"
                                                  style="width: 50px;font-size: 15px;font-weight: 500;overflow: hidden">{{item.name}}</span>
                                            </div>
                                        </v-row>
                                    </v-tab>

                                </v-col>
                                <v-tabs-items v-model="currentItem" vertical>
                                    <v-tab-item
                                            v-for="(item,index) in introduction"
                                            :key="index"
                                            :value="'tab-' + index"
                                    >
                                        <div class="flexi">
                                            <v-col cols="4" style="text-decoration: none">
                                                <p style="text-align: justify;font-size: 14px;line-height: 1.5rem;text-decoration: none"
                                                   v-html="item.description"></p>
                                            </v-col>
                                            <v-col cols="8">
                                                <v-row v-if="item.podcasts.length >0">
                                                    <v-col cols="6">
                                                        <CardPlayer :item="item.podcasts[0]" :title-count="18"/>
                                                    </v-col>
                                                    <v-col cols="6">
                                                        <CardPlayer :item="item.podcasts[1]" :title-count="18"/>
                                                    </v-col>
                                                </v-row>
                                                <v-row v-else class="justify-center align-center">
                                                    <span>
                                                        هنوز برای این دسته بندی پادکستی تولید نشده است.
                                                    </span>
                                                </v-row>

                                            </v-col>
                                        </div>
                                    </v-tab-item>
                                </v-tabs-items>
                                <v-col cols="8">
                                </v-col>
                            </v-tabs>
                        </v-card>

                    </v-row>
                </div>

                <div v-if="mostLike.length !== 0">
                    <div class="views">
                        <span class="mx-7">محبوب ترین پادکست ها</span>
                        <v-spacer>

                        </v-spacer>
                        <router-link class="viewAll mx-7" to="/favorites">
                            <span>مشاهده همه >></span>
                        </router-link>
                    </div>

                    <div class="flexi ma-4">
                        <v-flex v-for="(item) in mostLike" :key="item.podcastId" shrink>
                            <CardPlayer :item="item" :title-count="18"/>
                            <br/>
                            <br/>
                        </v-flex>
                    </div>
                </div>

                <div v-if="followings.length !== 0">
                    <div class="views">
                        <span class="mx-7">پادکست های کانال های دنبال شده</span>
                        <v-spacer>

                        </v-spacer>
                        <router-link class="viewAll mx-7" to="/followings">
                            <span>مشاهده همه >></span>
                        </router-link>
                    </div>

                    <div class="flexi ma-4">
                        <v-flex v-for="(item) in followings" :key="item.podcastId" shrink>
                            <CardPlayer :item="item" :title-count="18"/>
                            <br/>
                            <br/>
                        </v-flex>
                    </div>
                </div>

                <div v-if="mostView.length !== 0">
                    <div class="views">
                        <span class="mx-7">پر بازدید ترین پادکست ها</span>
                        <v-spacer>

                        </v-spacer>
                        <router-link class="viewAll mx-7" to="/mostView">
                            <span>مشاهده همه >></span>
                        </router-link>
                    </div>

                    <div class="flexi ma-4">
                        <v-flex v-for="(item) in mostView" :key="item.podcastId" shrink>
                            <CardPlayer :item="item" :title-count="18"/>
                            <br/>
                            <br/>
                        </v-flex>
                    </div>
                </div>

                <div v-if="channels.length !== 0">
                    <div class="views">
                        <span class="mx-7">چنل های پادکست </span>
                        <v-spacer>

                        </v-spacer>
                        <router-link class="viewAll mx-7" to="/Channels">
                            <span>مشاهده همه >></span>
                        </router-link>
                    </div>

                    <div class="flexi ma-4 ">
                        <v-flex v-for="item in channels" :key="item.id" shrink>
                            <CardChannels :item="item.channelInfo" :listen-count="item.listenCount"/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </v-flex>
                    </div>
                </div>
                <br>

            </div>
        </div>
    </div>
</template>

<script>
    import CardPlayer from "../components/cards/CardPlayer";
    import CarouselSlider from "../components/tools/CarouselSlider";
    import CardNews from "../components/cards/CardNews";
    import Loader from "../components/tools/Loader";
    import axios from 'axios';
    import $ from "jquery";

    export default {
        layout: "pody",
        name: "HomePage1",
        components: {CardPlayer, CarouselSlider, Loader, CardNews},
        data() {
            return {
                currentItem: '',
                infinitePart: [],
                suggestions: [],
                mobileUsers: [],
                followings: [],
                categories: [],
                introduction: [],
                secondPart: [],
                secondNews: [],
                firstPart: [],
                firstNews: [],
                newAdded: [],
                mostView: [],
                mostLike: [],
                channels: [],
                posts: [],
                offsetTop: 0,
                fromNum: 0,
                toNum: 20,
                mobileLoading: false,
                siteLoading: true,
                subscribe: false,
                randomCategories: [],
                randomCatId: [],
                randomCatDes: [],
            }
        },
        methods: {
            onScroll(e) {
                this.offsetTop = e.target.scrollTop;
            },
            categoryPageNavigation(id) {
                this.$router.push('/category/' + id);
            },
            moveRight() {
                if (this.$vuetify.breakpoint.mdAndUp) {
                    $('#smallBlog').animate({
                        scrollLeft: '-=200'
                    }, 2000);
                }
                return false;
            },
            moveLeft() {
                if (this.$vuetify.breakpoint.mdAndUp) {
                    $('#smallBlog').animate({
                        scrollLeft: '+=200'
                    }, 2000);
                }
                return false;
            },
            channelsPageNavigation() {
                this.$router.push('/Channels');
            },
            loadMoreMobileEpisodes($state) {
                if (this.$store.getters.userLogin === false) {
                    this.fromNum += 1;
                    axios.post("http://localhost:8084/api/podcast/list/home/mobile/infinite/" + this.fromNum + "/" + this.toNum, {id: null}).then((response) => {
                        if (response.status === 200) {
                            this.infinitePart = this.infinitePart.concat(response.data);
                            $state.loaded();
                        }
                    });
                } else {
                    this.fromNum += 1;
                    axios.post("http://localhost:8084/api/podcast/list/home/mobile/infinite/" + this.fromNum + "/" + this.toNum, {id: this.$store.state.user[0].userId}).then((response) => {
                        if (response.status === 200) {
                            this.infinitePart = this.infinitePart.concat(response.data);
                            $state.loaded();
                        }
                    });
                }
            },
            googleAnalytics() {

            },
            getRandomCategories() {
                let y;
                let a;
                let categoriesList = [];
                while (categoriesList.length < 5) {
                    a = Math.floor(Math.random() * 18);
                    if (categoriesList.length < 1) {
                        categoriesList.push(a);
                    } else {
                        for (y = 0; y < categoriesList.length; y++) {
                            if (a == categoriesList[y]) {
                                break
                            } else {
                                categoriesList.push(a);
                            }
                        }
                    }
                    categoriesList = categoriesList.filter(this.onlyUnique);
                }
                this.randomCategories = categoriesList.filter(this.onlyUnique);

            },
            getCategoriesDescription(categ) {
                if (this.categories.length == 0) {
                    console.log("000")
                } else {
                    console.log(categ)
                    axios.post("http://localhost:8084/api/category/info", {id: categ}).then((response) => {
                        if (response.status === 200) {
                            this.randomCatDes.push(response.description);
                        }
                    });
                }
            },
            onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }
        },
        mounted() {
        },
        created() {
            if (this.$vuetify.breakpoint.xsOnly || this.$vuetify.breakpoint.smOnly) {
                if (this.$store.getters.userLogin === false) {
                    axios.post("http://localhost:8084/api/podcast/list/home/mobile", {id: null}).then((response) => {
                        if (response.status === 200) {
                            this.mobileLoading = true;
                            //Categories
                            this.categories = response.data.categories;
                            //First Part
                            this.firstPart = response.data.partOne;
                            //Second Part
                            this.secondPart = response.data.partTwo;
                            //FirstNews
                            this.firstNews = response.data.firstNews;
                            //Second News
                            this.secondNews = response.data.secondNews;
                            //users
                            this.mobileUsers = response.data.users;
                        }
                    });
                } else {
                    axios.post("http://localhost:8084/api/podcast/list/home/mobile", {id: this.$store.state.user[0].userId}).then((response) => {
                        this.mobileLoading = true;
                        //Categories
                        this.categories = response.data.categories;
                        //First Part
                        this.firstPart = response.data.partOne;
                        //Second Part
                        this.secondPart = response.data.partTwo;
                        //FirstNews
                        this.firstNews = response.data.firstNews;
                        //Second News
                        this.secondNews = response.data.secondNews;
                        //users
                        this.mobileUsers = response.data.users;
                    });
                }
            } else {
                if (this.$store.getters.userLogin === false) {
                    axios.post("http://localhost:8084/api/podcast/list/home", {id: null}, {timeout: 12000}).then((response) => {
                        if (response.status === 200) {
                            this.siteLoading = true;
                            //Categories
                            this.categories = response.data.categories;
                            //Suggestions
                            this.suggestions = response.data.suggestions;
                            //New Added
                            this.newAdded = response.data.newAdded;
                            //Most Viewed
                            this.mostView = response.data.mostView;
                            //Most Liked
                            this.mostLike = response.data.mostLike;
                            //Followings
                            this.followings = response.data.followings;
                            //News or podcaster Posts
                            this.posts = response.data.news;
                            //Channels
                            this.channels = response.data.users;
                            //categories Description
                            this.introduction = response.data.introduction;
                        }
                    });
                } else {
                    axios.post("http://localhost:8084/api/podcast/list/home", {id: this.$store.state.user[0].userId}).then((response) => {
                        if (response.status === 200) {
                            this.siteLoading = true;
                            //Categories
                            this.categories = response.data.categories;
                            //Suggestions
                            this.suggestions = response.data.suggestions;
                            //New Added
                            this.newAdded = response.data.newAdded;
                            //Most Viewed
                            this.mostView = response.data.mostView;
                            //Most Liked
                            this.mostLike = response.data.mostLike;
                            //Followings
                            this.followings = response.data.followings;
                            //News or podcaster Posts
                            this.posts = response.data.news;
                            //Channels
                            this.channels = response.data.users;
                            //categories Description
                            this.introduction = response.data.introduction;
                        }
                    });
                }
            }
            this.googleAnalytics();
            this.getRandomCategories();
        },
        head() {
            return {
                title: "پادی"
            }
        },

    }
</script>

<style scoped>
    @import "../assets/Styles/PlayCardStyle.css";
    @import "../assets/Styles/FontiranSans.css";
    @import "../assets/Styles/PageSizingStyle.css";
    @import "../assets/Styles/GlobalPurposeStyle.css";

    .views {
        display: flex;
        margin-top: 20px;
        font-size: 18px;
        font-weight: 400;
    }

    .viewAll {
        font-size: 14px;
    }

    .views h2 {
        font-size: 25px;
        color: #606060;
    }

    .views h3 {
        font-size: 17px;
        color: #aea7a6;
    }

    .views a {
        text-decoration: none;
    }

    .flexi {
        display: flex;
        flex-wrap: nowrap;
        overflow: scroll;
        overflow-y: hidden;
    }

    .flexi::-webkit-scrollbar {
        display: none;
    }

    .tab-active-class {
        background-color: #fe731b;
        color: white !important;
        border-radius: 5px;
        font-weight: 700;
    }

    .tabs-cat {
        -webkit-box-shadow: 5px 6px 10px 1px rgba(0, 0, 0, 0.62);
        -moz-box-shadow: 5px 6px 10px 1px rgba(0, 0, 0, 0.62);
        box-shadow: 5px 6px 10px 1px rgba(0, 0, 0, 0.62);
    }
</style>
