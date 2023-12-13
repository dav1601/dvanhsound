import RepositoryBase from "../RepositoryBase";
const resoure = "/track";
export default  {
    getTrack(id) {
        return RepositoryBase.get(`${resoure}/` + id);
    } ,

}
