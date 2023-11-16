<template>
    <v-bottom-navigation id="now-playing-bar" width="100vw" fixed>
        <div id="now-playing-bar-content" class="py-4 px-4">
            <div
                class="npb-layout flex justify-between items-center w-100 h-100"
            >
                <div
                    class="npb-layout-start col-4 flex justify-start items-center"
                >
                    <v-img
                        :src="currentSong.data.image"
                        max-width="56"
                        max-height="56"
                        class="rounded"
                    >
                    </v-img>
                    <div
                        class="title-artist flex flex-col justify-start items-start ml-4"
                    >
                        <span
                            class="title mb-2 text-lg text-white font-semibold"
                        >
                            {{ currentSong.data.title }}
                        </span>
                        <span class="artist text-sm font-normal white-72">
                            Allan Walker
                        </span>
                    </div>
                    <v-icon
                        icon="mdi-heart-outline"
                        class="ml-9 cursor-pointer"
                        size="20"
                    >
                    </v-icon>
                </div>
                <!-- ANCHOR layout center --------------------------------- -->
                <div class="npb-layout-center col-4">
                    <div
                        class="npb-layout-center-controls flex items-center justify-center mb-2"
                    >
                        <button class="--controls-btn --controls-shuffle">
                            <v-icon icon="mdi-shuffle-variant" class="white-72">
                            </v-icon>
                        </button>
                        <button class="--controls-btn --controls-prev">
                            <v-icon icon="mdi-skip-previous" class="white-72">
                            </v-icon>
                        </button>
                        <button
                            class="--controls-btn --controls-playOrPause"
                            @click="playSong"
                        >
                            <v-icon icon="mdi-play-circle" class="text-white">
                            </v-icon>
                        </button>
                        <button class="--controls-btn --controls-next">
                            <v-icon icon="mdi-skip-next" class="white-72">
                            </v-icon>
                        </button>
                        <button class="--controls-btn --controls-repeat">
                            <v-icon icon="mdi-repeat" class="white-72">
                            </v-icon>
                        </button>
                    </div>
                    <!-- ANCHOR end controls --------------------------------- -->
                    <div class="npb-layout-center-timeLine flex-1">
                        <input
                            type="range"
                            id="songProgress"
                            :value="state.progress.value"
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
                    class="npb-layout-end col-4 flex items-center justify-center"
                >
                    <div class="npb-layout-end-time">
                        <span id="npb-layout-timeupdate">0:00</span>
                        <span class="px-1">/</span>
                        <span id="npb-layout-duration">0:00</span>
                    </div>
                    <div class="npb-layout-end-volume flex items-center">
                        <input
                            type="range"
                            id="songVolume"
                            :value="state.progressVolume.value"
                            min="0"
                            max="100"
                            @input="changeVolume"
                        />
                    </div>
                </div>
            </div>
        </div>
    </v-bottom-navigation>
</template>
<script>
import { onMounted, reactive, toRefs, watch, getCurrentInstance } from "vue";
import { useDatabaseApp } from "@/stores/database";
import { storeToRefs } from "pinia";
export default {
    setup(props) {
        const { proxy } = getCurrentInstance();
        // SECTION Store //////////////////////////////////////////////////////
        const useStore = useDatabaseApp();
        useStore.setCurrentSong({ index: 1 });
        const currentSong = useStore.currentSong;
        // !SECTION End Store //////////////////////////////////////////////////////

        // SECTION State //////////////////////////////////////////////////////
        const initData = () => {
            return {
                elAudio: null,
                progress: 0,
                progressVolume: useStore.settings.volume,
            };
        };
        const stateReactive = reactive({ ...initData() });

        // !SECTION End State //////////////////////////////////////////////////////
        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////
        onMounted(() => {
            setDuration();
            renderBgSongVolume();

            currentSong.el.addEventListener("timeupdate", () => {
                // console.log(currentSong.el.duration);
            });
        });
        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////

        // SECTION Computed //////////////////////////////////////////////////////

        // !SECTION End Computed //////////////////////////////////////////////////////

        // SECTION Methods //////////////////////////////////////////////////////
        const playSong = () => {
            stateReactive.interval = setInterval(() => {
                if (stateReactive.progress < 100) {
                    stateReactive.progress += 10;
                } else {
                    clearInterval(stateReactive.interval);
                }
            }, 1000);

            useStore.playSong();
        };
        const saveSettings = () => {
            localStorage.setItem("songVolume", stateReactive.progressVolume);
        };
        const setDuration = () => {
            new Promise(function (resolve) {
                currentSong.el.addEventListener("loadedmetadata", function () {
                    resolve(currentSong.el.duration);
                });
            }).then((length) => {
                document.getElementById("npb-layout-duration").innerText =
                    proxy.$formatTime(length);
            });
        };
        const onInputChangeProgress = (e) => {
            const target = e.target;
            stateReactive.progress =
                ((target.value - target.min) / (target.max - target.min)) * 100;
        };
        const renderBgSongProgress = () => {
            const el = document.getElementById("songProgress");

            el.style.background =
                "linear-gradient(to right, #1db954 0%, #1db954 " +
                stateReactive.progress +
                "%, hsla(0, 0%, 100%, 0.3) " +
                stateReactive.progress +
                "%, hsla(0, 0%, 100%, 0.3))";
        };
        const renderBgSongVolume = () => {
            const el = document.getElementById("songVolume");
            // const progress = ((value - el.min) / (el.max - el.min)) * 100;
            return (el.style.background =
                "linear-gradient(to right, #1db954 0%, #1db954 " +
                stateReactive.progressVolume +
                "%, hsla(0, 0%, 100%, 0.3) " +
                stateReactive.progressVolume +
                "%, hsla(0, 0%, 100%, 0.3))");
        };
        const changeVolume = (e) => {
            const target = e.target;
            stateReactive.progressVolume =
                ((target.value - target.min) / (target.max - target.min)) * 100;
        };
        // !SECTION End Methods //////////////////////////////////////////////////////

        // SECTION Watch //////////////////////////////////////////////////////
        watch(
            () => stateReactive.progress,
            (newProgress) => {
                renderBgSongProgress();
            }
            // ANCHOR end progress //////////////////////////////////////////////////////
        );
        watch(
            () => stateReactive.progressVolume,
            (newVal) => {
                renderBgSongVolume();
                useStore.updateSettings({ volume: newVal });
            }
            // ANCHOR end progress //////////////////////////////////////////////////////
        );
        // !SECTION End Watch //////////////////////////////////////////////////////

        // SECTION return //////////////////////////////////////////////////////
        return {
            state: toRefs(stateReactive),
            renderBgSongProgress,
            playSong,
            onInputChangeProgress,
            currentSong,
            changeVolume,
            store: storeToRefs(useStore),
        };
    },
};
</script>
<style lang="scss">
#now-playing-bar {
    z-index: 1000000 !important;
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
                        margin-bottom: 18px;
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
            // ANCHOR end center //////////////////////////////////////////////////////
            &-end {
                #songVolume {
                    background: hsla(0, 0%, 100%, 0.3);
                    height: 4px;
                    border-radius: 8px;
                    width: 100%;
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
}
</style>
