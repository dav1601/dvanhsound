<template>
    <div class="flex items-center gap-4 w-full overflow-hidden">
        <v-img
            :src="src"
            :width="sizeImage"
            :height="sizeImage"
            :max-height="sizeImage"
            :max-width="sizeImage"
            class="rounded-full"
            cover
            v-if="isLoaded && src"
        >
        </v-img>
        <v-icon
            :size="sizeImage"
            class="rounded-full"
            :icon="icon"
            v-if="isLoaded && icon"
        ></v-icon>
        <!-- ske -->
        <div
            v-if="!isLoaded"
            class="rounded-full bg-gray-500 animate-pulse w-[56px] h-[56px]"
            :class="`w-[${sizeImage}px] h-[${sizeImage}px]`"
        ></div>
        <div
            class="font-medium dark:text-white flex-1 w-full overflow-hidden"
            v-if="isLoaded"
        >
            <span class="truncate d-block w-full" v-if="name">{{ name }}</span>
            <div
                class="text-sm text-gray-500 dark:text-gray-400 truncate w-full"
                v-if="desc"
            >
                {{ desc }}
            </div>
        </div>

        <!-- ske -->
        <div
            v-else
            class="w-[150px] h-[20px] rounded-lg bg-gray-500 animate-pulse"
        ></div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        name: null,
        desc: null,
        src: null,
        sizeImage: { default: 56 },
        isLoaded: false,
        icon: null,
    },
};
</script>
<style lang=""></style>
