import Playlist from "@/pages/Playlist.vue";
const routes = [
    {
        path: "/",
        component: Playlist,
        props: true,
    },
    {
        path: "/playlist",
        component: Playlist,
        props: true,
    },
];

export default routes;
