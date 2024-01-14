import RepositoryBase from "./RepositoryBase";
const resoure = "users";
const room = resoure + "/room";
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
    rooms(params) {
        return RepositoryBase.get(`${room}/list`, {
            params: params,
        });
    },
    loadRoom(id, params) {
        return RepositoryBase.get(`${room}/data/${id}`, {
            params: params,
        });
    },
    isMembership(roomId) {
        return RepositoryBase.post(`${room}/check/membership`, {
            roomId: roomId,
        });
    },
};
