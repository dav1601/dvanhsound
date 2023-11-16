import { defineStore } from "pinia";

export const useDatabaseApp = defineStore({
    id: "databaseApp",
    state: () => ({
        // sing me to sleep : 2i2khp_npdE  , on my way: dhYOPzcsbGM , faded: 60ItHLz5WEA ,alone : 1-xGerv5FOk , darkside : M-P4QBt-FWw
        playlist: [
            {
                id: "2i2khp_npdE",
                title: "Sing Me To Sleep",
                image: "https://i.scdn.co/image/ab67616d0000485125d3bdf7a569b926dab0f151",
                source: "https://res.cloudinary.com/vanh-tech/video/upload/v1699984453/dvanhsound/source/Sing_Me_To_Sleep_am83pc.mp3",
                views: "366.891.831",
            },
            {
                id: "dhYOPzcsbGM",
                title: "On My Way",
                image: "https://i.scdn.co/image/ab67616d00004851d2aaf635815c265aa1ecdecc",
                source: "https://res.cloudinary.com/vanh-tech/video/upload/v1699984318/dvanhsound/source/On_My_Way_btdngz.mp3",
                views: "611.276.850",
            },
            {
                id: "60ItHLz5WEA",
                title: "Faded",
                image: "https://i.scdn.co/image/ab67616d00004851a108e07c661f9fc54de9c43a",
                source: "https://res.cloudinary.com/vanh-tech/video/upload/v1699984284/dvanhsound/source/Faded_ra7qqb.mp3",
                views: "1.820.908.434",
            },
            {
                id: "1-xGerv5FOk",
                title: "Alone",
                image: "https://i.scdn.co/image/ab67616d00004851a108e07c661f9fc54de9c43a",
                source: "https://res.cloudinary.com/vanh-tech/video/upload/v1699984278/dvanhsound/source/Alone_qwoql3.mp3",
                views: "682.225.824",
            },
            {
                id: "M-P4QBt-FWw",
                title: "Darkside",
                image: "https://i.scdn.co/image/ab67616d00004851a108e07c661f9fc54de9c43a",
                source: "https://res.cloudinary.com/vanh-tech/video/upload/v1699984314/dvanhsound/source/Darkside_yy5glg.mp3",
                views: "557.938.713",
            },
        ],
        // ANCHOR end playlist //////////////////////////////////////////////////////
        navList: [
            {
                subHeader: "",
                id: "nav-left-main",
                items: [
                    {
                        name: "home",
                        icon: "home",
                    },
                    {
                        name: "discover",
                        icon: "compass",
                    },
                    {
                        name: "radio",
                        icon: "radio",
                    },
                    {
                        name: "albums",
                        icon: "album",
                    },
                    {
                        name: "podcast",
                        icon: "microphone",
                    },
                ],
            },
            {
                subHeader: "library",
                id: "nav-left-lib",
                items: [
                    {
                        name: "Recently Added",
                        icon: "file-music",
                    },
                    {
                        name: "Favorite Songs",
                        icon: "heart",
                    },
                    {
                        name: "Local Files",
                        icon: "file-marker",
                    },
                ],
            },
            {
                subHeader: "Playlist",
                id: "nav-left-playlist",
                items: [
                    {
                        name: "Lo-fi Music",
                        icon: "music-box-multiple",
                    },
                    {
                        name: "best of ed sheeran",
                        icon: "music-box-multiple",
                    },
                    {
                        name: "best of usuk",
                        icon: "music-box-multiple",
                    },
                ],
            },
        ],
        // ANCHOR current song //////////////////////////////////////////////////////
        currentSong: {
            status: "",
            index: null,
            el: null,
            data: [],
        },
        settings: {
            volume: localStorage.getItem("songVolume")
                ? localStorage.getItem("songVolume")
                : 50,
            repeat: "unset",
        },
    }),

    getters: {
        getDataCurrentSong: (state) => {
            return state.currentSong.data;
        },
        getPlaylist: (state) => {
            return state.playlist;
        },
    },
    actions: {
        setCurrentSong(payload) {
            const index = payload.index;
            const data = this.playlist[index];
            this.currentSong.index = index;
            this.currentSong.data = data;
            this.currentSong.el = new Audio(data.source);
            this.currentSong.el.volume = this.settings.volume / 100;
            this.currentSong.el.loop = this.settings.repeat === "self";
        },
        playSong() {
            this.currentSong.status = "playing";
            this.currentSong.el.play();
        },
        updateSettings(payload) {
            if (payload.volume) {
                console.log(payload.volume);
                if (payload.volume === 1) {
                    payload.volume = 0;
                }
                this.currentSong.el.volume = payload.volume / 100;
                this.settings.volume = payload.volume;
                localStorage.setItem("songVolume", payload.volume);
            }
        },
    },
});
