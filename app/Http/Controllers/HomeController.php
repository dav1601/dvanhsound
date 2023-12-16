<?php

namespace App\Http\Controllers;

use YoutubeDl\Options;
use YoutubeDl\YoutubeDl;
use Illuminate\Http\Request;

use Alaouy\Youtube\Facades\Youtube;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class HomeController extends Controller
{
    public function index()
    {
        $audio = "";

        $process =  Process::fromShellCommandline("python3 -m spotdl url https://open.spotify.com/track/5uyNAX6MazVAjBjVeOsTvp");
        $process->run();

        $string = $process->getOutput();
        $rs  = explode("\n", $string);
        $audio = $rs[1];
        dd($audio);
    }
    public function getAudioById($id)
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
