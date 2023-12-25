const myPlugin = {
    install(app) {
        app.config.globalProperties.$asset = (path = "") => {
            return window.assetUrl + "assets/" + path;
        };
        app.config.globalProperties.$assetImg = (path = "") => {
            return window.assetUrl + "assets/images/" + path;
        };
        app.config.globalProperties.$formatTime = (seconds) => {
            let minutes = Math.floor(seconds / 60);
            minutes = minutes >= 10 ? minutes : "0" + minutes;
            seconds = Math.floor(seconds % 60);
            seconds = seconds >= 10 ? seconds : "0" + seconds;
            return minutes + ":" + seconds;
        };
        app.config.globalProperties.$sToHm = (d) => {
            d = Number(d);
            let h = Math.floor(d / 3600);
            let m = Math.floor((d % 3600) / 60);
            let s = Math.floor((d % 3600) % 60);

            let hDisplay = h > 0 ? h + (h == 1 ? " giờ " : " giờ ") : "";
            let mDisplay =
                m > 0 ? m + (m == 1 ? " phút" : " phút ") : "";

            return hDisplay + mDisplay;
        };
        app.config.globalProperties.$getLogo = (type = "og") => {
            if (type === "og") return window.ogLogo;
            return window.smLogo;
        };
        app.config.globalProperties.$getPlfName = (type = "yt") => {
            if (type === "yt") return "Youtube";
            if (type === "st") return "Spotify";
        };
    },
};

export default myPlugin;
