import { defineStore } from "pinia";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const PlaylistRepo = RepositoryFactory.get("playlist");
const TrackRepo = RepositoryFactory.get("track");
const StTrackRepo = RepositoryFactory.get("StTrack");
export const useSongPlay = defineStore({
    id: "SongPLay",
    state: () => ({
        loadedSong: false,

        loadedPlaylistItems: false,

        myPlaylist: [],

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
        loadPlaylist(id, plf) {},
        // ANCHOR load storage //////////////////////////////////////////////////////
        loadStorage() {
            this.loadedSong = false;
            const currentSong = localStorage.getItem("currentSong");
            const currentPlaylist = localStorage.getItem("currentPlaylist");
            if (currentSong) {
                const parse = JSON.parse(currentSong);
                if (parse.id) {
                    this.loadSong(parse.id, false, JSON.parse(currentSong).plf);
                }
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
            this.currentSong.info = this.getInfoStandards(payload, plf);
            if (this.currentSong.el !== null) {
                this.currentSong.el.src = payload.src;
            } else {
                this.currentSong.el = new Audio(payload.src);
            }
            this.currentSong.el.currentTime = 0;
            this.currentSong.el.volume = this.settings.volume / 100;
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
            if (this.currentPlaylistItems.length <= 1) {
                return;
            }
            let array = this.currentPlaylistItems.filter((song) => {
                return song.id !== this.currentSong.info.id;
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
            let currentSongIndex = this.currentPlaylistItems.findIndex(
                (song) => {
                    return song.id === this.currentSong.info.id;
                }
            );
            array.unshift(this.currentPlaylistItems[currentSongIndex]);
            return (this.currentPlaylistItems = array);
        },
        loopSong() {
            this.currentSong.el.currentTime = 0;
            this.currentSong.el.loop = true;
            this.playSong();
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
        setMyPlaylist(payload) {
            return (this.myPlaylist = payload);
        },

        getInfoStandards(data, plf = "yt", type = "song") {
            const info = {
                title: "",
                description: "",
                images: [],
                id: "",
                plf: plf,
            };

            if (_.isEmpty(data)) return info;
            switch (plf) {
                case "st":
                    switch (type) {
                        case "playlist":
                            (info.images = data.images),
                                (info.title = data.name),
                                (info.description = data.description
                                    ? data.description
                                    : data.owner.display_name),
                                (info.id = data.id);
                            break;

                        default:
                            let artists = [];
                            data.artists.forEach((item) => {
                                artists.push(item.name);
                            });

                            (info.images = data.album.images),
                                (info.title = data.name),
                                (info.description = artists.toString()),
                                (info.id = data.id);
                            break;
                    }

                    break;
                case "yt":
                    (info.images = data.snippet.thumbnails),
                        (info.title = data.snippet.title),
                        (info.description = data.snippet.channelTitle),
                        (info.id = data.id);

                    break;

                default:
                    break;
            }

            return info;
        },
    },
});
