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
    /**
     * @param Request $request
     * @return \Psr\Http\Message\StreamInterface
     */
    public function login(Request $request) {
        $client = new GuzzleHttp\Client();
        try {
            $res = $client->request('POST', url('/oauth/token'), [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => env('PASSPORT_USER_ID'),
                    'client_secret' => env('PASSPORT_USER_SECRET'),
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

    /**
     * @param Request $request
     * @return string
     */
    public function createCategory (Request $request) {
        $userId = $request->user()->id;
        $categoryName = $request->post('name');

        // Create new category
        $category = new Category;
        $category->creator_id = $userId;
        $category->name = $categoryName;
        $category->save();

        return json_encode(['message' => 'Category '.$categoryName.' for user '.$userId.' created!']);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getUserCategories (Request $request) {
        $userId = $request->user()->id;
        return Category::where('creator_id', $userId)->get();
    }

    public function createProduct (Request $request) {
        $userId = $request->user()->id;
        $name = $request->post('name');
        $categoryId = $request->post('categoryId');
        $description = $request->post('description');
        $photos = $request->post('photo');

        // Create new product
        $product = new Product;
        $product->creator_id = $userId;
        $product->category_id = $categoryId;
        $product->name = $name;
        $product->description = $description;
        $product->photos = $photos;
        $product->save();

        return json_encode(['message' => 'Product '.$name.' for category '.$categoryId.' created!']);

    }

    public function getAllUserProducts (Request $request) {
        $userId = $request->user()->id;

        $toReturn = array();

        $categories = Category::where('creator_id', $userId)->get();
        foreach ($categories as $cat){
            $products = Product::where(['creator_id' => $userId, 'category_id' => $cat['id']])->get();
            array_push($toReturn, [
                'category' => $cat,
                'products' => $products
            ]);
        }

        return json_encode($toReturn);
    }

    public function getUserProducts($categoryId, Request $request) {
        $userId = $request->user()->id;
        return Product::where(['creator_id' => $userId, 'category_id' => $categoryId]);
    }

}
