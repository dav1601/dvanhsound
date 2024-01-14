import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { useErrors } from "@/stores/ErrorStore";
import router from "@/router.js";
export default function membership({ to, from, next }) {
    const api = RepositoryFactory.get("user");
    const store = useErrors();

    api.isMembership(to.params.id).then((res) => {
        const { data } = res.data;
        const allow = data.allow;

        if (allow === 0) {
            store.setError("Bạn không có quyền truy cập vào room này");
            return next(false);
        }

        return next();
    });
}
