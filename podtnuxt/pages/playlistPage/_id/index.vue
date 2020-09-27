<template>
  <div class="fontMain">
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <div style="flex: 1;height: 75%" class="pb-4">
        <div class="views">
          <h2 class="mx-7" style="font-size: 20px">کانال های {{this.pageTitle}}</h2>
          <v-spacer></v-spacer>
        </div>
        <br>
        <div class="user-cat" style="display: flex;">
          <div style="display: block">
            <div v-for="(item , index) in channels" :key="index" style="display: inline-block">
              <div style="margin: 10px 10px 0 0;">
                <v-row justify="center">
                  <v-btn class="mx-5" width="100px" height="100px"
                         @click="toChannel(item.id)">
                    <v-avatar class="profile"
                              color="grey"
                              size="100"
                              tile>
                      <img :src="item.image" width="100px" height="100px">
                    </v-avatar>
                  </v-btn>
                </v-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="mostView.length !== 0">
          <div class="views">
            <h2 class="mx-7" style="font-size: 20px">پادکست های {{this.pageTitle}}</h2>
            <v-spacer>
            </v-spacer>
          </div>
          <br>
          <div style="position: relative;width: 100%">
            <v-row no-gutters>
              <v-flex v-for="(item) in mostView" :key="item.podcastId" shrink>
                <CardPlayer :item="item" :title-count="18"/>
                <br/>
                <br/>
              </v-flex>
            </v-row>
          </div>
        </div>
      </div>
    </div>
    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <div style="flex: 1;height: 75%" class="pb-4">
        <div class="views">
          <h2 class="mx-7" style="font-size: 20px">کانال های {{this.pageTitle}}</h2>
          <v-spacer></v-spacer>
        </div>
        <br>
        <div v-if="mobileUsers.length !== 0">
          <div class="flexi">
            <v-flex v-for="item in mobileUsers" :key="item.id">
              <MobileCardChannels :item="item"/>
              <!--<v-divider style="color: #464646;" :inset="false"></v-divider>-->
            </v-flex>
          </div>
        </div>
      </div>
      <div>
        <div v-if="secondPart.length !== 0">
          <div class="views">
            <h2 class="mx-7" style="font-size: 20px">پادکست های {{this.pageTitle}}</h2>
            <v-spacer>
            </v-spacer>
          </div>
          <br>


          <v-flex v-for="item in secondPart" :key="item.podcastId">
            <MobileCardPlayer :item="item"/>
            <v-divider style="color: #464646;" :inset="false"></v-divider>
          </v-flex>


        </div>
      </div>
    </div>
    <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <div style="flex: 1;height: 75%" class="pb-4">
        <div class="views">
          <h2 class="mx-7" style="font-size: 20px">کانال های {{this.pageTitle}}</h2>
          <v-spacer></v-spacer>
        </div>
        <br>
        <div v-if="mobileUsers.length !== 0">
          <div class="flexi">
            <v-flex v-for="item in mobileUsers" :key="item.id">
              <MobileCardChannels :item="item"/>
              <!--<v-divider style="color: #464646;" :inset="false"></v-divider>-->
            </v-flex>
          </div>
        </div>
      </div>
      <div>
        <div v-if="secondPart.length !== 0">
          <div class="views">
            <h2 class="mx-7" style="font-size: 20px">پادکست های {{this.pageTitle}}</h2>
            <v-spacer>
            </v-spacer>
          </div>
          <br>
          <v-flex v-for="item in secondPart" :key="item.podcastId" shrink>
            <MobileCardPlayer :item="item"/>
            <br/>
            <br/>
          </v-flex>
        </div>
      </div>
      <div style="height: 120px"></div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import CardPlayer from "../../../components/cards/CardPlayer";
  import MobileCardPlayer from "../../../components/cards/MobileCardPlayer";
  import MobileCardChannels from "../../../components/cards/MobileCardChannels";

  export default {
    name: "playlistPage",
    layout: "pody",
    components: {CardPlayer, MobileCardPlayer, MobileCardChannels},
    data: () => ({
      channels: [
        {
          name: "Germany",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "",
        },
        {
          name: "English",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "",
        },
        {
          name: "Turkish",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "",
        },
        {
          name: "French",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "",
        },
        {
          name: "Farsi",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "",
        },
      ],
      podcasts: [],
      siteLoading: false,
      mostView: [],
      secondPart: [],
      pageTitle: "انگلیسی",
      mobileUsers: [],
    }),
    created() {
      axios.post("http://localhost:8084/api/podcast/list/home", {id: null}, {timeout: 12000}).then((response) => {
        if (response.status === 200) {
          this.siteLoading = true;
          //Most Viewed
          this.mostView = response.data.mostView;
        }
      });
      axios.post("http://localhost:8084/api/podcast/list/home/mobile", {id: null}).then((response) => {
        if (response.status === 200) {
          this.mobileLoading = true;
          //Second Part
          this.secondPart = response.data.partTwo;
          //users
          this.mobileUsers = response.data.users;
        }
      });
    },
    methods: {
      toChannel(id) {
        this.$router.push('/playlistPage/' + id);
      }
    },
    head() {
      return {
        title: "پلی لیست " + this.pageTitle,
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
