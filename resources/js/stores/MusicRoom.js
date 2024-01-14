// src/stores/auth.js
import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/AuthStore";
export const useMusicRoom = defineStore({
    id: "MusicRoom",
    state: () => ({
        room: null,
        messages: [],
        members: [],
        tracks: [],
        usersOnline: [],
    }),
    getters: {
        isOwner: (state) => {
            const auth = useAuthStore();
            if (state.room && auth.isAuthenticated)
                return state.room.user_id === auth.user.id;
            return false;
        },
        inRoom: (state) => {
            return state.room ? true : false;
        },
    },
    actions: {
        setRoom(roomData) {
            this.room = roomData;
            this.messages = roomData.messages;
            this.members = roomData.members;
            this.tracks = roomData.tracks;
        },
        resetRoom() {
            this.room = null;
            this.messages = [];
            this.members = [];
            this.tracks = [];
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
    },
});
