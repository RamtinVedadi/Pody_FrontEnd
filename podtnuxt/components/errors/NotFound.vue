<template>
    <div class="fontMain">
        <!--For PC-->
        <v-col class="pageMdAndUp pa-0 hidden-md-only hidden-md-and-down hidden-sm-and-down "
               v-show="$vuetify.breakpoint.mdAndUp" style="background: #ffffff;">
            <v-row class="justify-center">
                <div style="width: 50%;height: 50%;">
                    <v-img :src="require('../../assets/4042.png')">
                    </v-img>
                </div>
            </v-row>
            <v-row :align="center" :justify="center">
                <v-col cols="1"></v-col>
                <v-col cols="10">
                    <router-link to="/" style="text-decoration: none;">
                        <v-btn width="100%" rounded color="primary">بازگشت به خانه</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="1"></v-col>
            </v-row>
        </v-col>
        <!--For Phones-->
        <v-col class="pageXsOnlyAndMsOnly pa-0" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"
               style="background: #ffffff;">
            <v-row>
                <v-img :src="require('../../assets/4042.png')" :aspect-ratio="16/9">
                </v-img>
            </v-row>
            <v-row :align="center" :justify="center">
                <v-col cols="1"></v-col>
                <v-col cols="10">
                    <router-link to="/" style="text-decoration: none;">
                        <v-btn width="100%" rounded color="primary">بازگشت به خانه</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="1"></v-col>
            </v-row>
            <v-row style="height: 80px"></v-row>
        </v-col>
        <!--For Tablets-->
        <v-col class="pageMdAndDown hidden-sm-only hidden-xs-only pa-0" style="background: #ffffff;"
               v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
            <v-row>
                <v-img :src="require('../../assets/4042.png')" :aspect-ratio="16/9">
                </v-img>
            </v-row>
            <v-row :align="center" :justify="center">
                <v-col cols="1"></v-col>
                <v-col cols="10">
                    <router-link to="/" style="text-decoration: none;">
                        <v-btn width="100%" rounded color="primary">بازگشت به خانه</v-btn>
                    </router-link>
                </v-col>
                <v-col cols="1"></v-col>
            </v-row>
        </v-col>
    </div>
</template>

<script>
    export default {
        layout: "pody",
        name: "NotFound",
        data() {
            return {
                center: 'center',
            }
        },
        head() {
            return {
                title: "پادی | صفحه مورد نظر پیدا نشد",
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";
    @import "../../assets/Styles/PageSizingStyle.css";

</style>
