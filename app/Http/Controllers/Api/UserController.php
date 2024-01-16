<?php

namespace App\Http\Controllers\Api;

use App\Models\Room;
use App\Models\User;
use App\Models\Members;
use App\Traits\Responser;
use Aerni\Spotify\Spotify;
use Illuminate\Http\Request;
use Alaouy\Youtube\Facades\Youtube;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use Responser;
    public function syncPlaylist(Request $request)
    {
        $stId = $request->has('stId') ? $request->stId : null;
        $ytId = $request->has('ytId') ? $request->ytId : null;
        $allPlaylist['yt'] = [];
        $allPlaylist['st'] = [];
        try {
            $spotify =  new Spotify(config("spotify.default_config"));
            if ($ytId != null) $allPlaylist['yt'] = Youtube::getPlaylistsByChannelId($ytId, ["maxResults" => 50])['results'];

            if ($stId != null)  $allPlaylist['st'] = $spotify->userPlaylists($stId)->offset(0)->limit(50)->get()['items'];

            return $this->successResponse($allPlaylist);
        } catch (\Exception $e) {
            return $this->errorResponse("Đồng bộ thất bại, bạn thử kiểm tra lại id channel và user id spotify", $e->getCode());
        }
    }
    public function saveSync(Request $request)
    {
        $stId = $request->has('stId') ? $request->stId : null;
        $ytId = $request->has('ytId') ? $request->ytId : null;

        try {
            $user = $request->user();
            User::where("id", $user->id)->update([
                'st_id' => $stId,
                'yt_id' => $ytId
            ]);
            return $this->successResponse($user);
        } catch (\Exception $e) {
            return $this->errorResponse("Đồng bộ danh sách phát thất bại", $e->getCode());
        }
    }
    public function search($kw = null)
    {
        $spotify =  new Spotify(config("spotify.default_config"));
        $params = [
            'q'             => $kw,
            'type'          => 'playlist',
            'part'          => 'id, snippet',
            'maxResults'    => 16
        ];
        $paramsVideo = [
            'q'             => $kw,
            'type'          => 'video',
            'part'          => 'id, snippet',
            'maxResults'    => 4
        ];

        try {
            // Make intial call. with second argument to reveal page info such as page tokens
            $search['yt']['playlists'] = Youtube::searchAdvanced($params, true)['results'];
            $search['yt']['tracks'] = Youtube::searchAdvanced($paramsVideo, true)['results'];

            $search['yt']['playlists'] = collect($search['yt']['playlists'])->filter(function ($item) {
                unset($item->kind);
                return $item;
            });
            $search['yt']['tracks'] = collect($search['yt']['tracks'])->filter(function ($item) {
                unset($item->kind);
                return $item;
            });
            // $search['yt'] = $search['yt']->groupBy("id.kind")->toArray();

            $search['st'] = $spotify->searchItems($kw, 'playlist, track')->get();
            $search['st'] = collect($search['st'])->toArray();
            return $this->successResponse($search);
        } catch (\Exception $e) {
            return $this->errorResponse();
        }
    }
    // ANCHOR list rooms //////////////////////////////////////////////////////
    public function getRooms(Request $request)
    {
        $limit = $request->has("limit") ? (int) $request->get("limit") : false;

        try {
            $rooms = new Room();
            if ($limit) {
                $rooms = $rooms->limit($limit);
            }
            $rooms = $rooms->orderBy("id", 'asc')->get();
            return $this->successResponse($rooms);
        } catch (\Exception $e) {
            return $this->errorResponse();
        }
    }
    public function checkMembership(Request $request)
    {
        $room_id = $request->roomId;
        $allow = 0;
        try {
            $user = $request->user();
            $room = Room::where("uuid", "LIKE", $room_id)->firstOrFail();
            if ($room->isPrivate()) {

                $isMember = Members::where("room_id", $room->id)->where("user_id", $user->id)->first();
                if ($isMember || $room->user_id == $user->id) {
                    $allow = 1;
                }
            } else {
                $allow = 1;
            }
            return $this->successResponse(['allow' => $allow]);
        } catch (\Exception $e) {
            return $this->errorResponse();
        }
    }
    // ////////////////////////////
    public function getRoom($id, Request $request)
    {
        $spotify =  new Spotify(config("spotify.default_config"));
        try {
            $room = Room::with(['members', 'tracks', 'messages', 'current_song'])->where("uuid", $id)->first();
            $tracks = collect($room->tracks)->groupBy("plf");
            if ($tracks['yt']) {
                $tracks['yt'] = collect($tracks['yt'])->map(function ($item) {
                    return $item->track_id;
                });
                $tracks['yt'] = Youtube::getVideoInfo($tracks['yt']->toArray());
                $track['yt'] = collect($tracks['yt'])->map(function ($video) {
                    $video->duration =  $this->ISO8601ToSeconds($video->contentDetails->duration);
                    $video->plf = "yt";
                    return $video;
                });
            }
            if ($tracks['st']) {
               
            }
            return $tracks;
            return $this->successResponse($room);
        } catch (\Exception $e) {
            return $this->errorResponse();
        }
    }
    // ANCHOR currentSOng //////////////////////////////////////////////////////
    public function updateCurrentSong(Request $request)
    {
        return $request;
    }
}
