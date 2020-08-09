<template>
    <v-btn fab style="bottom: 10px;right: 15px;" text height="55px" width="55px"
           @click="playPodcast(item.title,item.userTitle,item.username,item.podcastImage,item.audioAddress,item.podcastId, item.userId)">
        <v-icon color="primary" size="55px">
            {{icons[0].name}}
        </v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "PlayerButton",
        props: {
            'item': {
                type: Object,
                required: true,
            },
        },
        data: () => ({
            icons: [
                {
                    name: "mdi-play-circle"
                },
            ],
        }),
        methods: {
            playPodcast(title, userTitle, username, podcastImage, audioAddress, podcastId, userId) {
                this.$store.state.podcast.forEach(pod => {
                    pod.podcastTitle = null;
                    pod.podcastTitle = title;
                });
                this.$store.state.podcast.forEach(pod => {
                    pod.podcastChannel = null;
                    if (userTitle == null || userTitle === '') {
                        pod.podcastChannel = username;
                    } else {
                        pod.podcastChannel = userTitle;
                    }
                });
                this.$store.state.podcast.forEach(pod => {
                    pod.podcastImage = null;
                    pod.podcastImage = podcastImage;

                });
                this.$store.state.podcast.forEach(pod => {
                    pod.podcastFile = null;
                    pod.podcastFile = audioAddress;
                });
                this.$store.state.podcast.forEach(pod => {
                    pod.podcastId = null;
                    pod.podcastId = podcastId;
                });
                this.$store.state.podcast.forEach(pod => {
                    pod.userId = null;
                    pod.userId = userId;
                });
            },
        }
    }
</script>

<style scoped>

</style>
