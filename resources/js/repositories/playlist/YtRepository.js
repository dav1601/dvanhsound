import RepositoryBase from "../RepositoryBase";
const resoure = "youtube/playlist";
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
};
