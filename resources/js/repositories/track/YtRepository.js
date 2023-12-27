import RepositoryBase from "../RepositoryBase";
const resoure = "youtube/track";
export default {
    getTrack(id, params = {}) {
        return RepositoryBase.get(`${resoure}/` + id, {
            params: params,
        });
    },
    
};
