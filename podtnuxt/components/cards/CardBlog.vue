<template>
    <v-card class="mx-auto" tile raised elevation="2" :id="idNumber"
            style="border-style: solid;border-width: 1px;">
        <v-row>
            <v-col cols="9">
                <v-card-title class="headline mt-1 pt-1 pb-6 cursor" @click="blogPageNavigation(item.id)">
                    {{item.title}}
                </v-card-title>
                <v-card-subtitle class="pb-3 pt-2 cursor" @click="blogPageNavigation(item.id)">
                    {{item.shortDescription}} ...
                </v-card-subtitle>
                <v-card-actions>
                    <v-row class="pr-4  pb-0">
                        <v-avatar size="38" class="cursor">
                            <v-img :src="item.profileImageAddress" @click="userPageNavigation(item.userId)">
                            </v-img>
                        </v-avatar>
                        <v-card-subtitle class="pt-0 pr-2 cursor" style="font-size: 15px"
                                         @click="userPageNavigation(item.userId)">
                            <div v-if="item.userTitle === null || item.userTitle === ''">
                                <span>{{item.username}}</span>
                            </div>
                            <div v-else>
                                <span>{{item.userTitle}}</span>
                            </div>
                            <span>{{item.viewCount}} بازدید</span>
                            <span> . </span>
                            <span>{{item.likeCount}} لایک</span>
                        </v-card-subtitle>
                    </v-row>
                </v-card-actions>
            </v-col>
            <v-col cols="1" class="text-center pl-0">
                <v-row class="flex-column ma-0 fill-height" justify="center">
                    <v-col class="px-0"></v-col>
                    <v-col class="px-0">
                        <v-btn icon v-if="isBookmark=== false" @click="isBookmark = true">
                            <v-icon>mdi-bookmark-outline</v-icon>
                        </v-btn>
                        <v-btn icon v-else @click="isBookmark = false">
                            <v-icon color="red">mdi-bookmark</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col class="px-0">
                        <v-btn icon>
                            <v-icon>mdi-share-variant</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="2">
                <v-img class="defaultImage " elevation="5"
                       :src="item.blogImage"
                       width="200" height="200" min-width="200" max-width="200">
                </v-img>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "CardBlog",
        props: {
            'item': {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                isBookmark: false,
                idNumber: '',
            }
        },
        methods: {
            blogPageNavigation(id) {
                this.$router.push('/blog/' + id);
            },
            randomColorGenerator() {
                let color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
                document.getElementById(this.idNumber).style.borderColor = color;
            },
            randomIdGenerator() {
                this.idNumber = Math.floor(Math.random() * 0xFFFFFF).toString(16);
            },
            userPageNavigation(id) {
                this.$router.push('/publisher/' + id);
            },
        },
        created() {
            this.randomIdGenerator();
        },
        mounted() {
            this.randomColorGenerator();
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/GlobalPurposeStyle.css";
</style>
