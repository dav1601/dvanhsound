<template>
    <notifications position="top center" :speed="500" :duration="4000" />
    <v-progress-linear
        color="#1db954"
        indeterminate
        :height="4"
        class="fixed top-0 left-0 w-full z-[50000]"
        v-if="routerLoading"
    ></v-progress-linear>
    <PlayerPage v-if="!inRoom" />
    <v-layout class="rounded" v-scroll="scrollApp" id="dvs-layout-app">
        <!-- ANCHOR left sidebar --------------------------------- -->
        <v-navigation-drawer
            rounded
            :width="240"
            class="bg-[#121212]"
            :class="{ 'pt-16': activeScroll, 'py-2': !activeScroll }"
            id="nav-drawer-left"
            v-model="state.showDrawer"
            :disable-resize-watcher="true"
            :disable-route-watcher="true"
            :expand-on-hover="false"
            :mobile-breakpoint="0"
            :permanent="permanent"
            v-if="!hiddenAllNav"
        >
            <div
                class="h-full flex flex-col justify-start items-start mx-2 overflow-hidden"
                v-if="!inRoom"
            >
                <router-link
                    :to="{ name: 'Home' }"
                    v-if="!activeScroll"
                    :class="{ invisible: showPlayerPage }"
                >
                    <v-img
                        width="146"
                        height="44"
                        class="ml-8 mb-2"
                        :src="$getLogo()"
                    ></v-img>
                </router-link>

                <!-- ANCHOR items library --------------------------------- -->

                <v-list
                    class="nav-left mb-1 w-full flex-shrink-1 max-h-[25%] hidden lg:block"
                >
                    <list-item
                        v-for="item in state.navItems"
                        :title="item.title"
                        :to="{ name: item.name }"
                        :key="item"
                        :icon="item.icon"
                        :isActive="
                            $route.matched.some(
                                ({ name }) => name === item.name
                            )
                        "
                    >
                    </list-item>
                </v-list>
                <!-- divider -->
                <v-divider
                    class="mb-2 w-full flex-shrink-1 h-[10%]"
                ></v-divider>
                <!-- ANCHOR sidebar playlist -->
                <SidebarPlaylist />
                <!-- list playlist -->
            </div>
            <!-- ROOM MUSIC CONTENT -->
            <SbRoom v-else />
        </v-navigation-drawer>

        <!-- ANCHOR right sidebar --------------------------------- -->
        <v-app-bar
            id="dvs-app-bar"
            fixed
            class="!shadow-none !left-0 !w-full z-50"
            :class="classAppBar"
            v-if="!hiddenAllNav"
        >
            <AppBarContent
                @toggle-nav="toggleDrawer"
                :showSearch="state.showSearch"
            />
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
        <NowPlayingBar
            v-show="!hiddenAllNav && hasSong"
            :showVolume="state.showVol"
            @toggle-vol="toggleVol"
        />
    </v-layout>
</template>
<script>
import SidebarList from "@/components/SidebarList.vue";
import MainTopBar from "@/components/MainTopBar.vue";
import NowPlayingBar from "@/components/NowPlayingBar.vue";
import AppBarContent from "@/components/layouts/AppBarContent.vue";
import LeftItem from "@/components/layouts/sidebar/LeftItem.vue";
import SidebarPlaylist from "@/components/playlist/SidebarPlaylist.vue";
import PlayerPage from "@/components/app/PlayerPage.vue";
import ListItem from "@/components/app/ListItem.vue";
import SbRoom from "@/components/layouts/SbRoom.vue";
import { useRoute } from "vue-router";
import { reactive, computed, toRef, onMounted, watch } from "vue";
import { useUsers } from "./stores/Users";
import { useAuthStore } from "@/stores/AuthStore";
import { useResponsive } from "@/stores/Responsive";
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
import { useMusicRoom } from "@/stores/MusicRoom";
export default {
    components: {
        SidebarList,
        NowPlayingBar,
        MainTopBar,
        AppBarContent,
        LeftItem,
        SidebarPlaylist,
        ListItem,
        PlayerPage,
        SbRoom,
    },
    setup() {
        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////
        const route = useRoute();
        const auth = useAuthStore();
        const songPlay = useSongPlay();
        const musicRoom = useMusicRoom();
        const { showPlayerPage, hasSong } = storeToRefs(songPlay);
        const { inRoom } = storeToRefs(musicRoom);
        const responsive = useResponsive();
        const handleResize = () => {
            responsive.width = window.innerWidth;
        };

        onMounted(() => {
            window.addEventListener("resize", handleResize);
        });
        auth.fetchUserInfo();
        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////
        const initData = () => {
            return {
                scrollTop: 0,
                navItems: [
                    {
                        name: "Home",
                        icon: "mdi-home",
                        title: "Trang chủ",
                    },
                    {
                        name: "Search",
                        icon: "mdi-magnify",
                        title: "Tìm kiếm",
                    },
                ],
                showDrawer: responsive.lg,
                dialog: true,
                showVol: responsive.md,
                showSearch: responsive.lg,
            };
        };

        const stateReactive = reactive({ ...initData() });
        const storeUsers = useUsers();
        const classAppBar = computed(() => {
            if (stateReactive.scrollTop > 10) {
                return "fixed-scroll";
            }
            return "!bg-transparent";
        });
        const permanent = computed(() => {
            return responsive.lg;
        });
        const classMainContent = computed(() => {
            if (
                route.name === "Playlist" ||
                route.name === "Track" ||
                route.name === "Room"
            )
                return "pt-0";
            return "";
        });
        const hiddenAllNav = computed(() => {
            return route.name === "Login" || route.name === "Register";
        });

        const activeScroll = computed(() => {
            stateReactive.scrollTop > 10;
        });
        const routerLoading = computed(() => {
            return responsive.routerLoading;
        });
        // SECTION Store //////////////////////////////////////////////////////
        const overflowHtml = () => {
            const el = document.getElementsByTagName("html")[0];
            if (!permanent.value) {
                if (stateReactive.showDrawer)
                    el.classList.add("!overflow-y-hidden");
                else el.classList.remove("!overflow-y-hidden");
            }
        };
        const toggleVol = () => {
            stateReactive.showVol = !stateReactive.showVol;
        };
        const scrollApp = (e) => {
            stateReactive.scrollTop = document.getElementById("html").scrollTop;
        };
        const toggleDrawer = () => {
            stateReactive.showDrawer = !stateReactive.showDrawer;
        };
        const initChannelUser = () => {
            auth.channel = Echo.private("user." + auth.user.id);
        };
        watch(
            () => responsive.width,
            (newSize) => {
                stateReactive.showDrawer = responsive.lg;
                stateReactive.showVol = responsive.md;
                stateReactive.showSearch = responsive.lg;
                overflowHtml();
            }
        );
        watch(
            () => permanent,
            (yes) => {
                overflowHtml();
            }
        );
        watch(
            () => auth.isAuthenticated,
            (isAuthenticated) => {
                if (isAuthenticated) {
                    initChannelUser();
                }
            }
        );
        watch(
            () => stateReactive.showDrawer,
            (show) => {
                overflowHtml();
            }
        );
        watch(
            () => hiddenAllNav.value,
            (hidden) => {
                if (hidden) {
                    songPlay.pauseSong();
                }
            }
        );

        return {
            scrollApp,
            classAppBar,
            activeScroll,
            classMainContent,
            state: toRef(stateReactive),
            hiddenAllNav,
            toggleDrawer,
            permanent,
            showPlayerPage,
            toggleVol,
            hasSong,
            routerLoading,
            inRoom,
        };
    },
};
</script>
<style lang="scss">
#dvs-app-bar-content {
    width: calc(100vw - 240px - 12px);
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
