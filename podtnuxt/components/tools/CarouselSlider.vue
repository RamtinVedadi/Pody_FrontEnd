<template>
    <v-layout>
        <v-flex height="100%" min-height="100%" max-height="100%">
            <v-carousel height="100%" min-height="100%" max-height="100%" hide-delimiters cycle show-arrows>
                <v-carousel-item v-for="item in items" :key="item.id" @click="redirect(item.title,item.link)"
                                 width="100%" height="100%" min-height="100%" max-height="100%"
                                 style="cursor: pointer" :src="item.src">
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
                        link: "http://pody.ir/publisher/a254e011-d65d-4f74-9f12-6c263f9dbd39",
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
