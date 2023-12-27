<?php

namespace App\Models;

use App\Models\User;
use App\Models\Category;
use App\Models\District;
use App\Models\Province;
use App\Models\RoomType;
use App\Models\PropertyType;
use App\Models\PropertyImage;
use App\Models\PropertyExceptionDate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Property extends Model
{
    use HasFactory;
    protected $table = 'properties';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function property_type(): BelongsTo
    {
        return $this->belongsTo(PropertyType::class, 'property_type_id', 'id');
    }

    public function room_type(): BelongsTo
    {
        return $this->belongsTo(RoomType::class, 'room_type_id', 'id');
    }

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'provinces_id', 'code');
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class, 'districts_id', 'code');
    }

    public function images(): HasMany
    {
        return $this->hasMany(PropertyImage::class, 'property_id', 'id');
    }

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class, 'property_amenities', 'property_id', 'amenity_id');
    }


    public function booking(): HasMany
    {
        return $this->hasMany(Booking::class, 'property_id');
    }

    public function exception_date(): HasMany
    {
        return $this->hasMany(PropertyExceptionDate::class, 'property_id', 'id');
    }

    public function rating(): HasMany
    {
        return $this->hasMany(Rating::class, 'property_id', 'id');
    }
}
