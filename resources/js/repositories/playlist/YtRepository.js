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
    convertImage(url, id) {
        return RepositoryBase.post("youtube/convert_image", {
            url: url,
            id: id,
        });
    },
};
