<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
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
        $t = Carbon::parse("PT3M47S")->format("s");
    }
    public function convertImage(Request $request)
    {
        $url = $request->url();
    }
}
