<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Love;
use YoutubeDl\Options;

use YoutubeDl\YoutubeDl;
use Aerni\Spotify\Spotify;
use App\Models\RoomTracks;
use Illuminate\Http\Request;
use Alaouy\Youtube\Facades\Youtube;
use App\Traits\Responser;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Process\Exception\ProcessFailedException;

class HomeController extends Controller
{
    use Responser;
    public function index()
    {
        $spotify = new Spotify(config("spotify.default_config"));
        $list = $spotify->playlistTracks("37i9dQZEVXbvK0cS2Fkkuh")->limit(10)->get()['items'];

        // foreach ($list as $key => $value) {

        //     RoomTracks::create(['room_id' => 1, 'track_id' => $value['track']['id'], 'plf' => "st"]);
        // }
        // dd(RoomTracks::all());
    }
    public function convertImage(Request $request)
    {
        $url = $request->url();
    }
    public function trending(Request $request)
    {

        // $validator = Validator::make($request->all(), [
        //     "from" => "string|max:35",
        //     "to" => "string|max:35",
        // ]);

        $from = "LAXUDASICK";
        $to =  "Bạn";
        $message = "Bạn làm người iu mình nha <3";
        if ($request->has("id")) {
            $item = Love::where("uuid", 'LIKE', $request->id)->first();
            if ($item) {
                $from = $item->from_name;
                $to = $item->to_name;
                $message = $item->message;
            }
        }

        return view("trending", compact("from", "to", "message"));
    }
    public function trending_create(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "from" => "required|string|max:35",
            "to" => "required|string|max:35",
            "message" => "required|string|max:255"
        ]);
        if ($validator->fails()) {
            return $this->validatorFailResponse($validator);
        }
        $created = Love::create(['from_name' => $request->from, "to_name" => $request->to, "message" => $request->message]);


        return $this->successResponse(['public_url' => route("trending") . "?id=" . $created->uuid]);
    }
}
