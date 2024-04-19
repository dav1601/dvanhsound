<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Love extends Model
{
    use HasFactory;


    protected $table = "confess_to_her";
    protected $fillable = [
        "uuid",
        "from_name",
        "to_name",
        "message"

    ];
    protected static function boot()
    {
        // Boot other traits on the Model
        parent::boot();


        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });
    }
}
