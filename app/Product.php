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
            if (!$bare) {
                if ($photo !== '') {
                    $ph = explode(':', $photo);
                    array_push($imagesReturn, [
                        'image' => $ph[0],
                        'date'  => $ph[1]
                    ]);
                }
            }
            array_push($imagesReturnBare, $photo);
        }
        if ($product->photos !== '' && $product->photos !== null) {
            if ($bare) {
                return $imagesReturnBare;
            }
            return array_reverse($imagesReturn);
        }
        return [];
    }

    public static function getThumbnail ($id)
    {
        $product = Product::find($id);
        $photos = explode(';', $product->photos);
        if ((count($photos)) > 0 && $photos[0] !== '') {
            $ph = explode(':', $photos[count($photos) - 1]);
            return $ph[0];
        }
        return 'default.jpg';
    }

    public static function addPhoto ($id, $photoName)
    {
        date_default_timezone_set('CET');

        $photos = Product::getPhotos($id, true);
        $date = date('d.m.Y');
        $photosString = $photoName . ':' . $date;

        if (!empty($photos)){
            foreach ($photos as $index => $photo) {
                $photosString .= ';' . $photo;
            }
        }

        $product = Product::find($id);
        $product->photos = $photosString;
        $product->save();

        return 200;
    }
}
