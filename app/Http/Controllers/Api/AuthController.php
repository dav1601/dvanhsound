<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Traits\Responser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use Responser;
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|string|email",
            "password" => "required",
        ]);
        if ($validator->fails()) {
            return $this->validatorFailResponse($validator);
        }
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->errorResponse("Email hoặc mật khẩu không hợp lệ", 401);
        }

        try {
            $user = User::where('email', $request->email)->firstOrFail();
            $token = $user->createToken('auth_token')->plainTextToken;
            return $this->successResponse(['token' => $token]);
        } catch (\Exception $e) {
            return $this->errorResponse("Login failed");
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            'name' => "required|string|max:100"
        ]);
        if ($validator->fails()) {
            return $this->validatorFailResponse($validator);
        }
        try {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            return $this->successResponse(['reg_success' => true]);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function user(Request $request)
    {
        return   $this->successResponse(['user' => $request->user()]);
    }
    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $user->tokens()->delete();
            return $this->successResponse(['logout_success' => true]);
        }
        return $this->errorResponse("Đăng xuất thất bại");
    }
}
