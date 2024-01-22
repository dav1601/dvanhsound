<template>
    <div class="h-full w-full flex flex-column">
        <content-header
            :isLoaded="loadedSong"
            :title="currentSong.info.title"
            :description="currentSong.info.description"
            :image="headerImage"
            :type="route.name"
            :plf="currentSong.info.plf"
        >
        </content-header>
        <div class="content-spacing mt-5 flex-1">
            <div class="w-full h-full">
                <v-row>
                    <v-col cols="8">
                        <div
                            class="w-full h-full overflow-y-auto overflow-x-hidden"
                            v-if="isLoadedRoom"
                        >
                            <song-item
                                v-for="(item, index) in currentPlaylistItems"
                                :key="'song-item-room' + index"
                                :item="item"
                                :index="parseInt(index) + 1"
                                :playlistItems="currentPlaylistItems"
                                :plf="item.plf"
                                :isLoaded="true"
                            >
                            </song-item>
                        </div>
                    </v-col>
                    <v-col cols="4" class="layout-chat">
                        <div
                            class="w-full h-full flex flex-col justify-start items-start"
                        >
                            <div
                                class="chat-body w-full flex-1 overflow-y-auto overflow-x-hidden border rounded-lg p-4"
                            >
                                <message-item
                                    message="Mo bai khac ik"
                                    role="member"
                                ></message-item>
                                <message-item
                                    message="hoy"
                                    role="owner"
                                    :itsMe="true"
                                ></message-item>
                                <message-item
                                    message="yeah yeah"
                                    role="dj"
                                ></message-item>
                            </div>
                            <div class="mt-4 flex items-center w-full">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    class="flex-1 py-2 px-3 rounded-full text-dvs-dark bg-gray-100 focus:outline-none"
                                />
                                <button
                                    class="bg-primary-600 text-white px-4 py-2 rounded-full ml-3 hover:bg-primary-700"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>
<script>
import ContentHeader from "@/components/ContentHeader.vue";
import SongItem from "@/components/song/SongItem.vue";
import MessageItem from "@/components/app/chat/MessageItem.vue";
import { useRoute } from "vue-router";
import {
    reactive,
    computed,
    toRef,
    onMounted,
    watch,
    onBeforeUnmount,
} from "vue";
import { useUsers } from "@/stores/Users";
import { useAuthStore } from "@/stores/AuthStore";
import { useResponsive } from "@/stores/Responsive";
import { useSongPlay } from "@/stores/SongPlay";
import { storeToRefs } from "pinia";
import { useMusicRoom } from "@/stores/MusicRoom";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const usersRepo = RepositoryFactory.get("user");

export default {
    components: { ContentHeader, SongItem, MessageItem },
    setup(props) {
        const auth = useAuthStore();
        const songPlay = useSongPlay();
        const musicRoom = useMusicRoom();
        const { tracks, isLoadedRoom, messages, tracksSt } =
            storeToRefs(musicRoom);
        const { currentPlaylistItems, currentSong, loadedSong } = storeToRefs(
            useSongPlay()
        );
        const route = useRoute();
        const initData = () => {
            return {
                channel: null,
            };
        };
        const stateReactive = reactive({ ...initData() });
        //
        songPlay.resetCurrent();
        //
        onBeforeUnmount(() => {
            window.Echo.leave(`room.music.` + musicRoom.room.id);
            musicRoom.resetRoom();
        });
        //
        const uuid = computed(() => {
            return route.params.id;
        });
        const headerImage = computed(() => {
            let url = "";
            if (loadedSong.value) {
                switch (currentSong.value.info.plf) {
                    case "st":
                        url = currentSong.value.info.images[0].url;
                        break;

                    default:
                        url = currentSong.value.info.images.maxres.url;
                        break;
                }
            }

            return url;
        });
        const initStream = () => {
            musicRoom.channel = window.Echo.join(
                `room.music.` + musicRoom.room.id
            )
                .here((users) => {
                    musicRoom.usersOnline = users;
                })
                .joining((user) => {
                    musicRoom.addUserOnline(user);
                    const data = songPlay.currentSong;
                    data.el = songPlay.currentSong.el.src;
                    usersRepo
                        .brcUpdateCurrentSong("user", musicRoom.room.id, data)
                        .then((res) => {
                            console.log(res);
                        });
                    console.log({ userJoin: user });
                })
                .leaving((user) => {
                    musicRoom.removeUserOnline(user);
                    console.log({ userLeave: user });
                });
        };
        musicRoom.isLoadedRoom = false;

        usersRepo.loadRoom(uuid.value).then((res) => {
            const { data } = res.data;
            musicRoom.setRoom(data);
            initStream();

            songPlay.loadSong(
                data.current_song.track_id,
                false,
                data.current_song.plf
            );
        });
        return {
            route,
            tracks,
            isLoadedRoom,
            messages,
            currentPlaylistItems,
            currentSong,
            loadedSong,
            headerImage,
        };
    },
};
</script>
<style lang="scss">
.layout-chat {
    height: calc(100vh - 340px - 88px);
    position: sticky;
    top: 86px;
}
</style>
