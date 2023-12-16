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
    public $youtube;
    public function __construct()
    {
    }
    // ANCHOR get playlist  //////////////////////////////////////////////////////
    public function getPlaylistInfo($id, Request $request)
    {
        $playlistId = $id;
        if (!$playlistId) return $this->errorResponse("not found playlist id", 404);
        $playlist = Youtube::getPlaylistById($playlistId);
        $playlist->plf = "yt";
        return $this->successResponse($playlist);
    }
    public function getPlaylistItems($id)
    {
        $playlistId = $id;
        if (!$playlistId) return $this->errorResponse("not found playlist id", 404);
        $playlistItems = Youtube::getPlaylistItemsByPlaylistId($playlistId)['results'];
        $playlistItems = collect($playlistItems)->filter(function ($item) {
            return $item->status->privacyStatus === "public";
        });
        return $this->successResponse($playlistItems);
    }

    public function getTrack($id)
    {
        $track = Youtube::getVideoInfo($id);
        if ($track->status->privacyStatus !== "public" || !$track) return $this->errorResponse("track not found", 404);
        $track->src = $this->getPlayable($id);
        $track->plf = "yt";
        return $this->successResponse(collect($track)->toArray());
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
