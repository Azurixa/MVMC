<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class UsersController extends Controller
{
    public function __construct ()
    {
        $this->middleware('auth');
    }

    public function dashboard ()
    {
        return view('user.dashboard');
    }

    public function logout (Request $request)
    {
        Auth::logout();
        return redirect('/login');
    }
}
