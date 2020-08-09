<template>
    <v-snackbar v-model="snackbar" bottom :timeout="1500" style="bottom: 100px">
        {{ snackbarText }}
        <v-btn dark text color="red" @click="snackbar = false">
            باشه
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "Snackbar",
        props: {
            'snackbarText': {
                type: String,
                required: true
            },
            'snackbar': {
                type: Boolean,
                default: false,
                required: true
            }
        },
    }
</script>

<style scoped>
</style>
