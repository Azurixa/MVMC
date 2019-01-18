<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Auth;
use App\Category;
use App\Product;
use App\Brand;

class ApiController extends Controller
{
    /**
     * @param Request $request
     * @return \Psr\Http\Message\StreamInterface
     */
    public function login (Request $request)
    {
        $client = new GuzzleHttp\Client();
        try {
            $res = $client->request('POST', url('/oauth/token'), [
                'form_params' => [
                    'grant_type'    => 'password',
                    'client_id'     => env('PASSPORT_USER_ID'),
                    'client_secret' => env('PASSPORT_USER_SECRET'),
                    'username'      => $request->input('username'),
                    'password'      => $request->input('password')
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
    public function createCategory (Request $request)
    {
        $userId = $request->user()->id;
        $categoryName = $request->post('name');

        // Create new category
        $category = new Category;
        $category->creator_id = $userId;
        $category->name = $categoryName;
        $category->save();

        return json_encode(['message' => 'Category ' . $categoryName . ' for user ' . $userId . ' created!']);
    }

    /**
     * @param Request $request
     * @return string
     */
    public function deleteCategory (Request $request)
    {
        $userId = $request->user()->id;
        $id = $request->post('id');

        // Delete category
        Category::where(['creator_id' => $userId, 'id' => $id])->delete();
        Product::where('category_id', $id)->delete();

        return json_encode(['message' => 'Category ' . $id . ' for user ' . $userId . ' and all products inside deleted!']);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getCategories (Request $request)
    {
        $userId = $request->user()->id;
        return Category::where('creator_id', $userId)->get();
    }

    /**
     * @param Request $request
     * @return string
     */
    public function createBrand (Request $request)
    {
        $userId = $request->user()->id;
        $name = $request->post('name');

        // Create new brand
        $brand = new Brand;
        $brand->creator_id = $userId;
        $brand->name = $name;
        $brand->save();

        return json_encode(['message' => 'Brand ' . $name . ' for user ' . $userId . ' created!']);
    }

    /**
     * @param Request $request
     * @return string
     */
    public function deleteBrand (Request $request)
    {
        $userId = $request->user()->id;
        $id = $request->post('id');

        // Delete brand
        Brand::where(['creator_id' => $userId, 'id' => $id])->delete();
        Product::where('brand_id', $id)->delete();

        return json_encode(['message' => 'Brand ' . $id . ' for user ' . $userId . ' and all products with belong to it deleted!']);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getBrands (Request $request)
    {
        $userId = $request->user()->id;
        return Brand::where('creator_id', $userId)->get();
    }

    /**
     * @param Request $request
     * @return string
     */
    public function createProduct (Request $request)
    {
        $userId = $request->user()->id;
        $name = $request->post('name');
        $categoryId = $request->post('categoryId');
        $brandId = $request->post('brandId');
        $description = $request->post('description');
        $photos = $request->post('photo');

        // Create new product
        $product = new Product;
        $product->creator_id = $userId;
        $product->category_id = $categoryId;
        $product->brand_id = $brandId;
        $product->name = $name;
        $product->description = $description;
        $product->photos = $photos;
        $product->save();

        return json_encode(['message' => 'Product ' . $name . ' for category ' . $categoryId . ' created!']);
    }

    public function deleteProduct(Request $request) {
        $userId = $request->user()->id;
        $id = $request->post('id');

        // Delete product
        Product::where(['creator_id' => $userId, 'id' => $id])->delete();

        return json_encode(['message' => 'Product ' . $id . ' for user ' . $userId . ' deleted!']);
    }

    /**
     * @param Request $request
     * @return string
     */
    public function getAllProducts (Request $request)
    {
        $userId = $request->user()->id;

        $toReturn = array();

        $categories = Category::where('creator_id', $userId)->get();
        foreach ($categories as $cat) {

            // Get all products
            $products = Product::where('category_id', $cat['id'])->get();

            $productsFormated = array();

            foreach ($products as $product) {
                $brand = Brand::where('id', $product['brand_id'])->firstOrFail();
                array_push($productsFormated, [
                    'id' => $product['id'],
                    'brand' => $brand['name'],
                    'brand_id' => $brand['id'],
                    'name' => $product['name'],
                    'description' => $product['description'],
                    'photos' => $product['photos']
                ]);
            }
            array_push($toReturn, [
                'category' => $cat,
                'products' => $productsFormated
            ]);
        }

        return json_encode($toReturn);
    }

}