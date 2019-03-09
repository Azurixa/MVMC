<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('creator_id');
            $table->integer('category_id');
            $table->integer('brand_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('first_impressions')->nullable();
            $table->integer('rating')->default(0);
            $table->text('updates')->nullable();
            $table->text('photos')->nullable();
            $table->integer('remaining_amount')->default(100);
            $table->integer('uses_count')->default(0);
            $table->boolean('pan')->default(false);
            $table->timestamp('bought_at')->nullable();
            $table->timestamp('last_use')->nullable();
            $table->integer('expire_months')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
