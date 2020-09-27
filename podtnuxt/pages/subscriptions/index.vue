<template>
  <div class="fontMain">
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
          <div v-if="subscriptions.length === 0 ">
            <v-row>
              <div class="views">
                <h2 class="mx-7">شما هنوز کسی را دنبال نکرده اید</h2>
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
              <h2 class="mx-7">لیست اشتراک هاتون</h2>
              <v-spacer></v-spacer>
              <v-text-field class="ml-5" solo flat hide-details
                            autofocus rounded clearable disabled
                            background-color="#ddd" color="primary"
                            label="جست و جو" style="width: 300px;" prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </div>
            <br>

            <div class="pb-4" v-for="(items) in categories" :key="items.id" style="display: inline-block">
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
            <v-divider class="pb-6"></v-divider>
            <v-row v-for="(items,index) in subscriptions" :key="index">
              <v-card class="mx-auto mb-6" width="90%">
                <v-list-item>
                  <v-list-item-avatar size="85" color="grey">
                    <v-img :src="items.channelInfo.imageAddress" style="cursor: pointer"
                           @click="userPageNavigation(items.channelInfo.id)"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="titleCard"
                                       @click="userPageNavigation(items.channelInfo.id)"
                                       v-if="items.channelInfo.userTitle == null || items.channelInfo.userTitle === ''">
                      {{items.channelInfo.username}}
                    </v-list-item-title>
                    <v-list-item-title class="titleCard" v-else
                                       @click="userPageNavigation(items.channelInfo.id)">
                      {{items.channelInfo.userTitle}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="bioCard" v-html="items.channelInfo.userBio">
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="flexI">
                  <v-flex v-for="(item) in items.channelPodcasts" :key="item.podcastId" shrink>
                    <CardPlayer :item="item" :title-count="18"/>
                    <br/>
                    <br/>
                  </v-flex>
                </div>
              </v-card>
            </v-row>
            <div style="height: 75px;"></div>
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
          <div v-if="subscriptions.length === 0 ">
            <v-row>
              <div class="views">
                <h2 class="mx-7">شما هنوز کسی را دنبال نکرده اید</h2>
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
              <h2 class="mx-7">لیست اشتراک هاتون</h2>
              <v-spacer></v-spacer>
              <v-text-field class="ml-5" solo flat hide-details
                            autofocus rounded clearable disabled
                            background-color="#ddd" color="primary"
                            label="جست و جو" style="width: 300px;" prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </div>
            <br>

            <div class="pb-4" v-for="(items) in categories" :key="items.id" style="display: inline-block">
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
            <v-divider class="pb-6"></v-divider>
            <v-row v-for="(items,index) in subscriptions" :key="index">
              <v-card class="mx-auto mb-6" width="90%">
                <v-list-item>
                  <v-list-item-avatar size="85" color="grey">
                    <v-img :src="items.channelInfo.imageAddress" style="cursor: pointer"
                           @click="userPageNavigation(items.channelInfo.id)"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="titleCard"
                                       @click="userPageNavigation(items.channelInfo.id)"
                                       v-if="items.channelInfo.userTitle == null || items.channelInfo.userTitle === ''">
                      {{items.channelInfo.username}}
                    </v-list-item-title>
                    <v-list-item-title class="titleCard" v-else
                                       @click="userPageNavigation(items.channelInfo.id)">
                      {{items.channelInfo.userTitle}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="bioCard" v-html="items.channelInfo.userBio">
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="flexI">
                  <v-flex v-for="(item) in items.channelPodcasts" :key="item.podcastId" shrink>
                    <CardPlayer :item="item" :title-count="18"/>
                    <br/>
                    <br/>
                  </v-flex>
                </div>
              </v-card>
            </v-row>
            <div style="height: 75px;"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <div v-if="isLogin === false">
        <NotLogin/>
      </div>
      <div v-else>
        <div v-if="pageLoading === false">
          <Loader/>
        </div>
        <div v-else>
          <div v-if="subscriptions.length === 0 ">
            <v-row justify="center">
              <div class="views">
                <h2>شما هنوز کسی را دنبال نکرده اید</h2>
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
            <v-row justify="center">
              <div class="views">
                <h2>لیست اشتراک هاتون</h2>
              </div>
            </v-row>
            <br>
            <div class="flexI" v-dragscroll>
              <div class="pb-1 mb-1" v-for="(items) in categories" :key="items.id">
                <div>
                  <v-row justify="center">
                    <v-btn class="mx-6" fab dark large color="black" width="60px" height="60px"
                           @click="categoryPageNavigation(items.id)">
                      <v-icon size="30">
                        {{items.imageAddress}}
                      </v-icon>
                    </v-btn>
                  </v-row>
                  <v-row class="pt-2" justify="center"
                         style="text-align: center;font-size: 20px;cursor: pointer;"
                         @click="categoryPageNavigation(items.id)">
                    {{items.name}}
                  </v-row>
                </div>
              </div>
            </div>
            <v-divider class="pb-4"></v-divider>
            <v-row v-for="(items,index) in subscriptions" :key="index">
              <v-card class="mx-auto mb-6" width="90%">
                <v-list-item>
                  <v-list-item-avatar size="85" color="grey">
                    <v-img :src="items.channelInfo.imageAddress" style="cursor: pointer"
                           @click="userPageNavigation(items.channelInfo.id)"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="titleCard"
                                       @click="userPageNavigation(items.channelInfo.id)"
                                       v-if="items.channelInfo.userTitle == null || items.channelInfo.userTitle === ''">
                      {{items.channelInfo.username}}
                    </v-list-item-title>
                    <v-list-item-title class="titleCard" v-else
                                       @click="userPageNavigation(items.channelInfo.id)">
                      {{items.channelInfo.userTitle}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="bioCard" v-html="items.channelInfo.userBio">
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-flex v-for="(item) in items.channelPodcasts" :key="item.podcastId" shrink>
                  <MobileCardPlayer :item="item"/>
                  <br/>
                  <br/>
                </v-flex>
              </v-card>
            </v-row>
            <div style="height: 75px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CardPlayer from "../../components/cards/CardPlayer";
  import Loader from "../../components/tools/Loader.vue";
  import NotLogin from "../../components/errors/NotLogin";
  import axios from "axios";
  import MobileCardPlayer from "../../components/cards/MobileCardPlayer";

  export default {
    layout: "pody",
    name: "subscriptions",
    components: {MobileCardPlayer, NotLogin, CardPlayer, Loader},
    async asyncData(context) {
      // const userId = context.store.state.user[0].userId;
      //  axios.get("http://localhost:8084/api/user/list/subscriptions/" + userId).then((response) => {
      //   if (response.status === 200) {
      //     return {
      //       pageLoading: true,
      //       subscriptions: response.data.followingChannels,
      //       categories: response.data.followingCategories,
      //     }
      //
      //   }
      // });

    },
    data() {
      return {
        isLogin: false,
        pageLoading: false,
        icons: [
          {
            name: "mdi-play-circle"
          }
        ],
        subscriptions: [],
        categories: []
      }
    },
    methods: {
      checkIsPersian(s) {
        var PersianOrASCII = /[آ-ی]|([a-zA-Z])/;
        var m;
        if ((m = s.match(PersianOrASCII)) !== null) {
          if (m[1]) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      },
      playPageNavigation(id) {
        this.$router.push('/play/' + id);
      },
      userPageNavigation(id) {
        this.$router.push('/publisher/' + id);
      },
      categoryPageNavigation(id) {
        this.$router.push('/category/' + id);
      },
    },
    created() {
      // console.log(this.$store.state.user[0].username + "STORE")
      // let userId = this.$store.state.user[0].userId;
      // console.log(userId + "USER ID");
      // axios.get("http://localhost:8084/api/user/list/subscriptions/" + userId).then((response) => {
      //   if (response.status === 200) {
      //     this.pageLoading = true
      //     this.subscriptions = response.data.followingChannels;
      //     this.categories = response.data.followingCategories;
      //   }
      // });

    },
    mounted() {
      if (this.$store.getters.userLogin === false) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
        axios.get("http://localhost:8084/api/user/list/subscriptions/" + this.$store.state.user[0].userId).then((response) => {
          if (response.status === 200) {
            this.pageLoading = true
            this.subscriptions = response.data.followingChannels;
            this.categories = response.data.followingCategories;
          }
        });
      }
    },
    head() {
      return {
        title: "پادی | اشتراک ها",
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/Styles/FontiranSans.css";
  @import "../../assets/Styles/PlayCardStyle.css";
  @import "../../assets/Styles/PageSizingStyle.css";

  .views {
    display: flex;
    margin-top: 20px;
  }

  .views h2 {
    font-size: 29px;
    color: #606060;
  }

  .titleCard {
    font-size: 24px;
    font-weight: bold;
    text-align: right;
    justify-content: center;
    cursor: pointer;
  }

  .titleCard-XS {
    font-size: 15px;
    font-weight: 500;
    text-align: right;
    justify-content: center;
  }

  .bioCard {
    font-size: 20px;
    text-align: justify;
    justify-content: right;
    width: 95%;
  }

  .bioCard-XS {
    font-size: 15px;
    text-align: justify;
    justify-content: right;
    width: 95%;
  }

  .flexI {
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    overflow-y: hidden;
  }

  .flexI::-webkit-scrollbar {
    display: none;
  }

  .flexi-XS {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    overflow-y: hidden;
    overflow-x: scroll;
  }

</style>
