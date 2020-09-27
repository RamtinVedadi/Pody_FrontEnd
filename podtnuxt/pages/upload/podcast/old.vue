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
    export default {
        name: "old"
    }
</script>

<style scoped>

</style>
