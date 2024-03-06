import { defineStore } from "pinia";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { useMusicRoom } from "@/stores/MusicRoom";
import { useAuthStore } from "@/stores/AuthStore";
const PlaylistRepo = RepositoryFactory.get("playlist");
const TrackRepo = RepositoryFactory.get("track");
const StTrackRepo = RepositoryFactory.get("StTrack");
const UserRepo = RepositoryFactory.get("user");
import { isEmpty, isObject, values } from "lodash";
import { notify } from "@kyvg/vue3-notification";
export const useSongPlay = defineStore({
    id: "SongPLay",
    state: () => ({
        showPlayerPage: false,

        loadedSong: false,

        loadedPlaylistItems: false,

        myPlaylist: [],

        myPlaylistRender: [],

        searchList: [],

        searchListRender: [],

        isSearched: false,

        isSearching: false,

        currentPlaylistItems: [],

        currentPlaylistId: null,

        playlistQueue: [],

        defaultPlaylist: {
            id: "PLlD46yrpUbIV22mq_rZ0aITj3aldb0WAg",
            items: [],
        },

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
        hasSong: (state) => {
            return state.currentSong.el ? true : false;
        },

        allowControls: (state) => {
            const musicRoom = useMusicRoom();
            const auth = useAuthStore();
            if (!musicRoom.inRoom) return true;
            if (musicRoom.isOwner) {
                return true;
            }

            let allow = false;
            if (musicRoom.hasRoom) {
                switch (musicRoom.room.type) {
                    case "only_dj":
                        const isDj = musicRoom.listDj.findIndex(
                            (dj) => dj.id === auth.user.id
                        );
                        allow = isDj !== -1;
                        break;
                    case "only_owner":
                        allow = musicRoom.isOwner;
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
        notifyControlsValid() {
            return notify({
                text: "Bạn không có quyền điều khiển trong phòng này",
                type: "error",
                position: "top center",
            });
        },
        middleware(listener = false) {
            let next = true;
            const musicRoom = useMusicRoom();
            if (musicRoom.inRoom) {
                if (!listener) next = this.allowControls;
            }
            return next;
        },
        resetCurrent() {
            this.loadedSong = false;
            this.loadedPlaylistItems = false;
            this.currentPlaylistItems = [];
            this.playlistId = null;
            this.currentSong = {
                status: "paused",
                el: null,
                data: {},
                info: {},
                progress: 0,
            };
        },
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
            const musicRoom = useMusicRoom();
            if (musicRoom.inRoom) return;
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
            const musicRoom = useMusicRoom();
            if (musicRoom.inRoom) return;
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
            if (payload.playing === true) {
                this.playSong(payload.listener);
            }
        },

        setCurrentPlaylistItems(items, playlistId = null) {
            if (isObject(items)) {
                items = values(items);
            }
            this.currentPlaylistId = playlistId;
            this.currentPlaylistItems = items;
        },
        setDefaultPlaylist(id, items) {
            const payload = { id: id, items: items };
            this.defaultPlaylist.push(payload);
        },

        // ANCHOR end set area //////////////////////////////////////////////////////
        // SECTION CONTROLS //////////////////////////////////////////////////////
        // ANCHOR load song //////////////////////////////////////////////////////
        loadSong(id, playing = false, plf = "yt", playlist, listener = false) {
            const musicRoom = useMusicRoom();
            const next = this.middleware(listener);
            if (!next) return this.notifyControlsValid();
            if (!listener && musicRoom.inRoom) {
                return UserRepo.broadcastRoom(musicRoom.room.id, "load_song", {
                    id: id,
                    playing: playing,
                    plf: plf,
                    playlist: playlist,
                });
            }

            if (isEmpty(playlist.items)) {
                playlist = {
                    id: this.defaultPlaylist.id,
                    items: this.defaultPlaylist.items,
                };
            }

            this.resetSong(true);
            if (this.isActiveSong(id)) {
                if (isEmpty(this.currentPlaylistItems)) {
                    this.currentPlaylistItems = playlist.items;
                    this.storageData();
                }
                return this.playOrPause();
            }

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
                payload.listener = listener;
                this.setCurrentSong(payload);
                if (!musicRoom.inRoom) {
                    // if (isEmpty(playlist.items)) playlist.items.push(payload);
                    this.setCurrentPlaylistItems(playlist.items, playlist.id);
                    this.storageData();
                }
            });
        },
        // ANCHOR shuffle playlist //////////////////////////////////////////////////////
        shufflePlaylist(listener = false) {
            const next = this.middleware(listener);
            if (!next) return this.notifyControlsValid();
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
            this.currentPlaylistItems = array;
            return notify({
                text: "Mixed playlist",
                type: "success",
                position: "top center",
            });
        },
        // ANCHOR loop //////////////////////////////////////////////////////
        loopSong(listener = false) {
            const musicRoom = useMusicRoom();
            const next = this.middleware(listener);
            if (!next) return this.notifyControlsValid();
            if (!listener && musicRoom.inRoom) {
                return UserRepo.broadcastRoom(musicRoom.room.id, "loop_song");
            }
            this.currentSong.el.currentTime = 0;
            this.currentSong.el.loop = true;
            this.playSong();
        },
        // ANCHOR repeat //////////////////////////////////////////////////////
        repeatSong(type, listener = false) {
            const next = this.middleware(listener);
            if (!next) return this.notifyControlsValid();
            this.settings.repeat = type;
            this.currentSong.el.loop = type === "self";
        },
        startSong(id, listener = false) {
            const next = this.middleware(listener);
            if (!next) return this.notifyControlsValid();
            this.setCurrentSong({ index: index });
            this.playSong();
        },
        // ANCHOR play //////////////////////////////////////////////////////
        playSong(listener = false) {
            const next = this.middleware(listener);
            if (!next) return this.notifyControlsValid();
            if (!this.hasSong) return;
            this.currentSong.status = "playing";
            this.currentSong.el.play();
        },
        // ANCHOR reset //////////////////////////////////////////////////////
        resetSong(listener = false) {
            // const next = this.middleware(listener);
            // if (!next) return this.notifyControlsValid();
            if (!this.currentSong.el) return;
            // this.currentSong = {
            //     status: "paused",
            //     el: null,
            //     data: {},
            //     info: {},
            //     progress: 0,
            // };
            this.currentSong.el.currentTime = 0;
            this.currentSong.progress = 0;
            this.pauseSong(listener);
        },
        // ANCHOR pause //////////////////////////////////////////////////////
        pauseSong(listener = false) {
            const next = this.middleware(listener);
            if (!next) return this.notifyControlsValid();
            if (!this.hasSong) return;

            this.currentSong.status = "paused";
            console.log(this.currentSong.status, this.isPlaying);
            this.currentSong.el.pause();
        },
        // ANCHOR update setting //////////////////////////////////////////////////////
        updateSettings(payload) {
            if (payload.hasOwnProperty("volume")) {
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
        // ANCHOR next or prev //////////////////////////////////////////////////////
        nextOrPrevSong(type, listener = false) {
            const next = this.middleware(listener);
            if (!next) return this.notifyControlsValid();

            let index;
            if (this.currentPlaylistItems.length <= 0) {
                return this.loopSong(true);
                return notify({
                    text: "Danh sách phát đang trống",
                    type: "info",
                    position: "top center",
                });
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
            this.loadSong(
                song.id,
                true,
                song.plf,
                {
                    id: this.currentPlaylistId,
                    items: this.currentPlaylistItems,
                },
                listener
            );
        },
        updateStatusCurrentSong(status) {
            this.currentSong.status = status;
        },
        // ANCHOR play or pause //////////////////////////////////////////////////////
        playOrPause(listener = false) {
            const next = this.middleware(listener);
            if (!next) return this.notifyControlsValid();
            const musicRoom = useMusicRoom();
            if (!this.loadedSong) return;
            if (musicRoom.inRoom && !listener) {
                if (!musicRoom.hasRoom) return;
                const play = !this.isPlaying;
                return UserRepo.broadcastRoom(
                    musicRoom.room.id,
                    "play_or_pause",
                    {
                        play: play,
                    }
                );
            }
            if (this.isPlaying) {
                this.pauseSong(true);
            } else {
                this.playSong(true);
            }
        },
        // !SECTION  CONTROLS //////////////////////////////////////////////////////
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
            if (data.hasOwnProperty("plf")) {
                plf = data.plf;
            }
            if (isEmpty(data)) return info;
            if (type === "room") {
                info.title = data.title;
                info.description = data.description;
                info.images.push(data.image);
                info.id = data.uuid;
                return info;
            }
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
