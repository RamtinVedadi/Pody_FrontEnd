<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="fontMain">
    <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
         v-show="$vuetify.breakpoint.mdAndUp">
      <v-row>
        <v-col cols="0"></v-col>
        <v-col cols="11">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">اطلاعات بلاگ</v-stepper-step>
              <v-stepper-step :complete="e1 > 2" step="2">دسته بندی بلاگ</v-stepper-step>
              <v-stepper-step :complete="e1 > 2" step="3">آپلود عکس کاور بلاگ</v-stepper-step>
              <v-stepper-step :complete="e1 > 3" step="4">انتشار</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12" color="lighten-1" flat>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="title" :counter="30" label="عنوان بلاگ"
                                    required outlined clearable>
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea v-model="news" :counter="200" label="متن بلاگ"
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
                                    label="فایل پادکست" show-size
                                    outlined prepend-icon="mdi-paperclip">
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

              <v-stepper-content step="4">
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
                                    label="فایل پادکست" show-size
                                    outlined prepend-icon="mdi-paperclip">
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
                      <div id="previewa"
                           style="width: 150px;height: 150px;background-color: #9f9f9f">
                        <img id="postImagePreviewa">
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
    <div class="pageMdAndDown hidden-sm-only hidden-xs-only"
         v-show="$vuetify.breakpoint.mdAndDown || $vuetify.breakpoint.smAndDown || $vuetify.breakpoint.mdOnly">
    </div>
    <div class="pageXsOnlyAndMsOnly" v-show="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly">
    </div>
  </div>
</template>

<script>
  export default {
    layout: "pody",
    name: "UploadBlog",
    head() {
      return {
        title: "پادی | آپلود بلاگ"
      }
    },
  }
</script>

<style scoped>
  @import "../../../assets/Styles/PageSizingStyle.css";
  @import "../../../assets/Styles/FontiranSans.css";
</style>
