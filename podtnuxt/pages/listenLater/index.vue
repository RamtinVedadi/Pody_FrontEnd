<template>
  <div class="fontMain">
    <!--PC Mode-->
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <div v-if="pageLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <div v-if="podcasts.length === 0" style="height: 100%">
          <v-row>
            <div class="views">
              <h2 class="mx-7">هیچ اپیزودی در لیست بعدا گوش میدم های شما موجود نیست</h2>
            </div>
          </v-row>
          <v-row style="height: 50rem ;width:100%" class="justify-center">
            <div class="pt-12 ">
              <v-img src="../assets/no_podcast.png">
              </v-img>
            </div>
          </v-row>
        </div>
        <div v-else>
          <div class="views">
            <h2 class="mx-7">لیست بعدا گوش میدم هاتون</h2>
            <v-spacer></v-spacer>
            <v-text-field class="ml-5" solo flat hide-details autofocus rounded
                          disabled clearable background-color="#ddd" color="primary"
                          label="جست و جو" style="width: 300px;" prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
          <br>
          <br>
          <v-row no-gutters>
            <v-flex v-if="podcasts.length !== 0" v-for="item in podcasts" :key="item.podcastId" shrink>
              <!--              <CardPlayer :item="item" :title-count="18"/>-->
              <br/>
              <br/>
            </v-flex>
          </v-row>

          <div v-if="firstLoadSize === 20">
            <div v-if="loadSize > 0">
              <InfiniteLoading @infinite="infiniteLoadingFunction" spinner="spiral"/>
            </div>
            <div v-else-if="loadSize === 0">
              <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
            </div>
          </div>
          <div style="height: 100px;"></div>
        </div>
      </div>
    </div>
    <!--Tablet Mode-->
    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <div v-if="pageLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <div v-if="podcasts.length === 0" style="height: 100%">
          <v-row>
            <div class="views">
              <h2 class="mx-7">هیچ اپیزودی در لیست بعدا گوش میدم های شما موجود نیست</h2>
            </div>
          </v-row>
          <v-row style="height: 50rem ;width:100%" class="justify-center">
            <div class="pt-12 ">
              <v-img src="../assets/no_podcast.png">
              </v-img>
            </div>
          </v-row>
        </div>
        <div v-else>
          <div class="views">
            <h2 class="mx-7">لیست بعدا گوش میدم هاتون</h2>
            <v-spacer></v-spacer>
            <v-text-field class="ml-5" solo flat hide-details autofocus rounded
                          disabled clearable background-color="#ddd" color="primary"
                          label="جست و جو" style="width: 300px;" prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
          <br>
          <br>
          <v-row no-gutters>
            <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
              <!--              <CardPlayer :item="item" :title-count="18"/>-->
              <br/>
              <br/>
            </v-flex>
          </v-row>

          <div v-if="firstLoadSize === 20">
            <div v-if="loadSize > 0">
              <InfiniteLoading @infinite="infiniteLoadingFunction" spinner="spiral"/>
            </div>
            <div v-else-if="loadSize === 0">
              <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
            </div>
          </div>
          <div style="height: 100px;"></div>
        </div>
      </div>
    </div>
    <!--Mobile Mode-->
    <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <div v-if="podcasts.length === 0" style="height: 100%">
        <v-row>
          <div class="views">
            <h2 class="mx-7">هیچ اپیزودی در لیست بعدا گوش میدم های شما موجود نیست</h2>
          </div>
        </v-row>
        <v-row style="height: 50rem ;width:100%" class="justify-center">
          <div class="pt-12 ">
            <v-img src="../assets/no_podcast.png">
            </v-img>
          </div>
        </v-row>
      </div>
      <div v-else>
        <v-row>
          <h2 class="mt-2 mr-5">لیست بعدا گوش میدهم ها</h2></v-row>
        <v-row class="mt-4">
          <v-flex v-for="item in podcasts" :key="item.podcastId">
            <!--            <MobileCardPlayer :item="item"/>-->
            <v-divider style="color: #464646;" :inset="false"></v-divider>
          </v-flex>
        </v-row>
        <div v-if="firstLoadSize === 20">
          <div v-if="loadSize > 0">
            <InfiniteLoading @infinite="infiniteLoadingFunction" spinner="spiral"/>
          </div>
          <div v-else-if="loadSize === 0">
            <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileCardPlayer from "../../components/cards/MobileCardPlayer";
  import CardPlayer from "../../components/cards/CardPlayer";
  import Loader from "../../components/tools/Loader";
  import axios from "axios";

  export default {
    layout: "pody",
    name: "ListenLater",
    components: {MobileCardPlayer, Loader, CardPlayer},
    async asyncData(context) {
      // return axios.post("http://localhost:8084/api/podcast/list/listenLater/" + 0 + "/" + 20, {
      //   id: context.store.state.user[0].userId
      // }).then((response) => {
      //   if (response.status === 200) {
      //     return {
      //       pageLoading: true,
      //       podcasts: response.data,
      //       firstLoadSize: response.data.length,
      //     }
      //   }else {
      //     return {
      //       pageLoading: false,
      //       podcasts: "",
      //     }
      //   }
      // });
    },
    data() {
      return {
        podcasts: [],
        page: 0,
        size: 24,
        loadSize: 0,
        firstLoadSize: 0,
        pageLoading: false,
      }
    },
    methods: {
      infiniteLoadingFunction($state) {
        this.page += 1;
        axios.post("http://localhost:8084/api/podcast/list/listenLater/" + this.page + "/" + this.size, {
          id: this.$store.state.user[0].userId
        }).then((response) => {
          const result = response.data;
          this.loadSize = result.length;
          this.podcasts = this.podcasts.concat(result);
          $state.loaded();
        });
      }
    },
    created() {
    },
    mounted() {
      setTimeout(() => {
        axios.post("http://localhost:8084/api/podcast/list/listenLater/" + 0 + "/" + 20, {
          id: this.$store.state.user[0].userId
        }).then((response) => {
          if (response.status === 200) {
            this.pageLoading = true;
            this.podcasts = response.data;
            this.firstLoadSize = this.podcasts.length;
          }
        });
      }, 2000)
    },
    head() {
      return {
        title: "پادی | بعداً گوش میدم",
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/Styles/FontiranSans.css";
  @import "../../assets/Styles/PageSizingStyle.css";

  .views {
    display: flex;
    margin-top: 20px;
  }

  .views h2 {
    font-size: 29px;
    color: #606060;
  }
</style>
