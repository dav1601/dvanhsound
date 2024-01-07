<template>
    <div
        class="player-page fixed top-0 left-0 w-screen h-screen pl-0 lg:!pl-nav-left pr-0 pt-nav-top pb-nav-bottom bg-dvs-dark z-10 visible"
        :style="translate"
    >
        <div
            class="player-page-content pt-[64px] px-[30px] xl:px-[96px] pb-0 w-full h-full flex flex-col xl:flex-row items-center justify-start"
        >
            <div class="pp-content-thumb w-full mb-2 xl:w-auto flex-1">
                <v-img cover :src="image"></v-img>
            </div>
            <div
                class="pp-content-list w-full  xl:ml-[100px] h-full overflow-y-auto overflow-x-hidden custom-scroll"
            >
                <song-item
                    v-for="(item, index) in currentPlaylistItems"
                    :key="item"
                    :item="item"
                    :index="parseInt(index) + 1"
                    :playlistItems="currentPlaylistItems"
                    :playlistId="currentPlaylistId"
                    :isLoaded="true"
                ></song-item>
            </div>
        </div>
    </div>
</template>
<script>
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
import { watch, computed } from "vue";
import SongItem from "@/components/song/SongItem.vue";
export default {
    components: { SongItem },
    setup() {
        const storeSong = useSongPlay();
        const {
            showPlayerPage,
            currentSong,
            currentPlaylistItems,
            currentPlaylistId,
        } = storeToRefs(storeSong);
        const translate = computed(() => {
            if (showPlayerPage.value)
                return { transform: "translate3d(0, 0, 0)" };
            return { transform: "translate3d(0, 100vh, 0)" };
        });
        const image = computed(() => {
            if (currentSong.value.info.hasOwnProperty("images"))
                return currentSong.value.info.images.maxres.url;
            return "";
        });
        console.log(image.value);
        watch(
            () => showPlayerPage.value,
            (show) => {
                const el = document.getElementsByTagName("html")[0];
                const appBar = document.getElementById("dvs-app-bar");
                if (show) {
                    el.classList.add("!overflow-y-hidden");
                    appBar.classList.add("fixed-scroll");
                } else {
                    el.classList.remove("!overflow-y-hidden");
                    appBar.classList.remove("fixed-scroll");
                }
            }
        );
        return {
            translate,
            image,
            currentPlaylistItems,
            currentPlaylistId,
        };
    },
};
</script>
<style lang="scss" scoped>
.player-page {
    transition: transform 0.3s cubic-bezier(0.2, 0, 0.6, 1);
}
</style>
