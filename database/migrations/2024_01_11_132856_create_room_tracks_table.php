<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->dropForeign(['room_id']);

            $table->foreign('room_id')
                ->references('id')
                ->on('rooms')
                ->onDelete('cascade');
        });
        Schema::table('members', function (Blueprint $table) {
            $table->dropForeign(['room_id']);

            $table->foreign('room_id')
                ->references('id')
                ->on('rooms')
                ->onDelete('cascade');
        });
        Schema::create('tracks_room', function (Blueprint $table) {
            $table->id();
            $table->string("track_id", 100);
            $table->unsignedBigInteger("room_id");
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
            $table->enum('plf', ['dvs', 'st', 'yt'])->default("yt");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tracks_room');
    }
};
