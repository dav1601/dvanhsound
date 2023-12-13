import Playlist from "@/pages/Playlist.vue";
import Home from "@/pages/Home.vue";
const routes = [
    {
        path: "/",
        component: Home,
        name: "Home",
        props: true
    },
    {
        path: "/playlist",
        component: Playlist,
        name: "Playlist" ,
        props: true
    },
];

export default routes;
