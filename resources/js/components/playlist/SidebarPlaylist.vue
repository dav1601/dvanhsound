<template>
    <v-dialog v-model="state.dialogSync" persistent width="500">
        <v-card class="rounded-lg">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <text-field
                                v-model="state.sync.idYt"
                                placeholder="UCAZr_Rl77VZqRTq50imPAAQ"
                                label="Mã nhận dạng kênh Youtube"
                                class="mt-2"
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
                                v-model="state.sync.idSpotify"
                                placeholder="UCAZr_Rl77VZqRTq50imPAAQ"
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

                <v-btn color="blue-darken-1" variant="text"> Đồng bộ </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- content -->
    <div class="sidebar-playlist mt-2 w-full">
        <v-btn
            class="rounded-full vtf-def mx-auto mb-4 capitalize flex items-center"
            @click="state.dialogSync = true"
        >
            <v-icon icon="mdi-sync mr-2"></v-icon>
            <span class="mt-1">Đồng bộ playlist</span>
        </v-btn>
        <v-btn
            class="rounded-full vtf-def mx-auto mb-4 capitalize flex items-center"
        >
            <v-icon icon="mdi-plus mr-2"></v-icon>
            <span class="mt-1">Danh sách phát mới</span>
        </v-btn>
        <div
            class="flex justify-start items-center overflow-x-auto pb-2 custom-scroll"
        >
            <v-btn
                size="small"
                v-for="(item, index) in state.listPlf"
                :key="item"
                :type="index"
                class="vtf-def mx-1"
                :class="{ active: state.activePlf === index }"
                >{{ item }}</v-btn
            >
        </div>
        <!-- list playlist -->
        <div id="listPlaylist">
            <list-item
                title="Icons can be used for the primary content of a button. They are commonly u"
                class="mx-4"
                icon="mdi-home"
            ></list-item>
        </div>
    </div>
</template>
<script>
import { reactive, toRef } from "vue";
import TextField from "@/components/layouts/forms/TextField.vue";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import ListItem from "@/components/app/ListItem.vue";
const UserRepo = RepositoryFactory.get("user");
export default {
    components: { TextField, ListItem },
    setup() {
        const initData = () => {
            return {
                rootListPlaylist: [],
                renderListPlaylist: [],
                activePlf: "all",
                listPlf: {
                    all: "All",
                    yt: "Yt Music",
                    st: "Spotify",
                    dvs: "Dvanhsound",
                },
                dialogSync: false,
                synchronized: false,
                sync: {
                    idSpotify: "",
                    idYt: "",
                },
            };
        };

        const stateReactive = reactive({ ...initData() });

        return {
            state: toRef(stateReactive),
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
