<template lang="">
    <div
        id="contentHeader"
        class="content-spacing px-3 md:!px-[30px] h-[340px] max-h-[400px] pb-6 relative flex"
    >
        <div
            class="w-full h-full flex justify-start items-center mt-10 sm:!mt-0 sm:items-end flex-1"
            v-if="isLoaded"
        >
            <img
                class="rounded-md w-[160px] h-[160px] sm:w-[232px] sm:h-[232px] object-cover object-center drop-shadow-lg"
                :src="image"
                id="content-header-image"
            />
            <img src="" id="getColor" class="hidden" alt="" />
            <div class="content flex flex-column justify-end ml-6 flex-1">
                <span class="font-semibold">{{ type }}</span>
                <h1
                    class="mt-4 mb-3 text-xl sm:text-2xl md:4xl lg:6xl xl:7xl font-bold line-clamp-2"
                    id="content-header-title"
                >
                    {{ title }}
                </h1>
                <span
                    class="text-[#BEBEBD] text-sm mb-2"
                    v-html="description"
                    v-if="description"
                >
                </span>
                <div class="flex justify-start items-center">
                    <slot></slot>
                </div>
            </div>
        </div>
        <!-- skeleton -->
        <div
            class="w-full h-full bg-gray-700 animate-pulse bg-opacity-25 z-[2] dva-abs-full"
            v-else
        ></div>

        <div
            class="dva-abs-full bg-gradient-to-b z-[-1] transition-colors ease-in-out delay-[2000]"
            :style="gadientMain"
        ></div>
        <div
            class="z-[-1] block left-0 bg-gradient-to-b opacity-25 absolute bottom-[-232px] h-[232px] w-full transition-colors ease-in-out delay-[2000]"
            :style="gadientSub"
        ></div>
    </div>
</template>
<script>
import ColorThief from "../../../node_modules/colorthief/dist/color-thief.mjs";
import {
    toRefs,
    reactive,
    toRef,
    computed,
    watch,
    onMounted,
    nextTick,
    onUpdated,
} from "vue";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const PlaylistRepository = RepositoryFactory.get("playlist");
export default {
    props: {
        title: {
            type: String,
            default: "title",
        },
        description: {
            type: String,
            default: "",
        },
        type: {
            typeof: String,
            default: "Playlsit",
        },
        image: {
            type: String,
            default: "",
        },
        isLoaded: {
            type: Boolean,
            default: false,
        },
        plf: {
            typeof: String,
            default: "yt",
        },
        id: null,
    },
    setup(props) {
        const initData = () => {
            return {
                mainColor: "#121212",
                mainRbg: [18, 18, 18],
            };
        };
        const stateReact = reactive({ ...initData() });
        const { isLoaded } = toRefs(props);
        const bgColor = (opacity = 0) => {
            return (
                `--tw-gradient-from: ${stateReact.mainColor} var(--tw-gradient-from-position);` +
                `--tw-gradient-to: rgb(${stateReact.mainRbg[0]} ${stateReact.mainRbg[1]} ${stateReact.mainRbg[2]} / ${opacity}) var(--tw-gradient-to-position);` +
                "--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);"
            );
        };
        const gadientMain = computed(() => {
            return bgColor(0.45);
        });
        const gadientSub = computed(() => {
            return bgColor();
        });

        const resize2fit = () => {
            const el = document.getElementById("el");
            if (!el.parentElement) return;
            el.style.setProperty("--font-size", "1rem");
            const { width: max_width, height: max_height } =
                el.getBoundingClientRect();
            const { width, height } = el.children[0].getBoundingClientRect();
            el.style.setProperty(
                "--font-size",
                Math.min(max_width / width, max_height / height) + "rem"
            );
        };
        const getColor = (url) => {
            const colorThief = new ColorThief();
            const img = document.getElementById("getColor");
            img.src = url;
            img.crossOrigin = "";

            img.onload = () => {
                // const pallet = colorThief.getPalette(img);
                // const color = pallet[1];
                const color = colorThief.getColor(img);
                stateReact.mainRbg = color;
                stateReact.mainColor =
                    "#" +
                    ((1 << 24) | (color[0] << 16) | (color[1] << 8) | color[2])
                        .toString(16)
                        .slice(1);
            };
        };
        const loadBg = () => {
            switch (props.plf) {
                case "yt":
                    PlaylistRepository.convertImage(props.image, props.id).then(
                        (res) => {
                            const { data } = res;
                            getColor(data);
                        }
                    );
                    break;

                default:
                    getColor(props.image);
                    break;
            }
        };
        onMounted(() => {});

        watch(
            isLoaded,
            (loaded) => {
                if (loaded) {
                    loadBg();
                }
            },
            {
                immediate: true, // Not lazy anymore
            }
        );
        return {
            state: toRef(stateReact),
            gadientMain,
            gadientSub,
        };
    },
};
</script>
<style lang="scss">
.content-header-mask {
    --tw-gradient-from: red var(--tw-gradient-from-position);
    --tw-gradient-to: rgb(18 18 18 / 0) var(--tw-gradient-to-position);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.stat {
    position: relative;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    color: #fff;
    &:not(:first-child) {
        margin-left: 20px;
    }
    &:not(:first-child)::before {
        content: "*";
        color: #fff;
        position: absolute;
        // margin: auto;
        left: -12px;
        top: 4px;
        // right: 0;
        // bottom: 0;
    }
}
</style>
