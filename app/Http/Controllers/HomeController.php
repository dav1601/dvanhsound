<?php

namespace App\Http\Controllers;

use YoutubeDl\Options;
use YoutubeDl\YoutubeDl;
use Illuminate\Http\Request;

use Symfony\Component\Process\Process;
use Alaouy\Youtube\Facades\Youtube;

class HomeController extends Controller
{
    public function index()
    {
        dd("ok");
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
