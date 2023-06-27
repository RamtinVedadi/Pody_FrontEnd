<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="fontMain">
        <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
             v-show="$vuetify.breakpoint.mdAndUp">
            <div v-if="isLogin === false">
                <NotLogin/>
            </div>
            <div v-else>
                <v-row>
                    <v-col cols="0"></v-col>
                    <v-col cols="11">
                        <v-stepper v-model="e1">
                            <v-stepper-header>
                                <v-stepper-step :complete="e1 > 1" step="1">عنوان کانال</v-stepper-step>
                                <v-stepper-step :complete="e1 > 2" step="2">شبکه های اجتماعی</v-stepper-step>
                                <v-stepper-step :complete="e1 > 3" step="3">آپلود کاور کانال</v-stepper-step>
                                <v-stepper-step step="4">ثبت پایانی</v-stepper-step>
                            </v-stepper-header>
                            <v-stepper-items>
                                <v-stepper-content step="1">
                                    <v-card color="lighten-1" flat>
                                        <v-text-field v-model="channelTitle"
                                                      :rules="[channelTitleRules.error()]"
                                                      :counter="60" label="عنوان کانال"
                                                      required outlined clearable>
                                        </v-text-field>
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field v-model="firstName"
                                                              :rules="[firstNameRules.error()]"
                                                              :counter="60" label="نام ناشر"
                                                              required outlined clearable>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field v-model="lastName"
                                                              :rules="[lastNameRules.error()]"
                                                              :counter="60" label="نام خانوادگی ناشر"
                                                              required outlined clearable>
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-textarea v-model="channelBio"
                                                    :rules="[channelBioRules.error()]"
                                                    clearable :counter="150" outlined
                                                    label="بیو کانال"
                                        ></v-textarea>
                                    </v-card>
                                    <v-btn color="primary" large
                                           @click="goToStepTwo">مرحله بعد
                                    </v-btn>
                                </v-stepper-content>

                                <v-stepper-content step="2">
                                    <v-card color="lighten-1" flat>
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field v-model="instagramUrl"
                                                              label="آدرس instagram"
                                                              prepend-icon="mdi-instagram"
                                                              required outlined clearable>
                                                </v-text-field>
                                                <v-text-field v-model="telegramUrl"
                                                              label="آدرس telegram"
                                                              prepend-icon="mdi-telegram"
                                                              required outlined clearable>
                                                </v-text-field>
                                                <v-text-field v-model="twitterUrl"
                                                              label="آدرس twitter"
                                                              prepend-icon="mdi-twitter"
                                                              required outlined clearable>
                                                </v-text-field>
                                                <v-text-field v-model="websiteUrl"
                                                              label="آدرس Website"
                                                              prepend-icon="mdi-web"
                                                              required outlined clearable>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field v-model="facebookUrl"
                                                              label="آدرس facebook"
                                                              prepend-icon="mdi-facebook"
                                                              required outlined clearable>
                                                </v-text-field>
                                                <v-text-field v-model="youtubeUrl"
                                                              label="آدرس youtube"
                                                              prepend-icon="mdi-youtube"
                                                              required outlined clearable>
                                                </v-text-field>
                                                <v-text-field v-model="discordUrl"
                                                              label="آدرس discord"
                                                              prepend-icon="mdi-discord"
                                                              required outlined clearable>
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-btn color="primary" @click="goToStepThree">مرحله بعد</v-btn>
                                    <v-btn text @click="e1 = 1">بازگشت به مرحله قبل</v-btn>
                                </v-stepper-content>

                                <v-stepper-content step="3">
                                    <v-card color="lighten-1" height="300px" flat>
                                        <v-row>
                                            <v-col class="pb-0" cols="6">
                                                <v-file-input id="inpFile"
                                                              accept="image/png, image/jpeg, image/bmp"
                                                              placeholder=" عکس کانال پادکستی خودتون را انتخاب کنید (در ابعاد 900 در 900 یا مربع)"
                                                              prepend-icon="mdi-camera" label="عکس کانال"
                                                              show-size required outlined
                                                              v-model="channelImage">
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip small label color="primary">
                                                            {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                            </v-col>
                                            <v-col class="pb-0" cols="6">
                                                <v-file-input id="inpFile"
                                                              accept="image/png, image/jpeg, image/bmp"
                                                              placeholder="کاور صفحه کانال را انتخاب کنید (در ابعاد 1290 در 250)"
                                                              prepend-icon="mdi-camera-iris" label="کاور صفحه"
                                                              show-size required outlined
                                                              v-model="pageImage">
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip small label color="primary">
                                                            {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                                <v-row class="pb-2" justify="center">
                                                    <h5 style="color: #666666;">در صورتی که عکسی برای کاور صفحه اصلی تان
                                                        انتخاب نکنید این تصویر
                                                        بصورت پیشفرض قرار میگیرد</h5>
                                                </v-row>
                                                <v-img src="http://pody.ir/defaultImages/default.jpg"
                                                       height="200px"></v-img>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-btn color="primary" width="230" @click="goToStepFour">آپلود کاور</v-btn>
                                </v-stepper-content>

                                <v-stepper-content step="4">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-row justify="center">
                                                <h2 class="font-weight-light">ثبت اطلاعات کانال شما به پایان رسید، ممنون
                                                    از
                                                    ثبتتون :)</h2>
                                            </v-row>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-btn color="primary" @click="finishingTouch">انتشار</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </v-col>
                    <v-col cols="0"></v-col>
                </v-row>
                <div style="height: 100px;"></div>
                <Snackbar :snackbar="snackbarFlag" :snackbar-text="snackbarText"/>
            </div>
        </div>
    </div>
</template>

<script>
    import NotLogin from "../../../components/errors/NotLogin";
    import Snackbar from "../../../components/tools/Snackbar";
    import axios from 'axios';

    export default {
        name: "UpdateChannel",
        components: {NotLogin, Snackbar},
        data() {
            return {
                e1: 1,
                isLogin: false,
                snackbarFlag: false,
                snackbarText: '',
                channelTitle: '',
                channelTitleErrorMessage: '',
                channelTitleRules: {
                    error: v => !!v || this.channelTitleErrorMessage,
                },
                firstName: '',
                firstNameErrorMessage: '',
                firstNameRules: {
                    error: v => !!v || this.firstNameErrorMessage,
                },
                lastName: '',
                lastNameErrorMessage: '',
                lastNameRules: {
                    error: v => !!v || this.lastNameErrorMessage,
                },
                channelBio: '',
                channelBioErrorMessage: '',
                channelBioRules: {
                    error: v => !!v || this.channelBioErrorMessage,
                },
                instagramUrl: '',
                telegramUrl: '',
                websiteUrl: '',
                twitterUrl: '',
                facebookUrl: '',
                youtubeUrl: '',
                discordUrl: '',
                channelImage: null,
                pageImage: null,
                item: {}
            }
        },
        methods: {
            goToStepTwo() {
                //channel Title
                if (this.channelTitle.length === 0) {
                    this.channelTitleErrorMessage = 'برای ادامه دادن در مراحل آینده نیاز به وارد کردن عنوان کانال است.';
                    return;
                } else if (this.channelTitle.length > 60) {
                    this.channelTitleErrorMessage = 'عنوان باید کمتر از 60 کاراکتر باشد.';
                    return;
                } else if (this.channelTitle.length > 0) {
                    this.channelTitleErrorMessage = '';
                }
                //Channel Publisher First name
                if (this.firstName.length === 0) {
                    this.firstNameErrorMessage = 'برای ادامه باید نام ناشر را وارد کنید';
                    return;
                } else if (this.firstName.length > 60) {
                    this.firstNameErrorMessage = 'نام ناشر باید کمتر از 60 کاراکتر باشد.';
                    return;
                } else if (this.firstName.length > 0) {
                    this.firstNameErrorMessage = '';
                }
                //Channel Publisher First name
                if (this.lastName.length === 0) {
                    this.lastNameErrorMessage = 'برای ادامه باید نام خانوادگی ناشر را وارد کنید';
                    return;
                } else if (this.lastName.length > 60) {
                    this.lastNameErrorMessage = ' نام خانوادگی ناشر باید کمتر از 60 کاراکتر باشد.';
                    return;
                } else if (this.lastName.length > 0) {
                    this.lastNameErrorMessage = '';
                }
                //Channel Bio
                if (this.channelBio === '') {
                    this.channelBioErrorMessage = 'برای ادامه دادن در مراحل آینده نیاز به وارد کردن عنوان کانال است.';
                    return;
                } else if (this.channelBio.length > 150) {
                    this.channelBioErrorMessage = 'بیو کانال باید کمتر از 150 کاراکتر باشد.';
                    return;
                }

                this.e1 = 2;
            },
            goToStepThree() {
                axios.put("http://localhost:8084/api/user/update/" + this.$store.state.user[0].userId, {
                    title: this.channelTitle,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    instagramUrl: this.instagramUrl,
                    telegramUrl: this.telegramUrl,
                    facebookUrl: this.facebookUrl,
                    twitterUrl: this.twitterUrl,
                    youtubeUrl: this.youtubeUrl,
                    discordUrl: this.discordUrl,
                    websiteUrl: this.websiteUrl,
                    bio: this.channelBio,
                    isChannel: true,
                }).then((response) => {
                    if (response.data.message === 'SUCCESSFUL') {
                        this.e1 = 3;
                    } else {
                        this.snackbarFlag = true;
                        this.snackbarText = 'مشکلی پیش آمده است لطفا یکبار دیگر تلاش کنید';
                    }
                });
            },
            goToStepFour() {
                const formData = new FormData();
                if (this.pageImage != null) {
                    formData.append('cover', this.channelImage);
                    formData.append('page', this.pageImage);
                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    };
                    axios.post("http://localhost:8084/api/user/upload/" + this.$store.state.user[0].userId + "/images", formData, config).then((response) => {
                        if (response.status === 200) {
                            this.item = response.data;
                            this.e1 = 4;
                        } else {
                            this.snackbarFlag = true;
                            this.snackbarText = 'مشکلی پیش آمده است لطفا یکبار دیگر تلاش کنید';
                        }
                    });
                } else {
                    formData.append('file', this.channelImage);
                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    };
                    axios.post("http://localhost:8084/api/user/" + this.$store.state.user[0].userId + "/image", formData, config).then((response) => {
                        if (response.status === 200) {
                            this.item = response.data;
                            this.e1 = 4;
                        } else {
                            this.snackbarFlag = true;
                            this.snackbarText = 'مشکلی پیش آمده است لطفا یکبار دیگر تلاش کنید';
                        }
                    });
                }
            },
            finishingTouch() {
                this.$session.set('userImage', this.item.profileImageAddress);
                this.$session.set('userTitle', this.item.userTitle);
                this.$session.set('isChannel', this.item.isChannel);
                let routeData = this.$router.resolve({name: 'صفحه اصلی', path: "/"});
                window.open(routeData.href, "_self");
            }
        },
        mounted() {
            if (this.$store.getters.userLogin === true) {
                this.isLogin = true;
            }
        }
    }
</script>

<style scoped>
    @import "../../../assets/Styles/GlobalPurposeStyle.css";
    @import "../../../assets/Styles/PageSizingStyle.css";
    @import "../../../assets/Styles/FontiranSans.css";
</style>
