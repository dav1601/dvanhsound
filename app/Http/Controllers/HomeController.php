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
        $list = $spotify->playlistTracks("37i9dQZEVXbvK0cS2Fkkuh")->limit(10)->get()['items'];

        // foreach ($list as $key => $value) {

        //     RoomTracks::create(['room_id' => 1, 'track_id' => $value['track']['id'], 'plf' => "st"]);
        // }
        // dd(RoomTracks::all());
    }
    public function convertImage(Request $request)
    {
        $url = $request->url();
    }
}
