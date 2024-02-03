<template>
    <div class="h-full w-full flex flex-column">
        <div v-if="!isSM && loadedSong">
            <v-dialog width="auto" v-model="notConfirm" :attach="true">
                <v-card class="p-5">
                    <template v-slot:title
                        >Bạn có muốn tham gia nghe nhạc chung?</template
                    >

                    <v-card-actions class="items-center justify-end">
                        <v-btn class="bg-danger-700 ml-2">Thoát</v-btn>
                        <v-btn class="bg-primary-700 ml-2" @click="setConfirm()"
                            >Tham Gia</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
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
                        >
                            <GridItems
                                :items="currentPlaylistItems"
                                :isLoaded="isLoadedRoom"
                            />
                            <!-- <song-item
                                v-for="(item, index) in currentPlaylistItems"
                                :key="'song-item-room' + index"
                                :item="item"
                                :index="parseInt(index) + 1"
                                :playlistItems="currentPlaylistItems"
                                :plf="item.plf"
                                :isLoaded="true"
                            >
                            </song-item> -->
                        </div>
                    </v-col>
                    <v-col cols="4" class="layout-chat">
                        <div
                            class="w-full h-full flex flex-col justify-start items-start"
                        >
                            <div
                                class="chat-body w-full flex-1 overflow-y-auto overflow-x-hidden border rounded-lg p-4 custom-scroll"
                                id="chat-body"
                            >
                                <message-item
                                    v-for="message in messages"
                                    :key="message"
                                    :message="message.message"
                                    :role="getRole(message.user_id)"
                                    :itsMe="checkItsMeChat(message.user_id)"
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
import GridItems from "@/components/playlist/GridItems.vue";
import { useRoute } from "vue-router";
import {
    reactive,
    computed,
    toRef,
    onMounted,
    watch,
    onBeforeUnmount,
    nextTick,
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
    components: { ContentHeader, SongItem, MessageItem, GridItems },
    setup(props) {
        const auth = useAuthStore();
        const songPlay = useSongPlay();
        const musicRoom = useMusicRoom();
        const {
            tracks,
            isLoadedRoom,
            messages,
            confirmJoin,
            notConfirm,
            isSM,
        } = storeToRefs(musicRoom);
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
        const chatScrollBottom = () => {
            const chatContainer = document.getElementById("chat-body");
            return (chatContainer.scrollTop = chatContainer.scrollHeight);
        };
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
                        if (
                            currentSong.value.info.images.hasOwnProperty(
                                "maxres"
                            )
                        ) {
                            url = currentSong.value.info.images.maxres.url;
                        } else {
                            url = currentSong.value.info.images.high.url;
                        }
                        break;
                }
            }

            return url;
        });
        const listenEventsUser = () => {
            auth.channel.listen("BroadcastUser", (e) => {
                const data = e.data;
                const event = data.event;

                switch (event) {
                    case "set_sm":
                        const sm = data.sm;
                        if (!sm) {
                            musicRoom.setStandardMaker();
                        } else {
                            musicRoom.standardMaker = sm;
                        }

                        break;

                    default:
                        break;
                }
            });
        };
        const initStream = () => {
            musicRoom.channel = window.Echo.join(
                `room.music.` + musicRoom.room.id
            )
                .here((users) => {
                    if (users.length <= 1) {
                        musicRoom.usersOnline = users;
                        musicRoom.setStandardMaker();
                    } else {
                        musicRoom.usersOnline = users.reverse();
                    }
                })
                .joining((user) => {
                    musicRoom.addUserOnline(user);
                    if (musicRoom.isFirstUserOnline)
                        usersRepo.broadcastUser(user.id, "set_sm", {
                            sm: musicRoom.standardMaker,
                        });
                })
                .leaving((user) => {
                    musicRoom.removeUserOnline(user);
                    console.log({ userLeave: user });
                })
                .listen("BroadcastRoom", (e) => {
                    const data = e.data;
                    const event = data.event;
                    const listener = true;
                    switch (event) {
                        case "load_song":
                            songPlay.loadSong(
                                data.id,
                                data.playing,
                                data.plf,
                                data.playlist,
                                true
                            );
                            break;

                        case "shuffle":
                            break;
                        case "play_or_pause":
                            if (data.play) {
                                songPlay.playSong(true);
                            } else {
                                songPlay.pauseSong(true);
                                songPlay.currentSong.status = "paused";
                            }

                            break;

                        case "set_repeat":
                            break;
                        case "loop_song":
                            songPlay.loopSong(true);
                            break;

                        default:
                            break;
                    }
                });
        };
        musicRoom.isLoadedRoom = false;

        usersRepo.loadRoom(uuid.value).then(async (res) => {
            const { data } = res.data;
            musicRoom.setRoom(data);
            initStream();
            listenEventsUser();
            musicRoom.setStandardMaker();
            await nextTick();
            chatScrollBottom();
        });

        const checkItsMeChat = (userId) => {
            return auth.user.id === userId;
        };
        const getRole = (userId) => {
            return musicRoom.getRole(userId);
        };
        const setConfirm = () => {
            musicRoom.notConfirm = false;
            if (songPlay.currentSong.el.currentTime > 0) {
                songPlay.playSong(true);
            }
        };

        watch(
            () => auth.channel,
            (channel) => {
                if (channel) listenEventsUser();
            }
        );
        watch(
            () => musicRoom.standardMaker,
            (standardMaker) => {
                if (!standardMaker) songPlay.resetSong();
            }
        );
        return {
            route,
            tracks,
            isLoadedRoom,
            messages,
            currentPlaylistItems,
            currentSong,
            loadedSong,
            headerImage,
            notConfirm,
            isSM,
            checkItsMeChat,
            getRole,
            setConfirm,
            state: toRef(stateReactive),
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
