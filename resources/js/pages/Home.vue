<template>
    <div id="dvas-home">
        <div id="wp-frame-list">
            <div class="frame-list">
                <frame-item
                    v-for="plId in state.arrayPlaylist.value"
                    :playlistId="plId"
                    :key="'frame-' + plId"
                ></frame-item>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import FrameItem from "@/components/FrameItem.vue";

export default {
    components: { FrameItem },
    setup() {
        const initData = () => {
            return {
                arrayPlaylist: [
                    "PLUadgMpPaifXLKV26KIqpFp6mpZiyF2l9",
                    "RDCLAK5uy_k_IE5_xCeyf-wLiFUN7akVxWE4THyq35o",
                    "PLWrhnsc6Cvcrp7HmEWu8q0p95pRyGmpHi",
                    "PLzLX1sCOqQZb-VP7Ncs8h09KarEvh5v8i",
                    "PLpY7hx7jry7zc4zspi_fBhWQt8z5jrJ8z",
                    "PLw-VjHDlEOgsT_dJQiZUQRGuR1f5fmGKm",
                    "PLlD46yrpUbIV22mq_rZ0aITj3aldb0WAg",
                    "RDCLAK5uy_nmS3YoxSwVVQk9lEQJ0UX4ZCjXsW_psU8",
                    "PL4fGSI1pDJn6puJdseH2Rt9sMvt9E2M4i",
                    "RDCLAK5uy_kmPRjHDECIcuVwnKsx2Ng7fyNgFKWNJFs",
                    "PLVn0x_fJ3ZS9ivo9iv0Y9uvlV20EFKy8I",
                ],
            };
        };

        const stateReactive = reactive({ ...initData() });

        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////

        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////

        // SECTION Store //////////////////////////////////////////////////////

        // !SECTION End Store //////////////////////////////////////////////////////

        // SECTION State //////////////////////////////////////////////////////

        // !SECTION End State //////////////////////////////////////////////////////

        // SECTION Computed //////////////////////////////////////////////////////

        // !SECTION End Computed //////////////////////////////////////////////////////

        // SECTION Methods //////////////////////////////////////////////////////

        // !SECTION End Methods //////////////////////////////////////////////////////

        // SECTION Watch //////////////////////////////////////////////////////

        // !SECTION End Watch //////////////////////////////////////////////////////

        // SECTION return //////////////////////////////////////////////////////
        return {
            state: toRefs(stateReactive),
        };
    },
};
</script>
<style lang="scss"></style>
