<template>
  <div class="fontMain">
    <!--PC Mode-->
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <div v-if="pageLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <v-row class="mr-2 pt-8 pr-1">
          <strong style="font-size: 20px"><b>پادکست های من</b></strong>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-btn class="ma-2" large outlined color="primary" @click="uploadPageNavigate">
              اضافه کردن اپیزود جدید
              <v-icon right>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4">
            <v-text-field class="pt-1" solo flat hide-details autofocus
                          rounded clearable disabled background-color="#ddd"
                          color="primary" label="جست و جو" style="width: 300px;"
                          prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider>

        </v-divider>

        <div v-if="podcasts.length === 0">
          <v-row style="justify-content: center;">
            <v-card-text style="font-size: 20px">اولین پادکست خود را آپلود کنید</v-card-text>
          </v-row>
          <v-row style="height: 50rem ;width:100%" class="justify-center">
            <div class="pt-12 ">
              <v-img src="../assets/no_podcast.png">
              </v-img>
            </div>
          </v-row>
        </div>
        <div v-else>
          <v-row style="height: 20px"></v-row>
          <v-row no-gutters>
            <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
              <CardPlayer :item="item" :title-count="18"/>
              <br>
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
    <!--Tablet Mode-->
    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <div v-if="podcasts.length === 0">
        <Loader/>
      </div>
      <div v-else>
        <v-row class="mr-2" style="padding-top: 20px">
          <strong style="font-size: 20px"><b>پادکست های من</b></strong>
        </v-row>
        <v-row>
          <v-col>
            <v-btn class="ma-2"
                   large
                   color=primary>
              اضافه کردن اپیزود جدید
              <v-icon right>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col></v-col>
          <v-col>
            <v-text-field class="pt-1" solo flat hide-details autofocus
                          rounded clearable disabled background-color="#ddd"
                          color="primary" label="جست و جو" style="width: 300px;"
                          prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-divider>

          </v-divider>
        </v-row>
        <div v-if="!podcasts.length>0">
          <v-row>
            <v-col cols="5">

            </v-col>
            <v-col cols="4">
              <v-img src="../assets/no_podcast.png" style="width: 50%;height: 50%">
              </v-img>
            </v-col>
            <v-col cols="2">
            </v-col>
          </v-row>
          <v-row style="justify-content: center;">
            <v-card-text style="font-size: 20px">اولین پادکست خود را آپلود کنید</v-card-text>
          </v-row>
          <v-row style="justify-content: center;">
            <v-btn color="orange" dark>
              اضافه کن
              <v-icon right>mdi-cloud-upload-outline</v-icon>
            </v-btn>
          </v-row>
        </div>
        <div v-else>
          <v-row style="height: 20px"></v-row>
          <v-row no-gutters>
            <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
              <CardPlayer :item="item" :title-count="18"/>
              <br>
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
    <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <v-row class="mr-3 mt-1"><span style="font-size: 15px"><h2>پادکست های من</h2></span></v-row>
      <v-row>
        <v-col cols="2">
          <div>
            <v-btn class="ma-2"
                   x-small
                   color=primary>
              اضافه کردن اپیزود جدید

              <v-icon right>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6"></v-col>
        <v-col cols="4">
        </v-col>
      </v-row>
      <v-row>
        <v-divider>

        </v-divider>
      </v-row>
      <div v-if="podcasts.length>0">
        <v-row>
          <v-col cols="5">

          </v-col>
          <v-col cols="4">
            <div>
              <v-img src="../assets/no_podcast.png" style="width: 50%;height: 50%">

              </v-img>
            </div>
          </v-col>
          <v-col cols="2">

          </v-col>
        </v-row>
        <v-row style="justify-content: center;">
          <div>
            <v-card-text style="font-size: 20px">اولین پادکست خود را آپلود کنید</v-card-text>
          </div>
        </v-row>
        <v-row style="justify-content: center;">
          <div>
            <v-btn color="orange" dark>
              اضافه کن
              <v-icon right>mdi-cloud-upload-outline</v-icon>
            </v-btn>
          </div>
        </v-row>
      </div>
      <div v-else>
        <v-row style="height: 20px"></v-row>
        <v-row no-gutters>
          <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
            <MobileCardPlayer/>
          </v-flex>
        </v-row>
        <v-row v-if="isEnd === false">
          <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
        </v-row>
        <v-row v-else>
          <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
        </v-row>
        <div style="height: 160px;"></div>
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
    name: "MyPodcasts",
    components: {MobileCardPlayer, Loader, CardPlayer, InfiniteLoading},
    async asyncData(context) {
      if (context.store.getters.userLogin === false) {
        console.log(context.store.state.user[0].userId);
        context.isLogin = false
      } else {
        context.isLogin = true;
        return axios.get("http://localhost:8084/api/podcast/list/" + context.store.state.user[0].userId + "/user/" + context.till + "/" + context.to).then(response => {
          if (response.status === 200) {
            console.log(context.store.state.user[0].userId);
            return {
              pageLoading: true,
              podcasts: response.data,
            }
          }
        })
      }
    },
    data: () => ({
      podcasts: [],
      isLogin: false,
      pageLoading: false,
      isEnd: false,
      till: 0,
      to: 20
    }),
    methods: {
      loadMorePodcasts($state) {
        this.till += 1;
        axios.get("http://localhost:8084/api/podcast/list/" + this.$store.state.user[0].userId + "/user/" + this.till + "/" + this.to).then((response) => {
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
      uploadPageNavigate() {
        this.$router.push('/upload/podcast');
      }
    },
    created() {
      // axios.get("http://localhost:8084/api/podcast/list/0/" + this.$store.state.user[0].userId + "/user/" + 0 + "/" + 20).then(response => {
      //   this.pageLoading = true;
      //   this.podcasts = response.data.published;
      //   this.unpublished = response.data.unpublished;
      // });
    },
    mounted() {
      setTimeout(() => {
        axios.get("http://localhost:8084/api/podcast/list/0/" + this.$store.state.user[0].userId + "/user/" + 0 + "/" + 20).then(response => {
          this.pageLoading = true;
          this.podcasts = response.data.published;
          this.unpublished = response.data.unpublished;
        });
      }, 2000)

    },
    head() {
      return {
        title: "پادی | پادکست های من",
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/Styles/FontiranSans.css";
  @import "../../assets/Styles/PageSizingStyle.css";
</style>
