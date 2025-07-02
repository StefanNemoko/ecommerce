<?php

namespace App\Http\Requests\Backend\Product;

use Illuminate\Foundation\Http\FormRequest;

class ManageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; //TODO:: authorizatie o.b.v. login state (backend login state)
    }

    /**
     * Get the validation rules that apply to the request.
	 *
	 * TODO:: enum validation op discount_type en status
	 *  max_length
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
			'id' => 'unique',
			'name' => 'required',
			'description' => 'required',
			'status' => 'required',
			'price' => 'required',
			'tax' => 'required',
			'discount' => 'nullable',
			'discount_type' => 'required',
			'stock' => 'nullable',
			'sku' => 'nullable',
        ];
    }
}
