<template>
    <div>
        <div class="hidden-xs-only hidden-sm-only"
             v-show="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.mdAndDown
             || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
            <v-dialog v-model="propsValue" max-width="290">
                <v-card>
                    <v-card-title class="headline">شما ورود نکرده اید!</v-card-title>
                    <v-card-text class="subtitle-1">
                        {{message}}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="green darken-1" text @click="loginPageRedirection">
                            انتقال به صفحه ورود
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="removeDialog = false">
                            نمیخوام
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <div v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
            <v-dialog v-model="this.propsValue" max-width="290" style="top: 50%;right: 30%;left:40%">
                <v-card>
                    <v-card-title class="headline">شما ورود نکرده اید!</v-card-title>
                    <v-card-text class="subtitle-1">
                        {{message}}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="green darken-1" text @click="loginPageRedirection">
                            انتقال به صفحه ورود
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="removeDialog">
                            نمیخوام
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginDialog",
        props: {
            'message': {
                type: String,
                required: true
            },
            'dialog': {
                type: Boolean,
                default: false,
                required: true
            }
        },
        data() {
            return {
                propsValue: '',
            }
        },
        methods: {
            loginPageRedirection() {
                window.location.href = "/Login"
                this.dialog = false;
            },
            removeDialog() {
                this.dialog = false;
            }
        },
        created() {
            this.propsValue = this.dialog;
        },
        watch:{
            dialog: function(newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal);
                this.propsValue = this.dialog;
            }
        }
    }
</script>

<style scoped>

</style>
