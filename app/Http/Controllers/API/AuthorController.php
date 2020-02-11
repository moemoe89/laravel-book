<?php

namespace App\Http\Controllers\API;

use App\Author;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $orderBy = checkInArr($request->order_by, Author::fields()) ?: 'id';
        $sort = $request->sort ?: 'desc';
        $isPaginate = $request->is_paginate;
        $perPage = $request->per_page;
        $selectField = str_replace(' ', '', $request->select_field) ?: 'id,name,created_at,updated_at';
        $fields = explode(',', $selectField);
        $fields = checkArrInArr($fields, Author::fields());

        $query = Author::where('name', 'ilike', '%'.$search.'%')->orderBy($orderBy, $sort);

        if ($isPaginate == 'true')
        {
            $data = $query->paginate($perPage, $fields);
        } else {
            $data = $query->limit($perPage)->get($fields);
        }
        
        return $this->sendResponse(200, true, 'Author retrieved successfully', null, $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'name' => 'required|max:255'
        ]);
   
        if ($validator->fails()){
            return $this->sendResponse(400, false, 'There\'s something wrong with your request', $validator->errors(), null);       
        }
   
        $author = Author::create($input);
   
        return $this->sendResponse(201, true, 'Author created successfully', null, $author);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if (!is_numeric($id))
        {
            return $this->sendResponse(404, false, 'Author not found', null, null);
        }

        $selectField = str_replace(' ', '', $request->select_field) ?: 'id,name,created_at,updated_at';
        $fields = explode(',', $selectField);

        $data = Author::find($id, $fields);

        if (is_null($data))
        {
            return $this->sendResponse(404, false, 'Author not found', null, null);
        }

        return $this->sendResponse(200, true, 'Author retrieved successfully', null, $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
