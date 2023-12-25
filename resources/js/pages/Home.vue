<template>
    <div id="dvas-home" class="content-spacing">
        <v-alert
            v-model="state.alert"
            type="info"
            text="Music from YouTube will LOAD FASTER THAN Spotify"
            elevation="2"
            class="my-4"
            variant="tonal"
            border="start"
            border-color="info"
            closable
            close-label="Close Alert"
        ></v-alert>
        <div id="wp-frame-list">
            <div class="frame-list">
                <frame-item
                    v-for="item in state.arrayPlaylist"
                    :playlistId="item.id"
                    :plf="item.plf"
                    :key="item"
                ></frame-item>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, toRef } from "vue";
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
                        id: "37i9dQZEVXbLdGSmz6xilI",
                        plf: "st",
                    },
                    {
                        id: "37i9dQZF1DX4g8Gs5nUhpp",
                        plf: "st",
                    },
                    {
                        id: "37i9dQZF1DX0F4i7Q9pshJ",
                        plf: "st",
                    },
                    {
                        id: "37i9dQZEVXbL1G1MbPav3j",
                        plf: "st",
                    },
                ],
                alert: true,
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
            state: toRef(stateReactive),
        };
    },
};
</script>
<style lang="scss"></style>
