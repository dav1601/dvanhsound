<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Members extends Model
{
    use HasFactory;
    protected $table = "members";
    protected $fillable = [
        "room_id",
        "user_id",
        "isOwner",
        "is_dj"
    ];
    public function user()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
