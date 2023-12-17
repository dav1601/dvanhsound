<template language="html">
    <div
        class="card-song w-[183px] p-[12.99999px] h-[260px] rounded-[5.152px] bg-[#161616] cursor-pointer hover:bg-[#282828] transition-all relative"
        @mouseenter="hoverIn"
        @mouseleave="hoverOut"
    >
        <v-btn
            :icon="renderIcon"
            class="bg-[#1db954] text-black absolute right-[26px] bottom-[106px] z-10 hidden card-song-play animate__animated"
            v-if="isLoaded"
            @click.stop="clickPlay"
        ></v-btn>
        <v-img
            :src="cardImage"
            height="150"
            width="150"
            class="rounded-[5.152px]"
            cover
            v-if="isLoaded"
        ></v-img>
        <v-skeleton-loader
            v-else
            class="rounded-[5.152px]"
            height="150"
            width="150"
            type="image"
        ></v-skeleton-loader>
        <span
            truncate
            class="card-song-title text-white truncate font-bold mt-[17.17px] mb-[12.88px] leading-4 d-block"
            v-if="isLoaded"
        >
            <v-tooltip activator="parent" location="bottom start">
                {{ state.info.title }}</v-tooltip
            >
            {{ state.info.title }}
        </span>
        <v-skeleton-loader
            v-else
            width="100%"
            type="heading"
        ></v-skeleton-loader>
        <span
            class="card-song-desc line-clamp-2 text-[#B3B3B3] text-[14px]"
            v-if="isLoaded"
        >
            {{ state.info.description }}
        </span>
        <v-skeleton-loader v-else type="text"></v-skeleton-loader>
    </div>
</template>
<script>
import { useSongPlay } from "@/stores/SongPlay";
import { computed, reactive, watch, toRefs, toRef, ref } from "vue";
import "animate.css";
export default {
    props: {
        item: null,
        isLoaded: {
            type: Boolean,
            default: false,
        },
        playlistItems: null,
        plf: {
            type: String,
            default: "yt",
        },
    },
    setup(props) {
        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////

        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////

        // SECTION Store //////////////////////////////////////////////////////
        const useStore = useSongPlay();
        // !SECTION End Store //////////////////////////////////////////////////////

        // SECTION State //////////////////////////////////////////////////////
        const initData = () => {
            return {
                info: {},
            };
        };

        const stateReactive = reactive({ ...initData() });

        // !SECTION End State //////////////////////////////////////////////////////
        const { isLoaded } = toRefs(props);
        // SECTION Computed //////////////////////////////////////////////////////
        const isActiveSong = computed(() => {
            return useStore.isActiveSong(stateReactive.info.id);
        });

        const renderIcon = computed(() => {
            if (useStore.isPaused) return "mdi-play";
            if (useStore.isPlaying && isActiveSong.value) return "mdi-pause";
            if (useStore.isPlaying && !isActiveSong.value) return "mdi-play";
        });
        const cardImage = computed(() => {
            let url = "";
            if (isLoaded) {
                switch (props.plf) {
                    case "st":
                        url = stateReactive.info.images[1].url;
                        break;

                    default:
                        url = stateReactive.info.images.medium.url;
                        break;
                }
            }

            return url;
        });

        const setInfo = () => {
            let item;
            switch (props.plf) {
                case "st":
                    item = props.item.track;
                    break;

                default:
                    item = props.item;
                    break;
            }
            stateReactive.info = useStore.getInfoSongByPlf(item, props.plf);
        };

        // !SECTION End Computed //////////////////////////////////////////////////////

        // SECTION Methods //////////////////////////////////////////////////////

        const hoverIn = (e) => {
            const el = e.target;
            const playBtn = el.querySelector(".card-song-play");
            if (playBtn) {
                playBtn.classList.remove("animate__fadeOutDown");
                playBtn.classList.add("animate__fadeInUp");
                playBtn.classList.remove("hidden");
            }
        };
        const hoverOut = (e) => {
            const el = e.target;
            const playBtn = el.querySelector(".card-song-play");
            if (playBtn) {
                playBtn.classList.remove("animate__fadeInUp");
                playBtn.classList.add("animate__fadeOutDown");
            }
        };
        const clickPlay = (e) => {
            if (isActiveSong.value) return useStore.playOrPause();
            useStore.loadSong(stateReactive.info.id, true, props.plf);
            useStore.setCurrentPlaylistItems(props.playlistItems);
        };

        // !SECTION End Methods //////////////////////////////////////////////////////

        // SECTION Watch //////////////////////////////////////////////////////
        watch(
            isLoaded,
            (loaded) => {
                if (loaded) {
                    setInfo();
                }
            },
            {
                immediate: true, // Not lazy anymore
            }
        );

        // !SECTION End Watch //////////////////////////////////////////////////////

        // SECTION return //////////////////////////////////////////////////////
        return {
            hoverIn,
            hoverOut,
            clickPlay,
            renderIcon,
            state: toRef(stateReactive),
            cardImage,
        };
    },
};
</script>
<style lang="scss">
.cart-song {
    &:hover {
        &-play {
            display: block !important;
        }
    }
}
</style>
