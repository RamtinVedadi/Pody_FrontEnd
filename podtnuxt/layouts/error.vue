<template>
    <v-app dark>
        <NotFound/>
    </v-app>
</template>

<script>
    import NotFound from "../components/errors/NotFound";

    export default {
        components: {NotFound},
        layout: 'pody',
        props: {
            error: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                pageNotFound: '404 Not Found',
                otherError: 'An error occurred'
            }
        },
        head() {
            const title =
                this.error.statusCode === 404 ? this.pageNotFound : this.otherError
            return {
                title
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-size: 20px;
    }
</style>
