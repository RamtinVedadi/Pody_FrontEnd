<template>
  <div class="fontMain">
    <div class="pageMdAndUp" v-show="$vuetify.breakpoint.mdAndUp">
      <div v-if="podcasts.length === 0">
        <Loader/>
      </div>
      <div v-else>
        <v-row class="mt-5 mr-5">
          <h2>جدیدترین پادکست ها</h2>
          <v-spacer></v-spacer>
          <v-text-field
            class="ml-5" solo flat hide-details autofocus rounded
            clearable disabled background-color="#ddd"
            color="primary" label="جست و جو" style="width: 300px;"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-row>
        <v-row class="mt-8" no-gutters>
          <v-flex v-for="item in podcasts" :key="item.podcastId">
            <CardPlayer :item="item" :title-count="18"/>
            <br/>
            <br/>
          </v-flex>
        </v-row>
        <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
        <div style="height: 100px;"></div>
      </div>
    </div>

    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <div v-if="podcasts.length === 0">
        <Loader/>
      </div>
      <div v-else>
        <v-row class="mt-5 mr-5">
          <h2>جدیدترین پادکست ها</h2>
          <v-spacer></v-spacer>
          <v-text-field
            class="ml-5" solo flat hide-details autofocus rounded
            clearable disabled background-color="#ddd"
            color="primary" label="جست و جو" style="width: 300px;"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-row>
        <v-row class="mt-8" no-gutters>
          <v-flex v-for="item in podcasts" :key="item.podcastId">
            <CardPlayer :item="item" :title-count="16"/>
            <br/>
            <br/>
          </v-flex>
        </v-row>
        <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
        <div style="height: 100px;"></div>
      </div>
    </div>

    <div v-show="$vuetify.breakpoint.xsOnly">
      <div>
        <v-row><h2 class="mt-2 mr-5">جدیدترین پادکست ها</h2></v-row>
        <v-row class="mt-4">
          <v-flex v-for="item in podcasts" :key="item.podcastId">
            <MobileCardPlayer :item="item"/>
            <v-divider style="color: #464646;" :inset="false"></v-divider>
          </v-flex>
        </v-row>
        <InfiniteLoading @infinite="loadMorePodcasts" spinner="spiral"/>
        <div style="height: 100px;"></div>
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
    name: "Newest",
    components: {MobileCardPlayer, Loader, CardPlayer, InfiniteLoading},
    async asyncData(context) {
      axios.get('http://localhost:8084/api/podcast/list/new/' + context.till + '/' + context.to).then((response) => {
        if (response.status === 200) {
          return {
            podcasts: response.data,
          }
        }
      });
    },
    data: () => ({
      podcasts: [],
      loadMore: false,
      till: 0,
      to: 20,
    }),
    methods: {
      onScroll(e) {
        this.offsetTop = e.target.scrollTop;
      },
      loadMorePodcasts($state) {
        this.till += 1;
        axios.get('http://localhost:8084/api/podcast/list/new/' + this.till + '/' + this.to).then((response) => {
          if (response.status === 200) {
            this.podcasts = this.podcasts.concat(response.data);
            $state.loaded();
          }
        });
      },
    },
    created() {
      axios.get('http://localhost:8084/api/podcast/list/new/' + this.till + '/' + this.to).then((response) => {
        this.podcasts = response.data;
      });
    },
    head() {
      return {
        title: "پادی | جدیدترین ها",
      }
    }
  }
</script>

<style scoped>

</style>
