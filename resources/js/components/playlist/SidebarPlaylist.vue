<template>
    <v-dialog v-model="state.dialogSync" persistent width="500">
        <v-card class="rounded-lg">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <text-field
                                v-model="ytId"
                                placeholder="UCAZr_Rl77VZqRTq50imPAAQ"
                                label="Mã nhận dạng kênh Youtube"
                                class="mt-2"
                                :value="ytId"
                            >
                                <template v-slot:prev>
                                    <a
                                        href="https://www.youtube.com/account_advanced"
                                        target="_blank"
                                        class="text-sm font-bold underline text-primary"
                                        >Xem tại đây</a
                                    >
                                </template>
                            </text-field>
                        </v-col>
                        <v-col cols="12">
                            <text-field
                                v-model="stId"
                                :value="stId"
                                placeholder="31ehvaevf7cvi6qkbhw5dxzci"
                                label="Tên người dùng Spotify"
                                class="mt-2"
                            >
                                <template v-slot:prev>
                                    <a
                                        href="https://www.spotify.com/vn-vi/account/profile"
                                        target="_blank"
                                        class="text-sm font-bold underline text-primary"
                                        >Xem tại đây</a
                                    >
                                </template>
                            </text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" @click="state.dialogSync = false"></v-btn>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    :loading="!usersStore.loadedSync.value"
                    @click="syncPlaylist"
                >
                    Đồng bộ
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- content -->
    <div
        class="sidebar-playlist mt-2 w-full flex flex-col h-[88%] sm:h-[90%] flex-shrink-1 lg:h-[75%]"
    >
        <!-- flex-shrink-1 h-[15%] -->
        <div class="mb-4">
            <v-btn
                class="rounded-full vtf-def mx-auto mb-4 capitalize flex items-center"
                @click="state.dialogSync = true"
            >
                <v-icon icon="mdi-sync mr-2"></v-icon>
                <span class="mt-1">Đồng bộ playlist</span>
            </v-btn>
            <v-btn
                class="rounded-full vtf-def mx-auto capitalize flex items-center"
            >
                <v-icon icon="mdi-plus mr-2"></v-icon>
                <span class="mt-1">Danh sách phát mới</span>
            </v-btn>
        </div>

        <div class="">
            <PlfTag @change-plf="clickTag" />
        </div>
        <!-- list playlist -->
        <div id="listPlaylist" class="flex-1 overflow-auto custom-scroll mt-2">
            <div v-if="usersStore.loadedSync.value">
                <div v-if="!isEmpty">
                    <div
                        v-for="(listPlaylist, index) in myPlaylistRender"
                        :key="listPlaylist"
                    >
                        <sidebar-playlist-item
                            v-for="item in listPlaylist"
                            :key="item"
                            :item="item"
                            :plf="index"
                        ></sidebar-playlist-item>
                    </div>
                </div>
                <span v-else class="font-bold text-center">
                    Hiện chưa có danh sách phát nào
                </span>
            </div>

            <!-- ske -->
            <div v-else class="max-h-[100%] overflow-y-auto custom-scroll">
                <list-item v-for="i in 9" :key="'ske-list-item-' + i">
                    <template v-slot:center>
                        <div
                            class="w-full h-[12px] rounded animate-pulse bg-gray-500"
                        ></div>
                        <div
                            class="w-[50%] h-[12px] rounded animate-pulse bg-gray-500 mt-1"
                        ></div>
                    </template>
                </list-item>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, toRef, watch, computed } from "vue";
import TextField from "@/components/layouts/forms/TextField.vue";
import ListItem from "@/components/app/ListItem.vue";
import SidebarPlaylistItem from "@/components/playlist/SidebarPlaylistItem.vue";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { useSongPlay } from "@/stores/SongPlay";
import { useUsers } from "@/stores/Users";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import PlfTag from "@/components/actions/PlfTag.vue";
const UserRepo = RepositoryFactory.get("user");
export default {
    components: { TextField, SidebarPlaylistItem, ListItem, PlfTag },
    setup() {
        const initData = () => {
            return {
                rootListPlaylist: [],
                renderListPlaylist: [],
                currentIndex: "",
                dialogSync: false,
            };
        };

        const stateReactive = reactive({ ...initData() });
        const storeSongPlay = useSongPlay();
        const storeUsers = useUsers();
        const router = useRoute();
        const { myPlaylistRender, getInfoStandards } =
            storeToRefs(storeSongPlay);
        const stId = computed({
            get() {
                return storeUsers.sync.stId;
            },
            set(val) {
                storeUsers.sync.stId = val;
            },
        });
        const ytId = computed({
            get() {
                return storeUsers.sync.ytId;
            },
            set(val) {
                storeUsers.sync.ytId = val;
            },
        });
        const isEmpty = computed(() => {
            return storeSongPlay.myPlaylistRender.length <= 0;
        });

        const syncPlaylist = () => {
            storeUsers.syncPlaylist();
        };
        const clickTag = (index) => {
            stateReactive.currentIndex = index;
        };
        watch(
            () => stateReactive.dialogSync,
            (open) => {
                if (open) {
                }
            }
        );
        watch(
            () => stateReactive.currentIndex,
            (newPlf) => {
                storeSongPlay.filterRenderPlaylist(newPlf);
            }
        );
        return {
            state: toRef(stateReactive),
            usersStore: storeToRefs(storeUsers),
            syncPlaylist,
            stId,
            ytId,
            isEmpty,
            myPlaylistRender,
            getInfoStandards,
            clickTag,
        };
    },
};
</script>
<style lang="scss">
.vtf-def.active {
    background: white !important;
    color: $dvs-black;
    transition: background 0.25s ease-in-out;
}
</style>
