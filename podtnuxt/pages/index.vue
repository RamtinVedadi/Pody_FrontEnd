<template>
  <div class="fontMain">
    <!--PC Mode-->
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <div v-if="siteLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <CS/>
        <!--        v-slide-group example-->
        <!-- end of v-slide-group example-->
        <div v-if="categories.length !== 0">
          <div class="views">
            <span class="mx-7">دسته بندی پادکست ها</span>
            <v-spacer>

            </v-spacer>
            <router-link to="/category" class="viewAll mx-7">
              <span>مشاهده همه >></span>
            </router-link>
          </div>
          <div style="position: relative;width: 100%">
            <v-row class="flexi mb-4 " id="smallBlog">
              <v-layout style="z-index: 0;width: 100%">
                <v-flex class="" shrink v-for="(items,index) in categories" :key="items.id">
                  <v-btn text @click="categoryPageNavigation(items.id)" class="pl-1 pr-1">
                    <v-chip class="primary" v-if="index %2 == 0" style="cursor: pointer">
                      <v-icon right class="pl-8 pr-2">
                        {{items.imageAddress}}
                      </v-icon>
                      {{items.name}}
                    </v-chip>
                    <v-chip color="#606060" v-else style="cursor: pointer">
                      <v-icon right class="pl-8 pr-2" color="white">
                        {{items.imageAddress}}
                      </v-icon>
                      <span style="color: white">{{items.name}}</span>
                    </v-chip>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-row>
            <v-layout class="left-layout">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveRight('#smallBlog')">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-layout>
            <v-layout class="right-layout">
              <v-btn id="btn1" class="ma-0 arrow-btn" large raised fab
                     v-on:click="moveLeft('#smallBlog')">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-layout>
          </div>
        </div>

        <div v-if="special.length !== 0">
          <div class="views">
            <h2 class="mx-7">پادکست های اختصاصی پادی</h2>
          </div>

          <v-row justify="center" class="pt-2 pr-10">
            <v-col v-for="item in special" :key="item.id" cols="6" md="3">
              <v-card height="250" min-width="250" shaped :disabled="item.disable"
                      max-width="250" elevation="10">
                <v-img class="cursor" :src="item.image" height="250" min-width="250"
                       max-width="250" :aria-label="item.title" :title="item.title"
                       @click="publisherPageNavigation(item.id)">
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-if="suggestions.length !== 0">
          <div class="views">
            <span class="mx-7">پادکست های پیشنهادی</span>
            <v-spacer>
            </v-spacer>
            <router-link to="/suggestions" class="viewAll mx-7">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div style="position: relative;width: 100%">
            <v-row class="flexi ma-4" id="suggestionId">
              <v-layout style="z-index: 0;width: 100%">
                <v-flex v-for="(item) in suggestions" :key="item.podcastId" shrink>
                  <CardPlayer :item="item" :title-count="18"/>
                  <br/>
                  <br/>
                </v-flex>
              </v-layout>
            </v-row>

            <v-layout class="left-layout-podcasts">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveRight('#suggestionId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-right</v-icon>
              </v-btn>
            </v-layout>
            <v-layout class="right-layout-podcasts">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveLeft('#suggestionId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-left</v-icon>
              </v-btn>
            </v-layout>
          </div>
        </div>

        <div v-if="posts.length !== 0">
          <div class="views">
            <span class="mx-7">آخرین اخبار پادکستر ها</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/news">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div class="flexi ma-4">
            <v-flex v-for="item in posts" :key="item.id" shrink>
              <CardNews :item="item"/>
              <br/>
              <br/>
            </v-flex>
          </div>
        </div>

        <div v-if="newAdded.length !== 0">
          <div class="views">
            <span class="mx-7">جدیدترین پادکست ها</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/Newest">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div style="position: relative;width: 100%">
            <v-row class="flexi ma-4" id="newAddedId">
              <v-layout style="z-index: 0;width: 100%">
                <v-flex v-for="(item) in newAdded" :key="item.podcastId" shrink>
                  <CardPlayer :item="item" :title-count="18"/>
                  <br/>
                  <br/>
                </v-flex>
              </v-layout>
            </v-row>
            <v-layout class="left-layout-podcasts">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveRight('#newAddedId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-right</v-icon>
              </v-btn>
            </v-layout>
            <v-layout class="right-layout-podcasts">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveLeft('#newAddedId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-left</v-icon>
              </v-btn>
            </v-layout>
          </div>
        </div>

        <div>
          <div class="views">
            <v-row class="pb-4">
              <span class="mx-7">معرفی دسته بندی ها</span>
            </v-row>
          </div>
          <v-row class="mr-4">
            <v-card style="width: 95%" flat>
              <v-tabs vertical v-model="currentItem" grow>
                <v-col cols="2" class="pr-4">
                  <v-tab class="align-content-space-between mt-3 tabs-cat"
                         v-for="(item,index) in introduction"
                         :key="index"
                         :href="'#tab-' + index"
                         active-class="tab-active-class"
                         style="color: black;width: 150px;border: 1px solid #9f9f9f;border-radius: 5px">
                    <v-row class=" align-center" justify="center">
                      <div>
                        <v-icon class="pl-2" size="18px"> {{item.imageAddress}}
                        </v-icon>
                      </div>
                      <div>
                                            <span :aria-label="item.name"
                                                  style="width: 50px;font-size: 15px;font-weight: 500;overflow: hidden">{{item.name}}</span>
                      </div>
                    </v-row>
                  </v-tab>

                </v-col>
                <v-tabs-items v-model="currentItem" vertical>
                  <v-tab-item v-for="(item,index) in introduction" :key="index"
                              :value="'tab-' + index">
                    <div class="flexi">
                      <v-col cols="4" style="text-decoration: none">
                        <p class="tabs-description"
                           v-html="item.description"></p>
                      </v-col>
                      <v-col cols="8">
                        <v-row v-if="item.podcasts.length >0">
                          <v-col cols="6">
                            <CardPlayer :item="item.podcasts[0]" :title-count="18"/>
                          </v-col>
                          <v-col cols="6">
                            <CardPlayer :item="item.podcasts[1]" :title-count="18"/>
                          </v-col>
                        </v-row>
                        <v-row v-else class="justify-center align-center">
                                                    <span>
                                                        هنوز برای این دسته بندی پادکستی منتشر نشده است.
                                                    </span>
                        </v-row>

                      </v-col>
                    </div>
                  </v-tab-item>
                </v-tabs-items>
                <v-col cols="8">
                </v-col>
              </v-tabs>
            </v-card>

          </v-row>
        </div>

        <div v-if="mostLike.length !== 0">
          <div class="views">
            <span class="mx-7">محبوب ترین پادکست ها</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/favorites">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div style="position: relative;width: 100%">
            <v-row class="flexi ma-4" id="mostLikeId">
              <v-layout style="z-index: 0;width: 100%">
                <v-flex v-for="(item) in mostLike" :key="item.podcastId" shrink>
                  <CardPlayer :item="item" :title-count="18"/>
                  <br/>
                  <br/>
                </v-flex>
              </v-layout>
            </v-row>
            <v-layout class="left-layout-podcasts">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveRight('#mostLikeId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-right</v-icon>
              </v-btn>
            </v-layout>
            <v-layout class="right-layout-podcasts">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveLeft('#mostLikeId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-left</v-icon>
              </v-btn>
            </v-layout>
          </div>
        </div>

        <div v-if="followings.length !== 0">
          <div class="views">
            <span class="mx-7">پادکست های کانال های دنبال شده</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/followings">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div style="position: relative;width: 100%">
            <v-row class="flexi ma-4" id="followingsId">
              <v-layout style="z-index: 0;width: 100%">
                <v-flex v-for="(item) in followings" :key="item.podcastId" shrink>
                  <CardPlayer :item="item" :title-count="18"/>
                  <br/>
                  <br/>
                </v-flex>
              </v-layout>
            </v-row>
            <v-layout class="left-layout-podcasts">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveRight('#followingsId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-right</v-icon>
              </v-btn>
            </v-layout>
            <v-layout class="right-layout-podcasts">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveLeft('#followingsId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-left</v-icon>
              </v-btn>
            </v-layout>
          </div>
        </div>

        <div v-if="blogs.length !== 0">
          <div class="views">
            <h2 class="mx-7">آخرین بلاگ های منتشر شده</h2>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/blog">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <v-row>
            <v-col cols="0"></v-col>
            <v-col cols="11">
              <v-flex v-for="(item,index) in blogs" :key="index" shrink>
                <CardBlog :item="item"/>
                <br/>
              </v-flex>
            </v-col>
            <v-col cols="0"></v-col>
          </v-row>
        </div>

        <div v-if="mostView.length !== 0">
          <div class="views">
            <span class="mx-7">پر بازدید ترین پادکست ها</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/mostView">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div style="position: relative;width: 100%">
            <v-row class="flexi ma-4" id="mostViewId">
              <v-layout style="z-index: 0;width: 100%">
                <v-flex v-for="(item) in mostView" :key="item.podcastId" shrink>
                  <CardPlayer :item="item" :title-count="18"/>
                  <br/>
                  <br/>
                </v-flex>
              </v-layout>
            </v-row>

            <v-layout class="left-layout-podcasts">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveRight('#mostViewId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-right</v-icon>
              </v-btn>
            </v-layout>
            <v-layout class="right-layout-podcasts">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveLeft('#mostViewId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-left</v-icon>
              </v-btn>
            </v-layout>
          </div>
        </div>

        <div v-if="channels.length !== 0">
          <div class="views">
            <span class="mx-7">چنل های پادکست </span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/Channels">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div style="position: relative;width: 100%">
            <v-row class="flexi ma-4" id="channelsId">
              <v-layout style="z-index: 0;width: 100%">
                <v-flex v-for="item in channels" :key="item.id" shrink>
                  <CardChannels :item="item.channelInfo" :listen-count="item.listenCount"/>
                </v-flex>
              </v-layout>
            </v-row>

            <v-layout class="left-layout-channels">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveRight('#channelsId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-right</v-icon>
              </v-btn>
            </v-layout>
            <v-layout class="right-layout-channels">
              <v-btn class="ma-0 arrow-btn" large raised fab color="#ffffff"
                     v-on:click="moveLeft('#channelsId')" height="80px" width="80px">
                <v-icon size="80">mdi-chevron-left</v-icon>
              </v-btn>
            </v-layout>
          </div>
        </div>
        <div style="height: 100px;"></div>
      </div>
    </div>
    <!--Tablet Mode-->
    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <div v-if="siteLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <CS/>

        <div v-if="categories.length !== 0">
          <div class="views">
            <span class="mx-7">دسته بندی ها</span>
            <v-spacer>

            </v-spacer>
            <router-link to="/category" class="viewAll mx-7">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div class="flexi">
            <v-flex v-for="(items,index) in categories" :key="items.id" shrink>
              <v-btn text @click="categoryPageNavigation(items.id)" class="pl-1 pr-1">
                <v-chip class="primary" v-if="index %2 == 0" style="cursor: pointer">
                  <v-icon right class="pl-8 pr-2">
                    {{items.imageAddress}}
                  </v-icon>
                  {{items.name}}
                </v-chip>
                <v-chip color="#606060" v-else style="cursor: pointer">
                  <v-icon right class="pl-8 pr-2" color="white">
                    {{items.imageAddress}}
                  </v-icon>
                  <span style="color: white">{{items.name}}</span>
                </v-chip>
              </v-btn>
            </v-flex>
          </div>
        </div>

        <div v-if="suggestions.length !== 0">
          <div class="views">
            <span class="mx-7">پیشنهادات</span>
            <v-spacer>
            </v-spacer>
            <router-link to="/suggestions" class="viewAll mx-7">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div class="flexi ma-4">
            <v-flex v-for="(item) in suggestions" :key="item.podcastId">
              <CardPlayer :item="item" :title-count="16"/>
              <br/>
              <br/>
            </v-flex>
          </div>
        </div>

        <div v-if="posts.length !== 0">
          <div class="views">
            <span class="mx-7">آخرین اخبار پادکستر ها</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/news">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div class="flexi ma-4">
            <v-flex v-for="item in posts" :key="item.id" shrink>
              <CardNews :item="item"/>
              <br/>
              <br/>
            </v-flex>
          </div>
        </div>

        <div v-if="newAdded.length !== 0">
          <div class="views">
            <span class="mx-7">جدید ترین</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/Newest">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div class="flexi ma-4">
            <v-flex v-for="(item) in newAdded" :key="item.podcastId" shrink>
              <CardPlayer :item="item" :title-count="16"/>
              <br/>
              <br/>
            </v-flex>
          </div>
        </div>

        <div v-if="mostLike.length !== 0">
          <div class="views">
            <span class="mx-7">محبوب ترین</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/favorites">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div class="flexi ma-4">
            <v-flex v-for="(item) in mostLike" :key="item.podcastId" shrink>
              <CardPlayer :item="item" :title-count="16"/>
              <br/>
              <br/>
            </v-flex>
          </div>
        </div>

        <div v-if="followings.length !== 0">
          <div class="views">
            <span class="mx-7">دنبال شده ها</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/followings">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div class="flexi ma-4">
            <v-flex v-for="(item) in followings" :key="item.podcastId">
              <CardPlayer :item="item" :title-count="16"/>
              <br/>
              <br/>
            </v-flex>
          </div>
        </div>

        <div v-if="mostView.length !== 0">
          <div class="views">
            <span class="mx-7">پر بازدید ترین ها</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/mostView">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div class="flexi ma-4">
            <v-flex v-for="(item) in mostView" :key="item.podcastId" shrink>
              <CardPlayer :item="item" :title-count="16"/>
              <br/>
              <br/>
            </v-flex>
          </div>
        </div>

        <div v-if="channels.length !== 0">
          <div class="views">
            <span class="mx-7">کانال ها</span>
            <v-spacer>

            </v-spacer>
            <router-link class="viewAll mx-7" to="/Channels">
              <span>مشاهده همه >></span>
            </router-link>
          </div>

          <div class="flexi ma-4 ">
            <v-flex v-for="item in channels" :key="item.id" shrink>
              <CardChannels :item="item.channelInfo" :listen-count="item.listenCount"/>
              <br/>
              <br/>
              <br/>
              <br/>
            </v-flex>
          </div>
        </div>
      </div>
    </div>
    <!--Mobile Mode-->
    <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <div v-if="mobileLoading === false">
        <Loader/>
      </div>
      <div v-else>
        <CS/>

        <div v-if="categories.length !== 0">
          <div class="flexi pb-3 pt-2" id="miniCategoryScroll">
            <v-flex v-for="(items,index) in categories" :key="items.id" shrink>
              <v-btn text @click="categoryPageNavigation(items.id)" class="pl-1 pr-1" small>
                <v-chip class="cursor" color="primary" v-if="index %2 == 0">
                  <v-icon right class="pl-8 pr-2">
                    {{items.imageAddress}}
                  </v-icon>
                  {{items.name}}
                </v-chip>
                <v-chip class="cursor" color="#606060" v-else>
                  <v-icon right class="pl-8 pr-2" color="white">
                    {{items.imageAddress}}
                  </v-icon>
                  <span style="color: white">{{items.name}}</span>
                </v-chip>
              </v-btn>
            </v-flex>
          </div>
          <v-divider style="color: #464646;" :inset="false"></v-divider>
        </div>

        <v-flex v-for="item in firstPart" :key="item.podcastId">
          <MobileCardPlayer :item="item"/>
          <v-divider style="color: #464646;" :inset="false"></v-divider>
        </v-flex>

        <div v-if="firstNews !== null">
          <v-flex v-for="item in firstNews" :key="item.podcastId">
            <MobileCardNews :item="item"/>
            <v-divider style="color: #464646;" :inset="false"></v-divider>
          </v-flex>
        </div>

        <v-flex v-for="item in secondPart" :key="item.podcastId">
          <MobileCardPlayer :item="item"/>
          <v-divider style="color: #464646;" :inset="false"></v-divider>
        </v-flex>

        <div v-if="secondNews !== null">
          <v-flex v-for="item in secondNews" :key="item.podcastId">
            <MobileCardNews :item="item"/>
            <v-divider style="color: #464646;" :inset="false"></v-divider>
          </v-flex>
        </div>

        <div v-if="mobileUsers.length !== 0">
          <div class="flexi">
            <v-flex v-for="item in mobileUsers" :key="item.id">
              <MobileCardChannels :item="item"/>
              <!--<v-divider style="color: #464646;" :inset="false"></v-divider>-->
            </v-flex>
          </div>
          <v-row>
            <v-btn outlined text color="primary" @click="channelsPageNavigation" width="100%">
              مشاهده همه کانال ها
              <v-icon>mdi-chevron-double-down</v-icon>
            </v-btn>
          </v-row>
          <br>
        </div>

        <div v-if="infinitePart.length !== 0">
          <v-flex v-for="item in infinitePart" :key="item.podcastId">
            <MobileCardPlayer :item="item"/>
            <v-divider style="color: #464646;" :inset="false"></v-divider>
          </v-flex>
        </div>
        <InfiniteLoading @infinite="loadMoreMobileEpisodes" spinner="spiral"/>
        <div style="height: 150px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileCardChannels from "../components/cards/MobileCardChannels";
  import MobileCardPlayer from "../components/cards/MobileCardPlayer";
  import MobileCardNews from "../components/cards/MobileCardNews";
  import CardChannels from "../components/cards/CardChannels";
  import CS from '../components/tools/CarouselSlider.vue';
  import CardPlayer from "../components/cards/CardPlayer";
  import CardBlog from "../components/cards/CardBlog";
  import CardNews from "../components/cards/CardNews";
  import InfiniteLoading from 'vue-infinite-loading';
  import Loader from "../components/tools/Loader";
  import axios from 'axios';
  import $ from "jquery";

  export default {
    layout: "pody",
    name: "HomePage",
    components: {
      CardBlog, MobileCardChannels, MobileCardNews, CardNews, CardChannels,
      MobileCardPlayer, CardPlayer, Loader, CS, InfiniteLoading
    },
    async asyncData(context) {
      if (context.$vuetify.breakpoint.xsOnly || context.$vuetify.breakpoint.smOnly) {
        if (context.store.getters.userLogin === false) {
          return axios.post("http://localhost:8084/api/podcast/list/home/mobile", {id: null}).then((response) => {
            if (response.status === 200) {
              return {
                mobileLoading: true,
                //Categories
                categories: response.data.categories,
                //First Part
                firstPart: response.data.partOne,
                //Second Part
                secondPart: response.data.partTwo,
                //FirstNews
                firstNews: response.data.firstNews,
                //Second News
                secondNews: response.data.secondNews,
                //users
                mobileUsers: response.data.users,
                //Specials
                special : response.data.special,
                //Blogs
                blogs : response.data.blogs,
              }
            }
          });
        } else {
          return axios.post("http://localhost:8084/api/podcast/list/home/mobile", {id: context.store.state.user[0].userId}).then((response) => {
            return {
              mobileLoading: true,
              //Categories
              categories: response.data.categories,
              //First Part
              firstPart: response.data.partOne,
              //Second Part
              secondPart: response.data.partTwo,
              //FirstNews
              firstNews: response.data.firstNews,
              //Second News
              secondNews: response.data.secondNews,
              //users
              mobileUsers: response.data.users,
              //Specials
              special : response.data.special,
              //Blogs
              blogs : response.data.blogs,
            }
          });
        }
      } else {
        if (context.store.getters.userLogin === false) {
          return axios.post("http://localhost:8084/api/podcast/list/home", {id: null}, {timeout: 12000}).then((response) => {
            if (response.status === 200) {
              return {
                siteLoading: true,
                //Categories
                categories: response.data.categories,
                //Suggestions
                suggestions: response.data.suggestions,
                //New Added
                newAdded: response.data.newAdded,
                //Most Viewed
                mostView: response.data.mostView,
                //Most Liked
                mostLike: response.data.mostLike,
                //Followings
                followings: response.data.followings,
                //News or podcaster Posts
                posts: response.data.news,
                //Channels
                channels: response.data.users,
                //categories Description
                introduction: response.data.introduction,
                //Specials
                special : response.data.special,
                //Blogs
                blogs : response.data.blogs,
              }

            }
          });
        } else {
          return axios.post("http://localhost:8084/api/podcast/list/home", {id: context.store.state.user[0].userId}).then((response) => {
            if (response.status === 200) {
              return {
                siteLoading: true,
                //Categories
                categories: response.data.categories,
                //Suggestions
                suggestions: response.data.suggestions,
                //New Added
                newAdded: response.data.newAdded,
                //Most Viewed
                mostView: response.data.mostView,
                //Most Liked
                mostLike: response.data.mostLike,
                //Followings
                followings: response.data.followings,
                //News or podcaster Posts
                posts: response.data.news,
                //Channels
                channels: response.data.users,
                //categories Description
                introduction: response.data.introduction,
                //Specials
                special : response.data.special,
                //Blogs
                blogs : response.data.blogs,
              }
            }
          });
        }
      }
    },
    data() {
      return {
        currentItem: '',
        infinitePart: [],
        suggestions: [],
        mobileUsers: [],
        followings: [],
        categories: [],
        introduction: [],
        secondPart: [],
        secondNews: [],
        firstPart: [],
        firstNews: [],
        newAdded: [],
        mostView: [],
        mostLike: [],
        channels: [],
        special: [],
        posts: [],
        blogs: [],
        offsetTop: 0,
        fromNum: 0,
        toNum: 20,
        mobileLoading: false,
        siteLoading: true,
        subscribe: false,
        randomCategories: [],
        randomCatId: [],
        randomCatDes: [],
      }
    },
    methods: {
      onScroll(e) {
        this.offsetTop = e.target.scrollTop;
      },
      categoryPageNavigation(id) {
        this.$router.push('/category/' + id);
      },
      moveRight(id) {
        if (this.$vuetify.breakpoint.mdAndUp) {
          $(id).animate({
            scrollLeft: '-=200'
          }, 2000);
        }
        return false;
      },
      moveLeft(id) {
        if (this.$vuetify.breakpoint.mdAndUp) {
          $(id).animate({
            scrollLeft: '+=200'
          }, 2000);
        }
        return false;
      },
      channelsPageNavigation() {
        this.$router.push('/Channels');
      },
      loadMoreMobileEpisodes($state) {
        if (this.$store.getters.userLogin === false) {
          this.fromNum += 1;
          axios.post("http://localhost:8084/api/podcast/list/home/mobile/infinite/" + this.fromNum + "/" + this.toNum, {id: null}).then((response) => {
            if (response.status === 200) {
              this.infinitePart = this.infinitePart.concat(response.data);
              $state.loaded();
            }
          });
        } else {
          this.fromNum += 1;
          axios.post("http://localhost:8084/api/podcast/list/home/mobile/infinite/" + this.fromNum + "/" + this.toNum, {id: this.$store.state.user[0].userId}).then((response) => {
            if (response.status === 200) {
              this.infinitePart = this.infinitePart.concat(response.data);
              $state.loaded();
            }
          });
        }
      },
      googleAnalytics() {

      },
      getRandomCategories() {
        let y;
        let a;
        let categoriesList = [];
        while (categoriesList.length < 5) {
          a = Math.floor(Math.random() * 18);
          if (categoriesList.length < 1) {
            categoriesList.push(a);
          } else {
            for (y = 0; y < categoriesList.length; y++) {
              if (a == categoriesList[y]) {
                break
              } else {
                categoriesList.push(a);
              }
            }
          }
          categoriesList = categoriesList.filter(this.onlyUnique);
        }
        this.randomCategories = categoriesList.filter(this.onlyUnique);

      },
      getCategoriesDescription(categ) {
        if (this.categories.length == 0) {
          console.log("000")
        } else {
          console.log(categ)
          axios.post("http://localhost:8084/api/category/info", {id: categ}).then((response) => {
            if (response.status === 200) {
              this.randomCatDes.push(response.description);
            }
          });
        }
      },
      onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      },
      publisherPageNavigation(id) {
        this.$router.push('/publisher/' + id);
      },
    },
    mounted() {

    },
    created() {
      this.googleAnalytics();
      this.getRandomCategories();
      console.log(this.$store.state.user + " is user login")
    },
    head() {
      return {
        title: "پادی",
        titleTemplate: "%s | پادکست فارسی، پادکست انگلیسی، کتاب صوتی",
      }
    },
  }
</script>

<style scoped>
  @import "../assets/Styles/PlayCardStyle.css";
  @import "../assets/Styles/FontiranSans.css";
  @import "../assets/Styles/PageSizingStyle.css";
  @import "../assets/Styles/GlobalPurposeStyle.css";

  .views {
    display: flex;
    margin-top: 20px;
    font-size: 18px;
    font-weight: 400;
  }

  .viewAll {
    font-size: 14px;
  }

  .views h2 {
    font-size: 25px;
    color: #606060;
  }

  .views h3 {
    font-size: 17px;
    color: #aea7a6;
  }

  .views a {
    text-decoration: none;
  }

  .flexi {
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    overflow-y: hidden;
  }

  .flexi::-webkit-scrollbar {
    display: none;
  }

  .tab-active-class {
    background-color: #fe731b;
    color: white !important;
    border-radius: 5px;
    font-weight: 700;
  }

  .tabs-cat {
    -webkit-box-shadow: 5px 6px 10px 1px rgba(0, 0, 0, 0.62);
    -moz-box-shadow: 5px 6px 10px 1px rgba(0, 0, 0, 0.62);
    box-shadow: 5px 6px 10px 1px rgba(0, 0, 0, 0.62);
  }

  .tabs-description {
    text-align: justify;
    font-size: 14px;
    line-height: 1.5rem;
    text-decoration: none
  }

  .left-layout {
    height: 50px;
    position: absolute;
    top: 0%;
    right: 0;
    z-index: 1;
    justify-items: start;
    align-items: start;
  }

  .left-layout-podcasts {
    position: absolute;
    top: 35%;
    right: 0;
    z-index: 1;
    justify-items: start;
    align-items: start;
  }

  .left-layout-channels {
    position: absolute;
    top: 25%;
    right: 0;
    z-index: 1;
    justify-items: start;
    align-items: start;
  }

  .right-layout {
    height: 50px;
    position: absolute;
    top: 0%;
    left: 0;
    z-index: 1;
    justify-items: end;
    align-items: start;
  }

  .right-layout-podcasts {
    position: absolute;
    top: 35%;
    left: 0;
    z-index: 1;
    justify-items: end;
    align-items: start;
  }

  .right-layout-channels {
    position: absolute;
    top: 25%;
    left: 0;
    z-index: 1;
    justify-items: end;
    align-items: start;
  }

  .arrow-btn {
    width: 40px;
    height: 40px;
    opacity: 0.7;
  }
</style>
