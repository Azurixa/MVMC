<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'PagesController@index');

Auth::routes();

Route::get('admin/dashboard', 'AdminController@dashboard');

Route::get('my/dashboard', 'UsersController@dashboard')->name('home');
Route::get('my/collection', 'UsersController@collection');
Route::get('/logout', 'UsersController@logout');
