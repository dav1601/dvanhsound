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
                    "PLw-VjHDlEOgsT_dJQiZUQRGuR1f5fmGKm",
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
