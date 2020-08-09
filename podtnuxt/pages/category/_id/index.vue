<template>
  <div class="fontMain">
    <!--PC Mode-->
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <div v-if="pageLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <v-row class="mr-2">
          <v-list-item class="mr-1">
            <v-list-item-avatar size="50" color="primary">
              <v-icon v-text="categoryData.imageAddress" color="white"></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-row>
                <v-col cols="2">
                  <h1 class="titleCard pr-2">{{categoryData.name}}</h1>
                </v-col>
                <v-col cols="6">
                  <div v-if="!isSubscribe">
                    <v-btn outlined color="primary"
                           @click="categoryFollow"
                           width="150">
                      subscribe
                      <v-icon color="primary" size="20" style="padding: 0px 10px">
                        {{icons[1].name}}
                      </v-icon>
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn color="primary" @click="categoryUnFollow"
                           width="150">
                      unsubscribe
                      <v-icon color="white" size="19">
                        {{icons[2].name}}
                      </v-icon>
                    </v-btn>
                  </div>

                  <LoginDialog class="hidden-md-only hidden-md-and-down hidden-sm-and-down"
                               v-show="$vuetify.breakpoint.mdAndUp" :message="errorMessage"
                               :dialog="dialog"/>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
          <v-row class="pr-8 pl-10" justify="center">
            <p v-html="categoryData.pageDescription"></p>
          </v-row>
          <v-row class="mr-auto" no-gutters>
            <v-flex v-for="item in podcasts" :key="item.podcastId">
              <CardPlayer :item="item" :title-count="18"/>
              <br/>
              <br/>
            </v-flex>
          </v-row>
          <Snackbar :snackbar="snackbar" :snackbar-text="snackbarText"/>
          <v-row v-if="isEnd === false" justify="center">
            <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
          </v-row>
          <v-row v-else justify="center">
            <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
          </v-row>
          <div style="height: 140px;"></div>
        </v-row>
      </div>
    </div>
    <!--Tablet Mode-->
    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <div v-if="pageLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <v-row class="mr-2">
          <v-list-item class="mr-1">
            <v-list-item-avatar size="50" color="primary">
              <v-icon v-text="categoryData.imageAddress" color="white"></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-row>
                <v-col cols="2">
                  <h1 class="titleCard pr-2">{{categoryData.name}}</h1>
                </v-col>
                <v-col cols="6">
                  <div v-if="!isSubscribe">
                    <v-btn outlined color="primary"
                           @click="categoryFollow"
                           width="150">
                      subscribe
                      <v-icon color="primary" size="20" style="padding: 0px 10px">
                        {{icons[1].name}}
                      </v-icon>
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn color="primary" @click="categoryUnFollow"
                           width="150">
                      unsubscribe
                      <v-icon color="white" size="19">
                        {{icons[2].name}}
                      </v-icon>
                    </v-btn>
                  </div>

                  <LoginDialog class="hidden-sm-only hidden-xs-only hidden-md-and-up"
                               v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly"
                               :message="errorMessage" :dialog="dialog"/>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
          <v-row class="mr-auto" no-gutters>
            <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
              <CardPlayer :item="item" :title-count="16"/>
              <br/>
              <br/>
            </v-flex>
          </v-row>
          <Snackbar :snackbar="snackbar" :snackbar-text="snackbarText"/>
          <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
          <div style="height: 100px;"></div>
        </v-row>
      </div>
    </div>
    <!--Mobile Mode-->
    <div class="pageXsOnlyAndMsOnly"
         v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <div v-if="pageLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <v-list-item class="mr-1">
          <v-list-item-avatar size="50" color="primary">
            <v-icon v-text="categoryData.imageAddress" color="white"></v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-row>
              <v-col cols="6">
                <h1 class="titleCardMobile pr-2">{{categoryData.name}}
                </h1>
              </v-col>
              <v-col cols="6">
                <div v-if="!isSubscribe">
                  <v-btn outlined small color="primary" @click="categoryFollow">
                    subscribe
                    <v-icon color="primary" size="20" style="padding: 0px 10px">
                      {{icons[1].name}}
                    </v-icon>
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn color="primary" small @click="categoryUnFollow">
                    unsubscribe
                    <v-icon color="white" size="19">
                      {{icons[2].name}}
                    </v-icon>
                  </v-btn>
                </div>

                <LoginDialog :message="errorMessage" :dialog="dialog"/>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-row class="mt-8" no-gutters>
          <v-flex v-for="item in podcasts" :key="item.podcastId">
            <MobileCardPlayer :item="item"/>
            <v-divider style="color: #464646;" :inset="false"></v-divider>
          </v-flex>
        </v-row>
        <div style="height: 160px;"></div>
        <div v-if="isEnd === false">
          <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
        </div>
        <div v-else>
          <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
        </div>
      </div>
    </div>
    <Snackbar :snackbar="snackbar" :snackbar-text="snackbarText"/>
  </div>
</template>

<script>
  import MobileCardPlayer from "../../../components/cards/MobileCardPlayer";
  import LoginDialog from "../../../components/tools/LoginDialog";
  import InfiniteLoading from 'vue-infinite-loading';
  import CardPlayer from "../../../components/cards/CardPlayer";
  import Snackbar from "../../../components/tools/Snackbar";
  import Loader from "../../../components/tools/Loader";
  import axios from 'axios';

  export default {
    layout: "pody",
    name: "categoryID",
    components: {MobileCardPlayer, LoginDialog, Loader, Snackbar, CardPlayer, InfiniteLoading},
    async asyncData(context) {
      return axios.post("http://localhost:8084/api/category/read", {
        first: context.route.params.id,
        second: context.store.state.user[0].userId
      }).then((response) => {
        if (response.status === 200) {
          return {
            pageLoading: true,
            categoryData: response.data.categoryInfo,
            podcasts: response.data.categoryPodcasts,
            isSubscribe: response.data.isFollow,
          }

        }
      });

    },
    data() {
      return {
        categoryData: {},
        podcasts: [],
        isSubscribe: false,
        pageLoading: false,
        snackbar: false,
        dialog: false,
        errorMessage: 'یرای دنبال کردن دسته بندی شما باید در سایت ورود کرده باشید',
        snackbarText: '',
        till: 0,
        to: 24,
        isEnd: false,
        icons: [
          {
            name: "mdi-play-circle"
          },
          {
            name: "mdi-bell"
          },
          {
            name: "mdi-bell-check "
          },
        ]
      }
    },
    methods: {
      categoryFollow() {
        if (this.$store.getters.userLogin === false) {
          this.dialog = true;
        } else {
          axios.post("http://localhost:8084/api/follow/category/create", {
            category: {
              id: this.$route.params.categoryId
            },
            follower: {
              id: this.$store.state.user[0].userId
            }
          }).then((response) => {
            const result = response.data.message;
            if (result === 'SUCCESSFUL') {
              this.isSubscribe = !this.isSubscribe;
              this.snackbar = true;
              this.snackbarText = "دسته " + this.categoryData.name + " دنبال شد ";
            } else {
              this.snackbar = true;
              this.snackbarText = 'مشکلی پیش آمده ست یک یار دیگر امتحان کنید';
            }
          });
        }
      },
      categoryUnFollow() {
        axios.delete("http://localhost:8084/api/follow/category/delete", {
          data: {
            first: this.$route.params.categoryId,
            second: this.$store.state.user[0].userId
          }
        }).then((response) => {
          const result = response.data.message;
          if (result === 'SUCCESSFUL') {
            this.isSubscribe = !this.isSubscribe;
            this.snackbar = true;
            this.snackbarText = 'دسته از لیست دنبال شده ها حذف گردید';
          } else {
            this.snackbar = true;
            this.snackbarText = 'مشکلی پیش آمده ست یک یار دیگر امتحان کنید';
          }
        });
      },
      loadMorePodcasts($state) {
        this.till += 1;
        axios.post('http://localhost:8084/api/category/read/infinite/' + this.till + '/' + this.to, {
          id: this.$route.params.categoryId
        }).then((response) => {
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
      // axios.post("http://localhost:8084/api/category/read", {
      //   first: this.$route.params.categoryId,
      //   second: this.$store.state.user[0].userId
      // }).then((response) => {
      //   if (response.status === 200) {
      //     this.pageLoading = true;
      //     this.categoryData = response.data.categoryInfo;
      //     this.podcasts = response.data.categoryPodcasts;
      //     this.isSubscribe = response.data.isFollow;
      //   }
      // });

    },
    head() {
      return {
        title: "پادی |" + this.categoryData.name
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/Styles/PlayCardStyle.css";
  @import "../../../assets/Styles/FontiranSans.css";
  @import "../../../assets/Styles/PageSizingStyle.css";

  .titleCard {
    font-size: 26px;
    text-align: right;
    justify-content: center;
  }

  .titleCardMobile {
    font-size: 22px;
    text-align: right;
    justify-content: center;
  }
</style>
