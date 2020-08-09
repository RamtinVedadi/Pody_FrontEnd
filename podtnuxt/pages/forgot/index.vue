<template>
  <v-row class="forgotPassword fontMain">
    <v-col lg="3" md="1" sm="1" xs="0" xl="3"></v-col>
    <v-col lg="6" md="9" sm="10" xs="12" xl="6">
      <v-form>
        <v-card>
          <v-card-title class="justify-center">
            <v-row class="justify-center">
              <v-img v-show="$vuetify.breakpoint.mdAndUp" src="../../assets/logo.png" max-width="48px"
                     max-height="48px"></v-img>
              <v-img v-show="$vuetify.breakpoint.mdAndDown" src="../../assets/logo.png" max-width="30px"
                     max-height="30px"></v-img>
              <span v-show="$vuetify.breakpoint.mdAndUp" class="headline mx-1 title-text"
                    style="padding-right: 10px">بازیابی رمز عبور</span>
              <span v-show="$vuetify.breakpoint.mdAndDown" style="font-size: small ; padding-right: 5px"> بازیابی رمز عبور</span>
            </v-row>
          </v-card-title>
          <v-card-text class="subtitle-1" style="color: black;font-weight: 400">
            <v-row class="justify-center">
              ایمیل یا نام کاربری خود را وارد کنید.
            </v-row>
          </v-card-text>
          <v-container>
            <v-col cols="12">
              <v-text-field
                v-model="EmailOrUsername"
                label="نام کاربری یا ایمیل"
                name="username">
              </v-text-field>
            </v-col>
          </v-container>
          <v-card-actions>
            <v-btn xlarge depressed outlined rounded text
                   class="primary white--text ma-4" height="35"
                   @click="findAccount"
            >بازیابی کلمه عبور
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
    <v-col lg="3" md="2" sm="1" xs="0" xl="3"></v-col>

  </v-row>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "ForgetPassword",
    data: () => {
      return {
        EmailOrUsername: '',
      }
    },
    methods: {
      findAccount() {
        axios.post("http://localhost:8084/api/user/find/resetPassword", {value: this.EmailOrUsername}).then();
      }
    },
    head(){
      return{
        title:"پادی | تغییر کلمه عبور"
      }
    },
  }
</script>

<style scoped>
  @import "../../assets/Styles/FontiranSans.css";

  .forgotPassword {
    background: linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113));
    position: absolute;
    width: 105%;
    height: 100%;
  }

  .account-title {
    color: #656565;
    margin-bottom: 11px;
    letter-spacing: -.6px;
    font-size: 15px;
    font-size: 1.071rem;
    line-height: 1.467;
  }
</style>
