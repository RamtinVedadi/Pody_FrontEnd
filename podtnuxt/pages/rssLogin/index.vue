<template>
    <div class="fontMain">
        <v-row class="rssLogin">
            <v-col cols="1" lg="3" md="2" sm="0" xs="0" xl="2"></v-col>
            <v-col cols="10" lg="6" md="8" sm="10" xs="12" xl="8">
                <div>
                    <v-form @submit.prevent="sendRequest">
                        <v-card>
                            <v-card-title class="justify-center">
                                <v-img src="../../assets/logo.png" max-width="48px" max-height="48px">
                                </v-img>
                                <span class="headline mx-6 title-text">ورود با RSS Feed</span>
                            </v-card-title>
                            <v-card-text>
                                <v-col>
                                    <v-text-field v-model="rssUrl" label="آدرس RSS" :rules="[rules.error()]">
                                    </v-text-field>
                                </v-col>
                            </v-card-text>
                            <v-card-actions>
                                <v-row justify="center">
                                    <div v-if="sendingRequest === false">
                                        <div v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
                                            <v-btn outlined rounded
                                                   class="primary white--text ma-4"
                                                   width="200" height="35" text
                                                   @click="sendRequest"
                                            >ورود
                                            </v-btn>
                                        </div>
                                        <div v-show="$vuetify.breakpoint.mdAndUp">
                                            <v-row class="justify-center" style="width: 50rem">
                                                <v-btn large depressed outlined rounded
                                                       class="primary white--text ma-4"
                                                       width="300" height="35" text
                                                       @click="sendRequest"
                                                >ورود
                                                </v-btn>
                                            </v-row>
                                        </div>
                                    </div>
                                    <div v-else-if="loadingRequest === true && sendingRequest === true">
                                        <div v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
                                            <v-progress-circular
                                                    :size="40"
                                                    :width="4"
                                                    color="primary"
                                                    class="pb-12 mb-6"
                                                    indeterminate
                                            ></v-progress-circular>
                                        </div>
                                        <div v-show="$vuetify.breakpoint.mdAndUp">
                                            <v-row class="justify-center" style="width: 50rem">
                                                <v-progress-circular
                                                        :size="40"
                                                        :width="4"
                                                        color="primary"
                                                        class="pb-12 mb-6"
                                                        indeterminate
                                                ></v-progress-circular>
                                            </v-row>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
                                            <v-row justify="center">
                                                <span class=" mr-4 pt-4"
                                                      style="font-size: 20px">اطلاعات شما وارد شد</span>
                                                <v-btn depressed outlined rounded
                                                       class="primary white--text ma-4"
                                                       height="35" text
                                                       @click="redirectHome"
                                                >انتقال به صفحه اصلی
                                                </v-btn>
                                            </v-row>
                                        </div>
                                        <div v-show="$vuetify.breakpoint.mdAndUp">
                                            <v-row class="justify-center" style="width: 50rem">
                                                <span class=" mr-4 pt-4"
                                                      style="font-size: 22px">اطلاعات شما وارد شد</span>
                                                <v-btn large depressed outlined rounded
                                                       class="primary white--text ma-4"
                                                       width="200" height="35" text
                                                       @click="redirectHome"
                                                >انتقال به صفحه اصلی
                                                </v-btn>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </div>
            </v-col>
            <v-col cols="1" lg="3" md="2" sm="0" xs="0" xl="2"></v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "RssLogin",
        data() {
            return {
                rssUrl: "",
                sendingRequest: false,
                sendToHomeAction: false,
                loadingRequest: false,
                errorMessage: '',
                rules: {
                    error: v => !!v || this.errorMessage,
                }
            }
        },
        methods: {
            async sendRequest() {
                if (this.rssUrl.includes("shenoto")) {
                    this.errorMessage = 'آدرس های سایت شنوتو قابل قبول نیست';
                    this.sendingRequest = false;
                } else {
                    this.errorMessage = '';
                    this.loadingRequest = true;
                    this.sendingRequest = true;
                    await this.$axios.post("http://localhost:8084/api/admin/podcast/rss", {value: this.rssUrl}).then((response) => {
                        if (response.status === 200 && response.data.message === 'DUPLICATE_USERNAME') {
                            this.errorMessage = 'آدرس RSS تکراری است';
                            this.sendingRequest = false;
                            this.loadingRequest = false;
                        } else if (response.status === 200 && 'id' in response.data) {
                            this.$session.start();
                            this.$session.set('userId', response.data.id);
                            this.$session.set('username', response.data.username);
                            this.$session.set('userImage', response.data.profileImageAddress);
                            this.$session.set('userTitle', response.data.userTitle);
                            this.$session.set('isChannel', response.data.isChannel);
                            this.loadingRequest = false;
                        } else if (response.status === 500) {
                            this.errorMessage = 'مشکلی پیش آمده است یک بار دیگر تلاش کنید';
                            this.sendingRequest = false;
                        }
                    });
                }
            },
            redirectHome() {
                let routeData = this.$router.resolve({name: 'صفحه اصلی', path: "/"});
                window.open(routeData.href, "_self");
            }
        },
        head() {
            return {
                title: "پادی | ورود با RSS ",
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";

    .rssLogin {
        background: #f9f9f9;
        background: linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113));
        width: 105%;
        height: 100%;
        position: absolute;
    }
</style>
