<template>
    <div id="playlist">

        <!-- ANCHOR start astist --------------------------------- -->
        <div
            id="artist"
            class="mb-8"
            :style="{
                backgroundImage: 'url(' + $assetImg('bg-artist.jpg') + ')',
            }"
        >
            <!-- <img
                :src="$assetImg('ed.png')"
                class="position-absolute artist-image"
                alt="artist"
            /> -->
            <div class="artist-info">
                <div class="artist-info-verified">
                    <v-icon
                        density="default"
                        icon="mdi-check-decagram"
                        class="--icon"
                    >
                    </v-icon>
                    <span class="ml-3 text-white font-bold">
                        Verified Artist
                    </span>
                </div>
                <h2 class="artist-info-name mb-4">Allan Walker</h2>
                <div class="artist-info-listeners mb-8">
                    <v-icon
                        density="default"
                        icon="mdi-headphones"
                        class="--icon"
                    >
                    </v-icon>
                    <span class="pl-3 font-semibold">
                        28.885.533
                        <span class="pl-1">monthly listeners</span>
                    </span>
                </div>
                <div class="artist-info-actions">
                    <!-- <button
                        class="--play px-6 py-3 text-white font-bold text-uppercase"
                    >
                        Play
                    </button> -->
                    <v-btn
                        icon="mdi-play"
                        class="dva-bg-green"
                        size="large"
                    ></v-btn>
                    <!-- ml-3 py-3 pl-4 pr-6 -->
                    <button class="--following ml-3 py-3 pl-4 pr-6">
                        <v-icon
                            density="default"
                            icon="mdi-check"
                            class="--icon"
                        >
                        </v-icon>
                        <span>Following</span>
                    </button>
                </div>
            </div>
        </div>

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
                <div id="music-list">
                    <song-item
                        v-for="(item, index) in playlist"
                        :key="'music-item-' + item.id"
                        :song="item"
                        :index="index"
                        :isLast="index === playlist.length - 1"
                    ></song-item>
                </div>

                <!-- ANCHOR end popular list --------------------------------- -->
            </div>
        </div>

        <!-- ANCHOR end popular --------------------------------- -->
    </div>
</template>
<script>
import { useDatabaseApp } from "@/stores/database";
import { storeToRefs } from "pinia";
import SongItem from "@/components/SongItem.vue";

export default {
    components: { SongItem },
    setup() {
        const userStore = useDatabaseApp();
        const { playlist } = storeToRefs(userStore);
        return {
            playlist,
        };
    },
};
</script>
<style lang="scss">
#playlist {

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
