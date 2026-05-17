<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'company_type',
        'ice',
        'patente',
        'company_address',
        'city',
        'company_phone',
        'main_category',
        'company_logo',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
