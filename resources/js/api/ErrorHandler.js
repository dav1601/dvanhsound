// apiErrorHandler.js
import { notify } from "@kyvg/vue3-notification";
import router from "@/router";
export const handleApiError = (err) => {
    const response = err.response;
    const data = response.data;
    let message = data.message;
    const code = data.status;
    switch (code) {
        case 401:
            return router.push({ name: "Login" });
        case 404:
            message = "Không thể tìm thấy tài nguyên được yêu cầu.";
            break;
        case 403:
            message = "Không có quyền truy cập";
            break;
        default:
            message = "Một lỗi xảy ra trên máy chủ khi xử lý yêu cầu.";
            break;
    }
    if (message)
        return notify({
            title: "Lỗi",
            text: message,
            type: "error",
            timeout: 5000,
        });
    return true;
};
