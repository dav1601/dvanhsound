<template>
    <div id="wp-playlist" v-if="!state.errorFetch">
        <!-- ANCHOR header --------------------------------- -->
        <content-header
            :isLoaded="state.loadedInfo"
            :title="state.info.title"
            :description="state.info.description"
            :image="state.info.image"
            :type="route.name"
            :plf="route.params.plf"
        >
            <div class="flex justify-start items-center">
                <span class="text-gray-200 font-semibold" id="total"
                    >{{ totalSong }} Bài Hát</span
                >
                <span
                    class="text-gray-200 font-semibold"
                    v-if="state.info.duration !== 0"
                    ><v-icon icon="mdi-circle-small"></v-icon
                ></span>
                <span class="text-gray-200 font-semibold" id="duration">{{
                    $sToHm(state.info.duration)
                }}</span>
            </div>
        </content-header>

        <!-- ANCHOR playlist --------------------------------- -->
        <div id="playlist" class="relative w-full h-full">
            <div class="absolute"></div>
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
                    :items="state.playlist.items"
                    :plf="route.params.plf"
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
import { storeToRefs } from "pinia";
import { reactive, toRef, computed, watch } from "vue";
import { useRoute } from "vue-router";
import SongItem from "@/components/SongItem.vue";
import ContentHeader from "@/components/ContentHeader.vue";
import HeartIcon from "@/components/actions/HeartIcon.vue";
import GridItems from "../components/playlist/GridItems.vue";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import FetchFail from "@/components/errors/FetchFailed.vue";
const PlaylistRepository = RepositoryFactory.get("playlist");
const StPlaylistRepository = RepositoryFactory.get("StPlaylist");

export default {
    components: { SongItem, ContentHeader, FetchFail, HeartIcon, GridItems },
    setup() {
        const initData = () => {
            return {
                playlist: {
                    items: [],
                },
                loadedInfo: false,
                loadedItems: false,
                errorFetch: false,
                info: {
                    title: "",
                    description: "",
                    image: "",
                    duration: 0,
                },
            };
        };

        const stateReactive = reactive({ ...initData() });
        const route = useRoute();
        const songPlay = useSongPlay();
        const fetchPlaylistSt = () => {
            StPlaylistRepository.getInfo(route.params.id)
                .then((res) => {
                    const data = res.data.data;
                    stateReactive.playlist = data;
                    stateReactive.info.title = data.name;
                    stateReactive.info.description = data.description;
                    stateReactive.info.image = data.images[0].url;
                    stateReactive.loadedInfo = true;
                })
                .catch((err) => {
                    stateReactive.errorFetch = true;
                });
            StPlaylistRepository.getItems(route.params.id, { limit: 100 })
                .then((res) => {
                    const data = res.data.data;
                    stateReactive.playlist.items = data;
                    console.log(data.length);
                    stateReactive.loadedItems = true;
                    songPlay.loadedPlaylistItems = true;
                    stateReactive.info.duration =
                        stateReactive.playlist.items.reduce(
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
                    stateReactive.info.title = data.snippet.title;
                    stateReactive.info.description = data.snippet.description;
                    stateReactive.info.image =
                        data.snippet.thumbnails.medium.url;
                    stateReactive.loadedInfo = true;
                })
                .catch((err) => {
                    stateReactive.errorFetch = true;
                });
            PlaylistRepository.getItems(route.params.id)
                .then((res) => {
                    const { data } = res.data;
                    stateReactive.playlist.items = data;
                    stateReactive.loadedItems = true;
                    songPlay.loadedPlaylistItems = true;
                })
                .catch((err) => {
                    stateReactive.errorFetch = true;
                });
        };
        switch (route.name) {
            case "Track":
                break;

            // default: playlist
            default:
                switch (route.params.plf) {
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
        // ANCHOR computed //////////////////////////////////////////////////////
        const totalSong = computed(() => {
            return stateReactive.playlist.hasOwnProperty("items")
                ? Object.keys(stateReactive.playlist.items).length
                : 0;
        });
        watch(
            () => stateReactive.playlist.items,
            (items) => {
                if (items) {
                    if (Object.keys(items).length > 0) {
                        songPlay.currentPlaylistItems = items;
                    }
                }
            }
        );

        return {
            route,
            state: toRef(stateReactive),
            totalSong,
        };
    },
};
</script>
<style lang="scss"></style>
