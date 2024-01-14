import { defineStore } from "pinia";

import { notify } from "@kyvg/vue3-notification";

export const useErrors = defineStore({
    id: "HandlerErrors",

    state: () => ({
        error: null,
    }),

    getters: {},
    actions: {
        setError(error) {
            this.error = error;
            this.showErrorMessage();
        },
        clearError() {
            this.error = null;
        },
        showErrorMessage() {
            if (this.error) {
                return notify({
                    title: "Lỗi",
                    type: "error",
                    timeout: 5000,
                    position: "top center",
                    text: this.error,
                });
            }
        },
    },
});
