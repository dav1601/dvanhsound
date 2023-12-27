<?php

namespace App\Http\Controllers\Api;

use Aerni\Spotify\Spotify;
use Illuminate\Http\Request;
use Alaouy\Youtube\Facades\Youtube;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function syncPlaylist(Request $request)
    {
        $stId = $request->stId;
        $ytId = $request->ytId;
        $allPlaylist = [];
        $allPlaylist['ytPlaylist'] = Youtube::getPlaylistsByChannelId($ytId);
        $allPlaylist['stPlaylist'] = Spotify::userPlaylists($stId)->get();
        return $allPlaylist;
    }
}
