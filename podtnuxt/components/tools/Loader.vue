<template>
    <div>
        <div class="loaderMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
             v-show="$vuetify.breakpoint.mdAndUp">
            <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
            ></v-progress-circular>
        </div>
        <div class="loaderXsOnlyAndMsOnly"
             v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
            <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
            ></v-progress-circular>
        </div>
        <div class="loaderMdAndDown hidden-sm-only hidden-xs-only"
             v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
            <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
            ></v-progress-circular>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style scoped>
    .loaderMdAndUp {
        justify-content: center;
        align-items: center;
        text-align: center;
        top: 50%;
        height: 100%;
        width: 85%;
        position: fixed;
        float: left;
    }

    .loaderXsOnlyAndMsOnly {
        justify-content: center;
        align-items: center;
        text-align: center;
        top: 50%;
        height: 100%;
        width: 100%;
        position: fixed;
        float: left;
    }

    .loaderMdAndDown {
        justify-content: center;
        align-items: center;
        text-align: center;
        top: 50%;
        height: 100%;
        width: 95%;
        position: fixed;
        float: left;
    }
</style>
