<template>
    <div class="highlight-tracks my-10 relative content-spacing">
        <div class="flex justify-start items-start">
            <div class="w-[390px] flex-shrink-1">
                <h2 class="text-2xl font-semibold text-white mb-3">
                    Kết quả hàng đầu - {{ $getPlfName(plf) }}
                </h2>
                <div
                    class="top-reults p-[20px] w-full h-full rounded-lg relative isolate cursor-pointer"
                    @mouseenter="hoverIn"
                    @mouseleave="hoverOut"
                >
                    <div
                        class="bg-gradient-to-b opacity-40 rounded-lg dva-abs-full"
                        :class="{
                            'from-[#FF0000]': plf === 'yt',
                            'from-green-main': plf === 'st',
                        }"
                    ></div>
                    <div
                        class="top-reults-content w-full h-full relative"
                        v-if="topTrack.title"
                    >
                        <v-btn
                            icon="mdi-play"
                            class="absolute top-0 right-0 bg-green-main text-black hidden animate__animated play-btn"
                        ></v-btn>
                        <v-img
                            width="92"
                            :src="image"
                            class="rounded-lg"
                            cover
                            height="92"
                        ></v-img>

                        <span
                            class="d-block w-full font-bold mt-4 text-white truncate text-[2rem]"
                        >
                            {{ topTrack.title }}
                            <v-tooltip
                                activator="parent"
                                location="bottom start"
                            >
                                {{ topTrack.title }}</v-tooltip
                            >
                        </span>

                        <span
                            class="d-block w-full truncate text-sm font-normal text-inherit"
                        >
                            {{ topTrack.description }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="tracks flex-1 ml-10 overflow-hidden">
                <h2 class="text-2xl font-semibold text-white mb-3">
                    Bài hát - {{ $getPlfName(plf) }}
                </h2>
                <div class="list-tracks overflow-hidden" v-if="hasList">
                    <song-item
                        v-for="(item, index) in tracks"
                        :key="item"
                        :item="item"
                        :index="parseInt(index) + 1"
                        :plf="plf"
                        :isLoaded="true"
                    ></song-item>
                </div>
                <div v-else>
                    <song-item
                        v-for="i in 4"
                        :key="'grsks-' + i"
                        :isLoaded="false"
                        :plf="plf"
                    ></song-item>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from "vue";
import { useSongPlay } from "@/stores/SongPlay";
import SongItem from "@/components/song/SongItem.vue";
import "animate.css";
export default {
    components: { SongItem },
    props: {
        tracks: {
            default: [],
        },
        plf: {
            default: "yt",
        },
    },
    setup(props) {
        const storeSong = useSongPlay();
        const topTrack = computed(() => {
            return storeSong.getInfoStandards(
                props.tracks[0],
                props.plf,
                "song"
            );
        });
        const hasList = computed(() => {
            return props.tracks.length > 0;
        });
        const hoverIn = (e) => {
            const el = e.target;
            const playBtn = el.querySelector(".play-btn");
            if (playBtn) {
                playBtn.classList.remove("animate__fadeOutDown");
                playBtn.classList.add("animate__fadeInDown");
                playBtn.classList.remove("hidden");
            }
        };
        const hoverOut = (e) => {
            const el = e.target;
            const playBtn = el.querySelector(".play-btn");
            if (playBtn) {
                playBtn.classList.remove("animate__fadeInDown");
                playBtn.classList.add("animate__fadeOutDown");
            }
        };
        const image = computed(() => {
            let image = "";
            if (topTrack.value.images) {
                switch (props.plf) {
                    case "st":
                        image = topTrack.value.images[1].url;
                        break;

                    default:
                        image = topTrack.value.images["medium"].url;
                        break;
                }
            }
            return image;
        });
        return {
            topTrack,
            image,
            hoverIn,
            hoverOut,
            hasList,
        };
    },
};
</script>
<style lang=""></style>
