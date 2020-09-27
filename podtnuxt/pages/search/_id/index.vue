<template>
  <div class="fontMain">
    <!--For PCs-->
    <v-card class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down" flat
            v-show="$vuetify.breakpoint.mdAndUp">
      <v-card-title class="pt-6 pb-0">
        <v-text-field
          :value="searchValue"
          v-model="searchValue"
          label="Search"
          @keyup.enter="newSearchTerm"
          outlined
        ></v-text-field>
      </v-card-title>
      <!--Tabs-->
      <v-tabs v-model="tab" color="basil" grow
      >
        <v-tab>
          <div class="tabsFontSize">پادکست ها</div>
        </v-tab>
        <v-tab>
          <div class="tabsFontSize">کاربران</div>
        </v-tab>
        <v-tab>
          <div class="tabsFontSize">دسته بندی ها</div>
        </v-tab>
        <!--<v-tab>-->
        <!--<div class="tabsFontSize">هشتگ ها</div>-->
        <!--</v-tab>-->

        <v-tab-item :key="1">
          <div style="min-height:450px " v-if="podcasts.length > 0">
            <v-row class="mt-4" no-gutters>
              <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
                <CardPlayer :item="item" :title-count="18"/>
                <br/>
                <br/>
              </v-flex>
            </v-row>
          </div>
          <div v-else>
            <v-row class="justify-center notAvailableText pt-7">
              <span>پادکستی با کلمه جست و جو شده موجود نیست</span>
            </v-row>
          </div>
          <div style="height: 70px"></div>
        </v-tab-item>

        <v-tab-item :key="2">
          <div v-if="users.length > 0">
            <div class="pr-10" style="width: 90%;" v-for="(items) in users" :key="items.id">
              <v-row style="margin: 10px 0 30px 10px">
                <div class="channel-image">
                  <div
                    style="display: inline-block;height: 100%;width: 100%;overflow: hidden;border-radius: 4px;background-color: inherit">
                    <v-img class="userImage" :src="items.imageAddress"
                           @click="userPageNavigation(items.id)">
                    </v-img>
                  </div>
                </div>
                <div class="channel-title">
                  <h2 class="item-title" v-if="items.userTitle == null || items.userTitle === ''"
                      @click="userPageNavigation(items.id)">
                    {{items.username}}
                  </h2>
                  <h2 class="item-title" v-else @click="userPageNavigation(items.id)">
                    {{items.userTitle}}
                  </h2>
                  <br>
                  <span class="item-info">{{items.followerCount}}  دنبال کننده</span>
                  <br>
                </div>
              </v-row>
              <v-divider style="width: 55%">

              </v-divider>
            </div>
          </div>
          <div v-else>
            <v-row class="justify-center notAvailableText pt-7">
              <span>کاربری با کلمه جست و جو شده موجود نیست</span>
            </v-row>
          </div>
          <div style="height: 85px"></div>
        </v-tab-item>

        <v-tab-item :key="3">
          <div v-if="categories.length > 0">
            <v-row class="mr-2" v-for="cat in categories" :key="cat.id">
              <v-list-item class="mr-1">
                <v-list-item-avatar size="40" color="primary">
                  <v-icon v-text="cat.imageAddress" color="white"
                          @click="categoryPageNavigation(cat.id)"></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-row>
                    <v-col cols="2">
                      <v-list-item-title class="titleCard pr-2"
                                         @click="categoryPageNavigation(cat.id)">{{cat.name}}
                      </v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-row>
          </div>
          <div v-else>
            <v-row class="justify-center notAvailableText pt-7">
              <span>دسته بندی با کلمه جست و جو شده موجود نیست</span>
            </v-row>
          </div>
          <div style="height: 85px"></div>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <!--For tablets-->
    <v-card class="pageMdAndDown hidden-sm-only hidden-xs-only" flat
            v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <v-card-title class="pt-6 pb-0">
        <v-text-field
          :value="searchValue"
          v-model="searchValue"
          label="Search"
          @keyup.enter="newSearchTerm"
          outlined
        ></v-text-field>
      </v-card-title>
      <!--Tabs-->
      <v-tabs v-model="tab" color="basil" grow class="pr-4 ">
        <v-tab>
          <div class="tabsFontSize">پادکست ها</div>
        </v-tab>
        <v-tab>
          <div class="tabsFontSize">کاربران</div>
        </v-tab>
        <v-tab>
          <div class="tabsFontSize">دسته بندی ها</div>
        </v-tab>


        <v-tab-item :key="1">
          <div style="min-height:450px " v-if="podcasts.length > 0">
            <v-row class="mt-4" no-gutters>
              <v-flex v-for="item in podcasts" :key="item.podcastId" shrink>
                <CardPlayer :item="item" :title-count="16"/>
                <br/>
                <br/>
              </v-flex>
            </v-row>
          </div>
          <div v-else>
            <v-row class="justify-center notAvailableText pt-7">
              <span>پادکستی با کلمه جست و جو شده موجود نیست</span>
            </v-row>
          </div>
          <div style="height: 70px"></div>
        </v-tab-item>

        <v-tab-item :key="2">
          <div v-if="users.length > 0">
            <div class="pr-10" style="width: 90%;" v-for="(items) in users" :key="items.id">
              <v-row style="margin: 10px 0 30px 10px">
                <div class="channel-image">
                  <div
                    style="display: inline-block;height: 100%;width: 100%;overflow: hidden;border-radius: 4px;background-color: inherit">
                    <v-img class="userImage" :src="items.imageAddress"
                           @click="userPageNavigation(items.id)">
                    </v-img>
                  </div>
                </div>
                <div class="channel-title">
                  <h2 class="item-title" v-if="items.userTitle == null || items.userTitle === ''"
                      @click="userPageNavigation(items.id)">
                    {{items.username}}
                  </h2>
                  <h2 class="item-title" v-else @click="userPageNavigation(items.id)">
                    {{items.userTitle}}
                  </h2>
                  <br>
                  <span class="item-info">{{items.followerCount}}  دنبال کننده</span>
                  <br>
                </div>
              </v-row>
              <v-divider style="width: 55%">

              </v-divider>
            </div>
          </div>
          <div v-else>
            <v-row class="justify-center notAvailableText pt-7">
              <span>کاربری با کلمه جست و جو شده موجود نیست</span>
            </v-row>
          </div>
          <div style="height: 85px"></div>
        </v-tab-item>

        <v-tab-item :key="3">
          <div v-if="categories.length > 0">
            <v-row class="mr-2" v-for="cat in categories" :key="cat.id">
              <v-list-item class="mr-1">
                <v-list-item-avatar size="40" color="primary">
                  <v-icon v-text="cat.imageAddress" color="white"
                          @click="categoryPageNavigation(cat.id)"></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-row>
                    <v-col cols="2">
                      <v-list-item-title class="titleCard pr-2"
                                         @click="categoryPageNavigation(cat.id)">{{cat.name}}
                      </v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-row>
          </div>
          <div v-else>
            <v-row class="justify-center notAvailableText pt-7">
              <span>دسته بندی با کلمه جست و جو شده موجود نیست</span>
            </v-row>
          </div>
          <div style="height: 85px"></div>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <!--For Phones-->
    <v-card class="pageXsOnlyAndMsOnly" flat v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <v-card-title class="pt-6 pb-0">
        <v-text-field
          :value="searchValue"
          label="Search"
          outlined
        ></v-text-field>
      </v-card-title>
      <!--Tabs-->
      <v-tabs v-model="tab" color="basil" mobile-break-point
      >
        <v-tab>
          <div class="tabsFontSize">پادکست ها</div>
        </v-tab>
        <v-tab>
          <div class="tabsFontSize">کاربران</div>
        </v-tab>
        <v-tab>
          <div class="tabsFontSize">دسته بندی ها</div>
        </v-tab>


        <v-tab-item :key="1">
          <div style="min-height:450px " v-if="podcasts.length > 0">
            <v-row class="mt-4" no-gutters>
              <v-flex v-for="item in podcasts" :key="item.podcastId">
                <MobileCardPlayer :item="item"/>
                <v-divider style="color: #464646;" :inset="false"></v-divider>
              </v-flex>
            </v-row>
          </div>
          <div v-else>
            <v-row class="justify-center notAvailableText pt-7">
              <span>پادکستی با کلمه جست و جو شده موجود نیست</span>
            </v-row>
          </div>
          <div style="height: 70px"></div>
        </v-tab-item>

        <v-tab-item :key="2">
          <div v-if="users.length > 0">
            <div class="pr-10" style="width: 90%;" v-for="(items) in users" :key="items.id">
              <v-row style="margin: 10px 0 30px 10px">
                <div class="channel-image">
                  <div
                    style="display: inline-block;height: 100%;width: 100%;overflow: hidden;border-radius: 4px;background-color: inherit">
                    <v-img class="userImage" :src="items.imageAddress"
                           @click="userPageNavigation(items.id)">
                    </v-img>
                  </div>
                </div>
                <div class="channel-title">
                  <h2 class="item-title" v-if="items.userTitle == null || items.userTitle === ''"
                      @click="userPageNavigation(items.id)">
                    {{items.username}}
                  </h2>
                  <h2 class="item-title" v-else @click="userPageNavigation(items.id)">
                    {{items.userTitle}}
                  </h2>
                  <br>
                  <span class="item-info">{{items.followerCount}}  دنبال کننده</span>
                  <br>
                </div>
              </v-row>
              <v-divider style="width: 55%">

              </v-divider>
            </div>
          </div>
          <div v-else>
            <v-row class="justify-center notAvailableText pt-7">
              <span>کاربری با کلمه جست و جو شده موجود نیست</span>
            </v-row>
          </div>
          <div style="height: 85px"></div>
        </v-tab-item>

        <v-tab-item :key="3">
          <div v-if="categories.length > 0">
            <v-row class="mr-2" v-for="cat in categories" :key="cat.id">
              <v-list-item class="mr-1">
                <v-list-item-avatar size="40" color="primary">
                  <v-icon v-text="cat.imageAddress" color="white"
                          @click="categoryPageNavigation(cat.id)"></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-row>
                    <v-col cols="2">
                      <v-list-item-title class="titleCard pr-2"
                                         @click="categoryPageNavigation(cat.id)">{{cat.name}}
                      </v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-row>
          </div>
          <div v-else>
            <v-row class="justify-center notAvailableText pt-7">
              <span>دسته بندی با کلمه جست و جو شده موجود نیست</span>
            </v-row>
          </div>
          <div style="height: 85px"></div>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios';
  import CardPlayer from "../../../components/cards/CardPlayer";
  import MobileCardPlayer from "../../../components/cards/MobileCardPlayer";

  export default {
    layout: "pody",
    name: "search",
    components: {MobileCardPlayer, CardPlayer},
    data() {
      return {
        searchValue: this.$route.params.id,
        users: [],
        categories: [],
        podcasts: [],
      }
    },
    methods: {
      userPageNavigation(id) {
        this.$router.push('/publisher/' + id);
      },
      categoryPageNavigation(id) {
        this.$router.push('/categoryPage/' + id);
      },
      newSearchTerm() {
        this.$router.push('/search/' + this.searchValue.trim());
      }
    },
    created() {
      // axios.post('http://localhost:8084/api/search', {
      //   value: this.$route.params.term
      // }).then(response => {
      //   this.users = response.data.users;
      //   this.categories = response.data.categories;
      //   this.podcasts = response.data.podcasts;
      // });
    },
    mounted() {
      axios.post('http://localhost:8084/api/search', {
        value: this.$route.params.id
      }).then(response => {
        this.users = response.data.users;
        this.categories = response.data.categories;
        this.podcasts = response.data.podcasts;
      });
      console.log(this.$route.params.id + " In Mounted")
    },
    watch: {
      $route(to, from) {
        if (to.params.id !== from.params.id) {
          //Users
          this.users = [];
          //Categories
          this.categories = [];
          //nextEpisode
          this.podcasts = [];

          axios.post('http://localhost:8084/api/search', {
            value: to.params.slug
          }).then(response => {
            this.users = response.data.users;
            this.categories = response.data.categories;
            this.podcasts = response.data.podcasts;
          });
        }
        console.log(this.$route.params.id + " In watch");
      }

    },
    head() {
      return {
        title: "پادی | جستجو",
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/Styles/PageSizingStyle.css";
  @import "../../../assets/Styles/FontiranSans.css";
  @import "../../../assets/Styles/PlayCardStyle.css";

  .tabsFontSize {
    font-size: 18px;
  }

  .vCardTitle {
    word-break: normal;
    cursor: pointer;
  }

  .titleCard {
    font-size: 26px;
    text-align: right;
    justify-content: center;
    cursor: pointer;
  }

  .notAvailableText {
    font-size: 22px;
    text-align: right;
    justify-content: center;
  }

  .item-info {
    margin-top: 1px;
    font-size: 12px;
    color: #9f9f9f;
    font-weight: 400;
    width: 100%;
    height: 1.4em;
    line-height: 1.2em;
    overflow: hidden;
  }

  .item-title {
    margin-top: 12px;
    font-size: 16px;
    color: #000;
    font-weight: 400;
    width: 100%;
    height: 1.2em;
    line-height: 1.2em;
    overflow: hidden;
    cursor: pointer;
  }

  .channel-title {
    text-align: right;
    width: 395px;
    float: right;
    height: 80px;
    padding: 0 20px;
    margin: 0;
    border-bottom: 0;
  }

  .channel-title::before {
    display: table;
    content: " ";
  }

  .channel-title::after {
    clear: both;
  }

  .channel-image {
    width: 100px;
    height: 100px;
    float: right
  }

  .userImage {
    display: inline-block;
    width: 100%;
    height: 100%;
    opacity: 1;
    cursor: pointer;
  }
</style>
