<template>
    <div class="fontMain">
        <!--For PC-->
        <v-col class="notFoundMdAndUp pa-0 hidden-md-only hidden-md-and-down hidden-sm-and-down "
               v-show="$vuetify.breakpoint.mdAndUp">
            <v-row class="justify-center">
                <div style="width: 50%;height: 50%">
                    <v-img src="../../assets/4042.png">
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
        <v-col class="notFoundXsOnlyAndMsOnly pa-0" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
            <v-row>
                <v-img src="../../assets/4042.png" :aspect-ratio="16/9">
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
        <v-col class="notFoundMdAndDown hidden-sm-only hidden-xs-only pa-0"
               v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
            <v-row>
                <v-img src="../../assets/4042.png" :aspect-ratio="16/9">
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
        name: "NotFound",
        data() {
            return {
                center: 'center',
            }
        },
        created() {
            let title = "پادی | صفحه مورد نظر پیدا نشد ";
            document.title = title;
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";

    .notFoundMdAndUp {
        float: left;
        width: 85%;
        height: 100%;
    }

    .notFoundXsOnlyAndMsOnly {
        float: left;
        width: 100%;
        height: 100%;
    }

    .notFoundMdAndDown {
        float: left;
        width: 95%;
        height: 100%;
    }
</style>
