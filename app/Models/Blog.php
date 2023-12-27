<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Blog extends Model
{
    use HasFactory;
    protected $table = 'blogs';

    public function categories(): BelongsToMany
    {
        return $this->BelongsToMany(BlogCategory::class, 'blog_of_cate', 'id_blog', 'id_blog_categories');
    }
}
