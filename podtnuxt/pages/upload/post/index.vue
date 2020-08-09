<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="fontMain">
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <v-row>
        <v-col cols="0"></v-col>
        <v-col cols="11">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">عنوان پست</v-stepper-step>
              <v-stepper-step :complete="e1 > 2" step="2">آپلود عکس پست</v-stepper-step>
              <v-stepper-step :complete="e1 > 3" step="3">انتشار</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12" color="lighten-1" flat>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="title" :counter="30" label="عنوان پست"
                                    required outlined clearable>
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea v-model="news" :counter="200" label="متن پست"
                                  required outlined clearable>
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-card>
                <v-btn color="primary" large @click="e1 = 2">مرحله بعد</v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card color="lighten-1" flat>
                  <v-row>
                    <v-col cols="6">
                      <v-file-input id="inpFile" accept="image/png, image/jpeg, image/bmp"
                                    placeholder="عکس پست را انتخاب کنید" prepend-icon="mdi-camera"
                                    label="عکس" show-size required>
                      </v-file-input>
                    </v-col>
                    <v-col cols="6">
                      <v-row justify="center">
                        <img id="imagePreview" width="150" height="150">
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
                <v-btn color="primary" @click="e1 = 3">انتشار</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12" color="lighten-1" height="300px">
                  <v-row>
                    <v-col cols="12" md="6" xs="2">
                      <v-file-input
                        id="inpFile"
                        :rules="rules"
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
                    </v-col>
                    <v-col cols="12" md="6" xs="2">
                      <v-file-input
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
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <div id="preview"
                           style="width: 150px;height: 150px;background-color: #9f9f9f">
                        <img id="postImagePreview">
                      </div>
                    </v-col>
                    <v-col cols="6">

                    </v-col>
                  </v-row>

                </v-card>

                <v-btn color="primary" @click="e1 = 4">آپلود پادکست</v-btn>
                <v-btn text @click="e1 = 2">بازگشت به مرحله قبل</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
        <v-col cols="0"></v-col>
      </v-row>
      <div style="height: 100px"></div>
    </div>
    <div v-show="$vuetify.breakpoint.xsOnly">
      <div class="mr-4 mt-5" style="width: 90%">
        <v-form>
          <div>
            <v-row>
              <v-text-field
                v-model="title"
                :counter="30"
                label="عنوان خبر"
                required
                outlined
                clearable
              >
              </v-text-field>
            </v-row>
            <v-row>
              <v-textarea v-model="news"
                          :counter="200"
                          label="متن خبر"
                          required
                          outlined
                          clearable
              >

              </v-textarea>
            </v-row>
            <v-row>
              <v-col cols="3">
                <img id="imagePreviewXS" width="70" height="70">
              </v-col>
              <v-col cols="8">
                <v-file-input
                  id="inpFileXS"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="عکس خبر را انتخاب کنید"
                  prepend-icon="mdi-camera"
                  label="عکس"
                  show-size
                  required

                >

                </v-file-input>
              </v-col>
            </v-row>
          </div>
          <br>
          <v-btn outlined rounded x-large width="92%" color="primary">
            انتشار
          </v-btn>
        </v-form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    layout: "pody",
    name: "UploadPost",
    data: () => ({
      e1: 1,
      testsss: [],
      item: {
        username: "bill gates",
        userImage: 'https://scontent-amt2-1.cdninstagram.com/v/t51.2885-19/s150x150/70382433_2452160645064619_8746038081771012096_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_ohc=7Thj_HAYz0gAX_d45bF&oh=d72d055be5642960e6faac88446a0bc3&oe=5EB773DE',
        podcastImage: '',
        userId: 11,
        title: "Time travel with vedved",
        shortDescription: "what gonna happen if we travel in time and kill hitler baby",
        podcastId: 1,
        viewCount: 1204,
        categoryId: 20,
        categoryIcon: 'mdi-alien'
      },
      icons: [
        {
          name: 'mdi-thumb-up'
        },
        {
          name: 'mdi-thumb-down'
        }
      ],
      title: '',
      news: '',
      newsImage: null,
    }),
    methods: {},
    mounted() {
      const inpFile = document.getElementById("inpFile");
      const previewImage = document.getElementById("imagePreview");
      inpFile.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();

          reader.addEventListener('load', function () {

            previewImage.setAttribute("src", this.result);
          });
          reader.readAsDataURL(file);
        } else {
          previewImage.setAttribute("src", "");
        }
      });

      const inpFIleXS = document.getElementById("inpFileXS");
      const previewImageXS = document.getElementById("imagePreviewXS");
      inpFIleXS.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();

          reader.addEventListener('load', function () {

            previewImageXS.setAttribute("src", this.result);
          });
          reader.readAsDataURL(file);
        } else {
          previewImageXS.setAttribute("src", "");
        }
      });
    },
    created() {
    },
    head() {
      return {
        title: "پادی | آپلود پست",
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/Styles/FontiranSans.css";
  @import "../../../assets/Styles/PageSizingStyle.css";
</style>
