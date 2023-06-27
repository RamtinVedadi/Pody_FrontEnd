<template>
    <div class="fontMain">
        <!--PC Mode-->
        <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
             v-show="$vuetify.breakpoint.mdAndUp">
            <div v-if="podcasts.length === 0">
                <Loader/>
            </div>
            <div v-else>
                <div class="views">
                    <h2 class="mx-7">پادکست های پیشنهادی</h2>
                    <v-spacer></v-spacer>
                    <v-text-field class="ml-5" solo flat hide-details
                                  autofocus rounded clearable disabled
                                  background-color="#ddd" color="primary"
                                  label="جست و جو" style="width: 300px;"
                                  prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                </div>
                <br/><br/>
                <v-row class="mr-auto" no-gutters>
                    <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
                        <CardPlayer :item="item" :title-count="18"/>
                        <br/>
                        <br/>
                    </v-flex>
                </v-row>
                <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
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
                <div class="views">
                    <h2 class="mx-7">پادکست های پیشنهادی</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                            class="ml-5"
                            solo
                            flat
                            hide-details
                            autofocus
                            rounded
                            clearable
                            disabled
                            background-color="#ddd"
                            color="primary"
                            label="جست و جو"
                            style="width: 300px;"
                            prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                </div>
                <br>
                <br>
                <v-row class="mr-auto" no-gutters>
                    <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
                        <CardPlayer :item="item" :title-count="16"/>
                        <br/>
                        <br/>
                    </v-flex>
                </v-row>
                <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
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
                <div class="views">
                    <h2 class="mx-7">پادکست های پیشنهادی</h2>
                </div>
                <br>
                <br>
                <v-row class="mr-auto" no-gutters>
                    <v-flex v-for="item in podcasts" :key="item.podcastId">
                        <MobileCardPlayer :item="item"/>
                        <v-divider style="color: #464646;" :inset="false"></v-divider>
                    </v-flex>
                </v-row>
                <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
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
        name: "suggestions",
        components: {MobileCardPlayer, Loader, CardPlayer, InfiniteLoading},
        async asyncData(context) {
            axios.get('http://localhost:8084/api/podcast/list/suggested/' + context.till + '/' + context.to).then((response) => {
                return {
                    podcasts: response.data,
                }

            });
        },
        data: () => ({
            alignment: 'center',
            justify: 'center',
            offsetTop: 0,
            show: false,
            podcasts: [],
            till: 0,
            to: 20,
        }),
        methods: {
            onScroll(e) {
                this.offsetTop = e.target.scrollTop;
            },
            async loadMorePodcasts($state) {
                this.till += 1;
                await this.$axios.get('http://localhost:8084/api/podcast/list/suggested/' + this.till + '/' + this.to).then((response) => {
                    if (response.status === 200) {
                        this.podcasts = this.podcasts.concat(response.data);
                        $state.loaded();
                    }
                });
            },
        },
        head() {
            return {
                title: "پادی | پیشنهادات",
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/PlayCardStyle.css";
    @import "../../assets/Styles/FontiranSans.css";
    @import "../../assets/Styles/PageSizingStyle.css";

    .views {
        display: flex;
        margin-top: 20px;
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
</style>
