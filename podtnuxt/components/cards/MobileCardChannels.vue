<template>
    <v-card class="channel-card" flat width="100%">
        <v-col>
            <v-row justify="center" style="cursor: pointer;"
                   @click="userPageNavigation(item.id)">
                <v-img class="channel-image" :src="item.imageAddress" min-width="120px" max-width="120px" height="120px"
                       style="border-radius: 10px;width:120px">
                </v-img>
            </v-row>
        </v-col>
    </v-card>
</template>

<script>
    export default {
        name: "MobileCardChannels",
        props: {
            'item': {
                type: Object,
                required: true,
            },
        },
        methods: {
            userPageNavigation(id) {
                this.$router.push('/publisher/' + id);
            },
        }
    }
</script>

<style scoped>
    .channel-image {
        background-image: url("../../assets/no_podcast.png");
    }

    .channel-card {
        margin-right: 30px;
        height: 150px;
        width: 300px;
    }
</style>
