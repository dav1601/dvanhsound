import RepositoryBase from "../RepositoryBase";
const resoure = "spotify/playlist";
export default {
    getInfo(id, params = {}) {
        return RepositoryBase.get(`${resoure}/info/${id}`, {
            params: params,
        });
    },
    getItems(id, params = {}) {
        return RepositoryBase.get(`${resoure}/items/${id}`, {
            params: params,
        });
    },
    syncPlaylist(userId, params = {}) {
        params["ytId"] = listId.ytId;
        params["stId"] = listId.stId;
        return RepositoryBase.get(`${resoure}/sync/${userId}`, {
            params: params,
        });
    },
};
