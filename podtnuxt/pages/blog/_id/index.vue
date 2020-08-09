<template>
  <!--//TODO-->
  <div class="fontMain">
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <div>
        <v-parallax height="300" :src="blog.blogImage">
        </v-parallax>
      </div>
      <v-row>
        <v-col cols="9">
          <v-card class="mr-5" flat>
            <v-row class="pr-5  pb-0">
              <v-col cols="1">
                <v-avatar size="55">
                  <img :src="blog.profileImageAddress">
                </v-avatar>
              </v-col>
              <v-col cols="3">
                <div class="pt-2">
                  <div v-if="blog.userTitle === null || blog.userTitle === ''">
                    <h2 style="font-size: 18px;color: #6b7074;">{{blog.username}}</h2>
                  </div>
                  <div v-else>
                    <h2 style="font-size: 18px;color: #6b7074;">{{blog.userTitle}}</h2>
                  </div>
                </div>
                <span style="font-size: 13px;color: #999797;">{{blog.viewCount}} بازدید</span>
                <span style="font-size: 13px;color: #999797;">.</span>
                <span style="font-size: 13px;color: #999797;">{{blog.likeCount}} لایک</span>
              </v-col>
              <v-col cols="8">
                                <span class="pl-4" style="float: left">
                                    <v-btn icon v-if="isLiked === false">
                                         <v-icon size="30" @click="likeBlog">mdi-heart-outline</v-icon>
                                    </v-btn>
                                    <v-btn icon v-else>
                                         <v-icon size="30" color="red" @click="disLikeBlog">mdi-heart</v-icon>
                                    </v-btn>
                                </span>
                <span class="pl-4" style="float: left">
                                    <v-btn icon v-if="isBookmark=== false" @click="makeBookmark">
                                        <v-icon size="30">mdi-bookmark-outline</v-icon>
                                    </v-btn>
                                    <v-btn icon v-else @click="makeUnBookmark">
                                        <v-icon size="30" color="#1D4E89">mdi-bookmark</v-icon>
                                    </v-btn>
                                </span>
              </v-col>
            </v-row>
            <v-row class="pr-8  pb-0">
              <h1 class="mt-1 pt-1 pb-6 " style="font-size: 20px;font-weight: 700;color: #6b7074;">
                {{blog.title}}
              </h1>
            </v-row>
            <v-row class="pr-10  pb-0">
                            <span class="pl-8" style="text-align: justify;color: #6b7074;">
                                <p v-html="blog.description">
                                </p>
                            </span>
            </v-row>
            <v-row class="mr-3 mt-1">
              <div style="width: 98%">
                <!--                                <v-text-field-->
                <!--                                        v-model="userComment"-->
                <!--                                        :append-outer-icon="'mdi-send mdi-rotate-180'"-->
                <!--                                        filled-->
                <!--                                        clear-icon="mdi-close-circle"-->
                <!--                                        clearable-->
                <!--                                        :counter="300"-->
                <!--                                        label="نظر خود را بنویسید"-->
                <!--                                        type="text"-->
                <!--                                        @click:append-outer="submitComment"-->
                <!--                                >-->
                <!--                                </v-text-field>-->

              </div>
            </v-row>
          </v-card>
          <LoginDialog :message="loginDialogText" :dialog="loginDialogFlag"/>
          <Snackbar :snackbar="snackbarFlag" :snackbar-text="snackbarText"/>
        </v-col>
        <v-col cols="3">
          <v-card class="pb-5" flat>
            <v-row class="mt-2 mb-4 mr-1 justify-center">
              <div style="font-size: 15px">

                <span style="font-weight: 700">پادکست </span>
                <span>پیشنهادی</span>
              </div>
            </v-row>
            <v-row class="justify-center">
              <!--              <CardPlayer :item="item[0]" :title-count="18"/>-->
            </v-row>
            <br>
            <v-row class="mt-2 mb-4 mr-1 justify-center">
              <div style="font-size: 15px">
                <span style="font-weight: 700">مطالب </span>
                <span>مرتبط</span>
              </div>
            </v-row>
            <div class="ml-4 mr-4 pt-5" v-for="(item,index) in relatedBlogs" :key="index">
              <BlogRelatedCard :item="item"/>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div style="height: 100px"></div>
    </div>
  </div>
</template>

<script>
  import BlogRelatedCard from "../../../components/cards/BlogRelatedCard";
  import LoginDialog from "../../../components/tools/LoginDialog";
  import CardPlayer from "../../../components/cards/CardPlayer";
  import Snackbar from "../../../components/tools/Snackbar";
  import axios from "axios";

  export default {
    layout: "pody",
    name: "blogID",
    components: {Snackbar, BlogRelatedCard, CardPlayer, LoginDialog},
    data() {
      return {
        blog: {},
        relatedBlogs: [],
        userComment: "",
        dialog: false,
        errorMessage: 'یرای ارسال کامنت شما باید در سایت ورود کرده باشید. توجه داشته باشید کامنت نوشته شده شما از بین میرود',
        item: [],
        isBookmark: false,
        isLiked: false,
        isFollow: false,
        snackbarFlag: false,
        snackbarText: '',
        loginDialogFlag: false,
        loginDialogText: '',
        toRoute: "",
      }
    },
    head() {
      return {
        titleTemplate: "پادی | پادی بلاگ"
      }
    },
    methods: {
      submitComment() {
        if (this.userComment === '') {
          this.snackbar = true;
          this.snackbarText = 'لطفا کامنت خود را وارد کنید';
        } else {
          if (this.$store.getters.userLogin === false) {
            this.dialog = true;
          } else {
            axios.post("http://localhost:8084/api/comment/create", {
              podcast: {
                id: this.$route.params.podcastid
              },
              user: {
                id: this.$store.state.user[0].userId
              },
              description: this.userComment
            }).then(response => {
              if (response.status === 200) {
                this.snackbar = true;
                this.snackbarText = 'کامنت شما با موفقیت ثبت شد';
                this.userComment = '';
                this.otherComments = this.otherComments.concat(response.data);
              } else {
                this.snackbar = true;
                this.snackbarText = 'خطایی در ثبت کامنت شما رخ داده است !';
              }
            });
          }
        }
      },
      makeBookmark() {
        if (this.$store.getters.userLogin === false) {
          this.loginDialogFlag = true;
          this.loginDialogText = 'برای بعد خواندن این بلاگ شما باید در سایت پادی ورود کرده باشید.'
        } else {
          axios.post("http://localhost:8084/api/blog/bookmark", {
            first: this.$route.params.id,
            second: this.$store.state.user[0].userId
          }).then(response => {
            if (response.status === 200) {
              if (response.data.message === 'SUCCESSFUL') {
                this.isBookmark = true;
                this.snackbarFlag = true;
                this.snackbarText = 'به لیست بعدا میخوانم اضافه شد.';
              } else if (response.data.message === 'NOT_SUCCESSFUL') {
                this.isBookmark = false;
                this.snackbarFlag = true;
                this.snackbarText = 'مشکلی پیش آمده است لطفا یکبار دیگر تلاش کنید';
              }
            }
          });
        }
        this.loginDialogFlag = false;
        this.snackbarFlag = false;
      },
      makeUnBookmark() {
        axios.post("http://localhost:8084/api/blog/unbookmark", {
          first: this.$route.params.id,
          second: this.$store.state.user[0].userId
        }).then(response => {
          if (response.status === 200) {
            if (response.data.message === 'SUCCESSFUL') {
              this.isBookmark = false;
              this.snackbarFlag = true;
              this.snackbarText = 'از لیست بعدا میخوانم حذف شد.';
            } else if (response.data.message === 'NOT_SUCCESSFUL') {
              this.isBookmark = true;
              this.snackbarFlag = true;
              this.snackbarText = 'مشکلی پیش آمده است لطفا یکبار دیگر تلاش کنید';
            }
          }
        });
        this.snackbarFlag = false;
      },
      likeBlog() {
        if (this.$store.getters.userLogin === false) {
          this.loginDialogFlag = true;
          this.loginDialogText = 'برای بعد خواندن این بلاگ شما باید در سایت پادی ورود کرده باشید.'
        } else {
          axios.post("http://localhost:8084/api/blog/like", {
            first: this.$route.params.id,
            second: this.$store.state.user[0].userId
          }).then(response => {
            if (response.status === 200) {
              if (response.data.message === 'SUCCESSFUL') {
                this.isLiked = true;
                this.snackbarFlag = true;
                this.snackbarText = 'به لیست بلاگ های لایک شده اضافه شد.';
              } else if (response.data.message === 'NOT_SUCCESSFUL') {
                this.isLiked = false;
                this.snackbarFlag = true;
                this.snackbarText = 'مشکلی پیش آمده است لطفا یکبار دیگر تلاش کنید';
              }
            }
          });
        }
        this.loginDialogFlag = false;
        this.snackbarFlag = false;
      },
      disLikeBlog() {
        axios.post("http://localhost:8084/api/blog/dislike", {
          first: this.$route.params.id,
          second: this.$store.state.user[0].userId
        }).then(response => {
          if (response.status === 200) {
            if (response.data.message === 'SUCCESSFUL') {
              this.isLiked = false;
              this.snackbarFlag = true;
              this.snackbarText = 'از لیست لایک ها حذف شد.';
            } else if (response.data.message === 'NOT_SUCCESSFUL') {
              this.isLiked = true;
              this.snackbarFlag = true;
              this.snackbarText = 'مشکلی پیش آمده است لطفا یکبار دیگر تلاش کنید';
            }
          }
        });
        this.snackbarFlag = false;
      }
    },
    created() {
      if (this.$store.getters.userLogin === false) {
        axios.post("http://localhost:8084/api/blog/read", {
          first: this.$route.params.id,
          second: null
        }).then(response => {
          this.blog = response.data.blogInfo;
          this.isFollow = response.data.userFollow;
          this.item = response.data.podcast;
          this.relatedBlogs = response.data.suggestionBlogs;
          if (response.data.isBookmark === true) {
            this.isBookmark = true;
          } else if (response.data.isBookmark === false) {
            this.isBookmark = false;
          }
        });
      } else {
        axios.post("http://localhost:8084/api/blog/read", {
          first: this.$route.params.id,
          second: this.$store.state.user[0].userId
        }).then(response => {
          this.blog = response.data.blogInfo;
          this.isFollow = response.data.userFollow;
          this.item = response.data.podcast;
          this.relatedBlogs = response.data.suggestionBlogs;
          if (response.data.isBookmark === true) {
            this.isBookmark = true;
          } else if (response.data.isBookmark === false) {
            this.isBookmark = false;
          }
          if (response.data.isLike === true) {
            this.isLiked = true;
          } else if (response.data.isLike === false) {
            this.isLiked = false;
          }
        });
      }
    },
    watch: {
      $route(to, from) {
        if (to.params.id !== from.params.id) {
          this.blog = {};
          this.item = [];
          this.relatedBlogs = [];
          this.snackbarFlag = false;
          this.isBookmark = false;
          this.isFollow = false;
          this.isLiked = false;

          if (this.$store.getters.userLogin === false) {
            axios.post("http://localhost:8084/api/blog/read", {
              first: to.params.id,
              second: null
            }).then(response => {
              this.blog = response.data.blogInfo;
              this.isFollow = response.data.userFollow;
              this.item = response.data.podcast;
              this.relatedBlogs = response.data.suggestionBlogs;
              if (response.data.isBookmark === true) {
                this.isBookmark = true;
              } else if (response.data.isBookmark === false) {
                this.isBookmark = false;
              }
              if (response.data.isLike === true) {
                this.isLiked = true;
              } else if (response.data.isLike === false) {
                this.isLiked = false;
              }
            });
          } else {
            axios.post("http://localhost:8084/api/blog/read", {
              first: to.params.id,
              second: this.$store.state.user[0].userId
            }).then(response => {
              this.blog = response.data.blogInfo;
              this.isFollow = response.data.userFollow;
              this.item = response.data.podcast;
              this.relatedBlogs = response.data.suggestionBlogs;
              if (response.data.isBookmark === true) {
                this.isBookmark = true;
              } else if (response.data.isBookmark === false) {
                this.isBookmark = false;
              }
              if (response.data.isLike === true) {
                this.isLiked = true;
              } else if (response.data.isLike === false) {
                this.isLiked = false;
              }
            });
          }
        }


        if (document.title !== "پادی | " + this.post.title) {
          let postTitle = this.post.title;
          let title = "پادی | " + postTitle;
          document.title = "";
          document.title = title;
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/Styles/FontiranSans.css";
  @import "../../../assets/Styles/PageSizingStyle.css";
</style>
