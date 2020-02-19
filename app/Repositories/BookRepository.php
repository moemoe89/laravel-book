<?php

namespace App\Repositories;

use App\Book;
use App\Repositories\Contracts\BookRepositoryInterface;

class BookRepository implements BookRepositoryInterface
{

	protected $book;

	public function __construct(Book $book)
	{
	    $this->book = $book;
	}

	public function getPaginate($fields, $perPage, $search, $orderBy, $sort)
	{
		return $this->book
				->select($fields)
				->join('authors', 'authors.id', '=', 'books.author_id')
            	->where('title', 'ilike', '%'.$search.'%')
           	 	->orWhere('name', 'ilike', '%'.$search.'%')
				->orderBy($orderBy, $sort)
				->paginate($perPage);
	}

	public function get($fields, $perPage, $search, $orderBy, $sort)
	{
		return $this->book
				->select($fields)
				->join('authors', 'authors.id', '=', 'books.author_id')
            	->where('title', 'ilike', '%'.$search.'%')
           	 	->orWhere('name', 'ilike', '%'.$search.'%')
				->orderBy($orderBy, $sort)
				->limit($perPage)
				->get();
	}

	public function create($input)
	{
		return $this->book
				->create($input);
	}

	public function update($id, $input)
	{
		return $this->book
				->where('id', $id)
				->update($input);
	}

	public function findById($id, $fields)
	{
		return $this->book
				->join('authors', 'authors.id', '=', 'books.author_id')
				->find($id, $fields);
	}

	public function delete($id)
	{
		return $this->book
				->where('id', $id)
				->delete();
	}
}
