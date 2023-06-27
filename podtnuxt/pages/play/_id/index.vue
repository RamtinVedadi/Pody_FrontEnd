<template>
    <div class="fontMain">
        <div class="pageMdAndUp" v-show="$vuetify.breakpoint.mdAndUp">
            <div v-if="pageLoading === false">
                <Loader/>
            </div>
            <div v-else>
                <v-col cols="8" style="float: right;">
                    <v-row>
                        <v-col cols="3" style="float: right">
                            <v-img :src="post.podcastImage" height="180px" min-width="180px" max-width="180px"
                                   style="border-radius: 10px"></v-img>
                            <div class="pr-6 pt-2" v-if="post.episodeNumber != null">
                                <span v-if="post.seasonNumber != null" style="float: right;"> فصل : {{post.seasonNumber}}</span>
                                <span class="pl-6" style="float: left;" v-if="post.seasonNumber != null"> قسمت : {{post.episodeNumber}}</span>
                                <span class="pl-6" style="float: right;" v-else> قسمت : {{post.episodeNumber}}</span>
                            </div>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col cols="8" style="float: left">
                            <v-row class="mr-2">
                                <h1 class="podcast-title-md">
                                    {{post.title}}
                                </h1>
                            </v-row>
                            <v-row class="mr-2 pb-3">
                                <div>
                                    <v-avatar size="35" @click="userPageNavigation(post.userId)"
                                              style="cursor: pointer">
                                        <v-img :src='post.profileImageAddress'></v-img>
                                    </v-avatar>
                                </div>
                                <div class="mr-1 pt-1" @click="userPageNavigation(post.userId)" style="cursor: pointer">
                                    <div v-if="post.userTitle == null || post.userTitle === '' ">
                                        <span style="font-size: 15px;line-height: 1.8rem">{{post.username}}</span>
                                    </div>
                                    <div v-else>
                                        <span style="font-size: 15px;line-height: 1.8rem">{{post.userTitle}}</span>
                                    </div>
                                </div>
                            </v-row>
                            <v-row class="podcast-info-md mr-3 pb-3">
                                <div @click="categoryPageNavigation(post.categoryId)" style="cursor: pointer">
                                    <v-icon size="30">{{post.categoryIcon}}</v-icon>
                                    <span class="mr-1">{{post.categoryName}}</span>
                                </div>
                            </v-row>
                            <v-row class="podcast-info-md mr-3 ">
                                <div>
                                    <v-icon size="25">mdi-play-circle</v-icon>
                                    <span class="mr-1">{{post.viewCount}}</span>
                                </div>
                                <div class="mr-2">
                                    <v-icon size="25">mdi-heart</v-icon>
                                    <span class="mr-1">{{post.likeCount}}</span>
                                </div>
                                <div class="mr-2">
                                    <v-icon size="25">mdi-calendar-range</v-icon>
                                    <span class="mr-1">{{this.postDate}}</span>
                                </div>
                            </v-row>
                            <v-row mr-2>
                                <v-col cols="1">
                                    <PlayerButton :item="post"/>
                                </v-col>
                                <v-col cols="1">
                                    <div v-if="isListenLater === false">
                                        <v-btn fab text @click="listenLaterAction(post.podcastId)"
                                               class="listenLaterButton" height="55px" width="55px">
                                            <v-icon dark color="primary" size="35px">mdi-clock-time-three-outline
                                            </v-icon>
                                        </v-btn>
                                    </div>
                                    <div v-else>
                                        <v-btn fab text class="listenLaterButton" height="55px" width="55px"
                                               @click="deleteListenLaterAction(post.podcastId)">
                                            <v-icon dark color="primary" size="35px">mdi-check</v-icon>
                                        </v-btn>
                                    </div>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn fab id="shareBtn" class="shareButton" text
                                           height="55px" width="55px" @click="shareAction">
                                        <v-icon color="primary" size="30px">mdi-share-variant</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="8"></v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row style="width: 100%">
                        <div style="width: 99%">
                            <v-row class="mr-3">
                                <div>
                                    <span style="font-size: 17px">توضیحات</span>
                                </div>
                            </v-row>
                            <v-row class="mr-3">
                                <div>
                                    <p class="podcast-description" v-html="post.description">

                                    </p>
                                </div>
                            </v-row>
                            <v-row class="mr-3">
                                <div>
                                    <v-icon class="ml-2">mdi-comment-text-multiple-outline</v-icon>
                                    <b>نظرات ({{otherComments.length}})</b>
                                </div>
                            </v-row>
                            <v-row class="mr-3 mt-1">
                                <div style="width: 98%">
                                    <v-text-field
                                            v-model="userComment"
                                            :append-outer-icon="'mdi-send mdi-rotate-180'"
                                            filled
                                            clear-icon="mdi-close-circle"
                                            clearable
                                            :counter="300"
                                            label="نظر خود را بنویسید"
                                            type="text"
                                            @click:append-outer="submitComment"
                                    >
                                    </v-text-field>
                                    <LoginDialog :message="errorMessage" :dialog="dialog"/>
                                </div>
                            </v-row>
                            <div v-if="otherComments.length !== 0">
                                <div class="flex mr-3" v-for="item in otherComments" :key="item.commentId">
                                    <v-card class="mt-2" min-height="120px">
                                        <v-row>
                                            <div style="width: 70px;height: 100%">
                                                <v-img class="mr-4 mt-1" :src="item.userImage" width="50px"
                                                       height="50px"
                                                       style="border-radius: 50px"></v-img>
                                            </div>
                                            <div>
                                                <span class="mr-3 other-comment-username"
                                                      v-if="item.userTitle === null || item.userTitle === ''">{{item.username}}</span>
                                                <span class="mr-3 other-comment-username"
                                                      v-else>{{item.userTitle}}</span>
                                            </div>
                                            <div class="mr-3 other-comment-data"><span>{{item.createdDate}}</span></div>
                                        </v-row>
                                        <div style="width: 90%;float: left">
                                            <p>{{item.description}}</p>
                                        </div>
                                        <div style="width: 90%;float: left;margin-top: -5px">
                                            <v-btn rounded text x-small style="font-size: 9px">
                                                <v-icon color="primary" size="9">
                                                    mdi-thumb-down
                                                </v-icon>
                                            </v-btn>
                                            <span class="vote-count-middle">147</span>
                                            <v-btn rounded text x-small style="font-size: 10px" width="30px">

                                                <v-icon color="primary" size="12">
                                                    mdi-thumb-up
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                    </v-card>
                                </div>
                            </div>
                            <div v-else>
                                <span class=" pr-4">هنوز کامنتی برای این اپیزود ثبت نشده است نفر اول شما باشید.</span>
                            </div>
                        </div>
                    </v-row>
                </v-col>
                <v-col cols="4" style="float: left;height: 100%">
                    <div v-if="previousEpisode != null">
                        <v-row class="mt-2 mb-4 mr-1">
                            <div>
                                <span class="description-title">پادکست قسمت قبل</span>
                            </div>
                        </v-row>

                        <div class="flex" style="width: 100%">
                            <MobileCardPlayer :item="previousEpisode"/>
                            <br/>
                        </div>
                    </div>

                    <div v-if="nextEpisode != null">
                        <v-row class="mt-2 mb-4 mr-1">
                            <div>
                                <span class="description-title">پادکست قسمت بعد</span>
                            </div>
                        </v-row>
                        <div class="flex" style="width: 100%">
                            <v-flex>
                                <MobileCardPlayer :item="nextEpisode"/>
                            </v-flex>
                        </div>
                    </div>

                    <v-row class="mt-2 mb-4 mr-1">
                        <div>
                            <span class="description-title">پادکست های مشابه</span>
                        </div>
                    </v-row>
                    <div class="flex" style="width: 100%">
                        <v-flex v-for="(item , index) in suggestionPodcasts" :key="index">
                            <MobileCardPlayer :item="item"/>
                            <v-divider style="color: #464646;" :inset="false"></v-divider>
                        </v-flex>
                    </div>
                    <div style="height: 100px"></div>
                </v-col>
                <Snackbar :snackbar="snackbar" :snackbar-text="snackbarText"/>
            </div>
        </div>
        <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
             v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
            <div v-if="pageLoading === false">
                <Loader/>
            </div>
            <div v-else>
                <v-col cols="8" style="float: right;">
                    <v-row>
                        <v-col cols="3" style="float: right">
                            <v-img :src="post.podcastImage" height="180px" min-width="180px" max-width="180px"
                                   style="border-radius: 10px"></v-img>
                            <div class="pr-6 pt-2" v-if="post.episodeNumber != null">
                                <span v-if="post.seasonNumber != null" style="float: right;"> فصل : {{post.seasonNumber}}</span>
                                <span class="pl-6" style="float: left;" v-if="post.seasonNumber != null"> قسمت : {{post.episodeNumber}}</span>
                                <span class="pl-6" style="float: right;" v-else> قسمت : {{post.episodeNumber}}</span>
                            </div>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col cols="8" style="float: left">
                            <v-row class="mr-2">
                                <h1 class="podcast-title-md">
                                    {{post.title}}
                                </h1>
                            </v-row>
                            <v-row class="mr-2 pb-3">
                                <div>
                                    <v-avatar size="35" @click="userPageNavigation(post.userId)"
                                              style="cursor: pointer">
                                        <v-img :src='post.profileImageAddress'></v-img>
                                    </v-avatar>
                                </div>
                                <div class="mr-1 pt-1" @click="userPageNavigation(post.userId)" style="cursor: pointer">
                                    <div v-if="post.userTitle == null || post.userTitle === '' ">
                                        <span style="font-size: 15px;line-height: 1.8rem">{{post.username}}</span>
                                    </div>
                                    <div v-else>
                                        <span style="font-size: 15px;line-height: 1.8rem">{{post.userTitle}}</span>
                                    </div>
                                </div>
                            </v-row>
                            <v-row class="podcast-info-md mr-3 pb-3">
                                <div @click="categoryPageNavigation(post.categoryId)" style="cursor: pointer">
                                    <v-icon size="30">{{post.categoryIcon}}</v-icon>
                                    <span class="mr-1">{{post.categoryName}}</span>
                                </div>
                            </v-row>
                            <v-row class="podcast-info-md mr-3 ">
                                <div>
                                    <v-icon size="25">mdi-play-circle</v-icon>
                                    <span class="mr-1">{{post.viewCount}}</span>
                                </div>
                                <div class="mr-2">
                                    <v-icon size="25">mdi-heart</v-icon>
                                    <span class="mr-1">{{post.likeCount}}</span>
                                </div>
                                <div class="mr-2">
                                    <v-icon size="25">mdi-calendar-range</v-icon>
                                    <span class="mr-1">{{this.postDate}}</span>
                                </div>
                            </v-row>
                            <v-row mr-2>
                                <v-col cols="1">
                                    <PlayerButton :item="post"/>
                                </v-col>
                                <v-col cols="1">
                                    <div v-if="isListenLater === false">
                                        <v-btn fab text @click="listenLaterAction(post.podcastId)"
                                               class="listenLaterButton" height="55px" width="55px">
                                            <v-icon dark color="primary" size="35px">mdi-clock-time-three-outline
                                            </v-icon>
                                        </v-btn>
                                    </div>
                                    <div v-else>
                                        <v-btn fab text class="listenLaterButton" height="55px" width="55px"
                                               @click="deleteListenLaterAction(post.podcastId)">
                                            <v-icon dark color="primary" size="35px">mdi-check</v-icon>
                                        </v-btn>
                                    </div>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn fab id="shareBtnMobile" class="shareButton" text
                                           height="55px" width="55px" @click="shareAction">
                                        <v-icon color="primary" size="30px">mdi-share-variant</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="8"></v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row style="width: 100%">
                        <div style="width: 99%">
                            <v-row class="mr-3">
                                <div>
                                    <span style="font-size: 17px">توضیحات</span>
                                </div>
                            </v-row>
                            <v-row class="mr-3">
                                <div>
                                    <p class="podcast-description" v-html="post.description">

                                    </p>
                                </div>
                            </v-row>
                            <v-row class="mr-3">
                                <div>
                                    <v-icon class="ml-2">mdi-comment-text-multiple-outline</v-icon>
                                    <b>نظرات ({{otherComments.length}})</b>
                                </div>
                            </v-row>
                            <v-row class="mr-3 mt-1">
                                <div style="width: 98%">
                                    <v-text-field
                                            v-model="userComment"
                                            :append-outer-icon="'mdi-send mdi-rotate-180'"
                                            filled
                                            clear-icon="mdi-close-circle"
                                            clearable
                                            :counter="300"
                                            label="نظر خود را بنویسید"
                                            type="text"
                                            @click:append-outer="submitComment"
                                    >
                                    </v-text-field>
                                    <LoginDialog :message="errorMessage" :dialog="dialog"/>
                                </div>
                            </v-row>
                            <div v-if="otherComments.length !== 0">
                                <div class="flex mr-3" v-for="item in otherComments" :key="item.commentId">
                                    <v-card class="mt-2" min-height="120px">
                                        <v-row>
                                            <div style="width: 70px;height: 100%">
                                                <v-img class="mr-4 mt-1" :src="item.userImage" width="50px"
                                                       height="50px"
                                                       style="border-radius: 50px"></v-img>
                                            </div>
                                            <div>
                                                <span class="mr-3 other-comment-username"
                                                      v-if="item.userTitle === null || item.userTitle === ''">{{item.username}}</span>
                                                <span class="mr-3 other-comment-username"
                                                      v-else>{{item.userTitle}}</span>
                                            </div>
                                            <div class="mr-3 other-comment-data"><span>{{item.createdDate}}</span></div>
                                        </v-row>
                                        <div style="width: 90%;float: left">
                                            <p>{{item.description}}</p>
                                        </div>
                                        <div style="width: 90%;float: left;margin-top: -5px">
                                            <v-btn rounded text x-small style="font-size: 9px">
                                                <v-icon color="primary" size="9">
                                                    mdi-thumb-down
                                                </v-icon>
                                            </v-btn>
                                            <span class="vote-count-middle">147</span>
                                            <v-btn rounded text x-small style="font-size: 10px" width="30px">

                                                <v-icon color="primary" size="12">
                                                    mdi-thumb-up
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                    </v-card>
                                </div>
                            </div>
                            <div v-else>
                                <span class=" pr-4">هنوز کامنتی برای این اپیزود ثبت نشده است نفر اول شما باشید.</span>
                            </div>
                        </div>
                    </v-row>
                </v-col>
                <v-col cols="4" style="float: left;height: 100%">
                    <div v-if="previousEpisode != null">
                        <v-row class="mt-2 mb-4 mr-1">
                            <div>
                                <span class="description-title">پادکست قسمت قبل</span>
                            </div>
                        </v-row>

                        <div class="flex" style="width: 100%">
                            <MobileCardPlayer :item="previousEpisode"/>
                            <br/>
                        </div>
                    </div>

                    <div v-if="nextEpisode != null">
                        <v-row class="mt-2 mb-4 mr-1">
                            <div>
                                <span class="description-title">پادکست قسمت بعد</span>
                            </div>
                        </v-row>
                        <div class="flex" style="width: 100%">
                            <v-flex>
                                <MobileCardPlayer :item="nextEpisode"/>
                            </v-flex>
                        </div>
                    </div>

                    <v-row class="mt-2 mb-4 mr-1">
                        <div>
                            <span class="description-title">پادکست های مشابه</span>
                        </div>
                    </v-row>
                    <div class="flex" style="width: 100%">
                        <v-flex v-for="(item , index) in suggestionPodcasts" :key="index">
                            <MobileCardPlayer :item="item"/>
                            <v-divider style="color: #464646;" :inset="false"></v-divider>
                        </v-flex>
                    </div>
                    <div style="height: 100px"></div>
                </v-col>
                <Snackbar :snackbar="snackbar" :snackbar-text="snackbarText"/>
            </div>
        </div>
        <div class="pageXsOnlyAndMsOnly"
             v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
            <v-card class="mx-2">
                <v-row>
                    <v-col cols="6">
                        <v-img :src="post.podcastImage"></v-img>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <h1 class="podcast-title-xs">
                                {{post.title}}
                            </h1>
                        </v-row>
                        <v-row class="podcast-info">
                            <v-icon>mdi-calendar-range</v-icon>
                            <span>{{this.postDate}}</span>
                        </v-row>
                        <v-row class="podcast-info">
                            <v-icon>mdi-heart</v-icon>
                            <span>{{post.likeCount}}</span>
                        </v-row>
                        <v-row class="podcast-info">
                            <v-icon>mdi-play-circle</v-icon>
                            <span>{{post.viewCount}}</span>
                        </v-row>
                        <v-row>
                            <v-col cols="2"></v-col>
                            <v-col cols="4">
                                <v-icon size="35" color="#3b5998">mdi-share-variant</v-icon>
                            </v-col>
                            <v-col cols="6">
                                <MobilePlayerButton :item="post"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
            <div class="mx-2">
                <v-row class="mr-2 mt-2 description-title"><span>توضیحات</span></v-row>
                <div class="podcast-description">
                    <div v-if="post.description.length>200">
                        <div v-if="!readMoreActivated">
                            <p v-html="post.description.slice(0,200)"></p>
                            <v-btn small color="primary" @click="activateReadMore" style="margin-top: -15px">
                                بیشتر بخوانید
                                <v-icon right size="20">mdi-chevron-down</v-icon>
                            </v-btn>
                        </div>
                        <div v-else>
                            <p v-html="post.description"></p>
                        </div>
                    </div>
                    <div v-else><p v-html="post.description"></p></div>
                </div>
            </div>
            <v-row class="mr-2 mt-2 description-title"><b>پادکست های مرتبط</b></v-row>
            <div class="flexi mx-3">
                <v-flex v-for="item in suggestionPodcasts" :key="item.id">
                    <MobileCardPlayer :item="item"/>
                </v-flex>
            </div>
            <br>
            <v-row class="mx-3 mb-2">
                <v-icon class="ml-2">mdi-comment-text-multiple-outline</v-icon>
                <b>نظرات ({{otherComments.length}})</b>
            </v-row>
            <v-form class="mx-2">
                <v-textarea
                        v-model="userComment"
                        auto-grow
                        filled
                        required
                        color="deep-purple"
                        label="نظر خود را بنویسید"
                        rows="1"
                        :counter="300"
                        type="text"
                ></v-textarea>
                <v-btn @click="submitComment" class="mr-3" small color="#065fd4">
                     <span style="color: white;font-size: 15px">
                        ثبت نظر
                     </span>
                </v-btn>
                <v-btn @click="clear" small class="mr-5">
                     <span>
                        انصراف
                     </span>
                </v-btn>
            </v-form>
            <br>
            <div class="flex" v-for="item in otherComments" :key="item.commentId">
                <v-card min-height="120px">
                    <v-row>
                        <div style="width: 70px;height: 100%">
                            <v-img class="mr-4 mt-1" :src="item.userImage" width="50px" height="50px"
                                   style="border-radius: 50px"></v-img>
                        </div>
                        <div><span class="mr-3 other-comment-username">{{item.username}}</span></div>
                        <div class="mr-3 other-comment-data"><span>{{item.commentDate}}</span></div>
                    </v-row>
                    <div style="width: 80%;float: left">
                        <p>{{item.description}}</p>
                    </div>
                    <div style="width: 80%;float: left;margin-top: -5px">
                        <v-btn rounded text x-small style="font-size: 9px">
                            <v-icon color="primary" size="9">
                                mdi-thumb-down
                            </v-icon>
                        </v-btn>
                        <span class="vote-count-middle"></span>
                        <v-btn rounded text x-small style="font-size: 10px" width="30px">

                            <v-icon color="primary" size="12">
                                mdi-thumb-up
                            </v-icon>
                        </v-btn>
                    </div>
                </v-card>
            </div>
            <v-row style="height: 150px"></v-row>
            <div class="flexi ma-8 "></div>
        </div>
    </div>
</template>

<script>
    import PlayerButton from "../../../components/buttons/PlayerButton";
    import LoginDialog from "../../../components/tools/LoginDialog";
    import Snackbar from "../../../components/tools/Snackbar";
    import Loader from "../../../components/tools/Loader";
    import axios from 'axios';

    export default {
        layout: "pody",
        name: "PlayID",
        components: {
            LoginDialog,
            Snackbar, PlayerButton, Loader,
        },
        async asyncData(context) {
            return axios.get('http://localhost:8084/api/podcast/read/' + context.route.params.id).then(response => {
                if (response.status === 200) {
                    return {
                        pageLoading: true,
                        post: response.data.podcastInfo,
                        previousEpisode: response.data.previousEpisode,
                        // //nextEpisode
                        nextEpisode: response.data.nextEpisode,
                        // //commentsList
                        otherComments: response.data.commentsList,
                        // //sameCategory Podcasts
                        suggestionPodcasts: response.data.sameCategory,
                    }
                }
            })
        },
        data: () => ({
            currentUrl: "",
            podcastid: null,
            pageLoading: true,
            post: {},
            postTitle: "",
            postDate: '',
            suggestionPodcasts: [],
            previousEpisode: {},
            nextEpisode: {},
            podcastCurrentRoute: "",
            userComment: '',
            otherComments: [],
            readMoreActivated: false,
            snackbar: false,
            dialog: false,
            episodeTitle: '',
            errorMessage: 'یرای ارسال کامنت شما باید در سایت ورود کرده باشید. توجه داشته باشید کامنت نوشته شده شما از بین میرود',
            snackbarText: '',
            isListenLater: false,
            icons: [
                {
                    name: 'fa fa-share-alt'
                },
                {
                    name: 'mdi-play-circle'
                },
                {
                    //heart before like
                    name: 'far fa-heart'
                },
                {
                    //heart after like
                    name: 'fas fa-heart'
                }
            ],
            componentKey: 0,
            isPlay: false,
            breadcrumbs: [
                {
                    url: 'https://example.com',
                    text: 'top page',
                },
                {
                    url: 'https://example.com/foo',
                    text: 'foo',
                },
                {
                    url: 'https://example.com/foo/bar',
                    text: 'bar',
                },
            ],
        }),
        methods: {
            userPageNavigation(id) {
                this.$router.push('/publisher/' + id)
            },
            categoryPageNavigation(id) {
                this.$router.push('/category/' + id)
            },
            listenLaterAction(podcastId) {
                if (this.$store.getters.userLogin === false) {
                    this.dialog = true;
                    this.errorMessage = 'شما برای اضافه کردن به لیست بعد گوش میدم هاتون باید در سایت ورود کنید'
                } else {
                    axios.post('http://localhost:8084/api/podcast/listenLater', {
                        first: podcastId,
                        second: this.$store.state.user[0].userId
                    }).then(response => {
                        if (response.status === 200) {
                            if (response.data.message === 'SUCCESSFUL') {
                                this.snackbar = true;
                                this.isListenLater = true;
                                this.snackbarText = 'اپیزود به لیست اضافه شد';
                            } else {
                                this.snackbar = true;
                                this.isListenLater = false;
                                this.snackbarText = 'مشکلی پیش آمده باز تلاش کنید';
                            }
                        } else {
                            this.snackbar = true;
                            this.isListenLater = false;
                            this.snackbarText = 'مشکلی در ارتباط رخ داده است';
                        }
                    });
                }
            },
            deleteListenLaterAction(podcastId) {
                axios.delete('http://localhost:8084/api/podcast/listenLater/delete', {
                    data: {
                        first: this.$store.state.user[0].userId,
                        second: podcastId
                    }
                }).then(response => {
                    if (response.status === 200) {
                        if (response.data.message === 'SUCCESSFUL') {
                            this.snackbar = true;
                            this.isListenLater = false;
                            this.snackbarText = 'اپیزود از لیست حذف شد';
                        } else {
                            this.snackbar = true;
                            this.isListenLater = true;
                            this.snackbarText = 'مشکلی پیش آمده باز تلاش کنید';
                        }
                    } else {
                        this.snackbar = true;
                        this.isListenLater = true;
                        this.snackbarText = 'مشکلی در ارتباط رخ داده است';
                    }
                });
            },
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
            activateReadMore() {
                this.readMoreActivated = true;
            },
            clear() {
                this.userComment = '';
            },
            shareAction() {
                this.$copyText(this.currentUrl).then(() => {
                    this.snackbar = true;
                    this.snackbarText = 'آدرس این صفحه کپی شد !';
                });
                this.snackbar = false;
            }
        },
        created() {
            // axios.get('http://localhost:8084/api/podcast/read/' + this.$route.params.id).then(response => {
            //   if (response.status === 200) {
            //     this.pageLoading = true;
            //     //podcastInfo
            //     this.post = response.data.podcastInfo;
            //     let PostDate = Date.parse(this.post.createdDate);
            //     let today = new Date();
            //     let todatParse = Date.parse(today);
            //     let showPostDate = todatParse - PostDate;
            //     let finaleDate = Math.floor(showPostDate / 86400000)
            //     if (finaleDate < 7) {
            //       this.postDate = `${finaleDate} روز قبل`
            //     } else if (finaleDate > 7 && finaleDate < 14) {
            //       let postWeek = Math.floor(finaleDate / 7)
            //       this.postDate = `${postWeek} هفته قبل`
            //     } else if (finaleDate > 14 && finaleDate < 21) {
            //       let postWeek = Math.floor(finaleDate / 7)
            //       this.postDate = `${postWeek} هفته قبل`
            //     } else if (finaleDate > 21 && finaleDate < 31) {
            //       let postWeek = Math.floor(finaleDate / 7)
            //       this.postDate = `${postWeek} هفته قبل`
            //     } else if (finaleDate > 31 && finaleDate < 365) {
            //       let postWeek = Math.floor(finaleDate / 30)
            //       this.postDate = `${postWeek} ماه قبل`
            //     } else if (finaleDate > 365) {
            //       let postWeek = Math.floor(finaleDate / 365)
            //       this.postDate = `${postWeek} سال قبل`
            //     }
            //     //previousEpisode
            //     this.previousEpisode = response.data.previousEpisode;
            //     //nextEpisode
            //     this.nextEpisode = response.data.nextEpisode;
            //     //commentsList
            //     this.otherComments = response.data.commentsList;
            //     //sameCategory Podcasts
            //     this.suggestionPodcasts = response.data.sameCategory;
            //     let postTitle = this.post.title;
            //     let title = "پادی | " + postTitle;
            //     document.title = "";
            //     document.title = title;
            //   }
            // });
        },
        mounted() {
            if (this.$store.getters.userLogin === true) {
                axios.post("http://localhost:8084/api/podcast/listenLater/check", {
                    first: this.$store.state.user[0].userId,
                    second: this.$route.params.podcastid
                }).then(response => {
                    if (response.data.message === "TRUE") {
                        this.isListenLater = true;
                    } else if (response.data.message === "EMPTY_BODY") {
                        this.isListenLater = false;
                    } else {
                        this.isListenLater = false;
                    }
                });
            }
            this.currentUrl = window.location.pathname
        },
        watch: {
            $route(to, from) {
                if (to.params.podcastid !== from.params.podcastid) {
                    //podcast info
                    this.post = {};
                    //previousEpisode
                    this.previousEpisode = {};
                    //nextEpisode
                    this.nextEpisode = {};
                    //sameCategory Podcasts
                    this.suggestionPodcasts = [];
                    this.snackbar = false;
                    this.isListenLater = false;

                    axios.get('http://localhost:8084/api/podcast/read/' + to.params.podcastid).then(response => {
                        //podcastInfo
                        this.post = response.data.podcastInfo;
                        //previousEpisode
                        this.previousEpisode = response.data.previousEpisode;
                        //nextEpisode
                        this.nextEpisode = response.data.nextEpisode;
                        //commentsList
                        this.otherComments = response.data.commentsList;
                        //sameCategory Podcasts
                        this.suggestionPodcasts = response.data.sameCategory;
                    });
                }
                // console.log(document.title);
                // console.log("پادی | " + this.post.title);
                // if (document.title !== "پادی | " + this.post.title) {
                //   let postTitle = this.post.title;
                //   let title = "پادی | " + postTitle;
                //   document.title = "";
                //   document.title = title;
                // }
                this.currentUrl = window.location.pathname
                // this.mounted();
            }

        },
        head() {
            return {
                title: "پادی | " + this.post.title,
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    {hid: 'description', name: 'description', content: 'My custom description'}
                ]
            }
        },
        jsonld() {
            const items = this.breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@id': item.url,
                    name: item.text,
                },
            }));
            return {
                '@context': 'http://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: items,
            };
        },
    }
</script>

<style>
    @import "../../../assets/Styles/FontiranSans.css";
    @import "../../../assets/Styles/PageSizingStyle.css";

    .podcast-title-md {
        width: 100%;
        line-height: 2.2rem;
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 20px;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-justify-content: flex-start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-align-items: flex-start;
        -ms-flex-align: start;
        align-items: flex-start;
    }

    .podcast-title-xs {
        width: 100%;
        line-height: 2.2rem;
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 20px;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-justify-content: flex-start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-align-items: flex-start;
        -ms-flex-align: start;
        align-items: flex-start;
    }

    .podcast-info-md {
        font-size: 17px;
        color: #777;
        font-weight: 400;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
        margin-top: 3px;
        margin-bottom: 3px;
    }

    .description-title {
        font-size: 16px;
        color: #000;
        font-weight: 600;
        line-height: 22px;
        height: 22px;
        margin-bottom: 13px;
    }

    .podcast-description {
        font-size: 14px;
        color: #777;
        font-weight: 400;
        text-align: justify;
        padding-right: 20px;
        -webkit-transition: .3s;
        -o-transition: .3s;
        transition: .3s;
    }

    .other-comment-username {
        margin-right: 4px;
        margin-bottom: 2px;
        font-size: .9rem;
        font-weight: 500;
        line-height: 2.2rem;
    }

    .other-comment-data {
        margin-right: 4px;
        margin-bottom: 2px;
        font-size: .9rem;
        font-weight: 500;
        line-height: 2.2rem;
    }

    .listenLaterButton {
        bottom: 8px;
        right: 40px;
    }

    .shareButton {
        bottom: 8px;
        right: 60px;
    }
</style>
