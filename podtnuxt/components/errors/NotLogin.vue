<template>
    <div class="fontMain">
        <v-row>
            <v-col cols="9">
                <v-row class="justify-center" style="height: 100%">
                    <div style="height: 100%">
                        <v-img width="500px" height="500px"
                               :src="require('../../assets/NotLogin.svg')"></v-img>
                    </div>
                </v-row>
            </v-col>
            <v-col cols="3">
                <v-row style="height: 30%;background: white"></v-row>
                <v-row style="height: 70%">
                    <v-card flat>
                        <v-card-title class="headline justify-center">شما ورود نکرده اید!</v-card-title>
                        <v-card-text class="subtitle-1 text-center">
                            جهت استفاده از امکانات بیشتر وارد سایت شوید
                        </v-card-text>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="1"></v-col>
                                <v-col cols="10" style="text-align: center">
                                    <v-btn color="primary darken-1" text @click="loginPageRedirection">
                                        انتقال به صفحه ورود
                                    </v-btn>
                                </v-col>
                                <v-col cols="1"></v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
        <div style="height:19vh"></div>
    </div>
</template>

<script>
    export default {
        name: "NotLogin",
        methods: {
            loginPageRedirection() {
                window.location.href = "/Login"
            },
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";
</style>
