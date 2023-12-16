<?php

namespace App\Http\Controllers\Api;

use Aerni\Spotify\Spotify;
use App\Traits\Responser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\Process\Process;
use Alaouy\Youtube\Facades\Youtube;

class SpotifyController extends Controller
{
    use Responser;
    public $spotify;
    public function __construct()
    {
        $this->spotify = new Spotify(config("spotify.default_config"));
    }
    // ANCHOR get playlist  //////////////////////////////////////////////////////
    public function getPlaylistInfo($id, Request $request)
    {
        $playlistId = $id;
        $fields = "collaborative,description,id,images,name,owner,primary_color,public,type,";
        if ($request->has("loadTracks")) {
            $fields .= "tracks";
        }
        if (!$playlistId) return $this->errorResponse("not found playlist id", 404);
        $playlist = $this->spotify->playlist($playlistId)->fields($fields)->get();
        $playlist['plf'] = "st";
        return $this->successResponse($playlist);
    }
    public function getPlaylistItems($id, Request $request)
    {
        $playlistId = $id;
        if (!$playlistId) return $this->errorResponse("not found playlist id", 404);
        $playlistItems = $this->spotify->playlistTracks($playlistId)->get();
        return $this->successResponse($playlistItems);
    }

    public function getTrack($id)
    {
        $track = $this->spotify->track($id)->get();
        $track['src'] = $this->getPlayable($id);
        $track['plf'] = "st";
        return $this->successResponse($track);
    }
    public function getPlayable($id)
    {
        $audio = "";
        $process =  Process::fromShellCommandline("python3 -m spotdl url https://open.spotify.com/track/" . $id);
        $process->run();
        $string = $process->getOutput();
        $rs  = explode("\n", $string);
        $audio = $rs[1];
        return $audio;
    }
}
