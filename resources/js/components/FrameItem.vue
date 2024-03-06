<template>
    <div class="frame-item mb-11 w-100" :id="'frame-' + playlistId">
        <core-slide :isLoaded="state.isLoadedItems" :id="playlistId">
            <template v-slot:header-start>
                <!-- <span
                    v-if="state.isLoadedInfo"
                    class="frame-item-title d-inline text-white leading-[38px] text-2xl truncate flex-1"
                >
                    {{ $getPlfName(plf) }} - {{ frameTitle }}
                </span> -->
                <text-header
                    :content="$getPlfName(plf) + ' - ' + frameTitle"
                    v-if="state.isLoadedInfo"
                ></text-header>
                <v-skeleton-loader
                    v-else
                    type="heading"
                    max-width="500"
                    :boilerplate="false"
                ></v-skeleton-loader>
            </template>
            <template v-slot:header-btn>
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
            </template>
            <template v-slot:items>
                <swiper-slide
                    v-for="item in state.items"
                    :key="item"
                    class="w-fit"
                >
                    <card-song
                        :item="item"
                        :isLoaded="true"
                        :playlistItems="state.items"
                        :plf="plf"
                        :playlistId="playlistId"
                    ></card-song>
                </swiper-slide>
            </template>
            <template v-slot:skeleton>
                <swiper-slide
                    v-for="i in 8"
                    :key="'slide-ske-' + i"
                    class="w-fit"
                >
                    <card-song :isLoaded="false"></card-song>
                </swiper-slide>
            </template>
        </core-slide>
    </div>
</template>
<script>
import { useSongPlay } from "@/stores/SongPlay";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { reactive, toRef, computed } from "vue";
import { SwiperSlide } from "swiper/vue";
import CardSong from "@/components/Card/CardSong.vue";
import CoreSlide from "@/components/app/CoreSlide.vue";
import TextHeader from "@/components/ui/TextHeader.vue";
const PlaylistRepository = RepositoryFactory.get("playlist");
const StPlaylistRepository = RepositoryFactory.get("StPlaylist");
export default {
    props: {
        playlistId: {
            default: "",
        },
        plf: {
            default: "yt",
        },
        type: {
            default: "track",
        },
    },
    components: {
        SwiperSlide,
        CardSong,
        CoreSlide,
        TextHeader,
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
            // setDefaultPlaylist(props.playlistId, data);
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
