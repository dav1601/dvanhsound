import { RepositoryFactory } from "@/repositories/RepositoryFactory";

export default function membership({ to, from, next }) {
    const api = RepositoryFactory.get("user");
    api.isMembership(to.params.id)
        .then((res) => {
            const { data } = res.data;
            const allow = data.allow;

            if (allow === 0) {
                return next({ name: "Home" });
            }

            return next();
        })
        .catch((err) => {
            return next({ name: "Home" });
        });
}
