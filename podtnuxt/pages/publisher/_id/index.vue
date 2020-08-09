<template>
  <div>
    <div class="fontMain">
      <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
           v-show="$vuetify.breakpoint.mdAndUp">
        <div v-if="pageLoading === false">
          <Loader/>
        </div>
        <div v-else>
          <div class="publisher-banner">
            <v-parallax height="250" :src="channelInfo.channelImage"></v-parallax>
          </div>
          <v-row class="mr-3 mt-2">
            <v-col cols="1">
              <div>
                <v-img :src="channelInfo.profileImageAddress" height="80px" width="80px" max-height="80px"
                       max-width="80px" min-width="80px" min-height="80px"
                       style="border-radius: 50%"></v-img>
              </div>
            </v-col>
            <v-col cols="4">
              <v-row v-if="channelInfo.title === null || channelInfo.title === ''"><h1><span
                style="font-size: 20px">{{channelInfo.username}}</span></h1></v-row>
              <v-row v-else><h1><span style="font-size: 20px">{{channelInfo.title}}</span></h1></v-row>
              <v-row><span>{{channelInfo.followerCount}} subscribers</span></v-row>
            </v-col>
            <v-col cols="5"></v-col>
            <v-col cols="1">
              <div v-if="!isSubscribe">
                <v-btn outlined color="primary" @click="channelFollow" width="150">
                  subscribe
                  <v-icon color="primary" size="20" style="padding: 0px 10px">
                    {{icons[1].name}}
                  </v-icon>
                </v-btn>
              </div>
              <div v-else>
                <v-btn color="primary" @click="channelUnFollow" width="150">
                  unsubscribe
                  <v-icon color="white" size="19">
                    {{icons[2].name}}
                  </v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row class="mr-3">
            <v-tabs>
              <v-tab><span style="font-size: 20px">پادکست ها</span></v-tab>
              <v-tab><span style="font-size: 20px">پست ها</span></v-tab>
              <!--<v-tab style="font-size: 20px">کانال ها</v-tab>-->
              <v-tab style="font-size: 20px"> درباره</v-tab>
              <v-tab-item :key="1">
                <div style="min-height:450px ">
                  <v-row class="mt-4" no-gutters>
                    <v-row>
                      <v-flex v-for="(item) in podcasts" :key="item.podcastId" shrink>
                        <CardPlayer :item="item" :title-count="18"/>
                        <br/>
                        <br/>
                      </v-flex>
                    </v-row>
                    <v-row v-if="isEnd === false" justify="center">
                      <InfiniteLoading @infinite="publisherInfiniteLoading" spinner="spiral"/>
                    </v-row>
                    <v-row v-else justify="center">
                      <h2 class="mx-7 text-center">شما به پایان لیست رسیدید</h2>
                    </v-row>
                    <div style="height: 100px;"></div>
                  </v-row>
                </div>
              </v-tab-item>
              <v-tab-item :key="2">
                <div class="mr-4" style="min-height:450px">
                  <div v-if="posts.length>0">
                    <div v-for="(item,index) in posts" :key="index">
                      <CardNews :item="item"/>
                    </div>
                  </div>
                  <div v-else>
                    <v-row class="justify-center pt-8">
                      <span>This channel hasn't posted yet</span>
                    </v-row>
                  </div>
                </div>
                <v-row style="height: 60px"></v-row>
              </v-tab-item>
              <!--<v-tab-item :key="3">-->
              <!--<div style="min-height: 450px">-->
              <!--<v-row class="mt-4" no-gutters>-->
              <!--<v-flex v-for="(item,index) in userOtherChannels" :key="index">-->
              <!--<v-card outlined class="mt-2 cardColor" max-width="190px" height="186px"-->
              <!--width="190px">-->
              <!--<v-row>-->
              <!--<v-col></v-col>-->
              <!--<v-col>-->
              <!--<v-img :src="item.userImage" width="103px" height="103"-->
              <!--style="border-radius: 50%"></v-img>-->
              <!--</v-col>-->
              <!--<v-col></v-col>-->
              <!--</v-row>-->
              <!--<v-row class="justify-center">-->
              <!--<v-card-title-->
              <!--style="font-size: 20px;line-height: .3rem;font-weight: 400;direction: ltr">-->
              <!--{{item.userName}}-->
              <!--</v-card-title>-->
              <!--</v-row>-->
              <!--<v-row class="justify-center">-->
              <!--<span class="justify-center item-info"> {{item.subscribers}} دنبال کننده</span>-->
              <!--</v-row>-->
              <!--</v-card>-->
              <!--</v-flex>-->
              <!--</v-row>-->
              <!--</div>-->
              <!--</v-tab-item>-->
              <v-tab-item :key="3">
                <div style="min-height: 450px" class="mt-4">
                  <v-row class="mr-4" style="max-width: 70%">
                    <div>
                                        <span style="font-size: 16px;font-weight: 800">
                                            توضیحات
                                        </span>
                      <br>
                      <p class="mt-2" style="font-size: 15px;font-weight: 500"
                         v-html="channelInfo.bio"></p>
                    </div>
                  </v-row>
                  <v-divider style="max-width: 70%"></v-divider>
                  <v-row class="mr-4">
                    <div>
                      <span style="font-size: 16px;font-weight: 800">اطلاعات</span>
                      <br>
                      <!--<p style="font-size: 15px;font-weight: 500">آدرس : {{details.location}}</p>-->
                      <p style="font-size: 15px;font-weight: 500">ایمیل : {{channelInfo.email}}</p>
                    </div>
                  </v-row>
                  <v-divider style="max-width: 70%"></v-divider>
                  <v-row class="mr-4">
                    <div>
                      <span style="font-size: 16px;font-weight: 800">صفحات اجتماعی</span>
                      <br>
                      <v-row style="width: auto">
                        <div v-if="channelInfo.instagramUrl !== '' ">
                          <div v-if="channelInfo.instagramUrl !== null ">
                            <a class="mr-2" :href="channelInfo.instagramUrl " target="_blank"
                               style="width: 32px;height: 32px">
                              <img class="item-social" v-bind:src="social.instagram.icon"/>
                            </a>
                          </div>
                        </div>

                        <div v-if="channelInfo.twitterUrl !== ''">
                          <div v-if="channelInfo.twitterUrl != null ">
                            <a class="mr-2" :href="channelInfo.twitterUrl " target="_blank"
                               style="width: 32px;height: 32px">
                              <img class="item-social" v-bind:src="social.twitter.icon"/>
                            </a>
                          </div>
                        </div>

                        <div v-if="channelInfo.facebookUrl !== ''">
                          <div v-if="channelInfo.facebookUrl != null">
                            <a class="mr-2 " :href="channelInfo.facebookUrl " target="_blank"
                               style="width: 32px;height: 32px">
                              <img class="item-social" v-bind:src="social.facebook.icon"/>
                            </a>
                          </div>
                        </div>

                        <div v-if="channelInfo.youtubeUrl !== ''">
                          <div v-if="channelInfo.youtubeUrl != null ">
                            <a class="mr-2 " :href="channelInfo.youtubeUrl " target="_blank"
                               style="width: 32px;height: 32px">
                              <img class="item-social" v-bind:src="social.youtube.icon"/>
                            </a>
                          </div>
                        </div>

                        <div v-if="channelInfo.websiteUrl !== ''">
                          <div v-if="channelInfo.websiteUrl != null ">
                            <a class="mr-2 " :href="channelInfo.websiteUrl " target="_blank"
                               style="width: 32px;height: 32px">
                              <img class="item-social" v-bind:src="social.website.icon"/>
                            </a>
                          </div>
                        </div>
                      </v-row>
                    </div>
                  </v-row>
                </div>
              </v-tab-item>
            </v-tabs>
          </v-row>
          <div style="height: 90px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileCardPlayer from "../../../components/cards/MobileCardPlayer";
  import MobileCardNews from "../../../components/cards/MobileCardNews";
  import LoginDialog from "../../../components/tools/LoginDialog";
  import InfiniteLoading from 'vue-infinite-loading';
  import CardPlayer from "../../../components/cards/CardPlayer";
  import CardNews from "../../../components/cards/CardNews";
  import Snackbar from "../../../components/tools/Snackbar";
  import Loader from "../../../components/tools/Loader";
  import axios from 'axios';

  export default {
    layout: "pody",
    name: "PublisherID",
    components: {
      Snackbar, LoginDialog, CardNews, MobileCardNews,
      MobileCardPlayer, Loader, CardPlayer, InfiniteLoading
    },
    async asyncData(context) {
      return axios.post("http://localhost:8084/api/user/read", {
        first: context.route.params.id,
        second: context.store.state.user[0].userId
      }).then((response) => {
        if (response.status === 200) {
          return {
            pageLoading: true,
            channelInfo: response.data.userInfo,
            podcasts: response.data.userPodcasts,
            posts: response.data.userNews,
            isSubscribe: response.data.isFollow,
          }

        }
      });
    },
    data: () => ({
      channelInfo: {},
      podcasts: [],
      posts: [],
      userOtherChannels: [
        {
          userName: 'channel B',
          userImage: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/74/8b/26/748b262c-515a-c500-b2b7-ab28b4346cff/mza_5319609786746689562.png/400x400bb.jpg',
          subscribers: '2.25M',
        },
        {
          userName: 'channel B',
          userImage: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/74/8b/26/748b262c-515a-c500-b2b7-ab28b4346cff/mza_5319609786746689562.png/400x400bb.jpg',
          subscribers: '2.25M',
        },
        {
          userName: 'channel B',
          userImage: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/74/8b/26/748b262c-515a-c500-b2b7-ab28b4346cff/mza_5319609786746689562.png/400x400bb.jpg',
          subscribers: '2.25M',
        },
        {
          userName: 'channel B',
          userImage: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/74/8b/26/748b262c-515a-c500-b2b7-ab28b4346cff/mza_5319609786746689562.png/400x400bb.jpg',
          subscribers: '2.25M',
        },

      ],
      social: {
        instagram: {
          id: 1,
          icon: "https://s3.castbox.fm/webstatic/images/instagram.689928b5.png",
        },
        twitter: {
          id: 2,
          icon: "https://s3.castbox.fm/webstatic/images/twitter.b3173321.png",
        },
        facebook: {
          id: 3,
          icon: "https://s3.castbox.fm/webstatic/images/facebook.db794bac.png",
        },
        youtube: {
          id: 4,
          icon: "https://s3.castbox.fm/webstatic/images/youtube.f041f131.png",
        },
        website: {
          id: 5,
          icon: "https://s3.castbox.fm/webstatic/images/homelink.fb715380.png",
        }
      },
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
      ],
      pageLoading: false,
      loginErrorMessage: '',
      loaginErrorDialog: false,
      snackbarActionMessage: '',
      snackbarAction: false,
      isSubscribe: false,
      isEnd: false,
      till: 0,
      to: 20,
    }),
    methods: {
      onScroll(e) {
        this.offsetTop = e.target.scrollTop;
      },
      publisherInfiniteLoading($state) {
        this.till += 1;
        axios.get("http://localhost:8084/api/podcast/list/" + this.$route.params.id + "/user/" + this.till + "/" + this.to).then((response) => {
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
      channelFollow() {
        if (this.$store.getters.userLogin === false) {
          this.loaginErrorDialog = true;
          this.loginErrorMessage = 'شما برای دنبال کردن این کانال باید ورود کرده باشید';
        } else {
          axios.post("http://localhost:8084/api/follow/user/create", {
            follower: {
              id: this.$route.params.id
            },
            user: {
              id: this.$store.state.user[0].userId
            }
          }).then((response) => {
              const result = response.data.message;
              if (result === 'SUCCESSFUL') {
                this.isSubscribe = !this.isSubscribe;
                this.snackbarAction = true;
                if (this.channelInfo.title === null || this.channelInfo.title === '') {
                  this.snackbarActionMessage = "کانال " + this.channelInfo.username + " دنبال شد";
                } else {
                  this.snackbarActionMessage = "کانال " + this.channelInfo.title + " دنبال شد";
                }
              } else {
                this.snackbarAction = true;
                this.snackbarActionMessage = 'مشکلی پیش آمده ست یک یار دیگر امتحان کنید';
              }
            }
          );
        }
      },
      channelUnFollow() {
        axios.delete("http://localhost:8084/api/follow/user/delete", {
          data: {
            first: this.$store.state.user[0].userId,
            second: this.$route.params.id
          }
        }).then((response) => {
          const result = response.data.message;
          if (result === 'SUCCESSFUL') {
            this.isSubscribe = !this.isSubscribe;
            this.snackbarAction = true;
            this.snackbarActionMessage = 'کانال از لیست دنبال شده ها حذف گردید';
          } else {
            this.snackbarAction = true;
            this.snackbarActionMessage = 'مشکلی پیش آمده ست یک یار دیگر امتحان کنید';
          }
        });
      },
    },
    watch: {
      $route(to, from) {
        if (to.params.id !== from.params.id) {
          this.pageLoading = false;
          this.channelInfo = {};
          this.podcasts = [];
          this.posts = [];
          this.isSubscribe = false;

          axios.post("http://localhost:8084/api/user/read", {
            first: to.params.id,
            second: this.$store.state.user[0].userId
          }).then((response) => {
            if (response.status === 200) {
              this.pageLoading = true;
              this.channelInfo = response.data.userInfo;
              this.podcasts = response.data.userPodcasts;
              this.posts = response.data.userNews;
              this.isSubscribe = response.data.isFollow;
              let postTitle = this.channelInfo.title;
              let title = "پادی | " + postTitle;
              document.title = title;
            }
          });
        }
      }
    },
    created() {
      // axios.post("http://localhost:8084/api/user/read", {
      //   first: this.$route.params.id,
      //   second: this.$store.state.user[0].userId
      // }).then((response) => {
      //   if (response.status === 200) {
      //     this.pageLoading = true;
      //     this.channelInfo = response.data.userInfo;
      //     this.podcasts = response.data.userPodcasts;
      //     this.posts = response.data.userNews;
      //     this.isSubscribe = response.data.isFollow;
      //     let postTitle = this.channelInfo.title;
      //     let title = "پادی | " + postTitle;
      //     document.title = title;
      //   }
      // });
    },
    head() {
      return {
        title:"پادی | "+ this.channelInfo.title,
      }
    }

  }
</script>

<style scoped>
  @import "../../../assets/Styles/FontiranSans.css";
  @import "../../../assets/Styles/PageSizingStyle.css";

  .item-info {
    margin-top: 0px;
    font-size: 15px;
    color: #9f9f9f;
    font-weight: 400;
    height: 1.4em;
    line-height: 1.2em;
    overflow: hidden;
  }

  .item-social {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    margin-top: 5px;
  }

  .publisher-banner {
    height: 100%;
  }

  .publisher-banner-xs {
    height: 100%;
    width: 100%;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

