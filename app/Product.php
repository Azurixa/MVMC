<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public static function getPhotos ($id, $bare = false)
    {
        $imagesReturn = array();
        $imagesReturnBare = array();
        $product = Product::find($id);
        $photos = explode(';', $product->photos);
        foreach ($photos as $photo) {
            array_push($imagesReturn, 'storage/products/'.$photo);
            array_push($imagesReturnBare, $photo);
        }
        if ($product->photos !== '') {
            if ($bare){
                return $imagesReturnBare;
            }
            return $imagesReturn;
        }
        return [];
    }

    public static function addPhoto ($id, $photoName)
    {
        $photos = Product::getPhotos($id, true);
        $photosString = '';
        foreach ($photos as $photo) {
            $photosString .= $photo.';';
        }
        $photosString .= $photoName;
        $product = Product::find($id);
        $product->photos = $photosString;
        $product->save();
        return 200;
    }
}
