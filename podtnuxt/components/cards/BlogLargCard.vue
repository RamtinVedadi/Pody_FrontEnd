<template>
    <v-card class="mx-auto mt-5" tile raised elevation="2">
        <v-row>
            <v-col cols="9">
                <v-card-title class="headline mt-1 pt-1 pb-6" @click="blogPageNavigation(1)">
                    {{item.title}}
                </v-card-title>
                <v-card-subtitle class="pb-3 pt-2">
                    <span v-html="item.ShortText"></span>
                </v-card-subtitle>
                <v-card-actions>
                    <v-row class="pr-4  pb-0">
                        <v-avatar size="38">
                            <v-img :src="item.BlogWriteImage">
                            </v-img>
                        </v-avatar>
                        <v-card-subtitle class="pt-0 pr-2" style="font-size: 15px">
                            <span>{{item.BlogWriteName}}</span>
                            <br/>
                            <span> {{item.BlogView}} بازدید</span>
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
                            <v-icon>mdi-bookmark</v-icon>
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
                       :src="item.BlogImage"
                       width="200" height="200" min-width="200" max-width="200">
                </v-img>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "BlogLargCard",
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
        },
    }
</script>

<style scoped>

</style>
