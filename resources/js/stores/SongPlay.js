import { defineStore } from "pinia";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const PlaylistRepo = RepositoryFactory.get("playlist");
const TrackRepo = RepositoryFactory.get("track");
export const useSongPlay = defineStore({
    id: "SongPLay",
    state: () => ({
        loadedSong: false,
        defaultPlaylist: [],
        currentPlaylistItems: [],
        playlistQueue: [],
        currentSong: {
            status: "paused",
            id: null,
            el: null,
            data: {},
        },
        settings: {
            volume: localStorage.getItem("songVolume")
                ? localStorage.getItem("songVolume")
                : 50,
            repeat: "unset",
            currentTime: localStorage.getItem("currentTime")
                ? localStorage.getItem("currentTime")
                : 0,
        },
    }),

    getters: {
        isPlaying: (state) => {
            return (
                state.currentSong.status === "playing" ||
                state.currentSong.status === "play"
            );
        },
        isPaused: (state) => {
            return (
                state.currentSong.status === "pause" ||
                state.currentSong.status === "paused"
            );
        },
    },
    actions: {
        setCurrentSong(payload) {
            localStorage.setItem("currentSong", payload.id);
            this.currentSong.id = payload.id;
            this.currentSong.data = payload;

            if (this.currentSong.el !== null) {
                this.currentSong.el.src = payload.src;
            } else {
                this.currentSong.el = new Audio(payload.src);
            }
            this.currentSong.el.currentTime = 0;
            this.currentSong.el.volume = this.settings.volume / 100;
            this.currentSong.el.loop = this.settings.repeat === "self";
            this.loadedSong = true;
            if (payload.playing) {
                this.playSong();
            }
        },
        setCurrentPlaylistItems(items) {
            if (items) this.currentPlaylistItems = items;
        },
        setDefaultPlaylist(id, items) {
            const payload = { id: id, items: items };
            this.defaultPlaylist.push(payload);
        },

        // ANCHOR end set area //////////////////////////////////////////////////////
        loadSong(id, playing = false) {
            this.loadedSong = false;
            TrackRepo.getTrack(id).then((res) => {
                const payload = res.data.data;
                payload.playing = playing;
                this.setCurrentSong(payload);
            });
        },
        shufflePlaylist() {
            let array = this.playlist.filter((song, index) => {
                return index != this.currentSong.id;
            });
            let currentIndex = array.length,
                randomIndex;
            // While there remain elements to shuffle.
            while (currentIndex > 0) {
                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex],
                    array[currentIndex],
                ];
            }
            array.unshift(this.playlist[this.currentSong.id]);
            return (this.playlist = array);
        },
        repeatSong(type) {
            this.settings.repeat = type;
            this.currentSong.el.loop = type === "self";
        },
        startSong(id) {
            this.setCurrentSong({ index: index });
            this.playSong();
        },
        playSong() {
            this.currentSong.status = "playing";
            this.currentSong.el.play();
        },
        resetSong() {
            this.currentSong.el.currentTime = 0;
            this.pauseSong();
        },
        pauseSong() {
            this.currentSong.status = "paused";
            this.currentSong.el.pause();
        },
        updateSettings(payload) {
            if (payload.volume) {
                console.log(payload.volume);
                if (payload.volume <= 1) {
                    payload.volume = 0;
                }
                this.currentSong.el.volume = payload.volume / 100;
                this.settings.volume = payload.volume;
                if (!payload.volumeOff) {
                    localStorage.setItem("songVolume", payload.volume);
                }
            }
            if (payload.currentTime) {
                console.log(payload);
                this.currentSong.el.currentTime = payload.currentTime;
            }
        },
        nextOrPrevSong(type) {
            let index;
            if (this.currentPlaylistItems.length <= 0) {
                this.currentPlaylistItems = this.defaultPlaylist[0].items;
            }
            index = this.currentPlaylistItems.findIndex((item) => {
                return item.contentDetails.videoId == this.currentSong.id;
            });
            if (index === -1) {
                index = 0;
            } else {
                if (type === "next") {
                    index++;
                    if (index >= this.currentPlaylistItems.length) index = 0;
                } else {
                    index--;
                    if (index < 0) index = this.currentPlaylistItems.length - 1;
                }
            }
            this.loadSong(
                this.currentPlaylistItems[index].contentDetails.videoId,
                true
            );
        },
        updateStatusCurrentSong(status) {
            this.currentSong.status = status;
        },
        playOrPause() {
            if (this.isPlaying) {
                this.pauseSong();
            } else {
                this.playSong();
            }
        },
        isActiveSong(id) {
            return this.currentSong.id == id;
        },
    },
});
