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
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }
}
