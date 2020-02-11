<?php
  
namespace App;
   
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
   
class Author extends Model
{
	use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    protected $fields = [
        'id',
        'name',
        'created_at',
        'updated_at'
    ];

    public static function fields() {
        return [
            'id',
        	'name',
        	'created_at',
        	'updated_at'
        ];
    }
}