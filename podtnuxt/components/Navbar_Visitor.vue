<template>
    <nav class="fontMain" style="z-index: 5">
        <v-app-bar app color="primary" light>
            <!-- Logo of Pody in div -->
            <!--<div class="Logo-Image">-->
            <!--            <router-link to="/">-->
            <v-img @click="buttonRedirect('','/')" src="http://pody.ir/defaultImages/pody/12.png" max-width="72px"
                   max-height="72px"
                   style="cursor: pointer">
            </v-img>
            <!--            </router-link>-->
            <!--</div>-->
            <!-- make div for image in vuetify in div -->
            <div class="align-center d-flex">
                <div>
                    <!--                    <router-link to="/">-->
                    <v-img @click="buttonRedirect('','/')" src="http://pody.ir/defaultImages/pody/PODYYY1.png"
                           max-width="80px"
                           max-height="56px" style="cursor: pointer">
                    </v-img>
                    <!--                    </router-link>-->
                </div>
                <div class="hidden-sm-and-down">
                    <div class="toolbar_items">
                        <ul>
                            <li style="cursor: pointer;color: white" @click="buttonRedirect('','/category')">
                                دسته بندی های پادی
                            </li>
                            <li style="cursor: pointer;color: white" @click="buttonRedirect('','/Channels')">
                                ناشران پادی
                            </li>
                            <li style="cursor: pointer;color: white" @click="buttonRedirect('','/blog')">
                                پادی بلاگ
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-show="$vuetify.breakpoint.smAndUp">
                    <v-text-field
                            solo
                            flat
                            hide-details
                            autofocus
                            rounded
                            clearable
                            background-color="white"
                            color="primary"
                            label="جستجو"
                            prepend-inner-icon="mdi-magnify"
                            v-model="searchTerm"
                            style="width:450px"
                    >

                    </v-text-field>
                </div>
            </div>
            <v-spacer>

            </v-spacer>
        </v-app-bar>
    </nav>
</template>

<script>
    export default {
        name: "Navbar_Visitor",
        data: () => {
            return {
                menu: false,
                isLogin: null,
                inLoginPage: null,
                drawer: false,
                clipped: false,
                Message: '',
                item: 0,
                LoginDialog: false,
                SignUpDialog: false,
                show1: false,
                show2: false,
                searchTerm: "",
                signUpToolTip: false,
                logInToolTip: false,
                EmailLoginUser: '',
                PasswordLoginUser: '',
                UsernameSignUpUser: '',
                EmailSignUpUser: '',
                PasswordSignUpUser: '',
                ConfirmPasswordSignUpUser: '',
                userDetail: null,
                userEdit: false,
                postBody: '',
                errors: [],
                signupResponse: null,
                loginResponse: null,
                currentUrl: "",
            };
        },
        computed: {
            isInLoginPage() {
                if (window.location.pathname === '/Login') {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            loginformisvalid() {
                return this.EmailLoginUser !== '' &&
                    this.PasswordLoginUser !== '' &&
                    this.PasswordLoginUser.length <= 7
            },
            submit() {
                this.$v.form.$touch();
                // if its still pending or an error is returned do not submit
                if (this.$v.form.$pending || this.$v.form.$error) return;
                // to form submit after this
                alert("Form submitted");
            },
            buttonRedirect(id, url) {
                if (url === '/upload') {
                    this.$router.push('/upload/' + id)
                }
                if (url === '/news') {
                    this.$router.push('/news/' + id)
                }
                if (url === '/myPodcasts') {
                    this.$router.push('/myPodcasts')
                }
                if (url === '/myLikes') {
                    this.$router.push('/myLikes')
                }
                if (url === '/Login') {
                    this.$router.push('/Login')
                }
                if (url === '/') {
                    window.location.href = '/'
                }
                if (url === '/publisher') {
                    window.location.href = '/publisher'
                }
                if (url === '/blog') {
                    window.location.href = '/blog'
                }
            },
            checkLogin() {
                if (this.$session.exists()) {
                    this.isLogin = true;
                    this.userDetail = this.$session.getAll()
                } else {
                    this.isLogin = false
                }
            }
        },
        beforeMount() {
            this.checkLogin()
        },
        mounted() {
            this.currentUrl = window.location.pathname
            if (window.location.href == '/Login') {
                this.inLoginPage = true;
            } else {
                this.inLoginPage = false;
            }

        }
    }
</script>

<style scoped>
    @import "../assets/Styles/FontiranSans.css";

    .toolbar_items ul {
        list-style: none;
        float: right;
        display: flex;
        padding: 15px 20px;
    }

    .toolbar_items li {
        padding: 0px 16px;
    }

    .toolbar_items li a {
        display: inline-block;
        text-decoration: none;
        color: #fff;
        position: relative;
        -webkit-transition: all 0.4s ease;
        transition: all 0.4s ease;
        padding: 15px;
    }

    .toolbar_items li a:after {
        content: "";
        position: absolute;
        height: 2px;
        background-color: white;
        width: 0%;
        left: 50%;
        bottom: 0;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        -webkit-transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) all;
        transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) all;
    }

    .toolbar_items li a:hover:after {
        width: 100%;
    }
</style>
