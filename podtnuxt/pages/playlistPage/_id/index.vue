<template>
    <div class="fontMain">
        <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
             v-show="$vuetify.breakpoint.mdAndUp">
            <div v-if="siteLoading === false">
                <Loader/>
            </div>
            <div v-else>
                <div style="flex: 1;height: 75%" class="pb-4">
                    <div class="views">
                        <h2 class="mx-7" style="font-size: 20px">کانال های {{this.playlistInfo.title}}</h2>
                        <v-spacer></v-spacer>
                    </div>
                    <br>
                    <div class="user-cat" style="display: flex;">
                        <div style="display: block">
                            <div v-for="(item , index) in channels" :key="index" style="display: inline-block">
                                <MobileCardChannels :item="item"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="views">
                        <h2 class="mx-7" style="font-size: 20px">{{this.playlistInfo.title}}</h2>
                        <v-spacer></v-spacer>
                    </div>
                    <br>
                    <div style="position: relative;width: 100%">
                        <v-row no-gutters>
                            <v-flex v-for="(item) in podcasts" :key="item.podcastId" shrink>
                                <CardPlayer :item="item" :title-count="18"/>
                                <br/>
                                <br/>
                            </v-flex>
                        </v-row>
                    </div>
                    <div style="height: 100px;"></div>
                </div>
            </div>
        </div>

        <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
             v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
            <div v-if="siteLoading === false">
                <Loader/>
            </div>
            <div v-else>
                <div style="flex: 1;height: 75%" class="pb-4">
                    <div class="views">
                        <h2 class="mx-7" style="font-size: 20px">کانال های {{this.playlistInfo.title}}</h2>
                        <v-spacer></v-spacer>
                    </div>
                    <br>
                    <div class="flexi">
                        <v-flex v-for="item in channels" :key="item.id" shrink>
                            <MobileCardChannels :item="item"/>
                        </v-flex>
                    </div>
                </div>
                <div>
                    <div class="views">
                        <h2 class="mx-7" style="font-size: 20px">پادکست های {{this.playlistInfo.title}}</h2>
                        <v-spacer>
                        </v-spacer>
                    </div>
                    <br>
                    <v-row class="pr-6">
                        <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
                            <!--<MobileCardPlayer :item="item"/>-->
                            <CardPlayer :item="item" title-count="16"/>
                            <br/>
                            <br/>
                        </v-flex>
                    </v-row>
                </div>
                <div style="height: 100px"></div>
            </div>
        </div>

        <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
            <div v-if="siteLoading === false">
                <Loader/>
            </div>
            <div v-else>
                <div style="flex: 1;height: 75%" class="pb-4">
                    <div class="views">
                        <h2 class="mx-7" style="font-size: 20px">کانال های {{this.playlistInfo.title}}</h2>
                        <v-spacer></v-spacer>
                    </div>
                    <br>
                    <div class="flexi">
                        <v-flex v-for="item in channels" :key="item.id" shrink>
                            <MobileCardChannels :item="item"/>
                        </v-flex>
                    </div>
                </div>
                <div>
                    <div class="views">
                        <h2 class="mx-7" style="font-size: 20px">پادکست های {{this.playlistInfo.title}}</h2>
                        <v-spacer>
                        </v-spacer>
                    </div>
                    <br>
                    <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
                        <MobileCardPlayer :item="item"/>
                    </v-flex>
                </div>
                <div style="height: 130px"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Loader from "../../../components/tools/Loader";
    import CardPlayer from "../../../components/cards/CardPlayer";
    import MobileCardPlayer from "../../../components/cards/MobileCardPlayer";
    import MobileCardChannels from "../../../components/cards/MobileCardChannels";

    export default {
        name: "playlistPage",
        layout: "pody",
        components: {MobileCardPlayer, Loader, CardPlayer, MobileCardChannels},
        async asyncData(context) {
            axios.post("http://localhost:8084/api/playlist/read", {id: context.route.params.id}).then((response) => {
                if (response.status === 200) {
                    return {
                        siteLoading: true,
                        playlistInfo: response.data.playlistInfo,
                        channels: response.data.playlistChannels,
                        podcasts: response.data.playlistPodcasts,
                    }
                }
            });
        },
        data() {
            return {
                channels: [],
                podcasts: [],
                siteLoading: false,
                playlistInfo: {}
            }
        },
        head() {
            return {
                title: "پلی لیست " + this.playlistInfo.title,
            }
        },
    };
</script>

<style scoped>
    @import "../../../assets/Styles/FontiranSans.css";
    @import "../../../assets/Styles/PageSizingStyle.css";
    @import "../../../assets/Styles/GlobalPurposeStyle.css";

    .playListPage {
        background-color: #f9f9f9;
        float: left;
    }

    #views ::after {
        content: '•';
    }

    #viewsXS ::after {
        content: '•';
    }

    .flexi {
        display: flex;
        flex-wrap: nowrap;
        overflow: auto;
        overflow-y: hidden;
        overflow-x: scroll;
    }

    .views {
        display: flex;
        margin-top: 20px;
    }
</style>
