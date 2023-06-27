<template>
    <v-row class="login fontMain" id="content">
        <v-col cols="1" lg="3" md="2" sm="1" xs="0" xl="2"2></v-col>
        <v-col cols="10" lg="6" md="8" sm="10" xs="12" xl="8">
            <v-form>
                <v-card>
                    <v-card-title>
                        <v-row class="justify-center">
                            <v-img src="../../assets/logo/logo.png" max-width="50px" max-height="50px"
                                   width="50" height="50"></v-img>
                            <span class="headline mt-4 mx-6 title-text">ورود کاربر</span>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-col>
                                <v-text-field v-model="EmailLoginUser" label="ایمیل">
                                    <!--                                            :rules="[rules.required , rules.email]"-->
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                        v-model="PasswordLoginUser"
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :rules="[rules.required, rules.min]"
                                        :type="show1 ? 'text' : 'password'"
                                        name="input-10-1"
                                        label="رمز عبور"
                                        hint="حداقل 8 کاراکتر"
                                        maxlength="30"
                                        counter
                                        @click:append="show1 = !show1"
                                >
                                </v-text-field>
                            </v-col>
                        </v-container>
                    </v-card-text>
                    <v-row id="loginAlert" justify="center" style="display: none">
                        <v-alert type="error">
                            رمز عبور یا نام کاربری اشتباه می باشد.
                        </v-alert>
                    </v-row>
                    <v-card-actions>
                        <v-row v-show="$vuetify.breakpoint.mdAndUp">
                            <v-col>
                                <v-row class="pr-7" justify="center">
                                    <v-btn v-on:click="RedirectTo('/rssLogin')" style=" color: #fe731b" text large>
                                        ورود با آدرس RSS Feed
                                    </v-btn>

                                    <div class="rainbow">
                                        <v-btn text class="pl-16 pr-0 pt-0 pb-12" color="primary"
                                               v-on:click="RedirectTo('/register')"
                                               large>
                                            ثبت نام در پادی
                                        </v-btn>
                                    </div>
                                </v-row>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col>
                                <v-row class="pl-8" justify="center">
                                    <v-btn large depressed outlined rounded
                                           class="primary white--text ma-4"
                                           width="280" height="35" text
                                           @click="login"
                                    >ورود
                                    </v-btn>
                                    <v-btn text small v-on:click="RedirectTo('/forgot')">رمز عبور خود را فراموش کرده
                                        اید
                                        ؟
                                    </v-btn>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-show="$vuetify.breakpoint.mdOnly">
                            <v-col>
                                <v-row justify="center" class="pt-6">
                                    <v-btn large depressed outlined rounded
                                           class="primary white--text"
                                           width="250" height="35" text
                                           @click="login"
                                    >ورود
                                    </v-btn>
                                    <v-btn text small v-on:click="RedirectTo('/forgot')">رمز عبور خود را فراموش کرده
                                        اید
                                        ؟
                                    </v-btn>
                                </v-row>
                            </v-col>
                            <v-col>
                                <v-row justify="center">
                                    <v-btn v-on:click="RedirectTo('/rssLogin')" style=" color: #fe731b" text large>
                                        ورود با آدرس RSS Feed
                                    </v-btn>

                                    <div class="rainbow">
                                        <v-btn text class="pl-16 pr-0 pt-0 pb-12" color="primary"
                                               v-on:click="RedirectTo('/register')"
                                               large>
                                            ثبت نام در پادی
                                        </v-btn>
                                    </div>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-show="$vuetify.breakpoint.smOnly">
                            <v-col cols="6">
                                <v-row justify="center" class="pt-2">
                                    <v-btn large depressed outlined rounded
                                           class="primary white--text pb-0"
                                           width="270" height="35" text
                                           @click="login"
                                    >ورود
                                    </v-btn>
                                    <v-btn class="pt-2" text small v-on:click="RedirectTo('/forgot')">رمز عبور خود
                                        را
                                        فراموش
                                        کرده
                                        اید
                                        ؟
                                    </v-btn>
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-row justify="center">
                                    <div class="rainbow">
                                        <v-btn text class="pl-16 pr-0 pt-0 pb-12" color="primary"
                                               v-on:click="RedirectTo('/register')">
                                            ثبت نام در پادی
                                        </v-btn>
                                    </div>
                                    <v-btn class="pt-2" v-on:click="RedirectTo('/rssLogin')" style=" color: #fe731b"
                                           text>
                                        ورود با آدرس RSS Feed
                                    </v-btn>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-show="$vuetify.breakpoint.xsOnly" justify="center">
                            <v-btn xlarge depressed outlined rounded
                                   class="primary white--text "
                                   width="250" height="35" text
                                   @click="login"
                            >ورود
                            </v-btn>
                            <div class="pb-4">
                                <v-btn text large v-on:click="RedirectTo('/forgot')">رمز عبور خود را فراموش کرده
                                    اید
                                    ؟
                                </v-btn>
                            </div>
                            <div class="rainbow">
                                <v-btn text class="pl-16 pr-0 pt-0 pb-14" color="primary"
                                       v-on:click="RedirectTo('/register')"
                                       large>
                                    ثبت نام در پادی
                                </v-btn>
                            </div>
                            <div class="pt-2">
                                <v-btn v-on:click="RedirectTo('/rssLogin')" style=" color: #fe731b" text large>
                                    ورود با آدرس RSS Feed
                                </v-btn>
                            </div>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
        <v-col cols="1" lg="3" md="2" sm="1" xs="0" xl="2"></v-col>
    </v-row>
</template>

<script>
    import "../../assets/Styles/ButtonRainbowStyle.scss";
    import $ from "jquery";


    export default {
        name: "Login",
        data: () => {
            return {
                images: {},
                EmailLoginUser: '',
                PasswordLoginUser: '',
                LoginFlag: false,
                isLogin: '',
                show1: false,
                rules: {
                    required: value => !!value || 'فیلد الزامی',
                    min: v => v.length >= 7 || 'حداقل کلمه عبور 6 کاراکتر می باشد',
                    passwordmatch: v => v.UserDataSignUp.password === v.UserDataSignUp.confirmpassword || "doesn't match",
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    },

                },
                showAlert: false,
                clientId: '315826587026-17jksqap7jvqh6n6en090pnmjjp8ecdh.apps.googleusercontent.com',
            }
        },
        methods: {
            async login() {
                $("#loginAlert").hide();
                await this.$axios.post('http://localhost:8084/api/login', {
                    username: this.EmailLoginUser,
                    password: this.PasswordLoginUser
                }).then(response => {
                    if (response.status === 200 && 'id' in response.data) {
                        this.$session.start();
                        this.$session.set('userId', response.data.id);
                        this.$session.set('username', response.data.username);
                        this.$session.set('userImage', response.data.profileImageAddress);
                        this.$session.set('userTitle', response.data.userTitle);
                        this.$session.set('isChannel', response.data.isChannel);
                        this.isLogin = true;
                        this.LoginFlag = true;
                        let routeData = this.$router.resolve({name: 'صفحه اصلی', path: "/"});
                        window.open(routeData.href, "_self");
                    }
                }).catch(e => {
                    this.showLoginError();
                    this.errors.push(e);
                });
                return this.LoginFlag;
            },
            RedirectTo(url) {
                this.$router.push(url);
            },
            showLoginError() {
                this.showAlert = true;
            }
        },
        mounted() {
            let googleLogin = document.createElement('script');
            googleLogin.setAttribute('src', 'https://apis.google.com/js/platform.js');
            document.head.appendChild(googleLogin);

            if (this.$vuetify.breakpoint.smOnly) {
                document.getElementById("content").style.height = "150%";
            }
        },
        head() {
            return {
                title: "پادی | ورود به پادی "
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";

    .login {
        background: #f9f9f9;
        background: linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113));
        width: 105%;
        height: 105%;
        position: absolute;
    }

    .loginItem {
        cursor: pointer;
        text-align: center;
        margin: 12px 16px 0;
        float: none;
        display: block;
    }

    .loginPage-spilitLine {
        display: inline-block;
        font-size: 12px;
        height: 14px;
        line-height: 14px;
        color: rgba(0, 0, 0, .32);
        padding: 0 12px;
        margin: .2rem auto .16rem;
        position: relative;
    }

    .loginPage-spilitLine:before {
        left: -6rem;
        border-radius: .5px;
        margin-top: -.5px;
        position: absolute;
        content: " ";
        top: 50%;
        width: 6rem;
        height: 1px;
        background: rgba(0, 0, 0, .32);
    }

    .loginPage-spilitLine:after {
        right: -6rem;
        border-radius: .5px;
        margin-top: -.5px;
        position: absolute;
        content: " ";
        top: 50%;
        width: 6rem;
        height: 1px;
        background: rgba(0, 0, 0, .32);
    }
</style>
