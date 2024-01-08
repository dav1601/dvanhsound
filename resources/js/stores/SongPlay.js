import { defineStore } from "pinia";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const PlaylistRepo = RepositoryFactory.get("playlist");
const TrackRepo = RepositoryFactory.get("track");
const StTrackRepo = RepositoryFactory.get("StTrack");
const UserRepo = RepositoryFactory.get("user");
import { isEmpty } from "lodash";
export const useSongPlay = defineStore({
    id: "SongPLay",
    state: () => ({
        showPlayerPage: false,

        loadedSong: false,

        loadedPlaylistItems: false,

        myPlaylist: [],

        myPlaylistRender: [],

        defaultPlaylist: [],

        searchList: [],

        searchListRender: [],
        isSearched: false,

        isSearching: false,

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
        // ANCHOR btn play //////////////////////////////////////////////////////
        togglePlayerPage() {
            this.showPlayerPage = !this.showPlayerPage;
        },
        // ANCHOR search action //////////////////////////////////////////////////////
        search(kw) {
            this.isSearched = false;
            this.isSearching = true;
            if (!kw) {
                this.searchList = [];
                this.searchListRender = [];
                this.isSearching = false;
                this.isSearched = true;
                return;
            }

            UserRepo.search(kw)
                .then((res) => {
                    const { data } = res.data;
                    this.searchList = data;
                    this.searchListRender = data;
                    this.isSearching = false;
                    this.isSearched = true;
                })
                .catch((err) => {
                    this.searchList = [];
                    this.searchListRender = [];
                    this.isSearching = false;
                    this.isSearched = true;
                });
        },
        // ANCHOR load playlist info //////////////////////////////////////////////////////
        loadPlaylist(id, plf) {},
        // ANCHOR load storage //////////////////////////////////////////////////////
        loadStorage() {
            this.loadedSong = false;
            const currentSong = localStorage.getItem("currentSong");
            const currentPlaylist = localStorage.getItem("currentPlaylist");
            const currentPlaylistId = localStorage.getItem("currentPlaylistId");
            if (currentSong) {
                const parse = JSON.parse(currentSong);
                const playlist = { items: [], id: null };
                if (parse.id) {
                    if (currentPlaylist) {
                        playlist.items = JSON.parse(currentPlaylist);
                        playlist.id = currentPlaylistId;
                    }
                    this.loadSong(
                        parse.id,
                        false,
                        JSON.parse(currentSong).plf,
                        playlist
                    );
                }
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
            localStorage.setItem("currentPlaylistId", this.currentPlaylistId);
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
            this.currentPlaylistItems = items;
        },
        setDefaultPlaylist(id, items) {
            const payload = { id: id, items: items };
            this.defaultPlaylist.push(payload);
        },

        // ANCHOR end set area //////////////////////////////////////////////////////
        loadSong(
            id,
            playing = false,
            plf = "yt",
            playlist = { id: null, items: [] }
        ) {
            if (this.isActiveSong(id)) {
                if (isEmpty(this.currentPlaylistItems)) {
                    this.currentPlaylistItems = playlist.items;
                    this.storageData();
                }
                return this.playOrPause();
            }
            console.log(this.currentPlaylistItems);
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
                if (!playlist.items) playlist.items.push(payload);
                this.setCurrentPlaylistItems(playlist.items, playlist.id);
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
            this.loadSong(song.id, true, song.plf, {
                id: this.currentPlaylistId,
                items: this.currentPlaylistItems,
            });
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
        setMyPlaylistRender(payload) {
            return (this.myPlaylistRender = payload);
        },
        filterRenderPlaylist(type = "all") {
            if (type === "all")
                return (this.myPlaylistRender = this.myPlaylist);
            this.myPlaylistRender = {};
            return (this.myPlaylistRender["" + type] =
                this.myPlaylist["" + type]);
        },
        findKey(obj, targetKey) {
            let result = null;
            const searchInObject = (currentObj, keyToFind) => {
                for (const key in currentObj) {
                    if (Object.prototype.hasOwnProperty.call(currentObj, key)) {
                        const value = currentObj[key];

                        if (key === keyToFind) {
                            result = { key: key, value: value };
                            break;
                        }

                        if (typeof value === "object") {
                            searchInObject(value, keyToFind);
                        }
                    }
                }
            };

            searchInObject(obj, targetKey);

            return result;
        },
        getInfoStandards(data, plf = "yt", type = "song") {
            const info = {
                title: "",
                description: "",
                images: [],
                id: "",
                plf: plf,
            };

            if (isEmpty(data)) return info;

            switch (plf) {
                case "st":
                    info.images = this.findKey(data, "images").value;
                    info.title = this.findKey(data, "name").value;
                    info.id = this.findKey(data, "id").value;
                    switch (type) {
                        case "playlist":
                            info.description = data.description
                                ? data.description
                                : data.owner.display_name;

                            break;

                        default:
                            let artists = [];
                            data.artists.forEach((item) => {
                                artists.push(item.name);
                            });

                            info.description = artists.toString();

                            break;
                    }

                    break;
                case "yt":
                    const kind = this.findKey(data, "kind").value;
                    info.images = this.findKey(data, "thumbnails").value;
                    info.title = this.findKey(data, "title").value;
                    info.description = this.findKey(data, "channelTitle").value;

                    let id = this.findKey(data, "id").hasOwnProperty("value")
                        ? this.findKey(data, "id").value
                        : null;

                    if (!id || typeof id === "object") {
                        switch (kind) {
                            case "youtube#playlist":
                                id = this.findKey(data, "playlistId").value;
                                break;

                            default:
                                id = this.findKey(data, "videoId").value;

                                break;
                        }
                    }
                    info.id = id;
                    break;

                default:
                    break;
            }

            return info;
        },
    },
});
