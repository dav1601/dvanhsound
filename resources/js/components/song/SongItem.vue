<template>
    <div
        class="playlist-grid-td flex justify-start items-center cursor-pointer pl-5 rounded-md py-2"
    >
        <div class="flex-1 max-w-[2%]">
            <span
                class="w-[24px] h-[24px] block text-white font-semibold"
                v-if="isLoaded"
            >
                {{ index }}
            </span>
            <div
                class="w-[24px] h-[24px] animate-pulse bg-gray-500 rounded"
                v-else
            ></div>
        </div>
        <div class="flex-1 max-w-[53%] pr-10 flex items-center justify-start">
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
            <div
                v-else
                class="w-[40px] h-[40px] rounded bg-gray-500 animate-pulse"
            ></div>
            <div
                class="flex-1 flex flex-col justify-center items-start ml-3 overflow-hidden"
            >
                <!-- title -->
                <span
                    class="text-white font-semibold truncate d-block w-100 mb-1"
                    v-if="isLoaded"
                >
                    {{ state.info.title }}
                </span>

                <div
                    v-else
                    class="w-[280px] h-[14px] rounded bg-gray-500 animate-pulse"
                ></div>
                <!-- desc -->
                <span
                    class="text-sm text-gray-500 truncate d-block"
                    v-if="isLoaded"
                    >{{ item.plf === "yt" ? "" : state.info.description }}</span
                >
                <div
                    v-if="!isLoaded"
                    class="w-[200px] h-[10px] mt-1 rounded bg-gray-500 animate-pulse"
                ></div>
            </div>
        </div>
        <div class="flex-1 max-w-[27%] overflow-hidden">
            <span
                v-if="isLoaded"
                class="text-sm font-normal text-gray-500 truncate d-block"
            >
                {{ albumOrChannel }}
            </span>
            <div
                v-else
                class="w-[100%] h-[20px] rounded-xl bg-gray-500 animate-pulse"
            ></div>
        </div>
        <div class="flex-1 max-w-[18%] flex justify-end pr-4">
            <div class="w-full h-full" v-if="isLoaded"></div>
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
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
export default {
    props: {
        item: null,
        index: null,
        isLoaded: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const initData = () => {
            return {
                isHover: false,
                info: {},
            };
        };
        const stateReactive = reactive({ ...initData() });
        const storeSongPlay = useSongPlay();
        const { isLoaded } = toRefs(props);
        const setInfo = () => {
            stateReactive.info = {
                ...storeSongPlay.getInfoSongByPlf(props.item, props.item.plf),
            };
        };
        const songImage = computed(() => {
            let url = "";
            if (isLoaded) {
                switch (props.item.plf) {
                    case "st":
                        url = stateReactive.info.images[2].url;
                        break;

                    default:
                        url = stateReactive.info.images.default.url;
                        break;
                }
            }

            return url;
        });
        const albumOrChannel = computed(() => {
            let string = "";
            switch (props.item.plf) {
                case "st":
                    string = props.item.album.name;
                    break;

                default:
                    string = props.item.snippet.videoOwnerChannelTitle;
                    break;
            }
            return string;
        });

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
