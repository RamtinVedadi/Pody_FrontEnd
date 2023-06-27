<template>
    <div class="fontMain">
        <!--PC Mode-->
        <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
             v-show="$vuetify.breakpoint.mdAndUp">
            <div v-if="podcasts.length === 0">
                <Loader/>
            </div>
            <div v-else>
                <v-row class="mt-5 mr-5">
                    <h2>پادکست های اکانت های دنبال شده</h2>
                    <v-spacer></v-spacer>
                    <v-text-field class="ml-5" solo flat hide-details autofocus
                                  rounded clearable disabled background-color="#ddd"
                                  color="primary" label="جست و جو" style="width: 300px;"
                                  prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                </v-row>
                <v-row class="mt-8" no-gutters>
                    <v-flex v-for="item in podcasts" :key="item.podcastId">
                        <CardPlayer :item="item" :title-count="18"/>
                        <br/>
                        <br/>
                    </v-flex>
                </v-row>
                <v-row v-if="isEnd === false">
                    <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
                </v-row>
                <v-row v-else>
                    <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
                </v-row>
                <div style="height: 100px;"></div>
            </div>
        </div>
        <!--Tablet Mode-->
        <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
             v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
            <div v-if="podcasts.length === 0">
                <Loader/>
            </div>
            <div v-else>
                <v-row class="mt-5 mr-5">
                    <h2>پادکست های اکانت های دنبال شده</h2>
                    <v-spacer></v-spacer>
                    <v-text-field class="ml-5" solo flat hide-details autofocus
                                  rounded clearable disabled background-color="#ddd"
                                  color="primary" label="جست و جو" style="width: 300px;"
                                  prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                </v-row>
                <v-row class="mt-8" no-gutters>
                    <v-flex v-for="item in podcasts" :key="item.podcastId">
                        <CardPlayer :item="item" :title-count="16"/>
                        <br/>
                        <br/>
                    </v-flex>
                </v-row>
                <v-row v-if="isEnd === false">
                    <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
                </v-row>
                <v-row v-else>
                    <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
                </v-row>
                <div style="height: 100px;"></div>
            </div>
        </div>
        <!--Mobile Mode-->
        <div class="pageXsOnlyAndMsOnly"
             v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
            <div v-if="podcasts.length === 0">
                <Loader/>
            </div>
            <div v-else>
                <v-row class="mt-5 mr-5">
                    <h2>پادکست های اکانت های دنبال شده</h2>
                    <v-spacer></v-spacer>
                    <v-text-field class="ml-5" solo flat hide-details autofocus
                                  rounded clearable disabled background-color="#ddd"
                                  color="primary" label="جست و جو" style="width: 300px;"
                                  prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                </v-row>
                <v-row class="mt-8" no-gutters>
                    <v-flex v-for="item in podcasts" :key="item.podcastId">
                        <MobileCardPlayer :item="item"/>
                        <v-divider style="color: #464646;" :inset="false"></v-divider>
                    </v-flex>
                </v-row>
                <v-row v-if="isEnd === false">
                    <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
                </v-row>
                <v-row v-else>
                    <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
                </v-row>
                <div style="height: 100px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import MobileCardPlayer from "../../components/cards/MobileCardPlayer";
    import InfiniteLoading from 'vue-infinite-loading';
    import CardPlayer from "../../components/cards/CardPlayer";
    import Loader from "../../components/tools/Loader";
    import axios from 'axios';

    export default {
        layout: "pody",
        name: "following",
        components: {MobileCardPlayer, Loader, CardPlayer, InfiniteLoading},
        async asyncData(context) {
            return axios.post('http://localhost:8084/api/podcast/list/followings/' + 0 + '/' + 20, {id: context.store.state.user[0].userId}).then((response) => {
                return {
                    podcasts: response.data,
                }
            });
        },
        data: () => ({
            podcasts: [],
            loadMore: false,
            isEnd: false,
            till: 0,
            to: 20,
        }),
        methods: {
            onScroll(e) {
                this.offsetTop = e.target.scrollTop;
            },
            async loadMorePodcasts($state) {
                this.till += 1;
                await this.$axios.post('http://localhost:8084/api/podcast/list/followings/' + this.till + '/' + this.to, {id: 'fde74f03-3ecb-4151-9ca9-416b23d340c2'}).then((response) => {
                    if (response.status === 200) {
                        const result = response.data;
                        if (result.length > 0) {
                            this.podcasts = this.podcasts.concat(result);
                            $state.loaded();
                        } else {
                            this.isEnd = true;
                        }
                    }
                });
            },
        },
        head() {
            return {
                title: "پادی | دنبال شده ها",
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";
    @import "../../assets/Styles/PageSizingStyle.css";
</style>
