<template>
    <v-layout>
        <v-flex>
            <v-carousel height="100%" hide-delimiters cycle touchless>
                <v-carousel-item v-for="item in items" :key="item.id" @click="redirect(item.title,item.link)"
                                 width="100%"
                                 style="cursor: pointer">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="item.src" :alt="item.title"></v-img>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data: () => {
            return {
                items: [
                    {
                        id: 0,
                        src: "http://pody.ir/defaultImages/be_vaght_e_nahar_ads.jpg",
                        link: "/",
                        title: 'پادکست به وقت ناهار'
                    },
                    {
                        id: 1,
                        src: "http://pody.ir/defaultImages/drmotori.png",
                        link: "https://drmotori.com",
                        title: 'دکتر موتوری'
                    },
                    {
                        id: 2,
                        src: "http://pody.ir/defaultImages/yourAds.jpg",
                        link: "/contactus",
                        title: 'اطلاعات بیشتر'
                    },
                    {
                        id: 3,
                        src: "http://pody.ir/defaultImages/pixmer.jpg",
                        link: "https://pixmer.com/",
                        title: 'پیکسمر'
                    },
                ]
            };
        },
        methods: {
            redirect(title, link) {
                if (link === '/contactus') {
                    this.$router.push('/contactus');
                } else {
                    let routeData = this.$router.resolve({name: title, path: link});
                    window.open(routeData.href, '_blank');
                }
            }
        }
    }
    ;
</script>
