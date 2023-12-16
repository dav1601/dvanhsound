<template>
    <div id="dvas-home">
        <div id="wp-frame-list">
            <div class="frame-list">
                <frame-item
                    v-for="item in state.arrayPlaylist.value"
                    :playlistId="item.id"
                    :plf="item.plf"
                    :key="item"
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
                    {
                        id: "PLUadgMpPaifXLKV26KIqpFp6mpZiyF2l9",
                        plf: "yt",
                    },
                    {
                        id: "37i9dQZF1DWVKJhbs54cBh",
                        plf: "st",
                    },
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
