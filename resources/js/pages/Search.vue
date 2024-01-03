<template>
    <div id="search" v-if="hasList">
        <HlTrack :tracks="topTracksYt" plf="yt" />
        <HlTrack :tracks="topTracksSt" plf="st" />
    </div>
    <div v-else>
        <h1 class="mx-auto font-bold text-2xl my-20 block text-center">
            Tìm kiếm mọi bài hát , danh sách phát , podcast mà bạn muốn nghe
        </h1>
    </div>
</template>
<script>
import { useRoute } from "vue-router";
import { watch, reactive, computed } from "vue";
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
import { isEmpty } from "lodash";
import HlTrack from "@/components/app/HlTrack.vue";
export default {
    components: { HlTrack },
    setup() {
        const route = useRoute();
        const storeSong = useSongPlay();
        const initData = () => {
            return {};
        };
        const numberOfElements = 4;
        const { searchListRender } = storeToRefs(storeSong);
        const topTracksYt = computed(() => {
            if (searchListRender.value.hasOwnProperty("yt"))
                return searchListRender.value["yt"]["youtube#video"].filter(
                    (element, index) => index < numberOfElements
                );
            return [];
        });
        const hasList = computed(() => {
            return !isEmpty(searchListRender.value);
        });
        const topTracksSt = computed(() => {
            if (searchListRender.value.hasOwnProperty("st"))
                return searchListRender.value["st"]["tracks"]["items"].filter(
                    (element, index) => index < numberOfElements
                );
            return [];
        });

        return {
            topTracksYt,
            topTracksSt,
            searchListRender,
            hasList,
        };
    },
};
</script>
<style lang=""></style>
