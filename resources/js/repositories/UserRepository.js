import RepositoryBase from "./RepositoryBase";
const resoure = "users";
const sync = resoure + "/sync";
export default {
    syncPlaylist(listId = {}, params = {}) {
        params["ytId"] = listId.ytId;
        params["stId"] = listId.stId;
        return RepositoryBase.get(`${sync}/playlist`, {
            params: params,
        });
    },
    saveSync(listId = {}, params = {}) {
        params["ytId"] = listId.ytId;
        params["stId"] = listId.stId;
        return RepositoryBase.post(`${sync}/save`, params);
    },
    search(kw, params = {}) {
        return RepositoryBase.get(`${resoure}/search/` + kw, {
            params: params,
        });
    },
};
