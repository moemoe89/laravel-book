<?php

namespace App\Repositories\Contracts;

interface AuthorRepositoryInterface
{
	public function getPaginate($field, $perPage, $search, $orderBy, $sort);

	public function get($fields, $perPage, $search, $orderBy, $sort);

	public function create($input);

	public function update($id, $input);

    public function findById($id, $fields);

    public function delete($delete);
}
