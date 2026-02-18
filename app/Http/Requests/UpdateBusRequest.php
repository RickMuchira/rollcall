<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'number' => [
                'required',
                'string',
                'max:255',
                Rule::unique('buses', 'number')->ignore($this->route('bus')),
            ],
            'name' => ['nullable', 'string', 'max:255'],
            'bus_staff' => ['nullable', 'array'],
            'bus_staff.*.trip_type' => ['required', 'string', 'in:trip_1_morning,trip_1_evening,trip_2_morning,trip_2_evening'],
            'bus_staff.*.role' => ['required', 'string', 'in:driver,assistant'],
            'bus_staff.*.staff_name' => ['required', 'string', 'max:255'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'number.required' => 'Bus number is required.',
            'number.unique' => 'A bus with this number already exists.',
        ];
    }
}
