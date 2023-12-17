<?php

namespace App\Http\Controllers\Api;

use Aerni\Spotify\Spotify;
use App\Traits\Responser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\Process\Process;
use Alaouy\Youtube\Facades\Youtube;

use function PHPUnit\Framework\throwException;

class SpotifyController extends Controller
{
    use Responser;
    public $spotify;
    public $plf;
    public function __construct()
    {
        $this->spotify = new Spotify(config("spotify.default_config"));
        $this->plf = "st";
    }
    // ANCHOR get playlist  //////////////////////////////////////////////////////
    public function getPlaylistInfo($id, Request $request)
    {
        $playlistId = $id;
        $fields = "collaborative,description,id,images,name,owner,primary_color,public,type,";
        if ($request->has("loadTracks")) {
            $fields .= "tracks";
        }
        try {
            $playlist = $this->spotify->playlist($playlistId)->fields($fields)->get();
            $playlist['plf'] = $this->plf;
            return $this->successResponse($playlist);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }
    public function getPlaylistItems($id, Request $request)
    {
        try {
            $playlistItems = $this->spotify->playlistTracks($id)->limit(20)->get();
            return $this->successResponse($playlistItems);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }

    public function getTrack($id)
    {
        try {
            $track = $this->spotify->track($id)->get();
            $track['src'] = $this->getPlayable($id);
            $track['plf'] = $this->plf;
            return $this->successResponse($track);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }
    public function getPlayable($id)
    {
        $audio = "";
        $process =  Process::fromShellCommandline("python3 -m spotdl url https://open.spotify.com/track/" . $id);
        $process->run();
        $string = $process->getOutput();
        return $string;
        $rs  = explode("\n", $string);
        $audio = $rs[1];
        return $audio;
    }
}
