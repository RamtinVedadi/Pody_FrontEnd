<template>
    <div class="fontMain">
        <div v-show="$vuetify.breakpoint.mdAndUp">
            <div class="contactUs" style="background-color: white">
                <div style="width: 100%;height: 350px">
                    <v-img :src="require('../../assets/contactus.jpg')" height="350px">
                        <v-row style="height: 150px"></v-row>
                        <v-row class="justify-center">
                            <span style="font-size: 30px;color:white">
                                <h1>تماس با پادی</h1>
                            </span>
                        </v-row>
                    </v-img>
                </div>
                <div>
                    <v-row class="justify-center mt-4" style="background-color: white">
                        <span style="font-size: 30px">چگونه با پادی ارتباط داشته باشیم</span>
                    </v-row>
                </div>
                <div>
                    <v-row class="justify-center">
                    <span class="mailto-Title">
                        اگر میخواهید مکاتبه کنید به این ایمیل بفرستید
                    </span>
                    </v-row>
                    <v-row class="justify-center">
                     <span class="mailto">
                          <a href="mailto: contact@pody.ir"> contact@pody.ir </a>
                    </span>
                    </v-row>
                </div>
                <div>
                    <v-row class="justify-center">
                    <span class="mailto-Title">
                       اکر کار تبلیغاتی دارید با این ایمیل مکاتبه کنید
                    </span>
                    </v-row>
                    <v-row class="justify-center">
                     <span class="mailto">
                         <a href="mailto: partner@pody.ir"> partner@pody.ir </a>
                    </span>
                    </v-row>
                </div>
                <div>
                    <v-row class="justify-center">
                    <span class="mailto-Title">
                        اگر هدف سرمایه گذاری دارید با این ایمیل مکاتبه کنید
                    </span>
                    </v-row>
                    <v-row class="justify-center">
                     <span class="mailto">
                          <a href="mailto:biz@pody.ir">biz@pody.ir </a>
                    </span>
                    </v-row>
                </div>

            </div>
            <Footer></Footer>
        </div>
        <div v-show="$vuetify.breakpoint.xsOnly">
            <div style="background-color: white">
                <div style="width: 100%;height: 100px">
                    <v-img src="../assets/contactus.jpg" height="100px">
                        <v-row style="height: 10px"></v-row>
                        <v-row class="justify-center">
                            <span style="font-size: 15px;color:white">
                                <h1>تماس با پادی</h1>
                            </span>
                        </v-row>
                    </v-img>
                </div>
                <div>
                    <v-row class="justify-center mt-2" style="background-color: white">
                        <span style="font-size: 28px">چگونه با پادی ارتباط داشته باشیم</span>
                    </v-row>
                </div>
                <div>
                    <v-row class="justify-center">
                    <span class="mailto-Title-XS">
                        اگر میخواهید مکاتبه کنید به این ایمیل بفرستید
                    </span>
                    </v-row>
                    <v-row class="justify-center">
                     <span class="mailto-XS">
                          <a href="mailto: contact@pody.ir"> contact@pody.ir </a>

                    </span>
                    </v-row>
                </div>
                <div>
                    <v-row class="justify-center">
                    <span class="mailto-Title-XS">
                       اکر کار تبلیغاتی دارید با این ایمیل مکاتبه کنید
                    </span>
                    </v-row>
                    <v-row class="justify-center">
                     <span class="mailto-XS">
                         <a href="mailto: partner@pody.ir"> partner@pody.ir </a>
                    </span>
                    </v-row>
                </div>
                <div>
                    <v-row class="justify-center">
                    <span class="mailto-Title-XS">
                        اگر هدف سرمایه گذاری دارید با این ایمیل مکاتبه کنید
                    </span>
                    </v-row>
                    <v-row class="justify-center">
                     <span class="mailto-XS">
                          <a href="mailto:biz@pody.ir">biz@pody.ir </a>
                    </span>
                    </v-row>
                </div>
            </div>
            <Footer></Footer>
            <v-row style="height: 60px"></v-row>
        </div>
        <div v-show="$vuetify.breakpoint.smOnly">
            <div style="background-color: white">
                <div style="width: 100%;height: 100px">
                    <v-img src="../assets/contactus.jpg" height="100px">
                        <v-row style="height: 10px"></v-row>
                        <v-row class="justify-center">
                            <span style="font-size: 15px;color:white">
                                <h1>تماس با پادی</h1>
                            </span>
                        </v-row>
                    </v-img>
                </div>
                <div>
                    <v-row class="justify-center mt-2" style="background-color: white">
                        <span style="font-size: 28px">چگونه با پادی ارتباط داشته باشیم</span>
                    </v-row>
                </div>
                <div>
                    <v-row class="justify-center">
                    <span class="mailto-Title-XS">
                        اگر میخواهید مکاتبه کنید به این ایمیل بفرستید
                    </span>
                    </v-row>
                    <v-row class="justify-center">
                     <span class="mailto-XS">
                          <a href="mailto: contact@pody.ir"> contact@pody.ir </a>

                    </span>
                    </v-row>
                </div>
                <div>
                    <v-row class="justify-center">
                    <span class="mailto-Title-XS">
                       اکر کار تبلیغاتی دارید با این ایمیل مکاتبه کنید
                    </span>
                    </v-row>
                    <v-row class="justify-center">
                     <span class="mailto-XS">
                         <a href="mailto: partner@pody.ir"> partner@pody.ir </a>
                    </span>
                    </v-row>
                </div>
                <div>
                    <v-row class="justify-center">
                    <span class="mailto-Title-XS">
                        اگر هدف سرمایه گذاری دارید با این ایمیل مکاتبه کنید
                    </span>
                    </v-row>
                    <v-row class="justify-center">
                     <span class="mailto-XS">
                          <a href="mailto:biz@pody.ir">biz@pody.ir </a>
                    </span>
                    </v-row>
                </div>
            </div>
            <Footer></Footer>
            <v-row style="height: 60px"></v-row>
        </div>
    </div>
</template>

<script>
    import Navbar from "../../components/Navbar";
    import Footer from "../../components/Footer";

    export default {
        layout: "pody",
        name: "contact-us",
        components: {Footer, Navbar},
        data() {
            return {
                isLogin: Navbar.data().isLogin,
            }
        },
        mounted() {
            if (this.isLogin == false) {
                document.getElementById('home').style.width = '100%';
            }
        },
        head() {
            return {
                title: "پادی | ارتباط با پادی"
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";

    .contactUs {
        background-color: #f9f9f9;
        width: 85%;
        float: left;
    }

    .mailto-Title {
        margin: 30px auto 0;
        font-size: 25px;
        line-height: 36px;
    }

    .mailto-Title-XS {
        margin: 10px auto 0;
        font-size: 15px;
        line-height: 36px;
    }

    .mailto {
        cursor: pointer;
        color: #f55b23;
        font-size: 25px;
    }

    .mailto-XS {
        cursor: pointer;
        color: #f55b23;
        font-size: 15px;
    }
</style>
