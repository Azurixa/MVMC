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
            if (!$bare){
                if($photo !== ''){
                    $ph = explode(':', $photo);
                    array_push($imagesReturn, ['image' => 'storage/products/'.$ph[0], 'date' => $ph[1]]);
                }
            }
            array_push($imagesReturnBare, $photo);
        }
        if ($product->photos !== '') {
            if ($bare){
                return $imagesReturnBare;
            }
            return array_reverse($imagesReturn);
        }
        return [];
    }

    public static function addPhoto ($id, $photoName)
    {
        date_default_timezone_set('CET');

        $photos = Product::getPhotos($id, true);
        $photosString = '';
        $date = date('d.m.Y');

        foreach ($photos as $index => $photo) {
            $photosString .= $photo.';';
        }

        $photosString .= $photoName.':'.$date;

        $product = Product::find($id);
        $product->photos = $photosString;
        $product->save();

        return 200;
    }
}
