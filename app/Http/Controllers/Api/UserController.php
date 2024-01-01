<?php

namespace App\Http\Controllers\Api;

use Aerni\Spotify\Spotify;
use Illuminate\Http\Request;
use Alaouy\Youtube\Facades\Youtube;
use App\Http\Controllers\Controller;
use App\Traits\Responser;

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
            $user->st_id = $stId;
            $user->yt_id = $ytId;
            $user->save();
            return $this->successResponse($user);
        } catch (\Exception $e) {
            return $this->errorResponse("Đồng bộ danh sách phát thất bại", $e->getCode());
        }
    }
    public function search($id = null)
    {
        $spotify =  new Spotify(config("spotify.default_config"));
        $search['yt'] = Youtube::search($id, 20);
        $search['st'] = $spotify->searchItems($id, 'album, artist, playlist, track')->get();
        return $search;
    }
}
