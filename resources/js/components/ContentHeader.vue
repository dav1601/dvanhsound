<template>
    <div
        id="contentHeader"
        class="content-spacing h-[340px] max-h-[400px] pb-6 relative"
    >
        <div class="dva-abs-full bg-[#a0b8d0] z-[-1] content-header-mask"></div>

        <div class="w-100 h-100 flex justify-start items-end">
            <v-img
                width="auto"
                height="auto"
                max-width="232"
                max-height="232"
                class="rounded-md"
                src="https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7438c02cbeee407d99b4db43/2/vi/default"
            ></v-img>
            <div class="content flex flex-column justify-end ml-6">
                <span class="font-semibold">Playlist</span>
                <h1 class="mt-4 mb-3 text-7xl font-bold">Daily mix 2</h1>
                <span class="text-[#BEBEBD] text-sm mb-2"
                    >The Masked Singer, 2T, Táo và nhiều hơn nữa</span
                >
                <div class="flex justify-start items-center">
                    <span class="stat">dvanhsound</span>
                    <span class="stat">dvanhsound</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
