<template language="html">
    <v-layout class="rounded">
        <!-- ANCHOR left sidebar --------------------------------- -->
        <v-navigation-drawer rounded :width="271">
            <v-img
                width="146"
                height="44"
                class="ml-8 mt-9 mb-8"
                src="https://res.cloudinary.com/vanh-tech/image/upload/v1699732557/logo/dvanhsound-dark_olupb9.png"
            ></v-img>
            <!-- ANCHOR logo --------------------------------- -->
            <!-- ANCHOR list main --------------------------------- -->

            <sidebar-list
                v-for="(nav, index) in navList"
                :key="'sidebar-left-' + index"
                :list="nav.items"
                :id="nav.id"
                :subHeader="nav.subHeader"
            ></sidebar-list>
        </v-navigation-drawer>

        <!-- ANCHOR right sidebar --------------------------------- -->
        <v-navigation-drawer location="right" rounded width="300">
            <v-list> </v-list>
        </v-navigation-drawer>

        <!-- ANCHOR main app --------------------------------- -->

        <v-main style="min-height: 300px" rounded>
            <div id="app-content" class="w-100 h-100 p-8">
                   

                <MainTopBar />
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


export default {
    components: {
        SidebarList,
        NowPlayingBar,
        MainTopBar,
    },
    setup() {
        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////

        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////

        // SECTION Store //////////////////////////////////////////////////////
        const useStore = useDatabaseApp();
        const { navList } = storeToRefs(useStore);

         return {
            navList: navList,
         }
    },
};
</script>
<style lang="scss"></style>
