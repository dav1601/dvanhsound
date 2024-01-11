<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Members;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Messages>
 */
class MessagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $member = Members::where("room_id", 1)->inRandomOrder()->first();
        return [
            "user_id" => $member->user_id,
            "room_id" => 1,
            "message" => "Nhac choay vai~ them nhieu bai vao list nua de"
        ];
    }
}
