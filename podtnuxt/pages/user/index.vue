<template>
  <!--//TODO-->
  <div class="fontMain">
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <v-row>
        <v-img :src="userData.banner"></v-img>
      </v-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        userData: [
          {
            banner: 'https://image.freepik.com/free-photo/fitness-healthy-lifestyle-concept-female-is-resting-eating-healthy-oatmeal-after-workout-banner-top-view_2829-7764.jpg'
          }
        ]
      }
    },
    methods: {},
    head() {
      return {
        title: "پادی | پروفایل",
      }
    }

  }
</script>

<style scoped>
  @import "../../assets/Styles/FontiranSans.css";
  @import "../../assets/Styles/PageSizingStyle.css";
</style>
