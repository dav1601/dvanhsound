<template>
    <notifications position="top center" :speed="500" :duration="4000" />
    <v-layout class="rounded" v-scroll="scrollApp" id="dvs-layout-app">
        <!-- ANCHOR left sidebar --------------------------------- -->
        <v-navigation-drawer
            rounded
            :width="271"
            class="bg-[#121212]"
            :class="{ 'pt-16': activeScroll, 'py-2': !activeScroll }"
            id="nav-drawer-left"
            v-if="!hiddenAllNav"
        >
            <div
                class="h-full flex flex-col justify-start items-start mx-2 overflow-hidden"
            >
                <!-- ANCHOR logo --------------------------------- -->
                <!-- ANCHOR list main --------------------------------- -->
                <router-link :to="{ name: 'Home' }" v-if="!activeScroll">
                    <v-img
                        width="146"
                        height="44"
                        class="ml-8 mb-2"
                        :src="$getLogo()"
                    ></v-img>
                </router-link>

                <!-- ANCHOR items library --------------------------------- -->

                <v-list class="nav-left mb-1 w-full flex-shrink-1 h-[10%]">
                    <left-item
                        icon="mdi-home"
                        :to="{ name: 'Home' }"
                        :active="
                            $route.matched.some(({ name }) => name === 'Home')
                        "
                    >
                        <div class="flex justify-start align-center">
                            <v-icon icon="mdi-home" class="icon"></v-icon>
                            <v-list-item-title
                                class="ml-4 mt-1 name truncate capitalize font-normal"
                            >
                                Home
                            </v-list-item-title>
                        </div>
                    </left-item>
                </v-list>
                <!-- divider -->
                <v-divider
                    class="mb-2 w-full flex-shrink-1 h-[10%]"
                ></v-divider>
                <!-- sidebar playlist -->
                <SidebarPlaylist />
                <!-- list playlist -->
            </div>
        </v-navigation-drawer>

        <!-- ANCHOR right sidebar --------------------------------- -->
        <v-app-bar
            id="dvs-app-bar"
            fixed
            class="!shadow-none !left-0 !w-full z-50"
            :class="classAppBar"
            v-if="!hiddenAllNav"
        >
            <AppBarContent />
            <!-- <MainTopBar /> -->
        </v-app-bar>

        <!-- ANCHOR main app --------------------------------- -->

        <v-main
            style="min-height: 300px"
            :class="classMainContent"
            id="dvs-main"
            rounded
        >
            <div id="app-content" class="w-100 h-100">
                <!-- ANCHOR route-view-app --------------------------------- -->
                <router-view></router-view>
            </div>
        </v-main>
        <!-- ANCHOR now playing bar --------------------------------- -->
        <NowPlayingBar v-if="!hiddenAllNav" />
    </v-layout>
</template>
<script>
import SidebarList from "@/components/SidebarList.vue";
import MainTopBar from "@/components/MainTopBar.vue";
import NowPlayingBar from "@/components/NowPlayingBar.vue";
import AppBarContent from "@/components/layouts/AppBarContent.vue";
import LeftItem from "@/components/layouts/sidebar/LeftItem.vue";
import SidebarPlaylist from "./components/playlist/SidebarPlaylist.vue";
import { useRoute } from "vue-router";
import { reactive, computed, toRef } from "vue";
import { useUsers } from "./stores/Users";
export default {
    components: {
        SidebarList,
        NowPlayingBar,
        MainTopBar,
        AppBarContent,
        LeftItem,
        SidebarPlaylist,
    },
    setup() {
        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////
        const route = useRoute();

        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////
        const initData = () => {
            return {
                scrollTop: 0,
                items: [
                    { text: "My Files", icon: "mdi-folder" },
                    { text: "Shared with me", icon: "mdi-account-multiple" },
                    { text: "Starred", icon: "mdi-star" },
                    { text: "Recent", icon: "mdi-history" },
                    { text: "Offline", icon: "mdi-check-circle" },
                    { text: "Uploads", icon: "mdi-upload" },
                    { text: "Backups", icon: "mdi-cloud-upload" },
                ],
            };
        };

        const stateReactive = reactive({ ...initData() });
        const storeUsers = useUsers();
        storeUsers.syncPlaylist();
        const classAppBar = computed(() => {
            if (stateReactive.scrollTop > 10) {
                return "fixed-scroll";
            }
            return "!bg-transparent";
        });
        const classMainContent = computed(() => {
            if (route.name === "Playlist" || route.name === "Track")
                return "pt-0";
            return "";
        });
        const hiddenAllNav = computed(() => {
            return route.name === "Login" || route.name === "Register";
        });

        const activeScroll = computed(() => {
            stateReactive.scrollTop > 10;
        });
        // SECTION Store //////////////////////////////////////////////////////

        const scrollApp = (e) => {
            stateReactive.scrollTop = document.getElementById("html").scrollTop;
        };
        return {
            scrollApp,
            classAppBar,
            activeScroll,
            classMainContent,
            state: toRef(stateReactive),
            hiddenAllNav,
        };
    },
};
</script>
<style lang="scss">
#dvs-app-bar-content {
    width: calc(100vw - 271px - 12px);
}
#dvs-app-bar {
    background: transparent;
    transition: background 0.25s ease-in-out;
}
.fixed-scroll {
    background: $dvs-black !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
    z-index: 2000 !important;
}
#nav-drawer-left {
    padding-bottom: $heightBarBottom !important;
}
</style>
