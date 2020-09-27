<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="fontMain">
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <div v-if="isLogin === false">
        <NotLogin/>
      </div>
      <div v-else>
        <div v-if="pageLoadAction === false">
          <Loader/>
        </div>
        <div v-else>
          <div class="views">
            <h2 class="mx-7">لیست پسندیده های من</h2>
            <v-spacer></v-spacer>
            <v-text-field class="ml-5" solo flat hide-details autofocus
                          rounded disabled clearable background-color="#ddd"
                          color="primary" label="جست و جو درون این بخش" style="width: 300px;"
                          prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
          <br>
          <br>
          <v-row no-gutters>
            <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
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
    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <div v-if="isLogin === false">
        <NotLogin/>
      </div>
      <div v-else>
        <div v-if="pageLoadAction === false">
          <Loader/>
        </div>
        <div v-else>
          <div class="views">
            <h2 class="mx-7">لیست پسندیده های من</h2>
            <v-spacer></v-spacer>
            <v-text-field class="ml-5" solo flat hide-details autofocus
                          rounded disabled clearable background-color="#ddd"
                          color="primary" label="جست و جو درون این بخش" style="width: 300px;"
                          prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
          <br>
          <br>
          <v-row no-gutters>
            <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
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
    <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <div v-if="pageLoadAction === false">
        <Loader/>
      </div>
      <div v-else>
        <v-row><h2 class="mt-2 mr-5">لیست پسندیده های من</h2></v-row>
        <v-row class="mt-4">
          <v-flex v-for="item in podcasts" :key="item.podcastId">
            <MobileCardPlayer :item="item"/>
            <v-divider style="color: #464646;" :inset="false"></v-divider>
          </v-flex>
        </v-row>
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
    components: {NotLogin, Loader, MobileCardPlayer, CardPlayer, InfiniteLoading},
    name: "MyLikes",
    async asyncData(context) {
      // if (context.store.getters.userLogin === false) {
      //   context.isLogin = false
      // } else {
      //   context.isLogin = true;
      //   return axios.get("http://localhost:8084/api/podcast/list/like/" + context.store.state.user[0].userId + "/user/" + 0 + "/" + 20).then(response => {
      //     if (response.status === 200) {
      //       return {
      //         pageLoadAction: true,
      //         podcasts: response.data,
      //       }
      //     }
      //   });
      // }
    },
    data() {
      return {
        podcasts: [],
        pageLoadAction: false,
        isLogin: false,
        isEnd: false,
        page: 0,
        size: 20,
      }
    },
    methods: {
      loadMorePodcasts($state) {
        this.page += 1;
        axios.get("http://localhost:8084/api/podcast/list/like/" + this.$store.state.user[0].userId + "/user/" + this.page + "/" + this.size).then(response => {
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
      if (this.$store.getters.userLogin === false) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
        axios.get("http://localhost:8084/api/podcast/list/like/" + this.$store.state.user[0].userId + "/user/" + this.page + "/" + this.size).then(response => {
          if (response.status === 200) {
            this.pageLoadAction = true;
            this.podcasts = response.data;
          }
        });
      }
    },
    head() {
      return {
        title: "پادی | پسندیده های من",
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/Styles/GlobalPurposeStyle.css";
  @import "../../assets/Styles/PageSizingStyle.css";
  @import "../../assets/Styles/FontiranSans.css";
</style>
