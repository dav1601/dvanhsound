import * as vuerouter from "vue-router";
import middlewarePipeline from "@/middlewarePipeline.js";
import Playlist from "@/pages/Playlist.vue";
import TheLogin from "@/pages/TheLogin.vue";
import TheRegister from "@/pages/TheRegister.vue";
import Home from "@/pages/Home.vue";
import PageNotFound from "@/pages/errors/PageNotFound.vue";
import Search from "@/pages/Search.vue";
import MusicRoom from "@/pages/MusicRoom.vue";
import membership from "@/middleware/membership";
import { useResponsive } from "@/stores/Responsive";
import { useMusicRoom } from "@/stores/MusicRoom";
const routes = [
    {
        path: "/",
        component: Home,
        name: "Home",
        props: true,
    },
    {
        path: "/room/:id",
        component: MusicRoom,
        name: "Room",
        props: true,
        meta: { middleware: [membership] },
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
const router = vuerouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: vuerouter.createWebHistory(),
    routes,
    // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    const mr = useMusicRoom();
    mr.setInRoom(to.name === "Room");
    const middleware = to.meta.middleware;
    const context = { to, from, next };
    const responsive = useResponsive();
    responsive.routerLoading = true;
    if (!middleware) {
        return next();
    }

    middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1),
    });
});
router.afterEach(() => {
    const responsive = useResponsive();
    responsive.routerLoading = false;
});
export default router;
