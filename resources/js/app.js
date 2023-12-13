import "./bootstrap";
import { createApp } from "vue";
import App from "@/App.vue";
import routes from "@/routes.js";
import * as vuerouter from "vue-router";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createPinia } from "pinia";
import helper from "@/helper/index.js";
import Notifications from "@kyvg/vue3-notification";
// ANCHOR router //////////////////////////////////////////////////////
const router = vuerouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: vuerouter.createWebHistory(),
    routes,
    // short for `routes: routes`
});
// ANCHOR vuetify //////////////////////////////////////////////////////
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "dark",
    },
});
const pinia = createPinia();
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
