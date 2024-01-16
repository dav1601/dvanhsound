<template>
    <div
        class="playlist-grid-td w-full group flex justify-start items-center cursor-pointer rounded-md py-2"
        @mouseenter="setHover(true)"
        @mouseleave="setHover(false)"
        @dblclick.stop="dbClick"
        @click.stop="listenClick"
    >
        <div class="song-item-col-1 overflow-hidden flex-shrink-1">
            <!-- index -->
            <div
                class="w-full h-full flex items-center justify-center"
                v-if="isLoaded"
            >
                <div
                    v-if="!showEqua"
                    class="ml-4 block group-hover:hidden text-white font-semibold"
                >
                    {{ index }}
                </div>
                <v-icon
                    v-if="!showEqua"
                    size="24"
                    class="block"
                    :icon="renderPlayOrPause"
                    @click.stop="dbClick"
                ></v-icon>
                <equaliser-loading
                    v-if="showEqua"
                    width="18px"
                    height="18px"
                ></equaliser-loading>
            </div>
            <div
                class="w-[24px] h-[24px] animate-pulse bg-gray-500 rounded"
                v-else
            ></div>
        </div>
        <div
            class="grid-pl-col-2 song-item-col-2 ml-2 flex items-center justify-start"
        >
            <v-img
                width="40"
                height="40"
                max-width="40"
                max-height="40"
                class="rounded"
                cover
                :src="songImage"
                v-if="isLoaded"
            ></v-img>
            <!-- ske -->
            <div
                v-else
                class="w-[40px] h-[40px] rounded bg-gray-500 animate-pulse"
            ></div>
            <div
                class="flex flex-col justify-center items-start ml-3 w-100 mr-10 truncate"
            >
                <!-- title -->
                <span
                    class="text-white font-semibold truncate d-block w-100 mb-1 w-full"
                    v-if="isLoaded"
                >
                    <span v-html="state.info.title"></span>
                </span>

                <div
                    v-else
                    class="w-[280px] h-[14px] rounded bg-gray-500 animate-pulse"
                ></div>
                <!-- desc -->
                <span
                    class="text-sm text-gray-500 truncate d-block w-full"
                    v-if="isLoaded"
                    >{{ plf === "yt" ? "" : state.info.description }}</span
                >
                <!-- ske -->
                <div
                    v-if="!isLoaded"
                    class="w-[200px] h-[10px] mt-1 rounded bg-gray-500 animate-pulse"
                ></div>
            </div>
        </div>
        <div
            class="grid-pl-col-3 song-item-col-3 hidden sm:block overflow-hidden truncate"
        >
            <!-- album -->
            <span
                v-if="isLoaded"
                class="text-sm font-normal w-full text-gray-500"
            >
                {{ state.info.description }}
            </span>
            <!-- ske -->
            <div
                v-else
                class="w-[100%] h-[20px] rounded-xl bg-gray-500 animate-pulse"
            ></div>
        </div>
        <!-- duration actions col -4-->
        <div
            class="grid-pl-col-4 song-item-col-4 flex justify-end pr-2 overflow-hidden"
        >
            <div
                class="w-full h-full flex items-center justify-end"
                v-if="isLoaded"
            >
                <HeartIcon
                    class="text-gray-500 hidden lg:invisible group-hover:visible"
                ></HeartIcon>
                <!-- ---- -->
                <span class="mr-3 ml-7">{{ $formatTime(state.duration) }}</span>
                <!-- ---- -->
                <v-icon
                    icon="mdi-dots-horizontal"
                    class="text-gray-500 hover:text-white invisible group-hover:visible"
                ></v-icon>
            </div>
            <!-- ske -->
            <div class="flex justify-end items-center" v-else>
                <div
                    v-for="i in 3"
                    :key="'ske-icon-' + i"
                    class="w-[25px] h-[25px] mx-2 rounded bg-gray-500 animate-pulse"
                ></div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, onMounted, computed, watch, toRefs, toRef } from "vue";
import EqualiserLoading from "@/components/app/loading/EqualiserLoading.vue";
import HeartIcon from "@/components/actions/HeartIcon.vue";
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { VListItemSubtitle } from "vuetify/lib/components/index.mjs";
const YtRepo = RepositoryFactory.get("track");
export default {
    props: {
        item: null,
        index: null,
        isLoaded: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: "td",
        },
        plf: {
            type: String,
            default: "yt",
        },
        playlistItems: {
            default: [],
        },
        playlistId: {
            default: null,
        },
        emitClick: {
            default: false,
        },
    },
    components: { HeartIcon, EqualiserLoading },
    setup(props, ctx) {
        const initData = () => {
            return {
                isHover: false,
                info: {},
                duration: 0,
                isHover: false,
            };
        };
        const stateReactive = reactive({ ...initData() });
        const storeSongPlay = useSongPlay();

        const { isLoaded } = toRefs(props);
        const setInfo = () => {
            stateReactive.info = {
                ...storeSongPlay.getInfoStandards(props.item, props.plf),
            };
            if (props.plf === "yt") getDuration();
            if (props.plf === "st")
                stateReactive.duration = props.item.duration
                    ? props.item.duration
                    : storeSongPlay.findKey(props.item, "duration_ms").value /
                      1000;
        };
        const getDuration = () => {
            YtRepo.getTrack(stateReactive.info.id, { onlyDuration: true }).then(
                (res) => {
                    const { data } = res;
                    stateReactive.duration = data;
                    ctx.emit("update-duration", data);
                }
            );
        };
        const setHover = (hover) => {
            return (stateReactive.isHover = hover);
        };

        const songImage = computed(() => {
            let url = "";
            if (isLoaded) {
                switch (props.plf) {
                    case "st":
                        url = stateReactive.info.images[2].url;
                        break;

                    default:
                        url = stateReactive.info.images.medium.url;
                        break;
                }
            }

            return url;
        });
        const albumOrChannel = computed(() => {
            let string = "";
            switch (props.plf) {
                case "st":
                    string = props.item.album.name;
                    break;

                default:
                    string = props.item.snippet.videoOwnerChannelTitle;
                    break;
            }
            return string;
        });
        const isActive = computed(() => {
            return storeSongPlay.isActiveSong(stateReactive.info.id);
        });
        const renderPlayOrPause = computed(() => {
            if (
                isActive.value &&
                storeSongPlay.isPlaying &&
                stateReactive.isHover
            )
                return "mdi-pause";
            if (
                isActive.value &&
                storeSongPlay.isPaused &&
                stateReactive.isHover
            )
                return "mdi-play";
            if (!isActive.value && stateReactive.isHover) return "mdi-play";
            return "";
        });
        const showEqua = computed(() => {
            return (
                isActive.value &&
                storeSongPlay.isPlaying &&
                !stateReactive.isHover
            );
        });
        const dbClick = (e) => {
            if (props.emitClick) {
                return ctx.emit("db-click");
            }
            storeSongPlay.loadSong(stateReactive.info.id, true, props.plf, {
                items: props.playlistItems,
                id: props.playlistId,
            });
        };
        const listenClick = (e) => {
            if (props.emitClick) {
                return ctx.emit("click");
            }
        };
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
        return {
            state: toRef(stateReactive),
            songImage,
            albumOrChannel,
            isActive,
            setHover,
            showEqua,
            renderPlayOrPause,
            dbClick,
            listenClick,
        };
    },
};
</script>
<style lang="scss">
.playlist-grid-td {
    &:hover {
        background-color: hsla(0, 0%, 100%, 0.1);
        transition: background-color 0.5s ease;
    }
}
</style>
