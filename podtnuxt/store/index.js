import Vuex from "vuex";

const CreateStore = () => {
    return new Vuex.Store({
        state: {
            podcast: [{
                podcastTitle: "",
                podcastChannel: "",
                podcastImage: "",
                podcastLenght: null,
                podcastFile: "",
                podcastId: null,
                userId: null
            }],
            podcastMobile: [{
                podcastTitle: "",
                podcastChannel: "",
                podcastImage: "",
                podcastLenght: null,
                podcastFile: "",
                podcastId: null,
                userId: null
            }],
            isPlaying: {
                podcast: false,
            },
            mobileIsPlaying: {
                podcast: false,
            },
            user: [{
                userId: "",
                username: "",
                userTitle: "",
                userImage: "",
                isChannel: "",
            }],
            loginState: false,
        },
        getters: {
            podcastTitle: state => {
                return state.podcast.podcastTitle;
            },
            podcastChannel: state => {
                return state.podcast.podcastChannel;
            },
            podcastImage: state => {
                return state.podcast.podcastImage;
            },
            pocastLenght: state => {
                return state.podcast.podcastLenght;
            },
            podcastId: state => {
                return state.podcast.podcastId;
            },
            userId: state => {
                return state.podcast.userId;
            },
            allPodcast: state => {
                return state.podcast;
            },
            mobileAllPodcast: state => {
                return state.podcastMobile;
            },
            podcastIsPlaying: state => {
                return state.isPlaying;
            },
            mobilePodcastIsPlaying: state => {
                return state.mobileIsPlaying;
            },
            userLogin: state => {
                return state.loginState;
            },
        },
        mutations: {
            changePodcastTitle(state, pTitle) {
                state.podcast.podcastTitle = pTitle;
            },
            changePodcastChannel(state, pChannel) {
                state.podcast.podcastChannel = pChannel;
            },
            changePodcastImage(state, pImage) {
                state.podcast.podcastImage = pImage;
            },
            changePodcastLenght(state, pLenght) {
                state.podcast.podcastLenght = pLenght;
            },
        },
        actions: {}
    })
}

export default CreateStore
