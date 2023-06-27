<template>
    <div class="fontMain">
        <!--PC Mode-->
        <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
             v-show="$vuetify.breakpoint.mdAndUp">
            <div v-if="category.length === 0 ">
                <Loader/>
            </div>
            <div v-else>
                <v-row class="mr-2" v-for="(cat,index) in category" :key="index">
                    <div v-if="cat.categoryPodcasts.length > 0">
                        <v-list-item class="mr-1">
                            <v-list-item-avatar size="50" color="primary" class="cursor"
                                                @click="categoryPageNavigation(cat.categoryInfo.id)">
                                <v-icon v-text="cat.categoryInfo.imageAddress" color="white"></v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-row>
                                    <v-col cols="1">
                                        <v-list-item-title class="titleCard pr-2 cursor"
                                                           @click="categoryPageNavigation(cat.categoryInfo.id)">
                                            {{cat.categoryInfo.name}}
                                        </v-list-item-title>
                                    </v-col>
                                    <v-col cols="6">
                                        <div v-if="!cat.isFollow">
                                            <v-btn outlined color="primary" width="150"
                                                   @click="categoryFollow(cat.categoryInfo.id , index)">
                                                subscribe
                                                <v-icon color="primary" size="20" style="padding: 0px 10px">
                                                    {{icons[1].name}}
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                        <div v-else>
                                            <v-btn color="primary" width="150"
                                                   @click="categoryUnFollow(cat.categoryInfo.id , index)">
                                                subscribed
                                                <v-icon color="white" size="19">
                                                    {{icons[2].name}}
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                        <div class="flexi mt-5" v-dragscroll>
                            <v-flex v-for="item in cat.categoryPodcasts" :key="item.podcastId" shrink>
                                <CardPlayer :item="item" :title-count="18"/>
                                <br/>
                                <br/>
                            </v-flex>
                        </div>
                    </div>
                </v-row>
                <Snackbar :snackbar="snackbar" :snackbar-text="snackbarText"/>
                <LoginDialog :dialog="dialog" :message="errorMessage"/>
                <br><br><br><br>
            </div>
        </div>
        <!--Tablet Mode-->
        <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
             v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
            <div v-if="category.length === 0 ">
                <Loader/>
            </div>
            <div v-else>
                <v-row class="mr-2" v-for="(cat,index) in category" :key="index">
                    <div v-if="cat.categoryPodcasts.length > 0">
                        <v-list-item class="mr-1">
                            <v-list-item-avatar size="50" color="primary">
                                <v-icon v-text="cat.categoryInfo.imageAddress" color="white"></v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-row>
                                    <v-col cols="1">
                                        <v-list-item-title class="titleCard pr-2">{{cat.categoryInfo.name}}
                                        </v-list-item-title>
                                    </v-col>
                                    <v-col cols="6">
                                        <div v-if="!cat.isFollow">
                                            <v-btn outlined color="primary" @click="cat.isFollow = !cat.isFollow"
                                                   width="150">
                                                subscribe
                                                <v-icon color="primary" size="20" style="padding: 0px 10px">
                                                    {{icons[1].name}}
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                        <div v-else>
                                            <v-btn color="primary" @click="cat.isFollow = !cat.isFollow" width="150">
                                                subscribed
                                                <v-icon color="white" size="19">
                                                    {{icons[2].name}}
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                        <div class="flexi mt-5">
                            <v-flex v-for="item in cat.categoryPodcasts" :key="item.podcastId">
                                <CardPlayer :item="item" :title-count="16"/>
                                <br/>
                                <br/>
                            </v-flex>
                        </div>
                    </div>
                </v-row>
                <Snackbar :snackbar="snackbar" :snackbar-text="snackbarText"/>
                <LoginDialog :dialog="dialog" :message="errorMessage"/>
                <br><br><br><br>
            </div>
        </div>
        <!--Mobile Mode-->
        <div class="pageXsOnlyAndMsOnly"
             v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
            <div v-if="category.length === 0 ">
                <Loader/>
            </div>
            <div v-else>
                <v-row class="mr-2" v-for="(cat,index) in category" :key="index">
                    <div v-if="cat.categoryPodcasts.length > 0">
                        <v-list-item class="mr-1">
                            <v-list-item-avatar size="50" color="primary">
                                <v-icon v-text="cat.categoryInfo.imageAddress" color="white"></v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-row>
                                    <v-col cols="1">
                                        <v-list-item-title class="titleCard pr-2">{{cat.categoryInfo.name}}
                                        </v-list-item-title>
                                    </v-col>
                                    <v-col cols="6">
                                        <div v-if="!cat.isFollow">
                                            <v-btn outlined color="primary" @click="cat.isFollow = !cat.isFollow"
                                                   width="150">
                                                subscribe
                                                <v-icon color="primary" size="20" style="padding: 0px 10px">
                                                    {{icons[1].name}}
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                        <div v-else>
                                            <v-btn color="primary" @click="cat.isFollow = !cat.isFollow" width="150">
                                                subscribed
                                                <v-icon color="white" size="19">
                                                    {{icons[2].name}}
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                        <div class="flexi mt-5">
                            <v-flex v-for="item in cat.categoryPodcasts" :key="item.podcastId">
                                <MobileCardPlayer :item="item"/>
                                <v-divider style="color: #464646;" :inset="false"></v-divider>
                            </v-flex>
                        </div>
                    </div>
                </v-row>
                <Snackbar :snackbar="snackbar" :snackbar-text="snackbarText"/>
                <LoginDialog :dialog="dialog" :message="errorMessage"/>
                <br><br><br><br>
            </div>
        </div>
    </div>
</template>

<script>
    import MobileCardPlayer from "../../components/cards/MobileCardPlayer";
    import LoginDialog from "../../components/tools/LoginDialog";
    import CardPlayer from "../../components/cards/CardPlayer";
    import Snackbar from "../../components/tools/Snackbar";
    import Loader from "../../components/tools/Loader";
    import axios from 'axios';

    export default {
        name: "category",
        layout: "pody",
        components: {LoginDialog, Snackbar, MobileCardPlayer, CardPlayer, Loader},
        async asyncData(context) {
            if (context.store.getters.userLogin === false) {
                return axios.post("http://localhost:8084/api/category/list/page", {id: null}).then((response) => {
                    return {
                        category: response.data,
                    }
                });
            } else {
                return axios.post("http://localhost:8084/api/category/list/page", {id: context.store.state.user[0].userId}).then((response) => {
                    return {
                        category: response.data,
                    }
                });
            }
        },
        data() {
            return {
                category: [],
                icons: [
                    {
                        name: "mdi-play-circle"
                    },
                    {
                        name: "mdi-bell"
                    },
                    {
                        name: "mdi-bell-check "
                    },
                ],
                isSubscribe: false,
                pageLoading: false,
                snackbar: false,
                dialog: false,
                errorMessage: 'یرای دنبال کردن دسته بندی شما باید در سایت ورود کرده باشید',
                snackbarText: '',
            }
        },
        methods: {
            categoryFollow(categoryId, index) {
                if (this.$store.getters.userLogin === false) {
                    this.dialog = true;
                } else {
                    axios.post("http://localhost:8084/api/follow/category/create", {
                        category: {
                            id: categoryId
                        },
                        follower: {
                            id: this.$store.state.user[0].userId
                        }
                    }).then((response) => {
                        const result = response.data.message;
                        if (result === 'SUCCESSFUL') {
                            this.category[index].isFollow = !this.category[index].isFollow;
                            this.snackbar = true;
                            this.snackbarText = "دسته " + this.this.category[index].categoryInfo.name + " دنبال شد ";
                        } else {
                            this.snackbar = true;
                            this.snackbarText = 'مشکلی پیش آمده ست یک یار دیگر امتحان کنید';
                        }
                    });
                }
            },
            categoryUnFollow(categoryId, index) {
                axios.delete("http://localhost:8084/api/follow/category/delete", {
                    data: {
                        first: categoryId,
                        second: this.$store.state.user[0].userId
                    }
                }).then((response) => {
                    const result = response.data.message;
                    if (result === 'SUCCESSFUL') {
                        this.category[index].isFollow = !this.category[index].isFollow;
                        this.snackbar = true;
                        this.snackbarText = 'دسته از لیست دنبال شده ها حذف گردید';
                    } else {
                        this.snackbar = true;
                        this.snackbarText = 'مشکلی پیش آمده ست یک یار دیگر امتحان کنید';
                    }
                });
            },
            categoryPageNavigation(id) {
                this.$router.push('/category/' + id);
            },
        },
        head() {
            return {
                title: "پادی | دسته بندی ها"
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/PlayCardStyle.css";
    @import "../../assets/Styles/FontiranSans.css";
    @import "../../assets/Styles/GlobalPurposeStyle.css";
    @import "../../assets/Styles/PageSizingStyle.css";

    .flexi {
        display: flex;
        flex-wrap: nowrap;
        overflow: scroll;
        overflow-y: hidden;
    }

    .flexi::-webkit-scrollbar {
        display: none;
    }

    .titleCard {
        font-size: 26px;
        text-align: right;
        justify-content: center;
        width: auto;
    }
</style>
