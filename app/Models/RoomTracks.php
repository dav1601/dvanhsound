<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomTracks extends Model
{
    use HasFactory;
    protected $table = "tracks_room";
    protected $fillable = [
        "room_id",
        "track_id",
        "plf"
    ];
}
