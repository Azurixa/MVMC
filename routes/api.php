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
// Create
Route::middleware('auth:api')->post('/user/create/category', 'ApiController@createCategory');
Route::middleware('auth:api')->post('/user/create/brand', 'ApiController@createBrand');
Route::middleware('auth:api')->post('/user/create/product', 'ApiController@createProduct');

// Delete
Route::middleware('auth:api')->post('/user/delete/category', 'ApiController@deleteCategory');
Route::middleware('auth:api')->post('/user/delete/brand', 'ApiController@deleteBrand');
Route::middleware('auth:api')->post('/user/delete/product', 'ApiController@deleteProduct');

// Get
Route::middleware('auth:api')->get('/user/categories', 'ApiController@getCategories');
Route::middleware('auth:api')->get('/user/brands', 'ApiController@getBrands');
Route::middleware('auth:api')->get('/user/products', 'ApiController@getAllProducts');
Route::middleware('auth:api')->get('/user/product/{id}', 'ApiController@getProduct');
//Route::middleware('auth:api')->get('/user/products/{sortBy}', 'ApiController@getProducts');

// Login route
Route::post('/login', 'ApiController@login');
