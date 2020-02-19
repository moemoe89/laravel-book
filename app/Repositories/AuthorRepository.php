<?php

namespace App\Repositories;

use App\Author;
use App\Repositories\Contracts\AuthorRepositoryInterface;

class AuthorRepository implements AuthorRepositoryInterface
{

	protected $author;

	public function __construct(Author $author)
	{
	    $this->author = $author;
	}

	public function getPaginate($fields, $perPage, $search, $orderBy, $sort)
	{
		return $this->author
				->select($fields)
				->where('name', 'ilike', '%'.$search.'%')
				->orderBy($orderBy, $sort)
				->paginate($perPage);
	}

	public function get($fields, $perPage, $search, $orderBy, $sort)
	{
		return $this->author
				->select($fields)
				->where('name', 'ilike', '%'.$search.'%')
				->orderBy($orderBy, $sort)
				->limit($perPage)
				->get();
	}

	public function create($input)
	{
		return $this->author
				->create($input);
	}

	public function update($id, $input)
	{
		return $this->author
				->where('id', $id)
				->update($input);
	}

	public function findById($id, $fields)
	{
		return $this->author
				->find($id, $fields);
	}

	public function delete($id)
	{
		return $this->author
				->where('id', $id)
				->delete();
	}
}
