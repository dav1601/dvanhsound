<template language="html">
    <notifications position="top center" :speed="500" :duration="4000" />
    <v-layout class="rounded" v-scroll="scrollApp" id="dvs-layout-app">
        <!-- ANCHOR left sidebar --------------------------------- -->
        <v-navigation-drawer
            rounded
            :width="271"
            class="bg-[#121212]"
            :class="{ 'pt-16': activeScroll, 'py-2': !activeScroll }"
        >
            <!-- ANCHOR logo --------------------------------- -->
            <!-- ANCHOR list main --------------------------------- -->
            <router-link :to="{ name: 'Home' }" v-if="!activeScroll">
                <v-img
                    width="146"
                    height="44"
                    class="ml-8 mb-10"
                    :src="$getLogo()"
                ></v-img>
            </router-link>

            <sidebar-list
                v-for="(nav, index) in navList"
                :key="'sidebar-left-' + index"
                :list="nav.items"
                :id="nav.id"
                :subHeader="nav.subHeader"
            ></sidebar-list>
        </v-navigation-drawer>

        <!-- ANCHOR right sidebar --------------------------------- -->
        <v-app-bar
            id="dvs-app-bar"
            fixed
            class="!shadow-none !left-0 !w-full"
            :class="classAppBar"
        >
            <div class="h-full w-full flex justify-between items-center">
                <router-link :to="{ name: 'Home' }">
                    <v-img
                        width="146"
                        height="44"
                        class="ml-8"
                        :src="$getLogo()"
                    ></v-img>
                </router-link>
                <div
                    id="dvs-app-bar-content"
                    class="flex justify-between items-center"
                >
                    <div
                        class="bg-[#282828cc] flex justify-start items-center ml-8 w-[480px] relative border-solid border border-[rgba(255 , 255 ,255 , 0.15)] h-[40px] rounded-lg p-3 text-[#595656]"
                        id="dvs-search-box"
                    >
                        <v-icon icon="mdi-magnify mr-2"></v-icon>
                        <input
                            type="text"
                            class="flex-1 text-sm focus:!text-white focus:font-semibold"
                            placeholder="Tìm bài hát, nghệ sĩ, podcast..."
                        />
                    </div>
                </div>
            </div>

            <!-- <MainTopBar /> -->
        </v-app-bar>

        <!-- ANCHOR main app --------------------------------- -->

        <v-main
            style="min-height: 300px"
            id="dvs-main"
            :class="classMainContent"
            rounded
        >
            <div id="app-content" class="w-100 h-100">
                <!-- ANCHOR route-view-app --------------------------------- -->
                <router-view></router-view>
            </div>
        </v-main>
        <!-- ANCHOR now playing bar --------------------------------- -->
        <NowPlayingBar />
    </v-layout>
</template>
<script>
import { useDatabaseApp } from "@/stores/database";
import { storeToRefs } from "pinia";
import SidebarList from "@/components/SidebarList.vue";
import MainTopBar from "@/components/MainTopBar.vue";
import NowPlayingBar from "@/components/NowPlayingBar.vue";
import { useRoute } from "vue-router";
import { reactive, computed, watch, ref } from "vue";

export default {
    components: {
        SidebarList,
        NowPlayingBar,
        MainTopBar,
    },
    setup() {
        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////
        const route = useRoute();


        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////
        const initData = () => {
            return {
                scrollTop: 0,
            };
        };

        const stateReactive = reactive({ ...initData() });
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

        const activeScroll = computed(() => {
            stateReactive.scrollTop > 10;
        });
        // SECTION Store //////////////////////////////////////////////////////
        const useStore = useDatabaseApp();
        const { navList } = storeToRefs(useStore);
        const scrollApp = (e) => {
            stateReactive.scrollTop = document.getElementById("html").scrollTop;
        };
        return {
            navList: navList,
            scrollApp,
            classAppBar,
            activeScroll,
            classMainContent,
        };
    },
};
</script>
<style lang="scss">
#dvs-app-bar-content {
    width: calc(100vw - 271px - 12px);
}
.fixed-scroll {
    background: $dvs-black !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
    z-index: 2000 !important;
}
</style>
