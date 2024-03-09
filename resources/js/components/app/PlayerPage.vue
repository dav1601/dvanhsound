<template>
    <div
        class="player-page fixed top-0 left-0 w-screen h-screen pl-0 lg:!pl-nav-left pt-nav-top pb-nav-bottom bg-dvs-dark z-10 visible"
        :style="translate"
    >
        <div
            class="player-page-content pt-[30px] md:pt-[64px] px-[30px] xl:pl-30 xl:pr-30 pb-0 w-full h-full flex flex-col xl:flex-row items-center justify-start"
        >
            <div
                class="pp-content-thumb w-full flex items-center h-full mb-2 flex-1"
            >
                <v-img
                    :src="image"
                    width="100%"
                    class="aspect-auto xl:aspect-square rounded-lg shadow-lg"
                    cover
                ></v-img>
            </div>
            <div
                class="pp-content-list mt-5 xl:mt-0 pr-2 xl:ml-[56px] w-full xl:max-w-[500px] 2xl:max-w-[800px] h-full overflow-y-auto overflow-x-hidden custom-scroll"
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
                switch (currentSong.value.info.plf) {
                    case "st":
                        return currentSong.value.info.images[0];

                    default:
                        return currentSong.value.info.images.high.url;
                }
            return "";
        });

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
