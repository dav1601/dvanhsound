<template>
    <!-- SECTION template --------------------------------- -->
    <div
        :id="'song-item-' + index"
        class="song-item"
        @mouseenter="data.isHover = true"
        @mouseleave="data.isHover = false"
    >
        <div class="song-item-grid">
            <div class="song-item-index text-white font-semibold">
                <span :class="{ 'd-none': data.isHover }">
                    {{ index + 1 }}</span
                >
                <v-icon
                    icon="mdi-play --play"
                    :class="{ 'd-none': !data.isHover }"
                ></v-icon>
                <v-icon icon="mdi-pause --pause" class="d-none"></v-icon>
                <equaliser-loading
                    :class="{ 'd-none': data.isHover || true }"
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
import { reactive, getCurrentInstance, onMounted } from "vue";
import EqualiserLoading from "@/components/app/loading/EqualiserLoading.vue";
export default {
    props: ["song", "index", "isLast"],
    components: { EqualiserLoading },
    setup(props) {
        const { proxy } = getCurrentInstance();

        // SECTION store //////////////////////////////////////////////////////

        // !SECTION
        // SECTION state //////////////////////////////////////////////////////
        const initData = () => {
            return {
                activeHeart: false,
                isHover: false,
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
            console.log(reactiveData.activeHeart);
        };

        // ANCHOR hover song item

        // !SECTION end methos  //////////////////////////////////////////////////////

        // SECTION watch //////////////////////////////////////////////////////

        // !SECTION end watch //////////////////////////////////////////////////////
        // ANCHOR return //////////////////////////////////////////////////////

        return {
            setHeart,
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
    // &:first-child {
    //     padding-top: 0;
    // }
    // &:last-child {
    //     padding-bottom: 0;
    // }
}
</style>
