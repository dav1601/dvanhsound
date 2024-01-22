// src/stores/auth.js
import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/AuthStore";
import { useSongPlay } from "@/stores/SongPlay";

export const useMusicRoom = defineStore({
    id: "musicroom16",
    state: () => ({
        room: null,
        messages: [],
        members: [],
        tracks: [],
        usersOnline: [],
        channel: null,
        isLoadedRoom: false,
        inRoom: false,
    }),
    getters: {
        hasRoom: (state) => {
            const auth = useAuthStore();
            return state.room && auth.isAuthenticated;
        },
        isOwner: (state) => {
            const auth = useAuthStore();
            if (state.hasRoom) return state.room.user_id === auth.user.id;
            return false;
        },
        tracksSt: (state) => {
            return state.tracks.filter((track) => track.plf === "st");
        },
        listDj: (state) => {
            return state.members.filter((member) => member.is_dj);
        },
        usersRoom: (state) => {
            return state.members.filter((member) => {
                return !member.is_dj;
            });
        },
        roomDj: (state) => {
            if (state.hasRoom) return state.room.type === "only_dj";
            return false;
        },
        roomAll: (state) => {
            if (state.hasRoom) return state.room.type === "all";
            return false;
        },
        allowControls: (state) => {
            if (state.isOwner) {
                return true;
            }
            const auth = useAuthStore();
            let allow = false;
            if (state.hasRoom) {
                switch (state.room.type) {
                    case "only_dj":
                        const isDj = state.listDj.findIndex(
                            (dj) => dj.id === auth.user.id
                        );
                        allow = isDj !== -1;
                        break;
                    default:
                        allow = true;
                        break;
                }
            }
            return allow;
        },
    },
    actions: {
        setRoom(roomData) {
            const songPlay = useSongPlay();
            this.room = roomData;
            this.messages = roomData.messages;
            this.members = roomData.members;
            this.tracks = roomData.tracks;
            songPlay.setCurrentPlaylistItems(this.tracks);
            this.isLoadedRoom = true;
        },
        resetRoom() {
            this.room = null;
            this.messages = [];
            this.members = [];
            this.tracks = [];
            this.usersOnline = [];
            this.channel = null;
        },

        findIndexUser(id) {
            return this.usersOnline.findIndex((user) => user.id === id);
        },
        addUserOnline(user) {
            if (!user) return;
            const index = this.findIndexUser(user.id);
            if (index === -1) {
                this.usersOnline.push(user);
            }
        },
        removeUserOnline(user) {
            if (!user) return;
            const index = this.findIndexUser(user.id);
            if (index !== -1) {
                this.usersOnline.splice(index, 1);
            }
        },
        setInRoom(inRoom = false) {
            this.inRoom = inRoom;
        },
        getRoleUser(userId) {
            let role = "member";
            if (this.isOwner) role = "owner";
            if (this.listDj.findIndex((dj) => dj.id === userId) !== -1)
                role = "dj";
            return role;
        },
    },
});
