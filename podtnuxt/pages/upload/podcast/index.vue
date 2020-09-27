<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="fontMain">
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <v-row>
        <v-col cols="0"></v-col>
        <v-col cols="11">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">عنوان پادکست</v-stepper-step>
              <v-stepper-step :complete="e1 > 2" step="2">توضیحات پادکست</v-stepper-step>
              <v-stepper-step :complete="e1 > 3" step="3">آپلود پادکست</v-stepper-step>
              <v-stepper-step step="4">انتشار</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12" color="lighten-1" flat>
                  <div>
                    <v-text-field v-model="title"
                                  :rules="[titleRules.error() , titleRules.error1()]"
                                  :counter="60" label="عنوان پادکست"
                                  required outlined clearable>
                    </v-text-field>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="seasonNumber" :counter="3"
                                      :rules="[seasonRules.error()]"
                                      label="شماره فصل" clearable outlined
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="episodeNumber" :counter="3"
                                      :rules="[episodeRules.error()]"
                                      label="شماره قسمت" outlined clearable
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
                <v-btn color="primary" large @click="goToStepTwo">مرحله بعد</v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card class="mb-12" color="lighten-1" flat>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="shortDescription"
                                  clearable :counter="150" outlined
                                  label="توضیحات مختصر"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="description" :rules="[descriptionRules.error()]"
                                  clearable outlined label="توضیحات کلی"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6" xs="2">
                      <v-select v-model="selectedCategory" :items="category"
                                item-text="name" item-value="id"
                                prepend-icon="mdi-shape" menu-props="auto"
                                hide-details outlined label="دسته بندی" required
                                single-line :rules="[selectedCategoryRules.error()]"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" xs="2">
                      <v-select v-model="selectedSubCategory" :items="subCategory"
                                item-text="name" item-value="id"
                                prepend-icon="mdi-shape-plus" menu-props="auto"
                                hide-details outlined label="زیر دسته بندی"
                                v-on:click="loadSubCategory" required
                                single-line :rules="[selectedSubCategoryRules.error()]"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card>
                <v-btn color="primary" @click="goToStepThree">مرحله بعد</v-btn>
                <v-btn text @click="e1 = 1">بازگشت به مرحله قبل</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12" color="lighten-1" height="300px">
                  <v-row>
                    <v-col cols="12" md="6" xs="2">
                      <v-file-input id="inpFile"
                                    accept="image/png, image/jpeg, image/bmp"
                                    placeholder="عکس پادکست را انتخاب کنید"
                                    prepend-icon="mdi-camera" label="عکس"
                                    show-size required outlined
                                    v-model="podcastImage" @change="onFileChange">
                        <template v-slot:selection="{ text }">
                          <v-chip small label color="primary"
                                  @change="onFileChange">
                            {{ text }}
                          </v-chip>
                        </template>
                      </v-file-input>
                    </v-col>
                    <v-col cols="12" md="6" xs="2">
                      <v-file-input v-model="files"
                                    placeholder="فایل پادکست خود را انتخاب کنید"
                                    label="فایل پادکست" show-size outlined
                                    prepend-icon="mdi-paperclip">
                        <template v-slot:selection="{ text }">
                          <v-chip small label color="primary">
                            {{ text }}
                          </v-chip>
                        </template>
                      </v-file-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <div id="preview"
                           style="width: 150px;height: 150px;background-color: #9f9f9f">
                        <img id="imagePreview">
                      </div>
                    </v-col>
                    <v-col cols="6">
                    </v-col>
                  </v-row>
                </v-card>
                <v-btn color="primary" @click="goToStepFour">آپلود پادکست</v-btn>
                <v-btn text @click="e1 = 2">بازگشت به مرحله قبل</v-btn>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-row>
                  <v-row>
                    <h2>پیش نمایش پادکست</h2>
                  </v-row>
                  <v-row>
                    <v-col style="float: left" cols="6">
                      <h3>پیش نمایش حالت دسکتاپ</h3>
<!--                      <CardPlayer :item="item" title-count="18"/>-->
                    </v-col>
                    <v-col style="float: left" cols="6">
                      <h3>پیش نمایش حالت موبایل</h3>
<!--                      <MobileCardPlayer :item="item"/>-->
                    </v-col>
                  </v-row>
                </v-row>
                <v-btn color="primary" @click="e1 = 1">انتشار</v-btn>
                <v-btn text @click="e1 = 3">بازگشت به مرحله قبل</v-btn>
                <v-btn text color="blue">انصراف</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
        <v-col cols="0"></v-col>
      </v-row>
      <div style="height: 100px;"></div>
    </div>
    <div v-show="$vuetify.breakpoint.xsOnly">
      <div class="upload ml-5 mr-5 mt-1">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">عنوان پادکست</v-stepper-step>
            <v-stepper-step :complete="e1 > 2" step="2">توضیحات پادکست</v-stepper-step>
            <v-stepper-step :complete="e1 > 3" step="3">آپلود پادکست</v-stepper-step>
            <v-stepper-step step="4">انتشار</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card outlined class="mb-12" color="lighten-1" height="300px">
                <div style="width: 90%;alignment: center">
                  <v-text-field v-model="title" :counter="40"
                                :rules="titleRules"
                                label="عنوان پادکست"
                                required
                                outlined
                                clearable
                  >
                  </v-text-field>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="seasonNumber"
                                    :counter="3"
                                    label="شماره فصل"
                                    clearable03
                                    outlined
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="episodeNumber"
                                    :counter="3"
                                    label="شماره قسمت"
                                    outlined
                                    clearable
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
              <v-btn small color="primary" @click="e1 = 2">مرحله بعد</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card outlined class="mb-12" color="lighten-1" min-height="300px">
                <v-row>
                  <v-col cols="12" md="6" xs="2">
                    <v-textarea
                      v-model="shortDescription"
                      autoGrow
                      clearable
                      :counter="150"
                      outlined
                      label="توضیحات مختصر"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="6" xs="2">
                    <v-textarea
                      v-model="description"
                      autoGrow
                      clearable
                      outlined
                      label="توضیحات کلی"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row class="mr-1">
                  <v-col cols="10">
                    <v-select
                      v-model="selectedCategory"
                      :items="category"
                      item-text="name"
                      item-value="id"
                      prepend-icon="mdi-shape"
                      menu-props="auto"
                      hide-details
                      outlined
                      label="دسته بندی"
                      single-line
                    ></v-select>
                  </v-col>
                  <v-col cols="10">
                    <v-select
                      v-model="selectedSubCategory"
                      :items="subCategory"
                      item-text="name"
                      item-value="id"
                      prepend-icon="mdi-shape-plus"
                      menu-props="auto"
                      hide-details
                      outlined
                      label="زیر دسته بندی"
                      single-line
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card>
              <v-btn small color="primary" @click="podcastDetailPost" v-on:click="e1=3">مرحله بعد</v-btn>
              <v-btn small text @click="e1 = 1">بازگشت به مرحله قبل</v-btn>
              <v-row style="height: 70px"></v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card outlined class="mb-12" color="lighten-1" height="300px">
                <v-row class="mr-1 mt-2" style="width: 90%">
                  <v-file-input
                    id="inpFile"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="عکس پادکست را انتخاب کنید"
                    prepend-icon="mdi-camera"
                    label="عکس"
                    show-size
                    required
                    outlined
                    v-model="podcastImage"
                    @change="onFileChange"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                        small
                        label
                        color="primary"
                        @change="onFileChange"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </v-row>
                <v-row class="mr-1 mt-1 justify-center" style="width: 90%">
                  <div id="previewXS" style="width: 80px;height: 80px;background-color: #9f9f9f">
                    <img id="imagePreviewXS">
                  </div>
                </v-row>
                <v-divider class="mt-2"></v-divider>
                <v-row class="mr-1 mt-4" style="width: 90%;">
                  <v-file-input
                    style="font-size: 15px"
                    v-model="files"
                    placeholder="فایل پادکست خود را انتخاب کنید"
                    label="فایل پادکست"
                    show-size
                    outlined
                    prepend-icon="mdi-paperclip"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                        small
                        label
                        color="primary"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </v-row>

              </v-card>

              <v-btn small color="primary" @click="e1 = 4">آپلود پادکست</v-btn>
              <v-btn small text @click="e1 = 2">بازگشت به مرحله قبل</v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <div style="height: 300px">
                <v-row style="width: 90%">
                  <h2 class="mt-1 mr-4">پیش نمایش پادکست</h2>
                </v-row>
              </div>

              <v-btn small color="primary" @click="e1 = 1">انتشار</v-btn>
              <v-btn small text @click="e1 = 3">بازگشت به مرحله قبل</v-btn>
              <v-btn small style="color:white;background-color: red">انصراف</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileCardPlayer from "../../../components/cards/MobileCardPlayer";
  import CardPlayer from "../../../components/cards/CardPlayer";
  import axios from 'axios';

  export default {
    layout: "pody",
    name: "UploadPodcast",
    components: {MobileCardPlayer, CardPlayer},
    data() {
      return {
        e1: 1,
        item: {},
        title: '',
        seasonNumber: null,
        episodeNumber: null,
        description: '',
        shortDescription: '',
        podcastImage: null,
        mainPreviewImage: null,
        selectedCategory: null,
        selectedSubCategory: null,
        titleErrorMessage: '',
        episodeNumberErrorMessage: '',
        seasonNumberErrorMessage: '',
        descriptionErrorMessage: '',
        selectedCategoryErrorMessage: '',
        selectedSubCategoryErrorMessage: '',
        viewCount: 0,
        titleRules: {
          error: v => !!v || this.titleErrorMessage,
          error1: v => (v && v.length > 0) || '',
        },
        episodeRules: {
          error: v => !!v || this.episodeNumberErrorMessage,
        },
        seasonRules: {
          error: v => !!v || this.seasonNumberErrorMessage,
        },
        descriptionRules: {
          error: v => !!v || this.descriptionErrorMessage,
        },
        selectedCategoryRules: {
          error: v => !!v || this.selectedCategoryErrorMessage,
        },
        selectedSubCategoryRules: {
          error: v => !!v || this.selectedSubCategoryErrorMessage,
        },
        url: '',
        category: [],
        subCategory: [],
        errors: [],
        podcastId: null,
        files: null,
      }
    },
    methods: {
      goToStepTwo() {
        if (this.title === '') {
          this.titleErrorMessage = 'برای ادامه دادن در مراحل آینده نیاز به وارد کردن عنوان است.';
          return;
        } else if (this.title.length > 60) {
          this.titleErrorMessage = 'عنوان باید کمتر از 60 کاراکتر باشد.';
          return;
        } else if (this.title.length > 0) {
          this.titleErrorMessage = '';
        }

        if (this.seasonNumber != null || this.episodeNumber != null) {
          if (typeof this.seasonNumber != 'number') {
            this.seasonNumberErrorMessage = 'باید برای انتقال به مرحله بعد باید فیلد شماره فصل عددی باشد.';
            return
          }
          if (typeof this.episodeNumber != 'number') {
            this.episodeNumberErrorMessage = 'باید برای انتقال به مرحله بعد باید فیلد شماره قسمت عددی باشد.';
            return
          }
        }
        this.e1 = 2
      },
      goToStepThree() {
        if (this.description === '') {
          this.descriptionErrorMessage = 'وارد کردن اطلاعات تکمیلی قسمت الزامی می باشد';
          return;
        }
        if (this.selectedCategory == null) {
          this.selectedCategoryErrorMessage = 'لطفا دسته بندی را انتخاب کنید.';
          return;
        }
        this.podcastDetailPost();
      },
      goToStepFour() {
        const formData = new FormData();
        formData.append('image', this.podcastImage);
        formData.append('audio', this.files);
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        axios.post("http://localhost:8084/api/podcast/" + this.podcastId + "/upload", formData, config).then((response) => {
          this.item = response.data;
          this.e1 = 4;
        });
      },
      onFileChange(e) {
        //const file = e.target.files || e.dataTransfer.files;
        //this.createImg(file[0]);
        const file = e.target.files[0];
        this.previewImage = URL.createObjectURL(file);
      },
      createImg(file) {
        //var image = new Image;
        var reader = new FileReader;

        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file)
      },
      loadSubCategory(e) {
        axios.get('http://localhost:8084/api/category/list/' + e + '/children')
          .then(response => {
            this.subCategory = response.data;
          }).catch(e => {
          this.errors.push(e);
        });
      },
      podcastDetailPost() {
        axios.post('http://localhost:8084/api/podcast/create', {
          podcast: {
            title: this.title,
            episodeNumber: this.episodeNumber,
            seasonNumber: this.seasonNumber,
            description: this.description,
            shortDescription: this.shortDescription,
            user: {
              id: this.$store.state.user[0].userId
            }
          },
          podcastCategory: {
            category: {
              id: this.selectedCategory
            },
            subCategory: {
              id: this.selectedSubCategory
            }
          }
        }).then(response => {
          const result = response.data;
          if (result.message === 'SUCCESSFUL') {
            this.podcastId = result.podcastId;
            this.e1 = 3;
          }
        }).catch(e => {
          alert(e)
        });
      }
    },
    mounted() {
      const inpFile = document.getElementById("inpFile");
      const previewImage = document.getElementById("imagePreview");
      const mainPreviewImage = document.getElementById('mainPreviewImage')
      inpFile.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();

          reader.addEventListener('load', function () {
            previewImage.setAttribute("src", this.result);
            mainPreviewImage.setAttribute("src", this.result);

          });
          reader.readAsDataURL(file);
        } else {
          previewImage.setAttribute("src", "");
        }
      });
    },
    created() {
      axios.get('http://localhost:8084/api/category/list/parents')
        .then(response => {
          this.category = response.data;
        }).catch(e => {
        this.errors.push(e);
      });
    },
    head() {
      return {
        title: "پادی | آپلود پادکست",
      }
    },
  }
</script>

<style scoped>
  @import "../../../assets/Styles/FontiranSans.css";
  @import "../../../assets/Styles/PageSizingStyle.css";

  #preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #preview img {
    max-width: 100%;
    max-height: 500px;
  }
</style>
