<template>
    <div class="playlist-grid">
        <div
            class="playlist-grid-th flex justify-start items-center pl-2 capitalize"
        >
            <div class="grid-pl-col-1 song-item-col-1">
                <span class="w-[24px] h-[24px] block font-bold text-white"
                    >#</span
                >
            </div>
            <div
                class="grid-pl-col-2 song-item-col-2 pr-4 flex items-center justify-start font-bold text-white"
            >
                Tiêu đề
            </div>
            <div class="grid-pl-col-3 song-item-col-3 font-bold text-white">
                <span class="hidden md:block"> Description </span>
            </div>
            <div
                class="grid-pl-col-4 song-item-col-4 flex justify-end font-bold text-white pr-12"
            >
                <v-icon icon="mdi-clock-outline"></v-icon>
            </div>
        </div>
        <v-divider class="my-3"></v-divider>
        <div v-if="isLoaded">
            <song-item
                v-for="(item, index) in items"
                :key="item"
                :item="item"
                :index="parseInt(index) + 1"
                :playlistItems="items"
                :playlistId="id"
                :isLoaded="isLoaded"
                :plf="item.plf"
                @update-duration="updateDuration"
            ></song-item>
        </div>
        <div v-else>
            <song-item
                v-for="i in 6"
                :key="'grsks-' + i"
                :isLoaded="isLoaded"
                :plf="plf"
            ></song-item>
        </div>
    </div>
</template>
<script>
import SongItem from "../song/SongItem.vue";
import GridBase from "@/components/playlist/GridBase.vue";

export default {
    components: { SongItem, GridBase },
    props: {
        items: {
            type: [Object, Array],
            default: [],
        },
        plf: {
            type: String,
            default: "yt",
        },
        id: {
            type: String,
            default: null,
        },
        isLoaded: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, ctx) {
        const updateDuration = (e) => {
            return ctx.emit("update-duration", e);
        };
        return {
            updateDuration,
        };
    },
};
</script>
<style lang=""></style>
