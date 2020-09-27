<template>
  <div class="fontMain">
    <!--PC Mode-->
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <div v-if="pageLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <div style="flex: 1;height: 23%" class="pb-4">
          <div class="user-cat" style="display: flex;">
            <div style="display: block">
              <div v-for="(items) in categories" :key="items.id" style="display: inline-block">
                <div style="margin: 15px 55px 0 0;">
                  <v-row justify="center">
                    <v-btn class="mx-2" fab dark large color="black" width="90px" height="90px"
                           @click="categoryPageNavigation(items.id)">
                      <v-icon size="38">
                        {{items.imageAddress}}
                      </v-icon>
                    </v-btn>
                  </v-row>
                  <v-row justify="center" style="text-align: center;font-size: 20px;cursor: pointer;"
                         class="pt-4"
                         @click="categoryPageNavigation(items.id)">
                    {{items.name}}
                  </v-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-divider class="pb-6"></v-divider>
        <div v-for="item in podcasts" :key="item.podcastId">
          <CardTrending :item="item"/>
        </div>
        <div style="height: 100px;"></div>
      </div>
    </div>
    <!--Tablet Mode-->
    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <div v-if="pageLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <div style="flex: 1;height: 23%" class="pb-4">
          <div class="user-cat" style="display: flex;">
            <div style="display: block">
              <div v-for="(items) in categories" :key="items.id" style="display: inline-block">
                <div style="margin: 15px 55px 0 0;">
                  <v-row justify="center">
                    <v-btn class="mx-2" fab dark large color="black" width="90px" height="90px"
                           @click="categoryPageNavigation(items.id)">
                      <v-icon size="38">
                        {{items.imageAddress}}
                      </v-icon>
                    </v-btn>
                  </v-row>
                  <v-row justify="center" style="text-align: center;font-size: 20px;cursor: pointer;"
                         class="pt-4"
                         @click="categoryPageNavigation(items.id)">
                    {{items.name}}
                  </v-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-divider class="pb-6"></v-divider>
        <div v-for="item in podcasts" :key="item.podcastId">
          <CardTrending :item="item"/>
        </div>
        <div style="height: 100px;"></div>
      </div>
    </div>
    <!--Mobile Mode-->
    <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <div v-if="pageLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <v-row class="flexi mr-4 mt-3" style="height: 100px">
          <div class="mr-4" v-for="item in categories" :key="item.id">
            <div style="width: 50px;height: 50px;text-align: center">
              <v-row class="justify-center">
                <v-btn fab small color="black" @click="categoryPageNavigation(item.id)">
                  <v-icon color="#ffffff">{{item.imageAddress}}</v-icon>
                </v-btn>
              </v-row>
              <v-row class="justify-center">
                            <span style="color: black" @click="categoryPageNavigation(item.id)">
                            {{item.name}}
                            </span>
              </v-row>
            </div>
          </div>
        </v-row>
        <v-flex v-for="item in podcasts" :key="item.podcastId">
          <MobileCardTrending :item="item"/>
        </v-flex>
        <v-row style="height: 160px"></v-row>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileCardTrending from "../../components/cards/MobileCardTrending";
  import CardTrending from "../../components/cards/CardTrending";
  import Loader from "../../components/tools/Loader";
  import axios from 'axios'

  export default {
    layout: "pody",
    name: "trending",
    components: {MobileCardTrending, CardTrending, Loader},
    data() {
      return {
        categories: [],
        podcasts: [],
        icons: [
          {
            name: "mdi-play-circle"
          },
        ],
        pageLoading: false,
      }
    },
    methods: {
      categoryPageNavigation(id) {
        this.$router.push('/categoryPage/' + id);
      },
    },
    async created() {
      await this.$axios.get("http://localhost:8084/api/podcast/list/trending").then((response) => {
        if (response.status === 200) {
          this.pageLoading = true;
          this.podcasts = response.data.podcasts;
          this.categories = response.data.categories;
        }
      });
    },
    head() {
      return {
        title: "پادی | محبوب ترین ها",
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/Styles/FontiranSans.css";
  @import "../../assets/Styles/PageSizingStyle.css";
  @import "../../assets/Styles/GlobalPurposeStyle.css";

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
</style>
