<?php

namespace App\Http\Controllers\Api;

use App\Traits\Responser;

use Illuminate\Http\Request;
use Alaouy\Youtube\Facades\Youtube;
use App\Http\Controllers\Controller;
use Symfony\Component\Process\Process;

class YoutubeController extends Controller
{
    use Responser;
    public $plf;
    public function __construct()
    {
        $this->plf = "yt";
    }
    // ANCHOR get playlist  //////////////////////////////////////////////////////
    public function getPlaylistInfo($id, Request $request)
    {
        try {
            $playlist = Youtube::getPlaylistById($id);
            $playlist->plf = $this->plf;
            return $this->successResponse($playlist);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }
    public function getPlaylistItems($id, Request $request)
    {
        $limit = 100;
        if ($request->has("limit")) $limit = (int) $request->limit;
        try {
            $playlistItems = Youtube::getPlaylistItemsByPlaylistId($id, "", $limit)['results'];
            $playlistItems = collect($playlistItems)->filter(function ($item) {
                return $item->status->privacyStatus === "public";
            });
            return $this->successResponse($playlistItems);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }

    public function getTrack($id)
    {
        try {
            $track = Youtube::getVideoInfo($id);
            $track->src = $this->getPlayable($id);
            if (!$track || $track->status->privacyStatus !== "public" || !$track->src) report("track not available");
            $track->plf = $this->plf;
            return $this->successResponse($track);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }
    public function getPlayable($id)
    {
        $audio = "";
        $process =  Process::fromShellCommandline("yt-dlp -g https://www.youtube.com/watch?v=" . $id);
        $process->run();
        $string = $process->getOutput();
        $rs  = explode("\n", $string);
        $audio = $rs[1];
        return $audio;
    }
}
