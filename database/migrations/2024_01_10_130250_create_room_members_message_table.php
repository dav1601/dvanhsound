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
        Schema::create('room', function (Blueprint $table) {
            $table->id();
            $table->string("title", 70);
            $table->string("description", 140)->nullable();
            $table->mediumText("image")->nullable();
            $table->enum('status', ['public', 'private']);
            $table->mediumText("password");
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger("room_id");
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
            $table->boolean("isOwner")->default(false);
            $table->timestamps();
        });
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string("message", 200);
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger("room_id");
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
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
        Schema::dropIfExists('room_members_message');
    }
};
