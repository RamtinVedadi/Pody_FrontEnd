<template>
  <v-btn rounded outlined height="23px" color="primary"
         @click="playPodcast(item.title,item.userTitle,item.username,item.podcastImage,item.audioAddress,item.podcastId, item.userId)">
    <v-icon class="pb-0" color="primary" right size="23px">
      {{icons[0].name}}
    </v-icon>
    <span>{{durationConverter(item.duration)}} </span>
  </v-btn>
</template>

<script>
  export default {
    name: "PCModePlayerButton",
    props: {
      'item': {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        icons: [
          {
            name: "mdi-play-circle"
          },
        ],
      }
    },
    methods: {
      durationConverter(seconds) {
        if (seconds === null) {
          return false
        } else {
          if (seconds.includes(":")) {
            return seconds;
          } else {
            return new Date(seconds * 1000).toISOString().substr(11, 8);
          }
        }

      },
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
