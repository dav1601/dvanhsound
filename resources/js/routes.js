import Playlist from "@/pages/Playlist.vue";
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
        path: "/playlist/:id",
        component: Playlist,
        name: "Playlist",
        props: true,
    },
    { path: "/:pathMatch(.*)*", component: PageNotFound, name: "404" },
];

export default routes;
