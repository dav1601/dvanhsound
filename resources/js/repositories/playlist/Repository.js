import RepositoryBase from "../RepositoryBase";
const resoure = "/playlist";
export default  {
    getInfo(id) {
        console.log(id);
        return RepositoryBase.get(`${resoure}/info` , {params: {playlistId: id}});
    } ,
    getItems(id) {
        return RepositoryBase.get(`${resoure}/items/` +id);
    }
}
