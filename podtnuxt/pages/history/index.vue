<template>
  <div class="fontMain">
    <!--PC Mode-->
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <div v-if="isLogin === false">
        <NotLogin/>
      </div>
      <div v-else>
        <div v-if="pageLoading === false">
          <Loader/>
        </div>
        <div v-else>
          <div v-if="podcasts.length === 0" style="height: 100%">
            <v-row>
              <div class="views">
                <h2 class="mx-7">هیچ اپیزودی در تاریخچه شما موجود نیست</h2>
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
              <h2 class="mx-7">لیست تاریخچه گوش داده هاتون</h2>
              <v-spacer></v-spacer>
              <v-text-field class="ml-5" solo flat hide-details autofocus rounded
                            disabled clearable background-color="#ddd" color="primary"
                            label="جست و جو" style="width: 300px;" prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </div>
            <br>
            <br>
            <v-row no-gutters>
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
      </div>
    </div>
    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <div v-if="isLogin === false">
        <NotLogin/>
      </div>
      <div v-else>
        <div v-if="pageLoading === false">
          <Loader/>
        </div>
        <div v-else>
          <div class="views">
            <h2 class="mx-7">لیست تاریخچه گوش داده هاتون</h2>
            <v-spacer></v-spacer>
            <v-text-field
              class="ml-5" solo flat hide-details autofocus
              rounded clearable disabled background-color="#ddd"
              color="primary" label="جست و جو" style="width: 300px;"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
          <v-row no-gutters>
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
    </div>
    <div class="pageXsOnlyAndMsOnly"
         v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <div v-if="pageLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <v-row>
          <h2 class="mr-5 mt-2" style="font-size: 20px">لیست تاریخچه گوش داده هاتون</h2>
        </v-row>

        <v-row no-gutters>
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
        <div style="height: 160px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileCardPlayer from "../../components/cards/MobileCardPlayer";
  import InfiniteLoading from 'vue-infinite-loading';
  import CardPlayer from "../../components/cards/CardPlayer";
  import NotLogin from "../../components/errors/NotLogin";
  import Loader from "../../components/tools/Loader";
  import axios from 'axios';

  export default {
    layout: "pody",
    name: "History",
    components: {Loader, NotLogin, MobileCardPlayer, CardPlayer, InfiniteLoading},
    // async asyncData(context) {
    //   if (context.store.getters.userLogin === false) {
    //     console.log(context.store.getters.userLogin + " login");
    //     context.isLogin = false;
    //   } else {
    //     context.isLogin = true;
    //     return axios.get("http://localhost:8084/api/podcast/list/history/" + context.store.state.user[0].userId + "/user/" + 0 + "/" + 20)
    //       .then(response => {
    //         if (response.status === 200) {
    //           return {
    //             pageLoading: true,
    //             podcasts: response.data,
    //           }
    //         }
    //       });
    //   }
    // },
    data() {
      return {
        podcasts: [],
        page: 0,
        size: 20,
        pageLoading: false,
        isLogin: false,
        isEnd: false
      }
    },
    methods: {
      loadMorePodcasts($state) {
        this.page += 1;
        axios.get("http://localhost:8084/api/podcast/list/history/" + this.$store.state.user[0].userId + "/user/" + this.page + "/" + this.size).then((response) => {
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
    created() {
      console.log("created")
    },
    mounted() {
      console.log("mounted")
      console.log(this.$store.state.user[0].userId);
      if (this.$store.getters.userLogin === false) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
        console.log(this.$store.state.user[0].userId);
        axios.get("http://localhost:8084/api/podcast/list/history/" + this.$store.state.user[0].userId + "/user/" + this.page + "/" + this.size)
          .then(response => {
            if (response.status === 200) {
              this.pageLoading = true;
              this.podcasts = response.data;
            }
          });
      }
    },
    head() {
      return {
        title: "پادی | تاریخچه",
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
