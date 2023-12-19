import { defineStore } from "pinia";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const PlaylistRepo = RepositoryFactory.get("playlist");
const TrackRepo = RepositoryFactory.get("track");
const StTrackRepo = RepositoryFactory.get("StTrack");
export const useSongPlay = defineStore({
    id: "SongPLay",
    state: () => ({
        loadedSong: false,
        defaultPlaylist: [],
        currentPlaylistItems: [],
        currentPlaylistId: null,
        playlistQueue: [],
        currentSong: {
            status: "paused",
            el: null,
            data: {},
            info: {},
            progress: 0,
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
        // ANCHOR load playlist info //////////////////////////////////////////////////////
        loadPlaylist(id, plf) {

        },
        // ANCHOR load storage //////////////////////////////////////////////////////
        loadStorage() {
            this.loadedSong = false;
            const currentSong = localStorage.getItem("currentSong");
            const currentPlaylist = localStorage.getItem("currentPlaylist");
            if (currentSong) {
                this.loadSong(
                    JSON.parse(currentSong).id,
                    false,
                    JSON.parse(currentSong).plf
                );
            }
            if (currentPlaylist) {
                this.setCurrentPlaylistItems(JSON.parse(currentPlaylist));
            }
        },
        storageData() {
            localStorage.setItem(
                "currentSong",
                JSON.stringify({
                    id: this.currentSong.info.id,
                    plf: this.currentSong.data.plf,
                })
            );
            localStorage.setItem(
                "currentPlaylist",
                JSON.stringify(this.currentPlaylistItems)
            );
        },
        setCurrentSong(payload) {
            const plf = payload.hasOwnProperty("plf") ? payload.plf : "yt";
            this.currentSong.data = payload;
            this.currentSong.info = this.getInfoSongByPlf(payload, plf);
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
        setCurrentPlaylistItems(items, playlistId) {
            this.currentPlaylistId = playlistId;
            if (items) this.currentPlaylistItems = items;
        },
        setDefaultPlaylist(id, items) {
            const payload = { id: id, items: items };
            this.defaultPlaylist.push(payload);
        },

        // ANCHOR end set area //////////////////////////////////////////////////////
        loadSong(id, playing = false, plf = "yt") {
            this.loadedSong = false;
            let api;
            switch (plf) {
                case "st":
                    api = StTrackRepo.getTrack(id);
                    break;

                default:
                    api = TrackRepo.getTrack(id);
                    break;
            }

            api.then((res) => {
                const payload = res.data.data;
                payload.playing = playing;
                this.setCurrentSong(payload);
                this.storageData();
            });
        },
        shufflePlaylist() {
            let array = this.playlist.filter((song, index) => {
                return index != this.currentSong.info.id;
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
            array.unshift(this.playlist[this.currentSong.info.id]);
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
                return item.id === this.currentSong.info.id;
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
            const song = this.currentPlaylistItems[index];
            console.log({ song: song });
            this.loadSong(song.id, true, song.plf);
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
            return this.currentSong.info.id === id;
        },
        getInfoSongByPlf(songData, plf = "yt") {
            const info = {
                title: "",
                description: "",
                images: [],
                id: "",
                plf: plf,
            };

            if (!songData) return info;
            switch (plf) {
                case "st":
                    let artists = [];
                    songData.artists.forEach((item) => {
                        artists.push(item.name);
                    });

                    (info.images = songData.album.images),
                        (info.title = songData.name),
                        (info.description = artists.toString()),
                        (info.id = songData.id);

                    break;
                case "yt":
                    (info.images = songData.snippet.thumbnails),
                        (info.title = songData.snippet.title),
                        (info.description = songData.snippet.channelTitle),
                        (info.id = songData.id);
                    break;

                default:
                    break;
            }

            return info;
        },
    },
});
