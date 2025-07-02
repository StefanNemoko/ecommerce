<?php

namespace App\Http\Controllers;

use App\Http\Requests\Backend\Product\ManageRequest;
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
        return Inertia::render('Backend/Product/Show/Index',
		[
			'product' => new Product(),
		]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ManageRequest $request)
    {
        $product = Product::firstOrNew($request->validated());

		if ($product->isDirty()) {
			$product->save();

			return to_route('backend.products.show', $product);
		}

		//TODO:: er viel niks te updaten, toon dit als melding.
		return to_route('backend.products.show', $product);
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
