// src/stores/auth.js
import { defineStore } from "pinia";

export const useResponsive = defineStore({
    id: "Responsive",
    state: () => ({
        width: window.innerWidth,
        routerLoading: false,
    }),
    getters: {
        xs: (state) => {
            return state.width < 600; // Tailwind XS breakpoint
        },
        sm: (state) => {
            return state.width >= 600; // Tailwind SM breakpoint
        },
        md: (state) => {
            return state.width >= 768; // Tailwind MD breakpoint
        },
        lg: (state) => {
            return state.width >= 1024; // Tailwind LG breakpoint
        },
        xl: (state) => {
            return state.width >= 1280; // Tailwind XL breakpoint
        },
        xl2: (state) => {
            return state.width >= 1536; // Tailwind 2XL breakpoint
        },
    },
    actions: {},
});
