import { defineStore } from "pinia";
import { useSongPlay } from "./SongPlay";
import { notify } from "@kyvg/vue3-notification";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const UserRepo = RepositoryFactory.get("user");

export const useUsers = defineStore({
    id: "users",

    state: () => ({
        sync: {
            stId: localStorage.getItem("stId"),
            ytId: localStorage.getItem("ytId"),
        },
        loadedSync: false,
    }),

    getters: {},
    actions: {
        storageSync() {
            localStorage.setItem("stId", this.sync.stId);
            localStorage.setItem("ytId", this.sync.ytId);
        },
        syncPlaylist() {
            const storeSongPlay = useSongPlay();
            this.loadedSync = false;
            if (!this.sync.stId && !this.sync.ytId)
                return (this.loadedSync = true);
            UserRepo.syncPlaylist(this.sync)
                .then((res) => {
                    const { data } = res.data;
                    console.log(data);
                    storeSongPlay.setMyPlaylist(data);
                    this.storageSync();
                    this.loadedSync = true;
                    return notify({
                        text: "Đồng bộ thành công",
                        type: "success",
                    });
                })
                .catch((err) => {
                    this.loadedSync = true;
                    return notify({
                        text: "Đồng bộ thất bại vui lòng kiểm tra lại id",
                        type: "error",
                    });
                });
        },
    },
});
