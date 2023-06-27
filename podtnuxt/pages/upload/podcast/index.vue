<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="fontMain">
        <!--PC Mode-->
        <div class="pageMdAndUp hidden-md-only hidden-md-and-down hidden-sm-and-down"
             v-show="$vuetify.breakpoint.mdAndUp">
            <div v-if="isLogin === false">
                <NotLogin/>
            </div>
            <div v-else>
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
                                        <v-text-field v-model="title"
                                                      :counter="60" label="عنوان پادکست"
                                                      required outlined clearable>
                                        </v-text-field>
                                        <!--:rules="[titleRules.error() , titleRules.error1()]"-->
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field v-model="seasonNumber" :counter="3"
                                                              label="شماره فصل" clearable outlined
                                                >
                                                    <!--:rules="[seasonRules.error()]"-->
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field v-model="episodeNumber" :counter="3"
                                                              label="شماره قسمت" outlined clearable
                                                >
                                                    <!--:rules="[episodeRules.error()]"-->
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
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
                                                <v-textarea v-model="description"
                                                            clearable outlined label="توضیحات کلی"
                                                ></v-textarea>
                                                <!--:rules="[descriptionRules.error()]"-->
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6" xs="2">
                                                <v-select v-model="selectedCategory" :items="category"
                                                          item-text="name" item-value="id"
                                                          prepend-icon="mdi-shape" menu-props="auto"
                                                          hide-details outlined label="دسته بندی" required
                                                          single-line
                                                ></v-select>
                                                <!--:rules="[selectedCategoryRules.error()]"-->
                                            </v-col>
                                            <v-col cols="12" md="6" xs="2">
                                                <v-select v-model="selectedSubCategory" :items="subCategory"
                                                          item-text="name" item-value="id"
                                                          prepend-icon="mdi-shape-plus" menu-props="auto"
                                                          hide-details outlined label="زیر دسته بندی"
                                                          v-on:click="loadSubCategory(selectedCategory)" required
                                                          single-line
                                                ></v-select>
                                                <!--:rules="[selectedSubCategoryRules.error()]"-->
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-btn color="primary" @click="goToStepThree">مرحله بعد</v-btn>
                                    <v-btn text @click="e1 = 1">بازگشت به مرحله قبل</v-btn>
                                </v-stepper-content>

                                <v-stepper-content step="3">
                                    <v-card class="mb-12" color="lighten-1" height="300px" flat>
                                        <v-row class="pb-0">
                                            <v-col class="pb-0" cols="12" md="6" xs="2">
                                                <h5 class="pr-9 pb-3 font-weight-light" style="color: #bebebe">در
                                                    صورتیکه این قسمت شما کاوری
                                                    ندارد عکس کانال
                                                    خود
                                                    را دوباره آپلود
                                                    کنید</h5>
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
                                            <v-col class="pb-0" cols="12" md="6" xs="2">
                                                <h5 class="pr-9 pb-3 font-weight-light" style="color: #bebebe">آپلود
                                                    فایل صوتی اجباری ست</h5>
                                                <v-file-input v-model="files" accept="audio/mp3"
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
                                        <v-row class="pr-9 pt-0">
                                            <v-col cols="6">
                                                <h6 class="pb-3 font-weight-medium">پیش نمایش عکس
                                                    انتخاب شده</h6>
                                                <div id="preview"
                                                     style="width: 150px;height: 150px;background-color: #ffffff">
                                                    <img id="imagePreview"/>
                                                </div>
                                            </v-col>
                                            <v-col cols="6">
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-btn color="primary" width="230" @click="goToStepFour">آپلود پادکست</v-btn>
                                </v-stepper-content>

                                <v-stepper-content step="4">
                                    <v-row>
                                        <v-col cols="3">
                                            <v-row justify="center">
                                                <h2>پیش نمایش پادکست</h2>
                                            </v-row>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-row>
                                                <v-col style="float: left" cols="6">
                                                    <h3>پیش نمایش حالت دسکتاپ و تبلت</h3>
                                                    <br>
                                                    <br>
                                                    <!--<CardPlayer :item="item" :title-count="titleCount"/>-->
                                                </v-col>
                                                <v-col style="float: left" cols="6">
                                                    <h3>پیش نمایش حالت موبایل</h3>
                                                    <br>
                                                    <!--<MobileCardPlayer :item="item"/>-->
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-btn color="primary" @click="publishPodcast">انتشار</v-btn>
                                            <v-btn text color="red" @click="cancelPublishing">انصراف</v-btn>
                                        </v-col>
                                        <v-col cols="12">
                                            <h4 class="font-weight-light">در صورت انتخاب گزینه انصراف پادکست شما در حالت
                                                منتشر نشده ذخیره میشود</h4>
                                        </v-col>
                                    </v-row>
                                </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </v-col>
                    <v-col cols="0"></v-col>
                </v-row>
                <div style="height: 100px;"></div>
                <Snackbar :snackbar="snackbarFlag" :snackbar-text="snackbarText"/>
            </div>
        </div>
        <!--<div v-show="$vuetify.breakpoint.xsOnly">-->
        <!--<div class="upload ml-5 mr-5 mt-1">-->
        <!--<v-stepper v-model="e1">-->
        <!--<v-stepper-header>-->
        <!--<v-stepper-step :complete="e1 > 1" step="1">عنوان پادکست</v-stepper-step>-->
        <!--<v-stepper-step :complete="e1 > 2" step="2">توضیحات پادکست</v-stepper-step>-->
        <!--<v-stepper-step :complete="e1 > 3" step="3">آپلود پادکست</v-stepper-step>-->
        <!--<v-stepper-step step="4">انتشار</v-stepper-step>-->
        <!--</v-stepper-header>-->
        <!--<v-stepper-items>-->
        <!--<v-stepper-content step="1">-->
        <!--<v-card outlined class="mb-12" color="lighten-1" height="300px">-->
        <!--<div style="width: 90%;alignment: center">-->
        <!--<v-text-field v-model="title" :counter="40"-->
        <!--:rules="titleRules"-->
        <!--label="عنوان پادکست"-->
        <!--required-->
        <!--outlined-->
        <!--clearable-->
        <!--&gt;-->
        <!--</v-text-field>-->
        <!--<v-row>-->
        <!--<v-col cols="12" md="6">-->
        <!--<v-text-field v-model="seasonNumber"-->
        <!--:counter="3"-->
        <!--label="شماره فصل"-->
        <!--clearable03-->
        <!--outlined-->
        <!--&gt;-->
        <!--</v-text-field>-->
        <!--</v-col>-->
        <!--<v-col cols="12" md="6">-->
        <!--<v-text-field v-model="episodeNumber"-->
        <!--:counter="3"-->
        <!--label="شماره قسمت"-->
        <!--outlined-->
        <!--clearable-->
        <!--&gt;-->
        <!--</v-text-field>-->
        <!--</v-col>-->
        <!--</v-row>-->
        <!--</div>-->
        <!--</v-card>-->
        <!--<v-btn small color="primary" @click="e1 = 2">مرحله بعد</v-btn>-->
        <!--</v-stepper-content>-->

        <!--<v-stepper-content step="2">-->
        <!--<v-card outlined class="mb-12" color="lighten-1" min-height="300px">-->
        <!--<v-row>-->
        <!--<v-col cols="12" md="6" xs="2">-->
        <!--<v-textarea-->
        <!--v-model="shortDescription"-->
        <!--autoGrow-->
        <!--clearable-->
        <!--:counter="150"-->
        <!--outlined-->
        <!--label="توضیحات مختصر"-->
        <!--&gt;</v-textarea>-->
        <!--</v-col>-->
        <!--<v-col cols="12" md="6" xs="2">-->
        <!--<v-textarea-->
        <!--v-model="description"-->
        <!--autoGrow-->
        <!--clearable-->
        <!--outlined-->
        <!--label="توضیحات کلی"-->
        <!--&gt;</v-textarea>-->
        <!--</v-col>-->
        <!--</v-row>-->
        <!--<v-row class="mr-1">-->
        <!--<v-col cols="10">-->
        <!--<v-select-->
        <!--v-model="selectedCategory"-->
        <!--:items="category"-->
        <!--item-text="name"-->
        <!--item-value="id"-->
        <!--prepend-icon="mdi-shape"-->
        <!--menu-props="auto"-->
        <!--hide-details-->
        <!--outlined-->
        <!--label="دسته بندی"-->
        <!--single-line-->
        <!--&gt;</v-select>-->
        <!--</v-col>-->
        <!--<v-col cols="10">-->
        <!--<v-select-->
        <!--v-model="selectedSubCategory"-->
        <!--:items="subCategory"-->
        <!--item-text="name"-->
        <!--item-value="id"-->
        <!--prepend-icon="mdi-shape-plus"-->
        <!--menu-props="auto"-->
        <!--hide-details-->
        <!--outlined-->
        <!--label="زیر دسته بندی"-->
        <!--single-line-->
        <!--&gt;</v-select>-->
        <!--</v-col>-->
        <!--</v-row>-->
        <!--</v-card>-->
        <!--<v-btn small color="primary" @click="podcastDetailPost" v-on:click="e1=3">مرحله بعد</v-btn>-->
        <!--<v-btn small text @click="e1 = 1">بازگشت به مرحله قبل</v-btn>-->
        <!--<v-row style="height: 70px"></v-row>-->
        <!--</v-stepper-content>-->

        <!--<v-stepper-content step="3">-->
        <!--<v-card outlined class="mb-12" color="lighten-1" height="300px">-->
        <!--<v-row class="mr-1 mt-2" style="width: 90%">-->
        <!--<v-file-input-->
        <!--id="inpFile"-->
        <!--accept="image/png, image/jpeg, image/bmp"-->
        <!--placeholder="عکس پادکست را انتخاب کنید"-->
        <!--prepend-icon="mdi-camera"-->
        <!--label="عکس"-->
        <!--show-size-->
        <!--required-->
        <!--outlined-->
        <!--v-model="podcastImage"-->
        <!--@change="onFileChange"-->
        <!--&gt;-->
        <!--<template v-slot:selection="{ text }">-->
        <!--<v-chip-->
        <!--small-->
        <!--label-->
        <!--color="primary"-->
        <!--@change="onFileChange"-->
        <!--&gt;-->
        <!--{{ text }}-->
        <!--</v-chip>-->
        <!--</template>-->
        <!--</v-file-input>-->
        <!--<br>-->
        <!--<h5>در صورتیکه این قسمت شما کاوری ندارد عکس کانال خود را دوباره آپلود کنید</h5>-->
        <!--</v-row>-->
        <!--<v-row class="mr-1 mt-1 justify-center" style="width: 90%">-->
        <!--<div id="previewXS" style="width: 80px;height: 80px;background-color: #9f9f9f">-->
        <!--<img id="imagePreviewXS">-->
        <!--</div>-->
        <!--</v-row>-->
        <!--<v-divider class="mt-2"></v-divider>-->
        <!--<v-row class="mr-1 mt-4" style="width: 90%;">-->
        <!--<v-file-input-->
        <!--style="font-size: 15px"-->
        <!--v-model="files"-->
        <!--placeholder="فایل پادکست خود را انتخاب کنید"-->
        <!--label="فایل پادکست"-->
        <!--show-size-->
        <!--outlined-->
        <!--prepend-icon="mdi-paperclip"-->
        <!--&gt;-->
        <!--<template v-slot:selection="{ text }">-->
        <!--<v-chip-->
        <!--small-->
        <!--label-->
        <!--color="primary"-->
        <!--&gt;-->
        <!--{{ text }}-->
        <!--</v-chip>-->
        <!--</template>-->
        <!--</v-file-input>-->
        <!--<h5>آپلود فایل صوتی اجباری ست</h5>-->
        <!--</v-row>-->
        <!--</v-card>-->

        <!--<v-btn small color="primary" @click="e1 = 4">آپلود پادکست</v-btn>-->
        <!--</v-stepper-content>-->

        <!--<v-stepper-content step="4">-->
        <!--<div style="height: 300px">-->
        <!--<v-row style="width: 90%">-->
        <!--<h2 class="mt-1 mr-4">پیش نمایش پادکست</h2>-->
        <!--</v-row>-->
        <!--</div>-->

        <!--<v-btn small color="primary" @click="e1 = 1">انتشار</v-btn>-->
        <!--<v-btn small text @click="e1 = 3">بازگشت به مرحله قبل</v-btn>-->
        <!--<v-btn small style="color:white;background-color: red">انصراف</v-btn>-->
        <!--</v-stepper-content>-->
        <!--</v-stepper-items>-->
        <!--</v-stepper>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import MobileCardPlayer from "../../../components/cards/MobileCardPlayer";
    import CardPlayer from "../../../components/cards/CardPlayer";
    import NotLogin from "../../../components/errors/NotLogin";
    import Snackbar from "../../../components/tools/Snackbar";
    import axios from 'axios';

    export default {
        layout: "pody",
        name: "UploadPodcast",
        components: {Snackbar, NotLogin, MobileCardPlayer, CardPlayer},
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
                titleCount: 18,
                url: '',
                category: [],
                subCategory: [],
                errors: [],
                podcastId: null,
                files: null,
                isLogin: false,
                snackbarFlag: false,
                snackbarText: '',
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
                    if (isNaN(this.seasonNumber) === true) {
                        this.seasonNumberErrorMessage = 'باید برای انتقال به مرحله بعد باید فیلد شماره فصل عددی باشد.';
                        return
                    }
                    if (isNaN(this.episodeNumber) === true) {
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
                if (this.podcastImage != null) {
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
                } else {
                    formData.append('audio', this.files);
                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    };
                    axios.post("http://localhost:8084/api/podcast/" + this.podcastId + "/user/" + this.$store.state.user[0].userId + "/upload", formData, config).then((response) => {
                        this.item = response.data;
                        this.e1 = 4;
                    });
                }
            },
            publishPodcast() {
                axios.post("http://localhost:8084/api/podcast/0/publish/update", {id: this.item.podcastId}).then(response => {
                    if (response.status === 200) {
                        if (response.data.message === 'SUCCESSFUL') {
                            this.snackbarFlag = true;
                            this.snackbarText = 'اپیزود شما با موفقیت ثبت شد :)';
                            this.$router.push("/myPodcasts");
                        } else {
                            this.snackbarFlag = true;
                            this.snackbarText = 'اپیزود شما با موفقیت ثبت شد :)';
                        }
                    }
                });
            },
            cancelPublishing() {
                this.$router.push('/');
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
                console.log("i am here")
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
            // const inpFile = document.getElementById("inpFile");
            // const previewImage = document.getElementById("imagePreview");
            // const mainPreviewImage = document.getElementById('mainPreviewImage');
            // inpFile.addEventListener('change', function () {
            //     const file = this.files[0];
            //     if (file) {
            //         const reader = new FileReader();
            //
            //         reader.addEventListener('load', function () {
            //             previewImage.setAttribute("src", this.result);
            //             mainPreviewImage.setAttribute("src", this.result);
            //         });
            //         reader.readAsDataURL(file);
            //     } else {
            //         previewImage.setAttribute("src", "");
            //     }
            // });
            if (this.$store.getters.userLogin === true) {
                this.isLogin = true;
            }
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
