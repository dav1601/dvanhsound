<template>
    <div
        class="dvs-li max-w-full overflow-hidden min-h-12 hover:bg-dvs-gray-1 transition-all px-4 py-2 relative flex font-normal rounded-md items-center leading-6 justify-between cursor-pointer group"
        :class="{ ['bg-dvs-gray-1 border-l-4 border-l-[#1db954] ']: isActive }"
        v-bind="$attrs"
    >
        <div
            class="flex flex-shrink-1 items-center justify-start w-full h-full max-w-[90%] pr-2"
        >
            <v-icon :icon="icon" class="mr-5" v-if="icon"></v-icon>
            <slot name="icon"></slot>
            <!-- title -->
            <div class="dvs-list-item-title flex-1 overflow-hidden">
                <span
                    v-if="title"
                    class="block text-[#fff] truncate capitalize mt-1 max-w-full"
                    :class="{ ['font-bold']: isActive }"
                >
                    {{ title }}
                </span>
                <slot name="center"></slot>
            </div>
        </div>
        <div class="flex-1">
            <button
                class="rounded-full w-[24px] group-hover:flex h-[24px] items-center justify-center bg-white"
                :class="{ ['flex']: isActive, hidden: !isActive }"
            >
                <v-icon size="small" icon="mdi-play"></v-icon>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
    props: {
        title: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        playBtn: {
            type: Boolean,
            default: false,
        },
        to: null,
        isActive: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
<style lang="scss"></style>
