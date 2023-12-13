<template>
    <!-- SECTION template --------------------------------- -->
    <div
        :id="'song-item-' + index"
        class="song-item"
        @mouseenter="data.isHover = true"
        @mouseleave="data.isHover = false"
        @click.stop="clickItem"
    >
        <div class="song-item-grid">
            <div class="song-item-index text-white font-semibold">
                <span
                    v-if="!selfPlaying && !data.isHover"
                    :class="{ acitve: data.active }"
                >
                    {{ index + 1 }}</span
                >
                <v-icon
                    icon="mdi-play"
                    v-if="!selfPlaying && data.isHover"
                    @click.stop="clickBtn"
                ></v-icon>
                <v-icon
                    icon="mdi-pause"
                    @click.stop="clickBtn"
                    v-if="selfPlaying && data.isHover"
                ></v-icon>
                <equaliser-loading
                    v-if="selfPlaying && !data.isHover"
                    width="18px"
                    height="18px"
                ></equaliser-loading>
            </div>
            <!-- ANCHOR end index --------------------------------- -->
            <div
                class="song-item-image-title flex items-center justify-start pr-10"
            >
                <v-img
                    :src="song.image"
                    :alt="song.title"
                    style="border-radius: 12px"
                    max-width="54"
                    max-height="54"
                    height="54"
                    width="54"
                    cover
                ></v-img>

                <span
                    class="song-item-title flex-1 truncate ml-4 font-bold text-white"
                    :class="{ acitve: data.active }"
                >
                    {{ song.title }}
                </span>
            </div>
            <!-- ANCHOR end image title --------------------------------- -->
            <div class="song-item-listeners flex justify-start items-center">
                <v-img
                    :src="$assetImg('headphone.svg')"
                    width="24px"
                    height="24px"
                    max-width="24px"
                ></v-img>
                <span class="font-bold ml-3 text-white">
                    {{ song.views }}
                </span>
            </div>
            <!-- ANCHOR end listeners --------------------------------- -->
            <div class="song-item-duration flex justify-start items-center">
                <v-img
                    max-width="24"
                    max-height="24"
                    :src="$assetImg('clock.svg')"
                ></v-img>
                <span
                    :id="'song-duration-' + index"
                    class="ml-3 font-bold text-white"
                    >00:00</span
                >
            </div>
            <!-- ANCHOR end duration --------------------------------- -->
            <div
                class="song-item-heart"
                @mouseenter="setHeart(true)"
                @mouseleave="setHeart(false)"
            >
                <v-icon
                    :icon="data.activeHeart ? 'mdi-heart' : 'mdi-heart-outline'"
                    :color="data.activeHeart ? 'red' : ''"
                ></v-icon>
            </div>
            <!-- ANCHOR end heart --------------------------------- -->
            <div class="song-item-actions ml-15">
                <v-icon icon="mdi-dots-horizontal"></v-icon>
            </div>
            <!-- ANCHOR end actions --------------------------------- -->
        </div>
    </div>
    <!-- <v-divider v-if="!isLast"></v-divider> -->
    <!-- !SECTION --------------------------------- -->
</template>
<script>
import { reactive, getCurrentInstance, onMounted, computed, watch } from "vue";
import EqualiserLoading from "@/components/app/loading/EqualiserLoading.vue";
import { useDatabaseApp } from "@/stores/database";
import { storeToRefs } from "pinia";
export default {
    props: ["song", "index", "isLast"],
    components: { EqualiserLoading },
    setup(props) {
        const { proxy } = getCurrentInstance();
        const useStore = useDatabaseApp();
        // SECTION store //////////////////////////////////////////////////////

        // !SECTION
        // SECTION state //////////////////////////////////////////////////////
        const initData = () => {
            return {
                activeHeart: false,
                isHover: false,
                active: props.index == useStore.currentSong.index,
            };
        };
        const reactiveData = reactive({ ...initData() });

        // !SECTION  end state //////////////////////////////////////////////////////
        // SECTION life cricle //////////////////////////////////////////////////////
        // ANCHOR mounted //////////////////////////////////////////////////////
        onMounted(() => {
            getDuration(props.song.source).then(function (length) {
                const dur = proxy.$formatTime(length);
                const el = document.getElementById(
                    "song-duration-" + props.index
                );
                if (el) {
                    el.textContent = dur;
                }
            });
        });
        // !SECTION end lc //////////////////////////////////////////////////////
        // SECTION computed //////////////////////////////////////////////////////
        const isActive = computed(() => {
            return props.index == useStore.currentSong.index ? true : false;
        });
        const selfPlaying = computed(() => {
            return isActive.value && useStore.isPlaying ? true : false;
        });

        // !SECTION end compued //////////////////////////////////////////////////////
        // SECTION methods //////////////////////////////////////////////////////
        // ANCHOR get duration //////////////////////////////////////////////////////
        const getDuration = (src) => {
            return new Promise(function (resolve) {
                let audio = new Audio();
                audio.addEventListener("loadedmetadata", function () {
                    resolve(audio.duration);
                });
                audio.src = src;
            });
        };
        const setHeart = (active = true) => {
            reactiveData.activeHeart = active;
        };
        const clickItem = () => {
            if (reactiveData.active) {
                return useStore.playOrPause();
            }
            useStore.startSong(props.index);
        };
        const clickBtn = () => {
            useStore.playOrPause();
        };

        // ANCHOR hover song item

        // !SECTION end methos  //////////////////////////////////////////////////////

        // SECTION watch //////////////////////////////////////////////////////

        // !SECTION end watch //////////////////////////////////////////////////////
        // ANCHOR return //////////////////////////////////////////////////////

        return {
            setHeart,
            clickItem,
            clickBtn,

            selfPlaying,
            store: storeToRefs(useStore),
            data: reactiveData,
        };
    },
};
</script>
<style lang="scss">
.song-item {
    &:hover {
        background-color: hsla(0, 0%, 100%, 0.1);
        transition: background-color 0.5s ease;
    }
    &-grid {
        display: flex;

        align-items: center;
    }
    &-index {
        flex: 0 0 24px;
        max-width: 24px;
        margin-right: 24px;
    }
    &-image-title {
        flex: 1;
    }
    &-listeners {
        flex: 0 0 200px;
        max-width: 200px;
    }
    &-duration {
        flex: 0 0 100px;
        max-width: 100px;
        margin-left: 70px;
        margin-right: 62px;
    }
    &-heart {
        flex: 0 0 20px;
        max-width: 20px;
    }
    &-actions {
        flex: 0 0 24px;
        max-width: 24px;
    }

    padding: 8px 19px;
    border-radius: 8px;
    cursor: pointer;
    .acitve {
        color: $green !important;
        font-weight: bold !important;
    }
    // &:first-child {
    //     padding-top: 0;
    // }
    // &:last-child {
    //     padding-bottom: 0;
    // }
}
</style>
