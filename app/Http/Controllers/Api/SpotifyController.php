<?php

namespace App\Http\Controllers\Api;

use App\Models\Playable;
use App\Traits\Responser;
use Aerni\Spotify\Spotify;
use Illuminate\Http\Request;
use Alaouy\Youtube\Facades\Youtube;
use App\Http\Controllers\Controller;

use Symfony\Component\Process\Process;
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
        if ($request['loadTrack']) {
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
        $limit = $request['limit'] ? (int) $request['limit'] : 20;
        try {
            $plf = $this->plf;
            $playlistItems = $this->spotify->playlistTracks($id)->limit($limit)->get()['items'];
            $playlistItems = collect($playlistItems)->map(function ($item) use ($plf) {
                $newItem = collect($item['track']);
                $newItem->put("duration", (int) $newItem['duration_ms'] / 1000);
                $newItem->put("plf", $plf);
                return $newItem;
            });
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
            $track['duration'] = (int) $track['duration_ms'] / 1000;
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
        $rs  = explode("\n", $string);
        $audio = $rs[1];
        return $audio;
    }
    public function syncPlaylist($userId, Request $request)
    {

        $allPlaylist = $this->spotify->userPlaylists($userId)->offset(0)->limit(50)->get();
        return $allPlaylist;
    }
}
