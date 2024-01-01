// src/stores/auth.js
import { defineStore } from "pinia";
import RepositoryBase from "@/repositories/RepositoryBase";
import { notify } from "@kyvg/vue3-notification";
import Cookies from "js-cookie";
import { useUsers } from "@/stores/Users";

const api = RepositoryBase;

export const useAuthStore = defineStore({
    id: "Auth",
    state: () => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        validator: [],
    }),
    getters: {
        getUser: (state) => state.user,
    },
    actions: {
        login(email, password) {
            this.isLoading = true;
            this.validator = [];
            api.get(`sanctum/csrf-cookie`).then((res) => {
                api.post("/login", {
                    email: email,
                    password: password,
                })
                    .then(async (res) => {
                        const data = res.data.data;
                        Cookies.set("dvanhsound_token", data.token);
                        await this.fetchUserInfo({ name: "Home" }, true);
                    })
                    .catch((err) => {
                        this.handleErroResponse(err);
                    });
            });
        },

        register(name, email, password) {
            this.isLoading = true;
            this.validator = [];
            api.get(`sanctum/csrf-cookie`).then((res) => {
                return api
                    .post("/register", {
                        name: name,
                        email: email,
                        password: password,
                    })
                    .then((res) => {
                        this.isLoading = false;
                        this.login(email, password);
                    })
                    .catch((err) => {
                        this.handleErroResponse(err);
                    });
            });
        },

        logout() {
            api.post("/logout")
                .then((res) => {
                    this.clearUser();
                })
                .catch((err) => {
                    this.handleErroResponse(err);
                });
        },

        fetchUserInfo(to = {}, loginAction = false) {
            const user = useUsers();
            if (!this.isAuthenticated && !loginAction) {
                return user.initUser(null);
            }
            return api
                .get("/user")
                .then((res) => {
                    console.log(res);
                    this.isLoading = false;
                    const { data } = res.data;
                    this.setUser(data.user);
                    user.initUser(data.user);
                    if (to) {
                        this.$router.push(to);
                    }
                })
                .catch((err) => {
                    this.clearUser();
                });
        },

        setUser(user) {
            this.user = user;
            this.isAuthenticated = !!user;
        },

        clearUser() {
            this.user = null;
            this.isAuthenticated = false;
            Cookies.remove("dvanhsound_token");
        },
        handleErroResponse(err) {
            this.isLoading = false;
            const response = err.response;
            const data = response.data;
            const code = response.status;
            const message = data.message;
            if (code === 403) return (this.validator = data.data);
            return notify({
                title: "Lỗi",
                text: message,
                type: "error",
                timeout: 5000,
            });
        },
    },
});
