<template>
    <v-app light>
        <v-main>
            <Content/>
            <nuxt/>
        </v-main>
    </v-app>
</template>

<script>
    import Content from "../components/Content";

    export default {
        components: {Content},
        data() {
            return {
                clipped: false,
                drawer: false,
                fixed: false,
                items: [
                    {
                        icon: 'mdi-apps',
                        title: 'Welcome',
                        to: '/'
                    },
                    {
                        icon: 'mdi-chart-bubble',
                        title: 'Inspire',
                        to: '/inspire'
                    }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Vuetify.js'
            }
        }
    }
</script>
