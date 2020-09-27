<template>
    <div>
        <v-card height="100" min-width="100" max-width="100" elevation="10">
            <v-img
                    :src=image
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="100px"
                    @click="toPlaylist(id)">
            </v-img>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "playListCard",
        props: {
            'title': {
                type: String,
                required: true,
            },
            'image': {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            }
        },
        methods: {
            toPlaylist(id) {
                this.$router.push('/playlistPage/' + id);
            }
        },

    }
</script>

<style scoped>
    @import "../../assets/Styles/PlayCardStyle.css";
</style>
