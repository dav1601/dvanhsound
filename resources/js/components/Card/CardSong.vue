<template>
    <div
        class="card-song w-[183px] p-[12.99999px] h-[260px] rounded-[5.152px] bg-[#161616] cursor-pointer hover:bg-[#282828] transition-all relative"
        @mouseenter="hoverIn"
        @mouseleave="hoverOut"
        @click="clickCard"
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
import { useRouter } from "vue-router";
import { computed, reactive, watch, toRefs, toRef } from "vue";
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
        playlistId: {
            default: null,
        },
        type: {
            default: "track",
        },
        to: {
            default: null,
        },
    },
    setup(props, ctx) {
        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////

        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////

        // SECTION Store //////////////////////////////////////////////////////
        const storeSongPlay = useSongPlay();
        const router = useRouter();
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
            return storeSongPlay.isActiveSong(stateReactive.info.id);
        });
        const currSongLoading = computed(() => {
            return !storeSongPlay.loadedSong && isActiveSong.value;
        });

        const renderIcon = computed(() => {
            if (storeSongPlay.isPaused) return "mdi-play";
            if (storeSongPlay.isPlaying && isActiveSong.value)
                return "mdi-pause";
            if (storeSongPlay.isPlaying && !isActiveSong.value)
                return "mdi-play";
        });
        const cardImage = computed(() => {
            let url = "";
            if (isLoaded) {
                switch (props.plf) {
                    case "st":
                        if (stateReactive.info.images[1])
                            url = stateReactive.info.images[1].url;
                        if (!url && stateReactive.info.images[0])
                            url = stateReactive.info.images[0].url;
                        if (!url && stateReactive.info.images[2])
                            url = stateReactive.info.images[2].url;
                        break;

                    default:
                        url = stateReactive.info.images.medium.url;
                        break;
                }
            }

            return url ? url : "";
        });

        const setInfo = () => {
            stateReactive.info = {
                ...storeSongPlay.getInfoStandards(
                    props.item,
                    props.plf,
                    props.type
                ),
            };
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
            storeSongPlay.loadSong(stateReactive.info.id, true, props.plf, {
                items: props.playlistItems,
                id: props.playlistId,
            });
        };
        const clickCard = () => {
            return router.push(props.to);
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
            isActiveSong,
            currSongLoading,
            clickCard,
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
