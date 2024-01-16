<template>
    <v-bottom-navigation
        id="now-playing-bar"
        width="100vw"
        class="!overflow-visible sm:overflow-hidden"
        fixed
    >
        <div
            id="now-playing-bar-content"
            class="py-4 px-1 sm:px-2 md:px-4 relative"
        >
            <div
                class="npb-layout flex justify-between items-center w-full h-full"
            >
                <div
                    class="npb-layout-start mr-4 md:flex hidden justify-start items-center flex-shrink-1 md:w-[15%] lg:w-1/4"
                >
                    <v-img
                        :src="state.info.image"
                        max-width="56"
                        max-height="56"
                        width="56"
                        height="56"
                        class="rounded-md md:block hidden"
                        cover
                        v-if="store.loadedSong.value"
                    >
                    </v-img>
                    <v-skeleton-loader
                        v-else
                        type="image"
                        class="rounded-md"
                        width="56px"
                        height="56px"
                        max-height="56px"
                    ></v-skeleton-loader>

                    <div
                        class="title-artist lg:flex hidden flex-col justify-start items-start ml-4 overflow-hidden"
                    >
                        <span
                            class="title mb-2 text-lg w-full text-white font-semibold truncate max-w-[250px]"
                            v-if="store.loadedSong.value"
                        >
                            {{ state.info.title }}
                        </span>
                        <v-skeleton-loader
                            v-else
                            type="text"
                            width="250px"
                        ></v-skeleton-loader>
                        <span
                            class="artist text-sm font-normal white-72 max-w-[60%] truncate"
                            v-if="store.loadedSong.value"
                        >
                            {{ state.info.description }}
                        </span>
                        <v-skeleton-loader
                            v-else
                            type="text"
                            width="150px"
                        ></v-skeleton-loader>
                    </div>
                    <v-icon
                        icon="mdi-heart-outline"
                        class="ml-5 cursor-pointer hidden lg:block"
                        size="20"
                    >
                    </v-icon>
                </div>
                <!-- ANCHOR layout center --------------------------------- -->
                <div
                    class="npb-layout-center w-[85%] md:w-[55%] lg:w-2/4 flex-shrink-1 flex flex-col justify-center items-center"
                >
                    <div
                        class="npb-layout-center-controls flex items-center justify-center mb-1"
                    >
                        <button
                            class="--controls-btn --controls-shuffle"
                            @click.stop="shuffle"
                        >
                            <v-icon
                                icon="mdi-shuffle-variant"
                                class="white-72 hover:text-white hover:font-bold"
                            >
                            </v-icon>
                        </button>
                        <button
                            class="--controls-btn --controls-prev"
                            @click.stop="nextOrPrev('prev')"
                        >
                            <v-icon
                                icon="mdi-skip-previous"
                                class="white-72 hover:text-white hover:font-bold"
                            >
                            </v-icon>
                        </button>
                        <button
                            class="--controls-btn --controls-playOrPause"
                            @click.stop="playOrPause"
                        >
                            <v-icon
                                :icon="renderIconPlayPause"
                                class="text-white"
                                v-if="store.loadedSong.value"
                            >
                            </v-icon>
                            <v-progress-circular
                                v-else
                                width="3"
                                indeterminate
                                color="#1db954"
                            ></v-progress-circular>
                        </button>
                        <button
                            class="--controls-btn --controls-next"
                            @click.stop="nextOrPrev('next')"
                        >
                            <v-icon
                                icon="mdi-skip-next"
                                class="white-72 hover:text-white hover:font-bold"
                            >
                            </v-icon>
                        </button>
                        <button
                            class="--controls-btn --controls-repeat"
                            @click="setRepeat"
                        >
                            <v-icon :icon="renderIconRepeat" class="white">
                            </v-icon>
                        </button>
                    </div>
                    <!-- ANCHOR end controls --------------------------------- -->
                    <div
                        class="npb-layout-center-timeLine w-[100%] sm:w-[400px] xl:w-[626px]"
                        @mouseenter="timeLineHover('in')"
                        @mouseleave="timeLineHover('out')"
                    >
                        <input
                            type="range"
                            id="songProgress"
                            :value="state.progress"
                            step="1"
                            min="0"
                            max="100"
                            @input="onInputChangeProgress"
                        />
                    </div>
                    <!-- ANCHOR end progress --------------------------------- -->
                </div>

                <!-- ANCHOR end --------------------------------- -->
                <div
                    class="npb-layout-end items-center justify-end ml-4 lg:pr-10 flex-shrink-1 w-[15%] md:w-[30%] flex lg:w-1/4"
                >
                    <div class="npb-layout-end-time mr-6 hidden sm:flex">
                        <span id="npb-layout-timeupdate">0:00</span>
                        <span class="px-1">/</span>
                        <span id="npb-layout-duration">0:00</span>
                    </div>

                    <!-- ANCHOR end layout-end-time --------------------------------- -->
                    <!-- volume -->
                    <div
                        class="npb-layout-end-volume z-[5000] absolute top-[-24px] p-1 rounded-lg bg-dvs-gray-1 right-5 md:right-0 md:p-0 md:top-0 md:bg-transparent md:rounded-none md:relative md:flex items-center"
                        v-show="showVolume"
                    >
                        <v-icon
                            :icon="
                                state.volumeOff
                                    ? 'mdi-volume-off'
                                    : 'mdi-volume-high'
                            "
                            class="mr-3"
                            size="24"
                            @click.stop="switchVolume"
                        ></v-icon>
                        <input
                            type="range"
                            id="songVolume"
                            :value="state.progressVolume"
                            min="0"
                            max="100"
                            @input="changeVolume"
                        />
                    </div>
                    <!-- menu up -->
                    <v-icon
                        icon="mdi-volume-high"
                        class="mr-2 cursor-pointer md:hidden"
                        size="large"
                        @click.stop="emitToggleVol"
                    ></v-icon>
                    <v-icon
                        :icon="iconMenu"
                        class="ml-2 cursor-pointer"
                        @click.stop="clickNav"
                        size="42"
                    ></v-icon>

                    <!-- ANCHOR end layout-end-volume --------------------------------- -->
                </div>
            </div>
        </div>
    </v-bottom-navigation>
</template>
<script>
import {
    reactive,
    toRef,
    watch,
    getCurrentInstance,
    computed,
    toRefs,
} from "vue";
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
import { notify } from "@kyvg/vue3-notification";
import { useMusicRoom } from "@/stores/MusicRoom";
import { useAuthStore } from "@/stores/AuthStore";
export default {
    props: {
        showVolume: {
            default: true,
        },
    },
    setup(props, ctx) {
        const { proxy } = getCurrentInstance();
        const auth = useAuthStore();
        // SECTION Store //////////////////////////////////////////////////////

        // const storeCurrentSong = localStorage.getItem("currentSong")
        //     ? JSON.parse(localStorage.getItem("currentSong"))
        //     : null;
        // if (storeCurrentSong) {
        //     useStore.loadSong(storeCurrentSong.id, false, storeCurrentSong.plf);
        // }

        // !SECTION End Store //////////////////////////////////////////////////////
        const useStore = useSongPlay();
        const { showVolume } = toRefs(props);
        const { showPlayerPage } = storeToRefs(useStore);
        const musicRoom = useMusicRoom();
        // SECTION State //////////////////////////////////////////////////////
        const initData = () => {
            return {
                elAudio: null,
                progress: 0,
                progressVolume: useStore.settings.volume,
                volumeOff: false,
                playTime: 0,
                data: [],
                snackbarError: true,
                snackbarMsg: "test",
                info: {},
                repeat: "playlist",
                shuffle: localStorage.getItem("shuffle")
                    ? localStorage.getItem("shuffle")
                    : "off",
            };
        };

        const stateReactive = reactive({ ...initData() });

        // !SECTION End State //////////////////////////////////////////////////////

        useStore.loadStorage();

        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////

        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////
        const initChannelUser = () => {
            auth.channel = window.Echo.private(`user.` + auth.user.id).listen(
                "updateCurrentSong",
                function (e) {
                    console.log(e);
                }
            );
        };
        // SECTION Computed //////////////////////////////////////////////////////
        const listenEventMusicRoom = () => {
            musicRoom.channel.listen("updateCurrentSong", function (e) {
                console.log(e);
            });
        };

        // ///
        const renderIconPlayPause = computed(() => {
            if (useStore.isPlaying) return "mdi-pause-circle";
            if (useStore.isPaused) return "mdi-play-circle";
        });
        const iconMenu = computed(() => {
            return showPlayerPage.value ? "mdi-menu-down" : "mdi-menu-up";
        });
        const renderIconRepeat = computed(() => {
            switch (stateReactive.repeat) {
                case "song":
                    return "mdi-repeat-once";

                default:
                    return "mdi-repeat";
            }
        });
        // !SECTION End Computed //////////////////////////////////////////////////////

        // SECTION Methods //////////////////////////////////////////////////////
        // ANCHOR play song //////////////////////////////////////////////////////
        const playOrPause = (e) => {
            if (!useStore.loadedSong) return;
            return useStore.playOrPause();
        };
        const setInfo = () => {
            stateReactive.info = useStore.currentSong.info;
            switch (stateReactive.info.plf) {
                case "st":
                    stateReactive.info["image"] =
                        stateReactive.info.images[2].url;
                    break;

                default:
                    stateReactive.info["image"] =
                        stateReactive.info.images.medium.url;

                    break;
            }
        };
        // ANCHOR update time  //////////////////////////////////////////////////////

        const setDuration = () => {
            new Promise(function (resolve) {
                useStore.currentSong.el.addEventListener(
                    "loadedmetadata",
                    function () {
                        resolve(useStore.currentSong.el.duration);
                    }
                );
            }).then((length) => {
                document.getElementById("npb-layout-duration").innerText =
                    proxy.$formatTime(length);
            });
        };
        // ANCHOR change input range //////////////////////////////////////////////////////
        const onInputChangeProgress = (e) => {
            const target = e.target;
            stateReactive.progress =
                ((target.value - target.min) / (target.max - target.min)) * 100;
            useStore.updateSettings({
                currentTime:
                    (useStore.currentSong.el.duration * target.value) / 100,
            });
        };
        // ANCHOR render background progress and volume //////////////////////////////////////////////////////
        const renderBgSongProgress = (value) => {
            const el = document.getElementById("songProgress");
            const width = value ? value : stateReactive.progress;
            el.style.background =
                "linear-gradient(to right, #1db954 0%, #1db954 " +
                width +
                "%, hsla(0, 0%, 100%, 0.3) " +
                width +
                "%, hsla(0, 0%, 100%, 0.3))";
        };
        const renderBgSongVolume = () => {
            const el = document.getElementById("songVolume");
            return (el.style.background =
                "linear-gradient(to right, #1db954 0%, #1db954 " +
                stateReactive.progressVolume +
                "%, hsla(0, 0%, 100%, 0.3) " +
                stateReactive.progressVolume +
                "%, hsla(0, 0%, 100%, 0.3))");
        };
        // ANCHOR change volume //////////////////////////////////////////////////////
        const changeVolume = (e) => {
            const target = e.target;
            stateReactive.progressVolume =
                ((target.value - target.min) / (target.max - target.min)) * 100;
        };
        const switchVolume = (e) => {
            stateReactive.volumeOff = !stateReactive.volumeOff;
        };
        // ANCHOR next or prev //////////////////////////////////////////////////////
        const nextOrPrev = (type = "next") => {
            if (!useStore.loadedSong)
                return notify({
                    text: "Action cannot be performed while loading",
                    type: "error",
                    position: "top center",
                });
            useStore.resetSong();
            stateReactive.progress = 0;
            useStore.nextOrPrevSong(type);
        };
        const shuffle = () => {
            useStore.shufflePlaylist();
            return notify({
                text: "Mixed playlist",
                type: "success",
                position: "top center",
            });
        };
        const timeUpdate = () => {
            const el = document.getElementById("npb-layout-timeupdate");
            const value =
                (useStore.currentSong.el.currentTime /
                    useStore.currentSong.el.duration) *
                100;

            if (!isNaN(value)) {
                el.innerText = proxy.$formatTime(
                    useStore.currentSong.el.currentTime
                );
                stateReactive.progress = value.toFixed();
            }
        };
        const listenerEvent = () => {
            const elAudio = useStore.currentSong.el;

            elAudio.addEventListener("timeupdate", function () {
                timeUpdate();
            });

            return;
        };
        const timeLineHover = (t) => {
            const elProgress = document.getElementById("songProgress");
            if (t === "in") {
                elProgress.classList.add("activeSliderThumb");
            } else {
                elProgress.classList.remove("activeSliderThumb");
            }
        };
        const setRepeat = () => {
            if (stateReactive.repeat === "playlist")
                return (stateReactive.repeat = "song");
            return (stateReactive.repeat = "playlist");
        };
        const clickNav = () => {
            useStore.togglePlayerPage();
        };
        const emitToggleVol = () => {
            return ctx.emit("toggle-vol");
        };
        // !SECTION End Methods //////////////////////////////////////////////////////

        // SECTION Watch //////////////////////////////////////////////////////
        watch(
            () => useStore.currentSong.id,
            (newIndex) => {
                setDuration();
            }
        );
        watch(
            () => useStore.loadedSong,
            (loaded) => {
                if (loaded) {
                    stateReactive.data = useStore.currentSong.data;
                    setInfo();
                    setDuration();
                    listenerEvent();
                    renderBgSongVolume();
                }
            }
        );
        watch(
            () => stateReactive.progress,
            (newVal) => {
                if (newVal === isNaN || newVal >= 100) {
                    stateReactive.progress = 0;
                }
                renderBgSongProgress(newVal);
                if (newVal >= 100) {
                    if (stateReactive.repeat === "song") {
                        useStore.loopSong();
                    } else {
                        nextOrPrev("next");
                    }
                }
            }
        );
        // ANCHOR end progress //////////////////////////////////////////////////////
        watch(
            () => stateReactive.progressVolume,
            (volume) => {
                renderBgSongVolume();
                stateReactive.volumeOff = volume <= 1;
                useStore.updateSettings({
                    volume: volume,
                    volumeOff: stateReactive.volumeOff,
                });
            }
        );
        watch(
            () => stateReactive.volumeOff,
            (isOff) => {
                if (isOff) {
                    stateReactive.progressVolume = 0;
                } else {
                    stateReactive.progressVolume =
                        localStorage.getItem("songVolume");
                }
            }
        );
        watch(
            () => auth.isAuthenticated,
            (isAuthenticated) => {
                if (isAuthenticated) {
                    initChannelUser();
                }
            }
        );
        watch(
            () => musicRoom.channel,
            (channel) => {
                if (channel) {
                    listenEventMusicRoom();
                }
            }
        );
        // ANCHOR end volume //////////////////////////////////////////////////////
        // !SECTION End Watch //////////////////////////////////////////////////////

        // SECTION return //////////////////////////////////////////////////////
        return {
            // ANCHOR data //////////////////////////////////////////////////////
            state: toRef(stateReactive),
            store: storeToRefs(useStore),
            // ANCHOR computed //////////////////////////////////////////////////////
            renderIconPlayPause,
            renderIconRepeat,
            // ANCHOR methods //////////////////////////////////////////////////////
            renderBgSongProgress,
            onInputChangeProgress,
            changeVolume,
            switchVolume,
            playOrPause,
            nextOrPrev,
            timeLineHover,
            shuffle,
            setRepeat,
            clickNav,
            iconMenu,
            emitToggleVol,
        };
        // !SECTION //////////////////////////////////////////////////////
    },
};
</script>
<style lang="scss">
#now-playing-bar {
    z-index: 1020 !important;
    width: 100% !important;
    left: 0 !important;
    background: rgba(18, 18, 18, 0.64);
    height: $heightBottom !important;
    backdrop-filter: blur(74px);
    &-content {
        width: 100%;
        height: 100%;
        .npb-layout {
            &-center {
                &-controls {
                    button {
                        height: 32px;
                        width: 32px;
                        margin: 0px 12px;
                    }
                    .--controls-playOrPause {
                        height: 36px;
                        width: 36px;
                        i {
                            font-size: 36px;
                        }
                    }
                    i {
                        font-size: 24px;
                    }
                }
                &-timeLine {
                    input {
                        background: hsla(0, 0%, 100%, 0.3);
                        height: 4px;
                        border-radius: 8px;
                        width: 100%;
                        margin-bottom: 8px;
                        transition: all 0.25s linear;
                        &::-webkit-slider-thumb {
                            width: 0;
                            -webkit-appearance: none;
                            height: 0;
                            background: white;
                            border-radius: 50%;
                        }
                    }
                }
            }
            // ANCHOR end center //////////////////////////////////////////////////////
            &-end {
                #songVolume {
                    background: hsla(0, 0%, 100%, 0.3);
                    height: 4px;
                    border-radius: 8px;
                    width: 100px;
                    &::-webkit-slider-thumb {
                        width: 12px;
                        -webkit-appearance: none;
                        height: 12px;
                        background: white;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
    .activeSliderThumb {
        &::-webkit-slider-thumb {
            width: 12px !important;
            -webkit-appearance: none;
            height: 12px !important;
            background: white;
            border-radius: 50%;
        }
    }
}
</style>
