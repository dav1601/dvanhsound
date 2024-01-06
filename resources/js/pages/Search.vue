<template>
    <div id="search" v-if="hasList || isSearching">
        <HlTrack :tracks="topTracksYt" plf="yt" />
        <HlTrack :tracks="topTracksSt" plf="st" />
        <div class="search-playlist-yt content-spacing my-10">
            <core-slide
                :isLoaded="!isSearching && isSearched"
                id="search-yt-playlist"
                key="slide-1"
            >
                <template v-slot:header-start>
                    <v-skeleton-loader
                        v-if="isSearching"
                        type="heading"
                        max-width="500"
                        :boilerplate="false"
                    ></v-skeleton-loader>
                    <text-header content="Youtube Playlist"></text-header>
                </template>

                <template v-slot:items>
                    <swiper-slide v-for="itemYt in playlistYt" :key="itemYt">
                        <card-song
                            :item="itemYt"
                            :isLoaded="true"
                            type="playlist"
                            plf="yt"
                            :to="{
                                name: 'Playlist',
                                params: { id: itemYt.id.playlistId, plf: 'yt' },
                            }"
                            :playlistId="itemYt.id.playlistId"
                        ></card-song>
                    </swiper-slide>
                </template>
                <template v-slot:skeleton>
                    <swiper-slide v-for="i in 8" :key="'slide-ske-yt-' + i">
                        <card-song :isLoaded="false"></card-song>
                    </swiper-slide>
                </template>
            </core-slide>
        </div>
        <div class="search-playlist-st content-spacing my-10">
            <core-slide
                :isLoaded="!isSearching && isSearched"
                id="search-st-playlist"
                key="slide-2"
            >
                <template v-slot:header-start>
                    <text-header content="Spotify Playlist"></text-header>
                </template>

                <template v-slot:items>
                    <swiper-slide v-for="itemSt in playlistSt" :key="itemSt">
                        <card-song
                            :item="itemSt"
                            :isLoaded="true"
                            type="playlist"
                            plf="st"
                            :to="{
                                name: 'Playlist',
                                params: { id: itemSt.id, plf: 'st' },
                            }"
                            :playlistId="itemSt.id"
                        ></card-song>
                    </swiper-slide>
                </template>
                <template v-slot:skeleton>
                    <swiper-slide v-for="i in 8" :key="'slide-ske-st-' + i">
                        <card-song :isLoaded="false"></card-song>
                    </swiper-slide>
                </template>
            </core-slide>
        </div>
    </div>
    <div v-else>
        <h1 class="mx-auto font-bold text-2xl my-20 block text-center">
            Tìm kiếm mọi bài hát , danh sách phát , podcast mà bạn muốn nghe
        </h1>
    </div>
</template>
<script>
import { useRoute } from "vue-router";
import { computed, watch } from "vue";
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
import { isEmpty } from "lodash";
import FrameItem from "@/components/FrameItem.vue";
import HlTrack from "@/components/app/HlTrack.vue";
import { SwiperSlide } from "swiper/vue";
import CoreSlide from "@/components/app/CoreSlide.vue";
import TextHeader from "@/components/ui/TextHeader.vue";
import CardSong from "@/components/Card/CardSong.vue";
export default {
    components: {
        HlTrack,
        FrameItem,
        CoreSlide,
        SwiperSlide,
        TextHeader,
        CardSong,
    },
    setup() {
        const storeSong = useSongPlay();

        const numberOfElements = 4;
        const { searchListRender, isSearched, isSearching } =
            storeToRefs(storeSong);
        const topTracksYt = computed(() => {
            if (searchListRender.value.hasOwnProperty("yt"))
                return searchListRender.value["yt"]["tracks"];
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
        const playlistYt = computed(() => {
            return hasList.value
                ? searchListRender.value["yt"]["playlists"]
                : [];
        });
        const playlistSt = computed(() => {
            return hasList.value
                ? searchListRender.value["st"]["playlists"]["items"]
                : [];
        });

        return {
            topTracksYt,
            topTracksSt,
            searchListRender,
            hasList,
            playlistYt,
            playlistSt,
            isSearched,
            isSearching,
        };
    },
};
</script>
<style lang=""></style>
