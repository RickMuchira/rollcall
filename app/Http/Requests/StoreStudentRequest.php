<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStudentRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'grade_id' => ['nullable', 'exists:grades,id'],
            'grade_name' => ['nullable', 'string', 'max:255', 'required_without:grade_id'],
            'transport' => ['boolean'],
            'bus_assignments' => ['nullable', 'array', 'required_if:transport,true'],
            'bus_assignments.*.bus_id' => ['required', 'exists:buses,id'],
            'bus_assignments.*.trip_type' => ['required', 'string', Rule::in(['trip_1_morning', 'trip_2_morning', 'trip_1_evening', 'trip_2_evening'])],
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
            'name.required' => 'Student name is required.',
            'grade_id.exists' => 'Selected grade does not exist.',
            'grade_name.required_without' => 'Grade name is required when creating a new grade.',
            'bus_assignments.required_if' => 'At least one bus assignment is required when transportation is enabled.',
            'bus_assignments.*.bus_id.exists' => 'Selected bus does not exist.',
            'bus_assignments.*.trip_type.in' => 'Invalid trip type selected.',
        ];
    }
}
