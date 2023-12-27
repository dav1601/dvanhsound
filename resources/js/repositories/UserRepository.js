import RepositoryBase from "./RepositoryBase";
const resoure = "users";
export default {
    syncPlaylist(listId = {}, params = {}) {
        params["ytId"] = listId.ytId;
        params["stId"] = listId.stId;
        return RepositoryBase.get(`${resoure}/playlist/sync`, {
            params: params,
        });
    },
};
