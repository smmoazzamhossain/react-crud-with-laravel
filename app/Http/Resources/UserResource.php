<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'        => $request->id,
            'full_name' => $request->full_name,
            'mobile_no' => $request->mobile_no,
            'email'     => $request->email
        ];
    }
}
