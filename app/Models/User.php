<?php

namespace App\Models;

use App\Models\Property;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'users';

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class, 'id', 'user_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'user_id', 'id');
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class, 'renter_id', 'id');
    }
}
