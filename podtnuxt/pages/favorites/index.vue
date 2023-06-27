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
                    <h2>محبوب ترین ها</h2>
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
                    <h2>محبوب ترین ها</h2>
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
        <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
            <div v-if="podcasts.length === 0">
                <Loader/>
            </div>
            <div v-else>
                <v-row><h2 class="mt-2 mr-5">محبوب ترین ها</h2></v-row>
                <v-row class="mt-4">
                    <v-flex v-for="item in podcasts" :key="item.podcastId">
                        <MobileCardPlayer :item="item"/>
                        <v-divider style="color: #464646;" :inset="false"></v-divider>
                    </v-flex>
                    <v-row v-if="isEnd === false">
                        <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
                    </v-row>
                    <v-row v-else>
                        <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
                    </v-row>
                    <div style="height: 100px;"></div>
                </v-row>
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
        name: "favorites",
        components: {MobileCardPlayer, Loader, CardPlayer, InfiniteLoading},
        data: () => ({
            podcasts: [],
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
                await this.$axios.get('http://localhost:8084/api/podcast/list/like/' + this.till + '/' + this.to).then((response) => {
                    this.isEnd = false;
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
            async created() {
                await this.$axios.get('http://localhost:8084/api/podcast/list/like/' + this.till + '/' + this.to).then((response) => {
                    this.podcasts = response.data;
                });
            },
        },
        created() {
        },
        head() {
            return {
                title: "پادی | محبوب ترین ها",
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/PageSizingStyle.css";
    @import "../../assets/Styles/FontiranSans.css";
</style>
