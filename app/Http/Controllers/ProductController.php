<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Backend/Product/Index', [
            'products' => Product::active()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(' Backend/Product/Show/Index',
		[
			'product' => New Product()
		]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
		//TODO:: enum validation op discount_type en status
		// max_length
		// Omzetten naar custom request (makkelijker bij te houden)
        $product = Product::firstOrNew($request->validate([
			'id' => 'nullable',
			'name' => 'required',
			'description' => 'required',
			'status' => 'required',
			'price' => 'required',
			'tax' => 'required',
			'discount' => 'nullable',
			'discount_type' => 'required',
			'stock' => 'nullable',
			'sku' => 'nullable',
		]));

		dd($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('Backend/Product/Show/Index', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
