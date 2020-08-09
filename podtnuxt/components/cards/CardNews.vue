<template>
    <div class="fontMain">
        <v-card v-if="item.imageAddress != null " class="mx-6" width="450px" height="220px"
                style="border-radius: 20px;" elevation="10">
            <v-img class="cardMainImage" :src="item.imageAddress" height="180px" width="180px">
            </v-img>

            <v-row class="pt-3 pr-6 cursor">
                <v-avatar size="36">
                    <v-img :src='item.profileImageAddress' @click="userPageNavigation(item.userId)">
                    </v-img>
                </v-avatar>
                <v-card-subtitle class="pt-2 pr-2" link="/" style="font-size: 15px"
                                 @click="userPageNavigation(item.userId)">
                    {{item.username}}
                </v-card-subtitle>
            </v-row>

            <div v-if="checkIsPersian(item.title) === false">
                <v-card-title class="vCardTitle pt-0" style="direction: ltr;font-size: 18px">
                    <strong v-if="item.title.length >30" :aria-label="item.title"
                            :title="item.title">
                        {{item.title.slice(0,30)}}...</strong>
                    <strong v-else>
                        {{item.title}}
                    </strong>
                </v-card-title>
                <v-card-subtitle style="direction: ltr; font-size: 15px;text-align: justify">
                    <div style="width: 200px">
                        {{item.description}}
                    </div>
                </v-card-subtitle>
            </div>
            <div class="mr-5" v-else>
                <v-card-title class="vCardTitle pt-0" style="direction: rtl;font-size: 18px;">
                    <strong v-if="item.title.length >20" :aria-label="item.title"
                            :title="item.title">
                        {{item.title.slice(0,20)}}...</strong>
                    <strong v-else>
                        {{item.title}}
                    </strong>
                </v-card-title>

                <v-card-subtitle
                        style="direction: rtl; font-size: 15px;text-align: justify;display: flow-root;">
                    {{item.description}}
                </v-card-subtitle>
            </div>

            <v-row class="cardLikeControls">
                <v-btn rounded text style="bottom: 1px;right: 300px;top:10px;">
                    <span>326</span>
                    <v-icon color="primary" size="22px" style="padding-right: 4px">
                        {{icons[8].name}}
                    </v-icon>
                </v-btn>
                <v-btn rounded text style="bottom: 1px;right: 290px;top:10px;">
                    <v-icon color="primary" size="27px" style="padding-left: 4px;">
                        {{icons[7].name}}
                    </v-icon>
                    <span>1478</span>
                </v-btn>
            </v-row>
        </v-card>
        <v-card v-else class="mx-6" width="420px" height="180px" style="border-radius: 20px;">
            <v-row class="pt-3 pr-6">
                <v-avatar size="36">
                    <v-img :src='item.profileImageAddress' @click="userPageNavigation(item.userId)">

                    </v-img>
                </v-avatar>
                <v-card-subtitle class="pt-2 pr-2" link="/" style="font-size: 15px"
                                 @click="userPageNavigation(item.userId)">
                    {{item.username}}
                </v-card-subtitle>
            </v-row>

            <div v-if="checkIsPersian(item.title) === false">
                <v-card-title class="vCardTitle pt-0" style="direction: ltr;font-size: 18px">
                    <strong v-if="item.title.length >30" :aria-label="item.title"
                            :title="item.title">
                        {{item.title.slice(0,30)}}...</strong>
                    <strong v-else>
                        {{item.title}}
                    </strong></v-card-title>
                <v-card-subtitle style="direction: ltr; font-size: 15px;text-align: justify">
                    <div style="width: 400px">
                        {{item.description}}
                    </div>
                </v-card-subtitle>
            </div>
            <div class="mr-5" v-else>
                <v-card-title class="vCardTitle pt-0" style="direction: rtl;font-size: 18px;">
                    <strong v-if="item.title.length >30" :aria-label="item.title"
                            :title="item.title">
                        {{item.title.slice(0,30)}}...</strong>
                    <strong v-else>
                        {{item.title}}
                    </strong>
                </v-card-title>

                <v-card-subtitle
                        style="direction: rtl; font-size: 15px;text-align: justify;display: flow-root;">
                    {{item.description}}
                </v-card-subtitle>
            </div>


            <v-row class="cardLikeControls">
                <v-btn rounded text style="bottom: 1px;right: 300px;top:10px;">
                    <span>326</span>
                    <v-icon color="primary" size="22px" style="padding-right: 4px">
                        {{icons[8].name}}
                    </v-icon>
                </v-btn>
                <v-btn rounded text style="bottom: 1px;right: 290px;top:10px;">
                    <v-icon color="primary" size="27px" style="padding-left: 4px;">
                        {{icons[7].name}}
                    </v-icon>
                    <span>1478</span>
                </v-btn>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "CardNews",
        props: {
            'item': {
                type: Object,
                required: true,
            },
        },
        data: () => {
            return {
                icons: [
                    {
                        name: "fas fa-share-alt"
                    },
                    {
                        name: "mdi-play-circle"
                    },
                    {
                        name: "mdi-bell"
                    },
                    {
                        name: "mdi-check"
                    },
                    {
                        name: 'mdi-clock'
                    },
                    {
                        name: 'mdi-ear-hearing'
                    },
                    {
                        name: 'mdi-heart'
                    },
                    {
                        name: 'mdi-thumb-up'
                    },
                    {
                        name: 'mdi-thumb-down'
                    }
                ],
            }
        },
        methods: {
            checkIsPersian(s) {
                var PersianOrASCII = /[آ-ی]|([a-zA-Z])/;
                var m;
                if ((m = s.match(PersianOrASCII)) !== null) {
                    if (m[1]) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },
            userPageNavigation(id) {
                this.$router.push('/publisher/' + id);
            },
        }
    }
</script>

<style scoped>
    @import "../../assets/Styles/GlobalPurposeStyle.css";
    @import "../../assets/Styles/FontiranSans.css";

    .cardMainImage {
        float: right;
        right: 10px;
        top: 20px;
        border-radius: 5%;
    }

    .cardLikeControls {
        position: absolute;
        width: 100%;
        float: right;
        bottom: 20px;
        left: 85px;
    }

    .vCardTitle {
        word-break: normal;
        cursor: pointer;
    }
</style>
