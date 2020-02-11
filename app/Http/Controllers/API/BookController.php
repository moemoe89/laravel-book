<?php

namespace App\Http\Controllers\API;

use App\Book;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $orderBy = checkInArr($request->order_by, Book::fields()) ?: 'id';
        $sort = $request->sort ?: 'desc';
        $isPaginate = $request->is_paginate;
        $perPage = $request->per_page;
      
        $query = Book::with('author')->where('title', 'ilike', '%'.$search.'%')->orderBy($orderBy, $sort);

        if ($isPaginate == 'true')
        {
            $data = $query->paginate($perPage);
        } else {
            $data = $query->limit($perPage)->get();
        }
        
        return $this->sendResponse(200, true, 'Book retrieved successfully', null, $data);
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
            'author_id' => 'required|integer|exists:authors,id',
            'title' => 'required|max:255'
        ]);
   
        if ($validator->fails()){
            return $this->sendResponse(400, false, 'There\'s something wrong with your request', $validator->errors(), null);       
        }
   
        $book = Book::create($input);
   
        return $this->sendResponse(201, true, 'Book created successfully', null, $book);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!is_numeric($id))
        {
            return $this->sendResponse(404, false, 'Book not found', null, null);
        }

        $data = Book::with('author')->find($id);

        if (is_null($data))
        {
            return $this->sendResponse(404, false, 'Book not found', null, null);
        }

        return $this->sendResponse(200, true, 'Book retrieved successfully', null, $data);
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
        if (!is_numeric($id))
        {
            return $this->sendResponse(404, false, 'Book not found', null, null);
        }

        $input = $request->all();
   
        $validator = Validator::make($input, [
            'author_id' => 'required|integer|exists:authors,id',
            'title' => 'required|max:255'
        ]);
   
        if ($validator->fails()){
            return $this->sendResponse(400, false, 'There\'s something wrong with your request', $validator->errors(), null);       
        }

        $data = Book::find($id);

        if (is_null($data))
        {
            return $this->sendResponse(404, false, 'Book not found', null, null);
        }
   
        $data['author_id'] = $input['author_id'];
        $data['title'] = $input['title'];
        $data->save();
   
        return $this->sendResponse(200, true, 'Book updated successfully', null, $data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!is_numeric($id))
        {
            return $this->sendResponse(404, false, 'Book not found', null, null);
        }

        Book::where('id', $id)->delete();
        return $this->sendResponse(200, true, 'Book deleted successfully', null, null);
    }
}
