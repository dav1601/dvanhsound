import { defineStore } from "pinia";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const PlaylistRepo = RepositoryFactory.get("playlist");
const TrackRepo = RepositoryFactory.get("track");
export const useSongPlay = defineStore({
    id: "SongPLay",
    state: () => ({
        loadedSong: false,
        currentPlaylist: [],
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
            console.log(this.currentSong.data.snippet.thumbnails);
        },
        loadSong(id) {
            this.loadedSong = false;
            TrackRepo.getTrack(id).then((res) => {
                const payload = res.data.data;
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
            let index = parseInt(this.currentSong.id);
            console.log(index, type);

            if (type === "next") {
                index++;
                if (index >= this.playlist.length) {
                    index = 0;
                }
            } else {
                index--;
                if (index < 0) {
                    index = this.playlist.length - 1;
                }
            }
            return this.startSong(index);
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
    },
});
