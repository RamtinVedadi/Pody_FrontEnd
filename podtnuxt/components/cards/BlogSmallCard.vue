<template>
    <a>
        <v-card class="ma-4" max-width="300" height="300" @click="blogPageNavigation(item.id)">
            <v-img :src="item.blogImage" width="260" height="120"></v-img>
            <v-card-title style="vertical-align: baseline"><span class="blog-title">{{item.title}}</span>
            </v-card-title>
            <v-card-actions>
                <v-list-item style="display: flex;align-items: center;">
                    <v-row align="center" justify="start">
                        <v-list-item-avatar>
                            <v-img :src="item.profileImageAddress"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <div v-if="item.userTitle === null || item.userTitle === ''">
                                <span class="blog-writer-name">
                                    {{item.username}}
                                </span>
                            </div>
                            <div v-else>
                                <span class="blog-writer-name">
                                    {{item.userTitle}}
                                </span>
                            </div>
                        </v-list-item-content>
                    </v-row>
                    <v-row align="center" justify="end">
                        <v-icon class="pl-1" size="15" color="#afb6bc">mdi-clock-outline</v-icon>
                        <span class="blog-date">11 تیر 1399</span>
                    </v-row>
                </v-list-item>
            </v-card-actions>
        </v-card>
    </a>
</template>

<script>
    export default {
        name: "BlogSmallCard",
        props: {
            'item': {
                type: Object,
                required: true,
            },
        },
        data() {
            return {}
        },
        methods: {
            blogPageNavigation(id) {
                this.$router.push('/blog/' + id);
            }
        }
    }
</script>

<style scoped>
    .blog-title {
        text-align: center;
        height: 85px;
        line-height: 24px;
        color: #6a7075;
        padding: 0 35px;
        font-size: 18px;
        width: 100%;
    }

    .blog-writer-name {
        padding-right: 10px;
        color: #afb6bc;
        -webkit-flex-grow: 1;
        flex-grow: 1;
        font-size: 11px;
        display: inline-flex;
        white-space: nowrap;
    }

    .blog-date {
        font-size: 12px;
        color: #afb6bc;
    }
</style>
