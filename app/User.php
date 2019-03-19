<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Add an $amount [int] of experience to user based on $id [int]
     *
     * @param $id
     * @param $amount
     */
    public static function addExperience($id, $amount) {
        $user = User::find($id);
        $user->exp += $amount;
        if ($user->exp >= $user->exp_next){
            // Next level
            $user->level++;
            $user->exp_next += $user->exp_next+150;
        }
        $user->save();
    }
}
