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
        djOnline: [],
        channel: null,
        isLoadedRoom: false,
        inRoom: false,
        standardMaker: null,
    }),
    getters: {
        hasRoom: (state) => {
            const auth = useAuthStore();
            return state.room && auth.isAuthenticated;
        },
        isFirstUserOnline: (state) => {
            const auth = useAuthStore();
            if (state.usersOnline[0])
                return state.usersOnline[0].id === auth.user.id;
            return false;
        },
        isSM: (state) => {
            const auth = useAuthStore();
            if (state.hasRoom) return state.standardMaker === auth.user.id;
            return false;
        },
        isOwner: (state) => {
            const auth = useAuthStore();
            if (state.hasRoom) return state.room.user_id === auth.user.id;
            return false;
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
            songPlay.loadSong(
                roomData.current_song.track_id,
                false,
                roomData.current_song.plf,
                null,
                true
            );
        },
        resetRoom() {
            this.inRoom = false;
            this.isLoadedRoom = false;
            this.room = null;
            this.messages = [];
            this.members = [];
            this.tracks = [];
            this.djOnline = [];
            this.usersOnline = [];
            this.channel = null;
            this.standardMaker = null;
        },

        findIndexUser(id) {
            return this.usersOnline.findIndex((user) => user.id === id);
        },
        findIndexDj(id) {
            return this.djOnline.findIndex((user) => user.id === id);
        },
        addUserOnline(user) {
            const songPlay = useSongPlay();
            if (!user) return;
            const index = this.findIndexUser(user.id);

            if (index === -1) {
                this.usersOnline.push(user);
            }
            if (user.is_dj) {
                const indexDj = this.findIndexDj(user.id);
                if (indexDj === -1) this.djOnline.push(user);
            }

            if (user.id === this.room.user_id) {
                songPlay.pauseSong();
            }
            if (!this.standardMaker) this.setStandardMaker();
        },
        removeUserOnline(user) {
            if (!user) return;
            const index = this.findIndexUser(user.id);
            if (index !== -1) {
                this.usersOnline.splice(index, 1);
            }
            if (user.is_dj) {
                const indexDj = this.findIndexDj(user.id);
                if (indexDj === -1) this.djOnline.splice(indexDj, 1);
            }
            if (user.id === this.standardMaker) this.setStandardMaker();
        },
        setInRoom(inRoom = false) {
            this.inRoom = inRoom;
        },
        getRole(userId) {
            let role = "member";
            if (this.room.user_id === userId) role = "owner";
            if (this.listDj.findIndex((dj) => dj.id === userId) !== -1)
                role = "dj";
            return role;
        },
        userOnline(uid) {
            return this.findIndexUser(uid) !== -1;
        },
        setStandardMaker() {
            const ownerOnline = this.findIndexUser(this.room.user_id);

            if (ownerOnline !== -1) {
                return (this.standardMaker = this.room.user_id);
            }
            switch (this.room.type) {
                case "all":
                    if (this.usersOnline)
                        return (this.standardMaker = this.usersOnline[0]);

                case "only_dj":
                    if (this.djOnline)
                        return (this.standardMaker = this.djOnline[0]);

                default:
                    return (this.standardMaker = null);
            }
        },
    },
});
