import { defineStore } from "pinia";
import { useSongPlay } from "./SongPlay";
import { notify } from "@kyvg/vue3-notification";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { useAuthStore } from "@/stores/AuthStore";
const UserRepo = RepositoryFactory.get("user");

export const useUsers = defineStore({
    id: "users",

    state: () => ({
        sync: {
            stId: null,
            ytId: null,
        },
        loadedSync: false,
    }),

    getters: {},
    actions: {
        storageSync() {
            const auth = useAuthStore();
            localStorage.setItem("stId", this.sync.stId);
            localStorage.setItem("ytId", this.sync.ytId);
            if (auth.isAuthenticated) {
                UserRepo.saveSync(this.sync).then((res) => {
                    console.log(res);
                });
            }
        },
        syncPlaylist() {
            const storeSongPlay = useSongPlay();
            this.loadedSync = false;
            if (!this.sync.stId && !this.sync.ytId) {
                storeSongPlay.setMyPlaylist([]);
                storeSongPlay.setMyPlaylistRender([]);
                return (this.loadedSync = true);
            }

            UserRepo.syncPlaylist(this.sync)
                .then((res) => {
                    const { data } = res.data;
                    console.log(data);
                    storeSongPlay.setMyPlaylist(data);
                    storeSongPlay.setMyPlaylistRender(data);
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
                        title: "Lỗi",
                        text: "Đồng bộ thất bại. Bạn hãy kiểm tra lại id channel và user id!",
                        type: "error",
                        timeout: 5000,
                    });
                });
        },
        setUserSync(user) {
            if (user) {
                this.sync.stId = user.st_id;
                this.sync.ytId = user.yt_id;
            } else {
                this.sync.stId = localStorage.getItem("stId");
                this.sync.ytId = localStorage.getItem("ytId");
            }
        },
        initUser(user) {
            this.setUserSync(user);
            this.syncPlaylist();
        },
    },
});
