<?php

namespace App\Models;

use App\Enums\DiscountType;
use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status',
        'price',
        'tax',
        'discount',
        'discount_type',
        'stock',
        'sku',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'tax' => 'decimal:2',
        'discount' => 'decimal:2',
        'stock' => 'integer',
        'status' => ProductStatus::class,
        'discount_type' => DiscountType::class,
    ];

    protected $attributes = [
        'status' => ProductStatus::ACTIVE->value,
        'discount_type' => DiscountType::FIXED->value,
        'tax' => 21.00,
        'price' => 0.00,
    ];

    /**
     * @description retrieve only active products.
     *
     * @param Builder $query
     * @return void
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('status', ProductStatus::ACTIVE->value);
    }
}
