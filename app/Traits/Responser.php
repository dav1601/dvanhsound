<?php

namespace App\Traits;

use App\Models\Playable;

trait Responser
{
    protected $ERROR = 0;
    protected $SUCCESS = 1;
    public $response;
    public function __construct()
    {
        $this->response = array();
    }
    protected function successResponse($data, $message = null, $code = 200)
    {
        return response()->json([
            'status' => $this->SUCCESS,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    protected function errorResponse($message = null, $code = 500, $data = [])
    {
        return response()->json([
            'status' => $this->ERROR,
            'message' => $message,
            'data' => $data
        ], $code);
    }
    protected function validatorFailResponse($validator)
    {
        return  $this->errorResponse("validator fail", 403, $validator->errors()->toArray());
    }
    protected function returnE($message, $data = [])
    {
        return [
            'status' => $this->ERROR,
            'message' => $message,
            'data' => $data
        ];
    }
    protected function returnS($data = [])
    {
        return [
            'status' => $this->SUCCESS,
            'data' => $data
        ];
    }
    protected function backSuccess($message = "Success", $data = [])
    {
        $data["success"] = $message;
        return redirect()->back()->with($data);
    }
    protected function backError($message = "Error", $data = [])
    {
        $data["error"] = $message;
        return redirect()->back()->with($data);
    }
    protected function backValidate($validator)
    {
        return redirect()->back()->withErrors($validator)->withInput();
    }
    protected function savePlayable($plf_id = "", $plf = "", $src = "")
    {
        try {
            $playable = Playable::create(['plf' => $plf, 'src' => $src, 'plf_id' => $plf_id]);
            return $playable;
        } catch (\Exception $e) {
            return false;
        }
    }
    function ISO8601ToSeconds($ISO8601)
    {
        $interval = new \DateInterval($ISO8601);

        return ($interval->d * 24 * 60 * 60) +
            ($interval->h * 60 * 60) +
            ($interval->i * 60) +
            $interval->s;
    }
}
