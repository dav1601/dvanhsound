<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use YoutubeDl\Options;
use YoutubeDl\YoutubeDl;

use Aerni\Spotify\Spotify;
use App\Models\RoomTracks;
use Illuminate\Http\Request;
use Alaouy\Youtube\Facades\Youtube;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class HomeController extends Controller
{
    public function index()
    {
        $spotify = new Spotify(config("spotify.default_config"));
        $list = Youtube::getPlaylistItemsByPlaylistId("PLlD46yrpUbIV22mq_rZ0aITj3aldb0WAg")['results'];
        // foreach ($list as $key => $value) {
        //     RoomTracks::create(['room_id' => 1, 'track_id' => $value->contentDetails->videoId, 'plf' => "yt"]);
        // }
        // dd(RoomTracks::all());
    }
    public function convertImage(Request $request)
    {
        $url = $request->url();
    }
}
