import Playlist from "@/pages/Playlist.vue";
import TheLogin from "@/pages/TheLogin.vue";
import Home from "@/pages/Home.vue";
import PageNotFound from "@/pages/errors/PageNotFound.vue";
const routes = [
    {
        path: "/",
        component: Home,
        name: "Home",
        props: true,
    },
    {
        path: "/playlist/:plf/:id",
        component: Playlist,
        name: "Playlist",
        props: true,
    },
    {
        path: "/login",
        component: TheLogin,
        name: "Login",
        props: true,
    },

    { path: "/:pathMatch(.*)*", component: PageNotFound, name: "404" },
];

export default routes;
