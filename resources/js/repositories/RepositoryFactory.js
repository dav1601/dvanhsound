import PlaylistRepository from "./playlist/Repository";
import TrackRepository from "./track/Repository";
const repositories =  {
    playlist: PlaylistRepository ,
    track:TrackRepository
}
export const RepositoryFactory = {
    get: name =>  repositories[name]
}
