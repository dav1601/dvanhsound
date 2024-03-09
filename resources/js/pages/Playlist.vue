<template>
    <div id="wp-playlist" v-if="!state.errorFetch">
        <!-- ANCHOR header --------------------------------- -->
        <content-header
            :isLoaded="state.loadedInfo"
            :title="info.title"
            :description="info.description"
            :image="image"
            :type="route.name"
            :plf="state.plf"
            :id="route.params.id"
        >
            <div class="flex justify-start items-center">
                <span class="text-gray-200 font-semibold" id="total"
                    >{{ totalSong }} Bài Hát</span
                >
                <span
                    class="text-gray-200 font-semibold"
                    v-if="state.playlist !== 0"
                    ><v-icon icon="mdi-circle-small"></v-icon
                ></span>
                <span class="text-gray-200 font-semibold" id="duration">{{
                    $sToHm(state.playlist.duration)
                }}</span>
            </div>
        </content-header>

        <!-- ANCHOR playlist --------------------------------- -->
        <div id="playlist" class="relative w-full h-full">
            <div id="playlist-content" class="content-spacing">
                <div
                    class="actions-bar flex justify-start items-center mt-6 mb-8"
                >
                    <v-btn
                        color="#1db954"
                        class="text-black text-xl"
                        icon="mdi-play"
                        size="56"
                    >
                    </v-btn>
                    <HeartIcon
                        size="38"
                        class="mx-8 text-gray-500 hover:text-white"
                    />
                    <v-icon
                        icon="mdi-dots-horizontal"
                        size="38"
                        class="cursor-pointer hover:text-white text-gray-500"
                    ></v-icon>
                </div>
                <grid-items
                    :items="state.items"
                    :plf="state.plf"
                    :id="route.params.id"
                    :isLoaded="loadedPlaylistItems"
                    @update-duration="updateDuration"
                ></grid-items>
            </div>
        </div>
    </div>
    <FetchFail
        message="Không thể tìm thấy danh sách hoặc danh sách ở trạng thái riêng tư (youtube). kiểm tra id và trạng thái sau đó tải lại trang"
        v-else
    />
</template>
<script>
import { useSongPlay } from "@/stores/SongPlay";
import { reactive, toRef, computed, watch, toRefs } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import ContentHeader from "@/components/ContentHeader.vue";
import HeartIcon from "@/components/actions/HeartIcon.vue";
import GridItems from "../components/playlist/GridItems.vue";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import FetchFail from "@/components/errors/FetchFailed.vue";
const PlaylistRepository = RepositoryFactory.get("playlist");
const StPlaylistRepository = RepositoryFactory.get("StPlaylist");

export default {
    components: { ContentHeader, FetchFail, HeartIcon, GridItems },
    setup() {
        const initData = () => {
            return {
                playlist: {},
                items: [],
                loadedInfo: false,
                loadedItems: false,
                errorFetch: false,
                info: {
                    title: "",
                    description: "",
                    image: "",
                    duration: 0,
                },
                plf: "",
            };
        };

        const stateReactive = reactive({ ...initData() });
        const route = useRoute();

        const songPlay = useSongPlay();

        const { loadedPlaylistItems } = storeToRefs(songPlay);
        const fetchPlaylistSt = () => {
            StPlaylistRepository.getInfo(route.params.id)
                .then((res) => {
                    const data = res.data.data;
                    stateReactive.playlist = data;
                    stateReactive.loadedInfo = true;
                })
                .catch((err) => {
                    stateReactive.errorFetch = true;
                });
            StPlaylistRepository.getItems(route.params.id, { limit: 100 })
                .then((res) => {
                    const data = res.data.data;
                    stateReactive.items = data;
                    stateReactive.loadedItems = true;
                    songPlay.loadedPlaylistItems = true;
                    stateReactive.playlist.duration =
                        stateReactive.items.reduce(
                            (duration, item) => duration + item.duration,
                            0
                        );
                })
                .catch((err) => {
                    stateReactive.errorFetch = true;
                });
        };
        const fetchPlaylistYt = () => {
            PlaylistRepository.getInfo(route.params.id)
                .then((res) => {
                    const { data } = res.data;
                    stateReactive.playlist = data;
                    stateReactive.loadedInfo = true;
                })
                .catch((err) => {
                    stateReactive.errorFetch = true;
                });
            PlaylistRepository.getItems(route.params.id)
                .then((res) => {
                    const { data } = res.data;
                    stateReactive.items = data;
                    stateReactive.loadedItems = true;
                    songPlay.loadedPlaylistItems = true;
                    stateReactive.playlist.duration = 0;
                })
                .catch((err) => {
                    stateReactive.loadedItems = true;
                    songPlay.loadedPlaylistItems = true;
                    // stateReactive.errorFetch = true;
                });
        };
        const loadPlaylist = () => {
            stateReactive.plf = route.params.plf;
            console.log(stateReactive.loadedInfo, stateReactive.loadedItems);
            switch (route.name) {
                case "Track":
                    break;

                // default: playlist
                default:
                    switch (stateReactive.plf) {
                        case "st":
                            fetchPlaylistSt();
                            break;
                        // default yt
                        default:
                            fetchPlaylistYt();
                            break;
                    }
                    break;
            }
        };
        const updateDuration = (e) => {
            stateReactive.playlist.duration += e;
        };

        // init
        loadPlaylist();

        // ANCHOR computed //////////////////////////////////////////////////////
        const totalSong = computed(() => {
            return stateReactive.loadedItems
                ? Object.keys(stateReactive.items).length
                : 0;
        });
        const info = computed(() => {
            return songPlay.getInfoStandards(
                stateReactive.playlist,
                stateReactive.plf,
                "playlist"
            );
        });
        const image = computed(() => {
            let url = "";
            if (stateReactive.loadedInfo) {
                switch (stateReactive.plf) {
                    case "st":
                        url = info.value.images[0].url;
                        break;

                    default:
                        url = info.value.images.hasOwnProperty("maxres")
                            ? info.value.images.maxres.url
                            : info.value.images.high.url;
                        break;
                }
            }

            return url;
        });
        watch(
            () => stateReactive.items,
            (items) => {
                if (items) {
                    if (Object.keys(items).length > 0) {
                        songPlay.currentPlaylistItems = items;
                    }
                }
            }
        );
        watch(
            () => route.params.id,
            async (newId) => {
                if (newId) {
                    stateReactive.loadedInfo = false;
                    stateReactive.loadedItems = false;
                    songPlay.loadedPlaylistItems = false;
                    loadPlaylist();
                }
            }
        );
        return {
            route,
            state: toRef(stateReactive),
            loadedPlaylistItems,
            totalSong,
            info,
            image,
            updateDuration,
        };
    },
};
</script>
<style lang="scss"></style>
