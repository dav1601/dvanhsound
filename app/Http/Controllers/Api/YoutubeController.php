<?php

namespace App\Http\Controllers\Api;

use App\Models\Playable;

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
            $playlistItems = collect(Youtube::getPlaylistItemsByPlaylistId($id, "", $limit)['results']);
            $playlistItems = $playlistItems->filter(function ($item) {
                return $item->status->privacyStatus === "public";
            });
            $plf = $this->plf;
            $playlistItems = $playlistItems->map(function ($item) use ($plf) {
                $newItem = collect($item);
                $newItem->put("id", $item->contentDetails->videoId);
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
            $track = Youtube::getVideoInfo($id);
            $playble = Playable::where("plf_id", '=', $id)->where("plf", '=', $this->plf)->first();
            if ($playble) {
                $track->src = $playble->src;
            } else {
                $track->src = $this->getPlayable($id);
                $this->savePlayable($id, $this->plf, $track->src);
            }
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
