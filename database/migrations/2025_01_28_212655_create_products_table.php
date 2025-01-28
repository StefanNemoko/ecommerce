<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->enum('status', ['active', 'inactive', 'archived'])->default('active');

            // Pricing
            $table->decimal('price', 10)->default(0.00);
            $table->decimal('tax', 10)->default(21.00);
            $table->decimal('discount', 10)->nullable();
            $table->enum('discount_type', ['percentage', 'fixed'])->default('fixed');

            // Stock
            $table->integer('stock')->nullable();
            $table->string('sku')->nullable();

            $table->timestamps();
            // No hard deletes on product.
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
