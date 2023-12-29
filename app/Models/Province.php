<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Province extends Model
{
    use HasFactory;
    protected $table = 'provinces';
    protected $primaryKey = 'code';
    protected $keyType = 'string';


    public function property(): HasMany
    {
        return $this->hasMany(Property::class, 'provinces_id', 'code');
    }
}
