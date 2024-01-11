import "./bootstrap";
import { createApp, markRaw } from "vue";
import App from "@/App.vue";
import router from "@/router";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createPinia } from "pinia";
import helper from "@/helper/index.js";
import Notifications from "@kyvg/vue3-notification";


// ANCHOR router //////////////////////////////////////////////////////

// ANCHOR vuetify //////////////////////////////////////////////////////
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "dark",
    },
});
const pinia = createPinia();
pinia.use(({ store }) => {
    store.$router = markRaw(router);
});
// ANCHOR create app //////////////////////////////////////////////////////
const app = createApp(App);
app.use(router);
app.use(vuetify, {
    iconfont: "mdi",
});
app.use(helper);
app.use(pinia);
app.use(Notifications);
app.mount("#app");
