<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playable extends Model
{
    use HasFactory;
    protected $table = "playable";
    protected $fillable = [
        'plf_id',
        'plf',
        'src'
    ];
}
