<template>
    <div class="frame-item mb-11 w-100" :id="'frame-' + playlistId">
        <div
            class="w-100 flex justify-between items-center mb-5"
            v-if="state.isLoadedInfo"
        >
            <span
                class="frame-item-title d-inline text-white leading-[38px] text-2xl truncate flex-1"
            >
               {{ $getPlfName(plf) }} - {{ frameTitle }}
            </span>
            <div class="flex items-center justify-end mr-6">
                <v-btn
                    variant="outlined"
                    size="small"
                    :to="{
                        name: 'Playlist',
                        params: { id: playlistId, plf: plf },
                    }"
                >
                    Xem them
                </v-btn>
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
        <v-skeleton-loader
            v-else
            type="heading"
            max-width="500"
            :boilerplate="false"
        ></v-skeleton-loader>
        <div class="frame-item-slide">
            <swiper
                :slides-per-view="8"
                :slidesPerGroup="4"
                :modules="modules"
                :id="'s-' + playlistId"
                v-if="state.isLoadedItems"
            >
                <swiper-slide v-for="item in state.items" :key="item">
                    <card-song
                        :item="item"
                        :isLoaded="state.isLoadedItems"
                        :playlistItems="state.items"
                        :plf="plf"
                        :playlistId="playlistId"
                    ></card-song>
                </swiper-slide>
            </swiper>
            <swiper
                :slides-per-view="8"
                :slidesPerGroup="4"
                :modules="modules"
                :id="'s-' + playlistId"
                v-else
            >
                <swiper-slide v-for="i in 8" :key="'slide-ske-' + i">
                    <card-song :isLoaded="state.isLoadedItems"></card-song>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
import { useSongPlay } from "@/stores/SongPlay";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { reactive, toRef, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useSwiper } from "swiper/vue";
import CardSong from "@/components/Card/CardSong.vue";
import { Scrollbar, A11y, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const PlaylistRepository = RepositoryFactory.get("playlist");
const StPlaylistRepository = RepositoryFactory.get("StPlaylist");
export default {
    props: ["playlistId", "plf"],
    components: {
        Swiper,
        SwiperSlide,
        CardSong,
    },
    setup(props) {
        const initData = () => {
            return {
                items: [],
                info: [],
                test: [],
                isLoadedInfo: false,
                isLoadedItems: false,
            };
        };

        const stateReactive = reactive({ ...initData() });
        const { setDefaultPlaylist } = useSongPlay();
        // ANCHOR use swiper //////////////////////////////////////////////////////

        // ANCHOR call api //////////////////////////////////////////////////////
        const setInfo = (res) => {
            const data = res.data.data;
            stateReactive.info = data;
            stateReactive.isLoadedInfo = true;
        };
        const setItems = (res) => {
            const data = res.data.data;
            stateReactive.items = data;
            stateReactive.isLoadedItems = true;
            setDefaultPlaylist(props.playlistId, data);
        };
        const fetchPlaylistInfo = () => {
            PlaylistRepository.getInfo(props.playlistId).then((res) => {
                setInfo(res);
            });
        };
        const fetchPlaylistItems = () => {
            PlaylistRepository.getItems(props.playlistId).then((res) => {
                setItems(res);
            });
        };
        const spotifyFetchPlaylistInfo = () => {
            StPlaylistRepository.getInfo(props.playlistId).then((res) => {
                setInfo(res);
            });
        };
        const spotifyFetchPlaylistItems = () => {
            StPlaylistRepository.getItems(props.playlistId).then((res) => {
                const data = res.data.data;
                stateReactive.items = data;
                stateReactive.isLoadedItems = true;
                setDefaultPlaylist(props.playlistId, data);
            });
        };
        if (props.plf === "yt") {
            fetchPlaylistInfo();
            fetchPlaylistItems();
        } else if (props.plf === "st") {
            spotifyFetchPlaylistInfo();
            spotifyFetchPlaylistItems();
        }
        const nextOrPrev = (t = "n") => {
            const el = document.getElementById("s-" + props.playlistId).swiper;
            if (t === "n") return el.slideNext();
            return el.slidePrev();
        };
        // SECTION Lifecycle Hooks //////////////////////////////////////////////////////

        // !SECTION End Lifecycle Hooks //////////////////////////////////////////////////////

        // SECTION Store //////////////////////////////////////////////////////

        // !SECTION End Store //////////////////////////////////////////////////////

        // SECTION State //////////////////////////////////////////////////////

        // !SECTION End State //////////////////////////////////////////////////////

        // SECTION Computed //////////////////////////////////////////////////////
        const frameTitle = computed(() => {
            switch (props.plf) {
                case "st":
                    return stateReactive.info.name;

                default:
                    return stateReactive.info.snippet.title;
            }
        });
        // !SECTION End Computed //////////////////////////////////////////////////////

        // SECTION Methods //////////////////////////////////////////////////////

        //!SECTION End Methods //////////////////////////////////////////////////////

        // !SECTION End Methods //////////////////////////////////////////////////////

        // SECTION Watch //////////////////////////////////////////////////////

        // !SECTION End Watch //////////////////////////////////////////////////////

        // SECTION return //////////////////////////////////////////////////////
        return {
            state: toRef(stateReactive),
            modules: [Scrollbar, A11y, EffectCoverflow, Pagination],
            nextOrPrev,
            frameTitle,
        };
    },
};
</script>
<style lang="scss">
.frame-item {
    &-title {
        color: #fff;
        font-size: 19px;
        font-style: normal;
        font-weight: 700;
        line-height: 21px;
    }
}
</style>
