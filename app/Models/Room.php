<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;

    protected $table = "rooms";
    protected $fillable = [
        "uuid",
        'title',
        'description',
        'image',
        "status",
        'type',
        "password",
        "user_id",
        "track_id"
    ];
    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model->uuid = (string) Str::uuid();
        });
    }
    public function current_song()
    {
        return $this->belongsTo(RoomTracks::class, "track_id", "id");
    }
    public function members()
    {
        return $this->hasMany(Members::class, "room_id");
    }
    public function messages()
    {
        return $this->hasMany(Messages::class, "room_id");
    }
    public function tracks()
    {
        return $this->hasMany(RoomTracks::class, "room_id");
    }
    public function isPrivate()
    {
        return $this->status === "private";
    }
}
