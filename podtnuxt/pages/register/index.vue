<template>
    <div class="fontMain">
        <v-row class="register">
            <v-col cols="1" lg="3" md="2" sm="1" xs="1" xl="2"></v-col>
            <v-col cols="10" lg="6" md="8" sm="10" xs="10" xl="8">
                <v-form>
                    <v-card>
                        <v-card-title class="justify-center">
                            <v-img src="assets/logo.png" max-width="48px" max-height="48px"></v-img>
                            <span class="headline mx-6 title-text">ثبت نام</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-col cols="12">
                                    <v-text-field
                                            id="usernameInput"
                                            v-model="UsernameSignUpUser"
                                            label="نام کاربری"
                                            name="username"
                                            required
                                            counter
                                            maxlength="20"
                                            @focusin="userNameFIN()"
                                            @focusout="userNameFOUT()"
                                            :error-messages="usernameError === true ? 'نام کاربری تکرای است' : ''"
                                            :messages="usernameMessage === true ? 'تایید شد' : ''"
                                    >
                                        <!--v-on:change="checkUsername"-->
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                                        <v-text-field
                                                v-model="EmailSignUpUser"
                                                label="ایمیل"
                                                name="email"
                                                required
                                                @focusin="emailFIN()"
                                                @focusout="emailFOUT()"
                                                :error-messages='errors'
                                                :messages="emailsMessage === true ? 'ایمیل تایید شد' : ''"
                                        >
                                            <!--v-on:change="checkEmail"-->
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model='PasswordSignUpUser'
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show1 ? 'text' : 'password'"
                                            name="password"
                                            label="رمز عبور"
                                            :rules="[ rules.min]"
                                            hint="حداقل 8 کاراکتر"
                                            maxlength="30"
                                            counter
                                            @click:append="show1 = !show1"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model='ConfirmPasswordSignUpUser'
                                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show2 ? 'text' : 'password'"
                                            name="confirm password"
                                            label="تایید رمز عبور"
                                            required
                                            :rules="[rules.min , comparePassword]"
                                            hint="At least 8 characters"
                                            maxlength="30"
                                            counter
                                            @click:append="show2= !show2">
                                    </v-text-field>
                                </v-col>
                                <!-- Have Account  -->
                                <v-btn v-on:click="RedirectTo('/Login')" style="color: #fd6702" text large> در پادی
                                    اکانت
                                    دارم
                                </v-btn>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer>

                            </v-spacer>
                            <v-row id="RegisterAlert" v-if="showAlert" justify="center">
                                <v-alert type="error">
                                    لطفا فیلد های ثبت نام را به درستی پر کنید.
                                </v-alert>
                            </v-row>
                            <!-- Make Login button in form -->
                            <v-btn
                                    large
                                    depressed
                                    outlined
                                    rounded
                                    class="primary white--text ma-4"
                                    width="250"
                                    height="35"
                                    text
                                    @click="register"

                            >ثبت نام
                            </v-btn>
                        </v-card-actions>

                    </v-card>
                </v-form>
            </v-col>
            <v-col cols="1" lg="3" md="2" sm="1" xs="1" xl="2"></v-col>
        </v-row>
        <v-row style="height: 20%" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
        </v-row>
    </div>
</template>

<script>
    import {ValidationObserver, ValidationProvider} from "vee-validate";

    export default {
        name: "Register",
        components: {
            ValidationObserver: ValidationObserver,
            ValidationProvider: ValidationProvider
        },
        data: () => {
            return {
                UsernameSignUpUser: '',
                EmailSignUpUser: '',
                PasswordSignUpUser: '',
                show1: false,
                show2: false,
                ConfirmPasswordSignUpUser: '',
                rules: {
                    required: value => !!value || 'وارد کردن فیلد نام کاربری اجباری است',
                    min: v => v.length >= 7 || 'حداقل 8 کاراکتر',
                    passwordmatch: v => v.UserDataSignUp.password === v.UserDataSignUp.confirmpassword || "رمز یکسان نیست.",
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

                        return pattern.test(value) || 'ایمیل نامعتبر است.'
                    },
                    usernameCheck: v => !!v || this.checkUsername(),
                    emailCheck: v => !!v || this.checkEmail(),

                },
                usernameFocus: false,
                usernameError: false,
                usernameMessage: false,
                emailsFocus: false,
                emailsError: false,
                emailWrong: false,
                emailsMessage: false,
                passwordFocus: false,
                showAlert: false,
            }
        },
        methods: {
            RedirectTo(url) {
                this.$router.push(url);
            },
            comparePassword() {
                return this.PasswordSignUpUser !== this.ConfirmPasswordSignUpUser ? 'پسوورد یکی نیست' : ''
            },
            async checkUsername(UsernameSignUpUser) {
                await this.$axios.post('http://localhost:8084/api/user/check/username', {
                    value: UsernameSignUpUser
                }).then(response => {
                    const result = response.data;
                    console.log(result.message)
                    if (result.message === 'DUPLICATE_USERNAME') {
                        this.usernameError = true;
                        return 'نام کاربری تکراری است!';
                    } else if (result.message === 'OK_USERNAME') {
                        this.usernameMessage = true;
                        return 'نام کاربری قابل قبول است';
                    }
                })

            },
            async checkEmail(EmailSignUpUser) {
                await this.$axios.post('http://localhost:8084/api/user/check/email', {
                    value: EmailSignUpUser
                }).then(response => {
                    const result = response.data;
                    if (result.message == 'DUPLICATE_EMAIL') {
                        console.log('DUPLICATE_EMAIL');
                        this.emailsError = true;
                        return 'ایمیل تکراری است!';
                    } else if (result.message == 'OK_EMAIL') {
                        console.log('OK_EMAIL');
                        this.emailsMessage = true;
                        return 'ایمیل قابل قبول است';
                    }
                })
            },
            async register() {
                this.showAlert = false;
                await this.$axios.post("http://localhost:8084/api/signup/email", {
                    email: this.EmailSignUpUser,
                    username: this.UsernameSignUpUser,
                    password: this.PasswordSignUpUser
                }).then(response => {
                    if (response.status === 200 && 'id' in response.data) {
                        this.$session.start();
                        this.$session.set('userId', response.data.id);
                        this.$session.set('username', response.data.username);
                        this.$session.set('userImage', response.data.profileImageAddress);
                        this.$session.set('userTitle', response.data.userTitle);
                        this.$session.set('isChannel', response.data.isChannel);
                        // Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.id;
                        let routeData = this.$router.resolve({name: 'صفحه اصلی', path: "/"});
                        window.open(routeData.href, "_self");
                    }
                }).catch(e => {
                    this.registerShowError();
                    console.log(e)
                });

            },
            userNameFIN() {
                this.usernameFocus = true;
            },
            userNameFOUT() {
                this.usernameError = false;
                this.usernameMessage = false;
                if (this.usernameFocus) {
                    this.checkUsername(this.UsernameSignUpUser);
                }
            },
            emailFIN() {
                this.emailFocus = true;
            },
            emailFOUT() {
                this.emailsError = false;
                this.emailsMessage = false;
                if (this.emailFocus) {
                    this.checkEmail(this.EmailSignUpUser);
                }
            },
            registerShowError() {
                this.showAlert = true;
            }
        },
        head() {
            return {
                title: "پادی | ثبت نام در پادی",
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";

    .register {
        background: linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113));
        width: 105%;
        height: 100%;
        position: absolute;
    }
</style>
