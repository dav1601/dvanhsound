<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\YoutubeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::controller(YoutubeController::class)->prefix('youtube/')->group(function () {
    Route::prefix("playlist/")->as("playlist.")->group(function () {
        Route::get("info", "getPlaylistInfo")->name("info");
        Route::get("items/{id}", "getPlaylistItems")->name("items");
    });
    Route::prefix("track/")->as("track.")->group(function () {
        Route::get("{id}", "getTrack")->name("audio");

    });
});
