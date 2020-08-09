<template>
    <v-card>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="3">
                <v-img width="50" height="50" :src="item.blogImage"></v-img>
            </v-col>
            <v-col cols="8">
                <v-row style="flex-grow: 1;color: #6b7074;font-size: 14px;line-height: 22px;">
                    <span>{{item.title}}</span>
                </v-row>
                <v-row class="pb-2 pt-2" style="color: #afb6bc;font-size: 12px;">
                    <div v-if="item.userTitle === null || item.userTitle === ''">
                        <span>{{item.username}}</span>
                    </div>
                    <div v-else>
                        <span>{{item.userTitle}}</span>
                    </div>
                </v-row>
                <v-row style="color: #afb6bc;font-size: 12px;">
                  <span><v-icon class="pl-1" size="15" color="#afb6bc">mdi-clock-outline</v-icon>
                        <span class="blog-date">{{item.createdDate}}</span>
                  </span>
                    <span>|</span>
                    <span>5 دقیقه</span>
                </v-row>
            </v-col>
        </v-row>

    </v-card>
</template>

<script>
    export default {
        name: "BlogRelatedCard",
        props: {
            'item': {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped>

</style>
