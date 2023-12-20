<template>
    <div id="wp-playlist">
        <!-- ANCHOR start astist --------------------------------- -->
        <content-header
            :isLoaded="state.loadedInfo"
            :title="state.info.title"
            :description="state.info.description"
            :image="state.info.image"
            :type="route.name"
        ></content-header>

        <!-- ANCHOR end artist --------------------------------- -->
        <!-- ANCHOR start popular --------------------------------- -->
        <div id="wp-popular">
            <div class="popular">
                <!-- ANCHOR  poppular header --------------------------------- -->
                <div
                    class="popular-header flex justify-between items-center mb-5"
                >
                    <h2 class="text-xl font-bold text-white">Popular</h2>
                    <router-link
                        to="/playlist"
                        class="dva-text-green font-semibold"
                        >See all</router-link
                    >
                </div>
                <!-- ANCHOR popular list --------------------------------- -->
                <!-- <div id="music-list">
                    <song-item
                        v-for="(item, index) in playlist"
                        :key="'music-item-' + item.id"
                        :song="item"
                        :index="index"
                        :isLast="index === playlist.length - 1"
                    ></song-item>
                </div> -->

                <!-- ANCHOR end popular list --------------------------------- -->
            </div>
        </div>

        <!-- ANCHOR end popular --------------------------------- -->
    </div>
</template>
<script>
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
import { reactive, toRef } from "vue";
import { useRoute } from "vue-router";
import SongItem from "@/components/SongItem.vue";
import ContentHeader from "@/components/ContentHeader.vue";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const PlaylistRepository = RepositoryFactory.get("playlist");
const StPlaylistRepository = RepositoryFactory.get("StPlaylist");

export default {
    components: { SongItem, ContentHeader },
    setup() {
        const initData = () => {
            return {
                playlist: {},
                loadedInfo: false,
                loadedItems: false,
                info: {
                    title: "",
                    description: "",
                    image: "",
                },
            };
        };

        const stateReactive = reactive({ ...initData() });
        const route = useRoute();
        const songPlay = useSongPlay();
        const fetchPlaylistSt = () => {
            StPlaylistRepository.getInfo(route.params.id, {
                loadTrack: true,
            }).then((res) => {
                const data = res.data.data;
                stateReactive.playlist = data;
                stateReactive.info.title = data.name;
                stateReactive.info.description = data.description;
                stateReactive.info.image = data.images[0].url;
                stateReactive.loadedInfo = true;
                stateReactive.loadedItems = true;
            });
        };
        const fetchPlaylistYt = () => {
            PlaylistRepository.getInfo(route.params.id).then((res) => {
                const data = res.data.data;
                stateReactive.playlist = data;
                stateReactive.info.title = data.snippet.title;
                stateReactive.info.description = data.snippet.description;
                stateReactive.info.image = data.snippet.thumbnails.high.url;
                stateReactive.loadedInfo = true;
            });
            PlaylistRepository.getItems(route.params.id).then((res) => {
                const data = res.data.data;
                stateReactive.playlist.items = data;
                stateReactive.loadedItems = true;
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

        return {
            route,
            state: toRef(stateReactive),
        };
    },
};
</script>
<style lang="scss">
#wp-playlist {
    #artist {
        position: relative;
        border-radius: 12px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 15%;

        .artist-image {
            width: 429px;
            height: 363px;
            bottom: 0;
            right: 10px;
        }
        .artist-info {
            padding-top: 52px;
            padding-bottom: 32px;
            padding-left: 40px;
            &-verified {
                display: flex;
                align-items: center;
                .--icon {
                    color: #13a8f2;
                }
            }
            &-name {
                color: white;
                font-size: 50px;
                font-weight: 700;
            }
            &-listeners {
                display: flex;
                align-items: center;
            }
            &-actions {
                display: flex;
                align-items: center;
                .--play {
                    background: $green;
                    border-radius: 40px;
                    i {
                        color: black;
                    }
                }
                .--following {
                    background: transparent;
                    display: flex;
                    align-items: center;
                    border-radius: 40px;
                    font-weight: 700;
                    font-size: 16px;
                    color: white;
                    text-transform: uppercase;
                    border: 1px solid white;
                    span {
                        margin-left: 10px;
                    }
                    i {
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
</style>
