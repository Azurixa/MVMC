<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Category;
use App\Product;

class ApiController extends Controller
{
    public function login(Request $request) {
        $client = new GuzzleHttp\Client();

        try {
            $res = $client->request('POST', url('/oauth/token'), [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => 2,
                    'client_secret' => 'P016iqfCjZuiao8Lc9XVyrgrG6vNjufDK0Ysld6L',
                    'username' => $request->input('username'),
                    'password' => $request->input('password')
                ]
            ])->getBody();
            Auth::loginUsingId(1);
            return $res;
        } catch (GuzzleException $e) {
            $data = [
                'message' => 'User unauthorized'
            ];
            echo json_encode($data);
        }

    }
}
