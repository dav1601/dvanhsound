<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SpotifyController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\YoutubeController;
use App\Models\User;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::controller(AuthController::class)->group(function () {
    Route::post("login", 'login')->name("login");
    Route::post("register", 'register')->name("register");
    Route::middleware('auth:sanctum')->group(function () {
        Route::post("logout", 'logout')->name("logout");
        Route::get("user", 'user')->name("user");
    });
});


Route::controller(UserController::class)->as("users.")->prefix('users/')->group(function () {
    Route::get("sync/playlist", 'syncPlaylist')->name("sync_playlist");
    Route::get("search/{kw?}", 'search')->name("search");
    Route::post("sync/save", "saveSync")->middleware('auth:sanctum')->name("save_sync");
});

Route::controller(YoutubeController::class)->as("yt.")->prefix('youtube/')->group(function () {
    Route::prefix("playlist/")->as("playlist.")->group(function () {
        Route::get("info/{id}", "getPlaylistInfo")->name("info");
        Route::get("items/{id}", "getPlaylistItems")->name("items");
        Route::get("sync/{userId}", 'syncPlaylist')->name("sync_playlist");
    });
    Route::prefix("track/")->as("track.")->group(function () {
        Route::get("{id}", "getTrack")->name("audio");
    });
    Route::post("convert_image", "convertImage")->name("yt.convert_image");
});
Route::controller(SpotifyController::class)->as("st.")->prefix('spotify/')->group(function () {
    Route::prefix("playlist/")->as("playlist.")->group(function () {
        Route::get("info/{id}", "getPlaylistInfo")->name("info");
        Route::get("items/{id}", "getPlaylistItems")->name("items");
        Route::get("sync/{channelId}", 'syncPlaylist')->name("sync_playlist");
    });
    Route::prefix("track/")->as("track.")->group(function () {
        Route::get("{id}", "getTrack")->name("audio");
    });
});
