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
            status: "paused",
            index: null,
            el: null,
            data: [],
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
            localStorage.setItem("currentSong", payload.index);
            const index = payload.index;
            const data = this.playlist[index];
            console.log("set current song");
            this.currentSong.index = index;
            this.currentSong.data = data;
            console.log(data);
            if (this.currentSong.el !== null) {
                this.currentSong.el.src = data.source;
            } else {
                this.currentSong.el = new Audio(data.source);
            }
            this.currentSong.el.currentTime = 0;
            this.currentSong.el.volume = this.settings.volume / 100;
            this.currentSong.el.loop = this.settings.repeat === "self";
        },
        shufflePlaylist() {
            let array = this.playlist.filter((song, index) => {
                return index != this.currentSong.index;
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
            array.unshift(this.playlist[this.currentSong.index]);
            return (this.playlist = array);
        },
        repeatSong(type) {
            this.settings.repeat = type;
            this.currentSong.el.loop = type === "self";
        },
        startSong(index) {
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
            let index = parseInt(this.currentSong.index);
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
