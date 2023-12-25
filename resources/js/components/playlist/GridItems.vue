<template lang="">
    <div class="playlist-grid">
        <div class="playlist-grid-th flex justify-start items-center pl-4 capitalize">
            <div class="flex-1 max-w-[2%]">
                <span class="w-[24px] h-[24px] block font-bold text-white"
                    >#</span
                >
            </div>
            <div
                class="flex-1 max-w-[53%] pr-4 flex items-center justify-start font-bold text-white"
            >
                tieu de
            </div>
            <div class="flex-1 max-w-[27%] font-bold text-white">
                {{  plf === "yt" ? "Channel" : "album" }}
            </div>
            <div
                class="flex-1 max-w-[18%] flex justify-end font-bold text-white pr-12"
            >
                <v-icon icon="mdi-clock-outline"></v-icon>
            </div>
        </div>
        <v-divider class="my-3"></v-divider>
        <div v-if="songPlay.loadedPlaylistItems.value">
            <song-item
                v-for="(item, index) in items"
                :key="item"
                :item="item"
                :index="index + 1"
                :isLoaded="songPlay.loadedPlaylistItems.value"
            ></song-item>
        </div>
        <div v-else>
            <song-item
                v-for="i in 6"
                :key="'grsks-' + i"
                :isLoaded="songPlay.loadedPlaylistItems.value"
            ></song-item>
        </div>
    </div>
</template>
<script>
import SongItem from "../song/SongItem.vue";
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
export default {
    components: { SongItem },
    props: {
        items: {
            type: [Object, Array],
            default: [],
        },
        plf: {
            type: String,
            default: "yt",
        },
    },
    setup(props) {
        const songPlay = useSongPlay();
        return {
            songPlay: storeToRefs(songPlay),
        };
    },
};
</script>
<style lang=""></style>
