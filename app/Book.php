<?php
  
namespace App;
   
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
   
class Book extends Model
{
	use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'author_id',
        'title'
    ];

    public static function fields() {
        return [
            'books.id',
            'author_id',
            'name',
        	'title',
        	'books.created_at',
        	'books.updated_at'
        ];
    }

    public static function aliases() {
        return array(
            'id'         => 'books.id',
            'created_at' => 'books.created_at',
            'updated_at' => 'books.updated_at'
        );
    }
}