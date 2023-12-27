import YtPlaylistRepository from "./playlist/YtRepository";
import YtTrackRepository from "./track/YtRepository";
import StPlaylistRepository from "./playlist/StRepository";
import StTrackRepository from "./track/StRepository";
import UserRepository from "./UserRepository";
const repositories = {
    playlist: YtPlaylistRepository,
    track: YtTrackRepository,
    StPlaylist: StPlaylistRepository,
    StTrack: StTrackRepository,
    user: UserRepository,
};
export const RepositoryFactory = {
    get: (name) => repositories[name],
};
