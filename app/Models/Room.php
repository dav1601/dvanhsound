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
        "password",
        "user_id"
    ];
    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model->uuid = (string) Str::uuid();
        });
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
