// apiErrorHandler.js
import { notify } from "@kyvg/vue3-notification";
export const handleApiError = (err) => {
    const response = err.response;
    const data = response.data;
    const message = data.message;
    if (message)
        return notify({
            title: "Lỗi",
            text: message,
            type: "error",
            timeout: 5000,
        });
    return true;
};
