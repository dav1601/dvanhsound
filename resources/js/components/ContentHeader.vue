<template lang="">
    <div
        id="contentHeader"
        class="content-spacing h-[340px] max-h-[400px] pb-6 relative flex"
    >
        <div
            class="w-full h-full flex justify-start items-end flex-1"
            v-if="isLoaded"
        >
            <img
                class="rounded-md w-[232px] h-[232px] object-cover object-center drop-shadow-lg"
                :src="image"
                id="content-header-image"
            />
            <div class="content flex flex-column justify-end ml-6 flex-1">
                <span class="font-semibold">{{ type }}</span>
                <h1
                    class="mt-4 mb-3 text-7xl font-bold"
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
            class="w-full h-full bg-gray-700 animate-pulse dva-abs-full bg-opacity-25 z-[2]"
            v-else
        ></div>

        <div
            class="dva-abs-full z-[-1] content-header-mask"
            :style="bgColor"
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
    },
    setup(props) {
        const initData = () => {
            return {
                mainColor: [40, 40, 40],
            };
        };
        const stateReact = reactive({ ...initData() });
        const { isLoaded } = toRefs(props);
        const bgColor = computed(() => {
            return {
                background: `rgb(${stateReact.mainColor[0]} ,${stateReact.mainColor[1]},${stateReact.mainColor[2]} )`,
            };
        });

        const resize2fit = () => {
            const el = document.getElementById("el");
            if (!el.parentElement) return;
            el.style.setProperty("--font-size", "1em");
            const { width: max_width, height: max_height } =
                el.getBoundingClientRect();
            const { width, height } = el.children[0].getBoundingClientRect();
            el.style.setProperty(
                "--font-size",
                Math.min(max_width / width, max_height / height) + "em"
            );
        };
        const getColor = (url) => {
            const colorThief = new ColorThief();
            const img = new Image();
            img.src = url;
            img.crossOrigin = "";
            img.onload = () => {
                const pallet = colorThief.getPalette(img);
                stateReact.mainColor = pallet[pallet.length - 1];
            };
        };
        const loadBg = () => {
            switch (props.plf) {
                case "yt":
                    PlaylistRepository.convertImage(props.image).then((res) => {
                        const { data } = res;
                        getColor(data);
                    });
                    break;

                default:
                    getColor(props.image);
                    break;
            }
        };
        onMounted(() => {});

        watch(
            isLoaded,
            async (loaded) => {
                if (loaded) {
                    await nextTick();
                    loadBg();
                }
            },
            {
                immediate: true, // Not lazy anymore
            }
        );
        return {
            state: toRef(stateReact),
            bgColor,
        };
    },
};
</script>
<style lang="scss">
.content-header-mask {
    -webkit-mask-image: linear-gradient(
        to top,
        rgba(18, 18, 18, 0.5),
        rgba(18, 18, 18, 1)
    );
    mask-image: linear-gradient(
        to top,
        rgba(18, 18, 18, 0.2),
        rgba(18, 18, 18, 1)
    );
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
