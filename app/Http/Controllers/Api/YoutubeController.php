<?php

namespace App\Http\Controllers\Api;

use App\Traits\Responser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\Process\Process;
use Alaouy\Youtube\Facades\Youtube;

class YoutubeController extends Controller
{
    use Responser;
    public $youtube;
    public function __construct()
    {
    }
    // ANCHOR get playlist  //////////////////////////////////////////////////////
    public function getPlaylistInfo(Request $request)
    {
        $playlistId = $request->playlistId;
        if (!$playlistId) return $this->errorResponse("not found playlist id", 404);
        $playlist = Youtube::getPlaylistById($playlistId);
        return $this->successResponse($playlist);
    }
    public function getPlaylistItems($id)
    {
        $playlistId = $id;
        if (!$playlistId) return $this->errorResponse("not found playlist id", 404);
        $playlistItems = Youtube::getPlaylistItemsByPlaylistId($playlistId)['results'];
        return $this->successResponse(collect($playlistItems)->toArray());
    }

    public function getTrack($id)
    {
        $track = Youtube::getVideoInfo($id);
        $track->src = $this->getAudioByVideoId($id);
        return $this->successResponse(collect($track)->toArray());
    }
    public function getAudioByVideoId($id)
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
