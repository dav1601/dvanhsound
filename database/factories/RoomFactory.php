<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {
        $stt = ['public', 'private'];
        $status = array_rand($stt, 1);
        return [
            "uuid" => (string) Str::uuid(),
            "title" => "Phong nghe nhac chung",
            "description" => "nghe moi the loai nhac",
            "status" => $stt[$status],
            "user_id" => 8
        ];
    }
}
