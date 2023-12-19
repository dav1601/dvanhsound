<template lang>
    <div id="wp-playlist">
        <!-- ANCHOR start astist --------------------------------- -->
        <content-header></content-header>
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
import { useRoute } from "vue-router";
import SongItem from "@/components/SongItem.vue";
import ContentHeader from "@/components/ContentHeader.vue";

export default {
    components: { SongItem, ContentHeader },
    setup() {
        const route = useRoute();
        const plf = route.params.plf;
        const id = route.params.id;

        return {};
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
