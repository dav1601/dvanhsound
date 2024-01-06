<template>
    <div class="core-slide w-full">
        <div
            class="flex justify-between items-center core-slide-header mb-5 flex-wrap w-full"
        >
            <div class="flex-1 mr-5">
                <slot name="header-start"></slot>
            </div>
            <div class="flex-grow-1 md:flex-grow-0">
                <div class="flex items-center justify-end mr-6">
                    <slot name="header-btn"></slot>
                    <v-btn
                        icon="mdi-chevron-left"
                        class="mx-4"
                        @click.stop="nextOrPrev('p')"
                        size="small"
                    ></v-btn>
                    <v-btn
                        icon="mdi-chevron-right"
                        @click.stop="nextOrPrev()"
                        size="small"
                    ></v-btn>
                </div>
            </div>
        </div>
        <!-- core slide swiper -->
        <!-- :breakpoints="{
                    '320': {
                        slidesPerView: 1,
                        slidesGroup: 1,
                        spaceBetween: 10,
                    },
                    '375': {
                        slidesPerView: 2,
                        slidesGroup: 2,
                    },
                    '567': {
                        slidesPerView: 3,
                        slidesGroup: 3,
                    },
                    '768': {
                        slidesPerView: 3,
                        slidesGroup: 3,
                    },
                    '1024': {
                        slidesPerView: 5,
                        slidesGroup: 4,
                    },
                    '1280': {
                        slidesPerView: 6,
                        slidesGroup: 4,
                    },
                    '1536': {
                        slidesPerView: 8,
                        slidesGroup: 4,
                    },
                }" -->
        <div class="core-slide-content">
            <swiper
                slidesPerView="auto"
                :spaceBetween="10"
                :slidesPerGroup="2"
                :modules="modules"
                :id="'slide-' + id"
                :key="'slide-' + id"
                v-if="isLoaded"
            >
                <slot name="items"></slot>
            </swiper>
            <swiper
                slidesPerView="auto"
                :spaceBetween="10"
                :slidesPerGroup="2"
                :modules="modules"
                :id="'slide-ske-' + id"
                :key="'slide-ske-' + id"
                v-else
            >
                <slot name="skeleton"></slot>
            </swiper>
        </div>
    </div>
</template>
<script>
import { Swiper } from "swiper/vue";
import { Scrollbar, A11y, EffectCoverflow, Pagination } from "swiper/modules";
import { toRefs } from "vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default {
    components: { Swiper },
    props: {
        isLoaded: false,
        id: {
            required: true,
        },
    },
    setup(props) {
        const { isLoaded } = toRefs(props);
        const nextOrPrev = (t = "n") => {
            const el = document.getElementById("slide-" + props.id).swiper;
            if (t === "n") return el.slideNext();
            return el.slidePrev();
        };

        return {
            modules: [Scrollbar, A11y, EffectCoverflow, Pagination],
            nextOrPrev,
            isLoaded,
        };
    },
};
</script>
<style lang=""></style>
