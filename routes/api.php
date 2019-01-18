<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth routes
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// Create new smt.
Route::middleware('auth:api')->post('/user/create/category', 'ApiController@createCategory');
Route::middleware('auth:api')->post('/user/create/product', 'ApiController@createProduct');

// Get user categories
Route::middleware('auth:api')->get('/user/categories', 'ApiController@getUserCategories');
// Get all user products
Route::middleware('auth:api')->get('/user/products', 'ApiController@getAllUserProducts');
// Get user products by categories
Route::middleware('auth:api')->get('/user/products/{categoryId}', 'ApiController@getUserProducts');

// Login route
Route::post('/login', 'ApiController@login');
