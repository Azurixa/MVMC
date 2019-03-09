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

    /**
     * Returns user only makeup collection page
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function collection ()
    {
        return view('user.collection')->with(['title' => 'Makeup Collection']);
    }

    public function dashboard ()
    {
        return view('user.dashboard')->with(['title' => 'User dashboard']);
    }

    public function logout (Request $request)
    {
        Auth::logout();
        return redirect('/login');
    }
}
