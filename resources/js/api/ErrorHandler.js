// apiErrorHandler.js

import router from "@/router";
import { useErrors } from "@/stores/ErrorStore";
export const handleApiError = (err) => {
    const storeError = useErrors();
    const response = err.response;
    const data = response.data;
    let message = data.message;
    const code = response.status;
    switch (code) {
        case 401:
            return router.push({ name: "Login" });
        case 404:
            message = "Không tìm thấy dữ liệu";
            break;
        case 403:
            message = "Không có quyền truy cập";
            break;
        default:
            message = "Lỗi máy chủ";
            break;
    }
    console.log(err);
    return storeError.setError(message);
};
