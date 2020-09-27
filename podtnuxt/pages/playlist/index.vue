<template>
  <div class="fontMain">
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <v-row class="mt-5 mr-5">
        <h2 style="font-size: 25px">پلی لیست ها</h2>
        <v-spacer></v-spacer>
      </v-row>
      <v-col cols="2"></v-col>
      <v-row justify="center" class="pt-2 pr-10">
        <v-col v-for="(item , index) in playList" :key="index" cols="6" md="3">
          <PlayListCard :title="item.title" :image="item.image" :id="item.id"/>
        </v-col>
      </v-row>
      <div style="height: 100px"></div>
    </div>
    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
      <v-row class="mt-5 mr-5">
        <h2 style="font-size: 25px">پلی لیست ها</h2>
        <v-spacer></v-spacer>
      </v-row>
      <v-row justify="center" class="pt-2 pr-10">
        <v-col v-for="(item , index) in playList" :key="index" cols="6" md="3">
          <mobilePlayListCard :title="item.title" :image="item.image" :id="item.id"/>
        </v-col>
      </v-row>
    </div>
    <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
      <v-row class="mt-5 mr-5">
        <h2 style="font-size: 25px">پلی لیست ها</h2>
        <v-spacer></v-spacer>
      </v-row>
      <v-row justify="center" class="pt-2 pr-10">
        <v-col v-for="(item , index) in playList" :key="index" cols="6" md="3">
          <mobilePlayListCard :title="item.title" :image="item.image" :id="item.id"/>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import PlayListCard from "../../components/playList/playListCard";
  import mobilePlayListCard from "../../components/playList/mobilePlayListCard";

  export default {
    name: "index",
    layout: "pody",
    components: {PlayListCard, mobilePlayListCard},
    data: () => ({
      playList: [
        {
          title: "Calm Vibs",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "123213",
        },
        {
          title: "Calm Vibs",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "2123",
        },
        {
          title: "Calm Vibs",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "23123",
        },
        {
          title: "Calm Vibs",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "123123",
        },
        {
          title: "Calm Vibs",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "12321321",
        },
        {
          title: "Calm Vibs",
          image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          id: "12321321",
        },
      ]
    }),
    head() {
      return {
        title: "پلی لیست ها"
      }
    },
  }
</script>

<style scoped>
  @import "../../assets/Styles/FontiranSans.css";

  .playlist {
    background-color: #f9f9f9;
    float: left;
    width: 85%;
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
</style>
