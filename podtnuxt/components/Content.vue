<template>
    <div>
        <div v-if="this.$route.path==='/Login'">
            <Navbar_Visitor/>
        </div>
        <div v-else-if="this.$route.path==='/register'">
            <Navbar_Visitor/>
        </div>
        <div v-else-if="this.$route.path==='/forgot'">
            <Navbar_Visitor/>
        </div>
        <div v-else-if="this.$route.path==='/rssLogin'">
            <Navbar_Visitor/>
        </div>
        <div id="parent" v-else>
            <Navbar/>
            <SideNav/>
        </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar.vue";
    import SideNav from "./SideNav";
    import Navbar_Visitor from "./Navbar_Visitor";

    export default {
        name: "Content",
        data: () => {
            return {};
        },
        components: {
            Navbar_Visitor,
            SideNav,
            Navbar,
        }
    };
</script>
