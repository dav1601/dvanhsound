import Playlist from "@/pages/Playlist.vue";
import TheLogin from "@/pages/TheLogin.vue";
import TheRegister from "@/pages/TheRegister.vue";
import Home from "@/pages/Home.vue";
import PageNotFound from "@/pages/errors/PageNotFound.vue";
import Search from "@/pages/Search.vue";
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
    {
        path: "/register",
        component: TheRegister,
        name: "Register",
        props: true,
    },
    {
        path: "/search/:kw?",
        component: Search,
        name: "Search",
        
    },

    { path: "/:pathMatch(.*)*", component: PageNotFound, name: "404" },
];

export default routes;
