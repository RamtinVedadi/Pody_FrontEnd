<template>
    <div class="footer fontMain">
        <div v-show="$vuetify.breakpoint.mdAndUp">
            <v-footer dark padless width="100%" v-if="ali">
                <v-card class="flex" flat tile>
                    <!-- Make title of footer -->
                    <v-card-title class="primary justify-center">
                        <strong class="subheading ma-3" xs12>هر ایرانی یک پادکست</strong>
                    </v-card-title>

                    <!--  Social Media Icons  -->
                    <v-card-title class="primary justify-center">
                        <v-row class="justify-center">
                            <v-btn v-for="icon in icons" :key="icon.name" class="mx-4" icon depressed>
                                <a :href="icon.url" :target="icon.target" color="white">
                                    <v-icon size="20px" color="white">{{ icon.name }}</v-icon>
                                </a>
                            </v-btn>
                        </v-row>
                    </v-card-title>

                    <!-- Snackbar in footer -->
                    <v-card-text class="py-2 white--text text-center">
                        <strong>تمام حقوق این سایت متعلق به پادی می باشد و هر گونه استفاده اطلاعات از سایت پیگرد قانونی
                            دارد</strong>
                    </v-card-text>

                    <!-- the date  -->
                    <v-card-text class="py-2 white--text text-center">
                        {{ new Date().getFullYear() }} —
                        <strong>Pody</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
            <!--  make footer -->
            <v-footer dark padless width="100%" v-else>
                <v-card class="flex" flat tile>
                    <!-- Make title of footer -->
                    <v-card-title class="primary justify-center">
                        <strong class="subheading ma-3" xs12>هر ایرانی یک پادکست</strong>
                    </v-card-title>

                    <!--  Social Media Icons  -->
                    <v-card-title class="primary justify-center">
                        <v-row class="justify-center">
                            <v-btn v-for="icon in icons" :key="icon.name" class="mx-4" icon depressed>
                                <a :href="icon.url" :target="icon.target" color="white">
                                    <v-icon size="20px" color="white">{{ icon.name }}</v-icon>
                                </a>
                            </v-btn>
                        </v-row>
                    </v-card-title>

                    <!-- Snackbar in footer -->
                    <v-card-text class="py-2 white--text text-center">
                        <strong>تمام حقوق این سایت متعلق به پادی می باشد و هر گونه استفاده اطلاعات از سایت پیگرد قانونی
                            دارد</strong>
                    </v-card-text>

                    <!-- the date  -->
                    <v-card-text class="py-2 white--text text-center">
                        {{ new Date().getFullYear() }} —
                        <strong>Pody</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
        </div>
        <div v-show="$vuetify.breakpoint.xsOnly">
            <v-footer class="align-end mt-2" padless dark width="100%">
                <v-row class="primary justify-center"><strong>هر ایرانی یک پادکست</strong></v-row>
                <div class="primary" style="height: 268px;">
                    <v-col cols="6" style="float: right;height: 100%">
                        <v-list class="primary">
                            <v-list-item>
                          <span>
                            درباره ی پادی
                          </span>
                            </v-list-item>
                            <v-list-item>
                          <span>
                            وبلاگ
                          </span>
                            </v-list-item>
                            <v-list-item>
                          <span>
                           سوالات متداول
                          </span>
                            </v-list-item>

                        </v-list>
                    </v-col>
                    <v-col style="float: left" cols="6" v-for="icon in icons" :key="icon.id">
                        <v-row class="justify-end">
                            <v-btn class="primary" small text :href="icon.url">
                                <span>{{icon.title}}</span>
                                <v-icon class="mr-2">{{icon.name}}</v-icon>
                            </v-btn>
                        </v-row>

                    </v-col>
                </div>
                <v-row class="py-1 mr-1 ml-1 white--text text-center" style="font-size: 14px">
                    <strong>تمام حقوق این سایت متعلق به پادی می باشد و هر گونه استفاده اطلاعات از سایت پیگرد قانونی
                        دارد</strong>
                </v-row>
                <v-row class="py-1 white--text justify-center">
                    {{ new Date().getFullYear() }} —
                    <strong>Pody</strong>
                </v-row>
            </v-footer>
        </div>
        <div v-show="$vuetify.breakpoint.smOnly">
            <v-footer class="align-end mt-2" padless dark width="100%">
                <v-row class="primary justify-center"><strong>هر ایرانی یک پادکست</strong></v-row>
                <div class="primary pt-3 pr-5" style="height: 120px;width: 100%">
                    <v-row class="flexi">
                        <v-flex v-for="icon in icons" :key="icon.id" style="width: 100%;height: 50px">

                            <v-btn class="primary" small text :href="icon.url">
                                <v-icon class="mr-2">{{icon.name}}</v-icon>
                            </v-btn>


                        </v-flex>
                    </v-row>
                    <v-row style="width: 100%;height: 20px">
                        <v-flex class="primary flexi">
                            <v-col cols="3"></v-col>
                            <v-col cols="2">
                                  <span>
                            درباره ی پادی
                          </span>
                            </v-col>
                            <v-col cols="2">
                                   <span>
                            وبلاگ
                          </span>
                            </v-col>
                            <v-col cols="2">
                                    <span>
                           سوالات متداول
                          </span>
                            </v-col>
                            <v-col cols="2"></v-col>

                        </v-flex>
                    </v-row>
                </div>
                <v-row class="justify-center white--text text-center" style="font-size: 14px">
                    <strong>تمام حقوق این سایت متعلق به پادی می باشد و هر گونه استفاده اطلاعات از سایت پیگرد قانونی
                        دارد</strong>
                </v-row>
                <br>
                <v-row class="white--text justify-center">
                    {{ new Date().getFullYear() }} —
                    <strong>Pody</strong>
                </v-row>
            </v-footer>
        </div>
    </div>
</template>

<script>
    // import "@fontawesome/fontawesome-free/css/all.css";

    export default {
        name: 'Footer',
        data: () => {
            return {
                ali: false,
                // Icons in data
                icons: [
                    {
                        name: "fab fa-telegram",
                        title: "Telegram",
                        id: 1,
                        url: "https://t.me/PodyTeam",
                        target: "_blank"
                    },
                    {
                        name: "fab fa-twitter",
                        title: "Twitter",
                        id: 2,
                        url: "https://twitter.com/PodyTeam",
                        target: "_blank"
                    },
                    {
                        name: "fab fa-linkedin",
                        title: "Linkdin",
                        id: 3,
                        url: "https://www.linkedin.com/company/pody/",
                        target: "_blank"
                    },
                    {
                        name: "fab fa-instagram",
                        title: "Instagram",
                        id: 4,
                        url: "https://www.instagram.com/pody.ir",
                        target: "_blank"
                    },
                    {
                        name: "fas fa-envelope",
                        title: "Email",
                        id: 5,
                        url: "mailto:pody.team@gmail.com",
                        target: "_blank"
                    }
                ]
            };
        },
        components: {}
    };
</script>

<style>
    @import "../assets/Styles/FontiranSans.css";

    .pody-player-bar {
        background-color: white;
    }

    .footer {
        width: 85%;
        float: left;
    }
</style>
