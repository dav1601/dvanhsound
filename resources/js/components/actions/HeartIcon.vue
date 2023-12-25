<template lang="">
    <v-icon
        :icon="activeHeart ? 'mdi-heart' : 'mdi-heart-outline'"
        :color="activeHeart ? '#1db954' : ''"
        class="cursor-pointer"
        v-bind="attr"
        @mouseenter="activeHeart = true"
        @mouseleave="activeHeart = false"
    ></v-icon>
</template>
<script>
import { useAttrs, ref } from "vue";

export default {
    setup(props) {
        const attr = useAttrs();
        const activeHeart = ref(false);
        return {
            attr,
            activeHeart,
        };
    },
};
</script>
<style lang=""></style>
