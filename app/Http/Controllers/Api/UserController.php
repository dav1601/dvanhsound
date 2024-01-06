<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
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
            return $this->errorResponse("Xin lỗi vì sự cố máy chủ!");
        }
    }
}
