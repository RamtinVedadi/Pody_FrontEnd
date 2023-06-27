<template>
    <div class="fontMain">
        <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
             v-show="$vuetify.breakpoint.mdAndUp">
            <v-row class="mr-10 mt-5">
                <h1 style="font-size: 16px;font-weight: 400">بلاگ های منتخب <span
                        style="font-weight: 700">پادی</span></h1></v-row>
            <div style="position: relative;width: 100%">
                <v-row class="flexi ma-4 " id="smallBlog">
                    <v-layout style="z-index: 0;width: 100%">
                        <v-flex class="" shrink v-for="(item,index) in blogs" :key="index">
                            <BlogSmallCard :item="item"/>
                        </v-flex>
                    </v-layout>
                </v-row>
                <v-layout
                        style="position: absolute;top: 35%;right: 0;z-index: 10;justify-items: start;align-items: center;">
                    <v-btn class="ma-2" outlined large fab color="#ff6702" v-on:click="moveRight">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-layout>
                <v-layout
                        style="position: absolute;top: 35%;left:  0  ;z-index: 10;justify-items: end;align-items: center">
                    <v-btn id="btn1" class="ma-2" outlined large fab color="#ff6702" v-on:click="moveLeft">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                </v-layout>
            </div>
            <v-row class="mr-10"><span>جدیدترین بلاگ های <span style="font-weight: 700">پادی</span></span></v-row>
            <v-row>
                <v-col class="mr-10" cols="9">
                    <v-row v-for="(item,index) in blogs" :key="index">
                        <CardBlog :item="item"/>
                    </v-row>
                </v-col>
                <v-col cols="3"></v-col>
            </v-row>
            <v-row style="height: 90px"></v-row>
        </div>
    </div>
</template>

<script>
    import BlogSmallCard from "../../components/cards/BlogSmallCard";
    import CardBlog from "../../components/cards/CardBlog";
    import axios from 'axios';
    import $ from 'jquery';

    export default {
        layout: "pody",
        name: "blogs",
        components: {BlogSmallCard, CardBlog},
        async asyncData(context) {
            console.log(context.store.getters.userLogin)
            if (context.store.getters.userLogin === false) {
                return axios.post("http://localhost:8084/api/blog/list/" + 0 + "/" + 20, {id: null}).then(response => {
                    return {
                        blogs: response.data
                    }
                });
            } else {
                return axios.post("http://localhost:8084/api/blog/list/" + 0 + "/" + 20, {id: context.store.state.user[0].userId}).then(response => {
                    return {
                        blogs: response.data
                    }
                });
            }
        },
        data() {
            return {
                isBookmark: false,
                page: 0,
                size: 20,
                blogs: []
            }
        },
        methods: {
            blogPageNavigation(id) {
                this.$router.push('/blog/' + id);
            },
            moveRight() {
                if (this.$vuetify.breakpoint.mdAndUp) {
                    $('#smallBlog').animate({
                        scrollLeft: '-=200'
                    }, 2000);
                }
                return false;
            },
            moveLeft() {
                if (this.$vuetify.breakpoint.mdAndUp) {
                    $('#smallBlog').animate({
                        scrollLeft: '+=200'
                    }, 2000);
                }
                return false;
            },
        },
        head() {
            return {
                title: "پادی بلاگ | کمدی، تکنولوژی، داستانی، موسیقی و کسب، کار و ... ",
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/FontiranSans.css";
    @import "../../assets/Styles/PageSizingStyle.css";

    html {
        scroll-behavior: smooth;
    }

    .flexi {
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        overflow-y: hidden;
    }
</style>
