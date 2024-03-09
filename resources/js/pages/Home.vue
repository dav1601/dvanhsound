<template>
    <div id="dvas-home" class="content-spacing">
        <v-alert
            v-model="state.alert"
            type="info"
            text="Nhạc từ Yt Music sẽ tải nhanh hơn Spotify - JM666"
            elevation="2"
            class="my-4"
            variant="tonal"
            border="start"
            border-color="info"
            closable
            close-label="Close Alert"
        ></v-alert>
        <!-- <div class="room-list">
            <core-slide :isLoaded="state.loadedRooms" id="home-rooms">
                <template v-slot:header-start>
                    <text-header
                        content="Nghe nhạc cùng nhau 🤗"
                        v-if="state.loadedRooms"
                    ></text-header>
                    <v-skeleton-loader
                        v-else
                        type="heading"
                        max-width="500"
                        :boilerplate="false"
                    ></v-skeleton-loader>
                </template>
                <template v-slot:header-btn>
                    <v-btn variant="outlined" size="small"> Tất cả </v-btn>
                </template>
                <template v-slot:items>
                    <swiper-slide
                        v-for="item in state.rooms"
                        :key="item"
                        class="w-fit"
                    >
                        <card-song
                            :item="item"
                            type="room"
                            :isLoaded="true"
                            :to="{
                                name: 'Room',
                                params: { id: item.uuid },
                            }"
                        ></card-song>
                    </swiper-slide>
                </template>
                <template v-slot:skeleton>
                    <swiper-slide
                        v-for="i in 8"
                        :key="'slide-ske-' + i"
                        class="w-fit"
                    >
                        <card-song :isLoaded="false" type="room"></card-song>
                    </swiper-slide>
                </template>
            </core-slide>
        </div> -->
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
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import CardSong from "@/components/Card/CardSong.vue";
import CoreSlide from "@/components/app/CoreSlide.vue";
import TextHeader from "@/components/ui/TextHeader.vue";
import { SwiperSlide } from "swiper/vue";
import { useErrors } from "@/stores/ErrorStore";
const UserRepo = RepositoryFactory.get("user");
export default {
    components: { FrameItem, SwiperSlide, CardSong, CoreSlide, TextHeader },
    setup() {
        const initData = () => {
            return {
                arrayPlaylist: [
                    {
                        id: "PLUadgMpPaifXLKV26KIqpFp6mpZiyF2l9",
                        plf: "yt",
                    },
                    {
                        id: "PLlD46yrpUbIV22mq_rZ0aITj3aldb0WAg",
                        plf: "yt",
                    },
                    {
                        id: "PLlD46yrpUbIUlyK2Dc2c54os5BpEh4NUI",
                        plf: "yt",
                    },
                    {
                        id: "PLlD46yrpUbIWMA7MuGB3ihaaL2LD9Y7UG",
                        plf: "yt",
                    },
                    // {
                    //     id: "37i9dQZEVXbLdGSmz6xilI",
                    //     plf: "st",
                    // },
                    // {
                    //     id: "37i9dQZF1DX4g8Gs5nUhpp",
                    //     plf: "st",
                    // },
                    // {
                    //     id: "37i9dQZF1DX0F4i7Q9pshJ",
                    //     plf: "st",
                    // },
                ],
                alert: true,
                rooms: [],
                loadedRooms: false,
            };
        };

        const stateReactive = reactive({ ...initData() });
        const storeError = useErrors();

        UserRepo.rooms({ limit: 12 }).then((res) => {
            const { data } = res.data;
            stateReactive.rooms = data;
            stateReactive.loadedRooms = true;
        });
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
