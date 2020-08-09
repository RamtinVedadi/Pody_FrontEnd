<template>
    <keep-alive>
        <div>
            <v-btn v-show="$vuetify.breakpoint.mdAndUp"
                   fab
                   class='mr-4'
                   @click="PlayerBar = !PlayerBar">
                <v-icon color="primary" size="60px" style="z-index: 0" v-if="PlayerBar === true">
                    mdi-pause-circle
                </v-icon>
                <v-icon color="primary" size="60px" v-else>mdi-play-circle</v-icon>
            </v-btn>
            <v-btn v-show="$vuetify.breakpoint.smOnly"
                   fab
                   @click="PlayerBar = !PlayerBar"
                   width="30px"
                   height="30px"
            >

                <v-icon color="primary" size="35px" style="z-index: 0" v-if="PlayerBar === true">
                    mdi-pause-circle
                </v-icon>
                <v-icon color="primary" size="35px" v-else>mdi-play-circle</v-icon>
            </v-btn>
            <v-btn v-show="$vuetify.breakpoint.xsOnly"
                   fab
                   class='mr-0'
                   @click="PlayerBar = !PlayerBar"
                   width="35px"
                   height="35px"
            >

                <v-icon color="primary" size="43" style="z-index: 0" v-if="PlayerBar === true">
                    mdi-pause-circle
                </v-icon>

                <v-icon color="primary" size="43" v-else>mdi-play-circle</v-icon>
            </v-btn>

            <div v-if="PlayerBar === true">
                <div style='' class="play-bar">
                    <div class="ml-3 mr-3">
                        <vue-slider v-model="percentage" :process="true" :drag-on-click="true" tooltip="none"
                                    @click.native="setPosition()">

                        </vue-slider>
                    </div>

                    <div>
                        <v-avatar tile size="93" style="position: absolute;bottom: 0;left: 0;float: left">
                            <v-img
                                    src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                            >
                            </v-img>
                        </v-avatar>
                    </div>

                    <div>
                        <p style="text-align: right" class="mr-3">{{ currentTime }} / {{ duration }}</p>
                        <div style="text-align: center">
                            <v-btn icon class="ml-2" @click.native="playing ? pause() : play()" :disabled="!loaded">
                                <v-icon color="#fd6702" v-if="!playing || paused">
                                    mdi-play
                                </v-icon>
                                <v-icon color="#fd6702" v-else>mdi-pause</v-icon>
                            </v-btn>
                            <v-btn icon class="ml-2" color="teal" @click.native="stop()" :disabled="!loaded">
                                <v-icon color="#fd6702">mdi-stop</v-icon>
                            </v-btn>
                            <v-btn icon class="ml-2" color="teal" @click.native="mute()" :disabled="!loaded">
                                <v-icon color="#fd6702" v-if="!isMuted">mdi-volume-high</v-icon>
                                <v-icon color="#fd6702" v-else>mdi-volume-variant-off</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>
                <audio id="player" ref="player" v-on:ended="ended" v-on:canplay="canPlay" :src="file">

                </audio>
            </div>
            <div v-else>

            </div>
        </div>
    </keep-alive>
</template>

<script>
    import 'vue-slider-component/theme/default.css';

    const formatTime = second => new Date(second * 1000).toISOString().substr(11, 8);
    const STORAGE_KEY = 'todo_storage';
    export default {
        name: 'vuetify-audio',
        props: {
            file: {
                type: String,
                default: null
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            ended: {
                type: Function,
                default: () => {
                },
            },
            canPlay: {
                type: Function,
                default: () => {
                },
            },
        },
        computed: {
            duration: function () {
                return this.audio ? formatTime(this.totalDuration) : ''
            },
        },
        data() {
            return {
                PlayerBar: false,
                firstPlay: true,
                isMuted: false,
                loaded: false,
                playing: false,
                paused: false,
                percentage: 0.0,
                currentTime: '00:00:00',
                audio: undefined,
                totalDuration: 0,
                title: 'dbazicast',
                episode: 'episode 9',
                items: [
                    {icon: 'mdi-view-dashboard'},
                    {icon: 'mdi-image'},
                    {icon: 'mdi-help-box'},
                ],
            }
        },
        methods: {
            setPosition() {
                this.audio.currentTime = parseFloat(this.audio.duration / 100 * this.percentage);
            },
            stop() {
                this.paused = this.playing = false;
                this.audio.pause();
                this.audio.currentTime = 0
            },
            play(PlayerBar) {
                PlayerBar = this.playerBar;
                if (PlayerBar === true) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify('this is '))
                }
                if (this.playing) return;
                this.paused = false;
                // eslint-disable-next-line no-unused-vars
                this.audio.play().then(_ => this.playing = true)
            },
            pause() {
                this.paused = !this.paused;
                (this.paused) ? this.audio.pause() : this.audio.play()
            },
            mute() {
                this.isMuted = !this.isMuted;
                this.audio.muted = this.isMuted;
                this.volumeValue = this.isMuted ? 0 : 75
            },
            _handleLoaded: function () {
                if (this.audio.readyState >= 2) {
                    if (this.audio.duration === Infinity) {
                        // Fix duration for streamed audio source or blob based
                        this.audio.currentTime = 1e101;
                        this.audio.ontimeupdate = () => {
                            this.audio.ontimeupdate = () => {
                            };
                            this.audio.currentTime = 0;
                            this.totalDuration = parseInt(this.audio.duration);
                            this.loaded = true;
                        }
                    } else {
                        this.totalDuration = parseInt(this.audio.duration);
                        this.loaded = true
                    }
                    if (this.autoPlay) this.audio.play()
                } else {
                    throw new Error('Failed to load sound file')
                }
            },
            _handlePlayingUI: function () {
                this.percentage = this.audio.currentTime / this.audio.duration * 100;
                this.currentTime = formatTime(this.audio.currentTime)
            },
            _handlePlayPause: function (e) {
                if (e.type === 'play' && this.firstPlay) {
                    // in some situations, audio.currentTime is the end one on chrome
                    this.audio.currentTime = 0;
                    if (this.firstPlay) {
                        this.firstPlay = false;
                    }
                }
                if (e.type === 'pause' && this.paused === false && this.playing === false) {
                    this.currentTime = '00:00:00'
                }
            },
            _handleEnded() {
                this.paused = this.playing = false;
                this.init();
            },
            init: function () {
                this.audio.addEventListener('timeupdate', this._handlePlayingUI);
                this.audio.addEventListener('loadeddata', this._handleLoaded);
                this.audio.addEventListener('pause', this._handlePlayPause);
                this.audio.addEventListener('play', this._handlePlayPause);
                this.audio.addEventListener('ended', this._handleEnded);
            },
        },
        mounted() {
            this.audio = this.$refs.player;
        },


    }
</script>

<style>
    .play-bar {
        position: fixed;
        bottom: 0px;
        left: 17%;
        margin-bottom: 0px;
        width: 950px;
        background-color: white;
        height: 120px;
        z-index: 5;
        direction: ltr;
    }

    .v-slider--horizontal {
        margin-right: 1px;
    }

    input[type="range"] {

        width: 100%;
        -webkit-appearance: none; /*remove the line*/
        outline: none;
        /*background-color:cyan;*/
        border: 0; /*for firefox on android*/
        padding: 0 8px; /*for IE*/
        margin: 8px 0;
    }

    /*chrome and opera*/
    input[type="range"]::-webkit-slider-runnable-track {
        background: #fd6702; /*trackColor*/
        height: 3px; /*trackHeight*/
        border-radius: 2px; /*trackHeight*/
        transition: 0.3s;
    }

    input[type="range"]:hover::-webkit-slider-runnable-track,
    input[type="range"]:focus::-webkit-slider-runnable-track {
        background: #fd6702; /*activeTrackColor*/
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        position: relative;
        top: 3px;
        background: black; /*thumbColor*/
        width: 20px; /* thumbHeight + (2 x thumbBorderWidth)*/
        height: 20px; /* thumbHeight + (2 x thumbBorderWidth)*/
        border-radius: 70%;
        margin-top: -12px; /* -[thumbHeight + (2 x thumbBorderWidth) - trackHeight]/2*/
        cursor: pointer;
        border: 4px solid #fff; /*border-width should be equal to thumbBorderWidth if you want same border width across all browsers and border-color should match the background*/
        transition: 0.3s;
    }

    input[type="range"]:hover::-webkit-slider-thumb,
    input[type="range"]:focus::-webkit-slider-thumb {
        background: darkblue; /*activeThumbColor*/
    }
</style>
