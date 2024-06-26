<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Api\YoutubeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(HomeController::class)->group(function () {
    Route::get('system/test', 'index');
    Route::get('trending', 'trending')->name("trending");
    Route::post('trending/create', 'trending_create');
});

// Route::get('/{any}', function () {
//     return view('app');
// })->where('any', '^(?!api\/)[\/\w\.-]*')->name("app");
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
