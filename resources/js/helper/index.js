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
        app.config.globalProperties.$getLogo = (type = "og") => {
            if (type === "og") return window.ogLogo;
            return window.smLogo;
        };
    },
};

export default myPlugin;
