<?php

namespace App\Http\Controllers\API;

use App\Author;
use App\Http\Controllers\Controller;
use App\Repositories\AuthorRepository;
use Illuminate\Http\Request;
use Validator;

class AuthorController extends Controller
{
    protected $author;

    public function __construct(AuthorRepository $author)
    {
        $this->author = $author;
    }
    /**
     * @OA\GET(
     *     path="/api/v1/author",
     *     tags={"Author API"},
     *     summary="Author list",
     *     description="API for getting Author list, can return with/out pagination, filter selected column, sort by column",
     *     operationId="index",
     *     @OA\Parameter(
     *         description="Search by name",
     *         in="query",
     *         name="search",
     *         @OA\Schema(
     *           type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         description="Order by column",
     *         in="query",
     *         name="order_by",
     *         @OA\Schema(
     *           type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         description="Sort by asc/desc",
     *         in="query",
     *         name="sort",
     *         @OA\Schema(
     *           type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         description="Paginate the data",
     *         in="query",
     *         name="is_paginate",
     *         @OA\Schema(
     *           type="string",
     *           enum={"true", "false"},
     *           default="true"
     *         )
     *     ),
     *     @OA\Parameter(
     *         description="Limit data per page",
     *         in="query",
     *         name="per_page",
     *         @OA\Schema(
     *           type="string",
     *           default="15"
     *         )
     *     ),
     *     @OA\Parameter(
     *         description="Selected column of the data",
     *         in="query",
     *         name="select_field",
     *         @OA\Schema(
     *           type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Success getting data",
     *         @OA\JsonContent(
     *           example={"status": 200, "success": true, "message": "Author retrieved successfully", "errors": null, "data": { "current_page": 1, "data": { { "id": 5, "name": "Fujiko F Fujio", "created_at": "2020-02-15 11:58:35", "updated_at": "2020-02-15 11:58:35" }, { "id": 2, "name": "Takeshi Maekawa", "created_at": "2020-02-11 22:23:33", "updated_at": "2020-02-11 22:23:35" }, { "id": 1, "name": "Masashi Ueda", "created_at": "2020-02-11 22:23:08", "updated_at": "2020-02-15 10:48:35" } }, "first_page_url": "http:\/\/localhost:8000\/api\/v1\/author?page=1", "from": 1, "last_page": 1, "last_page_url": "http:\/\/localhost:8000\/api\/v1\/author?page=1", "next_page_url": null, "path": "http:\/\/localhost:8000\/api\/v1\/author", "per_page": "15", "prev_page_url": null, "to": 3, "total": 3}}
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $orderBy = checkInArr($request->order_by, Author::fields()) ?: 'id';
        $sort = checkInSort($request->sort);
        $isPaginate = $request->is_paginate;
        $perPage = $request->per_page;
        $selectField = str_replace(' ', '', $request->select_field) ?: toStrColumn(Author::fields());
        $fields = explode(',', $selectField);
        $fields = checkArrInArr($fields, Author::fields(), null);

        if ($isPaginate == 'true')
        {
            $data = $this->author->getPaginate($fields, $perPage, $search, $orderBy, $sort);
        } else {
            $data = $this->author->get($fields, $perPage, $search, $orderBy, $sort);
        }
        
        return $this->sendResponse(200, true, 'Author retrieved successfully', null, $data);
    }

    /**
     * @OA\POST(
     *     path="/api/v1/author",
     *     tags={"Author API"},
     *     summary="Author create",
     *     description="API for creating Author",
     *     operationId="store",
     *     @OA\RequestBody(
     *         request="Author",
     *         description="Author object that needs to be added to the body",
     *         required=true,
     *         @OA\JsonContent(
     *           example={"name": "Fujiko F Fujio"}
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Success creating data",
     *         @OA\JsonContent(
     *           example={"status": 201, "success": true, "message": "Author created successfully", "errors": null, "data": { "name": "Fujiko F Fujio", "updated_at": "2020-02-15 11:58:35", "created_at": "2020-02-15 11:58:35", "id": 5}}
     *         )
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Invalid request data",
     *         @OA\JsonContent(
     *           example={"status": 400, "success": false, "message": "There's something wrong with your request", "errors": { "name": { "The name field is required." } }, "data": null}
     *         )
     *     )
     * )
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
   
        $author = $this->author->create($input);
   
        return $this->sendResponse(201, true, 'Author created successfully', null, $author);
    }

    /**
     * @OA\GET(
     *     path="/api/v1/author/{id}",
     *     tags={"Author API"},
     *     summary="Author detail",
     *     description="API for getting Author detail, filter selected column",
     *     operationId="show",
     *     @OA\Parameter(
     *         description="Author ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *           type="integer",
     *           format="int64"
     *         )
     *     ),
     *     @OA\Parameter(
     *         description="Selected column of the data",
     *         in="query",
     *         name="select_field",
     *         @OA\Schema(
     *           type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Success getting data",
     *         @OA\JsonContent(
     *           example={"status": 200, "success": true, "message": "Author retrieved successfully", "errors": null, "data": { "id": 1, "name": "Masashi Ueda", "created_at": "2020-02-11 22:23:08", "updated_at": "2020-02-15 10:48:35"}}
     *         )
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Data not found",
     *         @OA\JsonContent(
     *           example={"status": 404, "success": false, "message": "Author not found", "errors": null, "data": null}
     *         )
     *     )
     * )
     */
    public function show(Request $request, $id)
    {
        if (!is_numeric($id))
        {
            return $this->sendResponse(404, false, 'Author not found', null, null);
        }

        $selectField = str_replace(' ', '', $request->select_field) ?: toStrColumn(Author::fields());
        $fields = explode(',', $selectField);
        $fields = checkArrInArr($fields, Author::fields(), null);

        $data = $this->author->findById($id, $fields);

        if (is_null($data))
        {
            return $this->sendResponse(404, false, 'Author not found', null, null);
        }

        return $this->sendResponse(200, true, 'Author retrieved successfully', null, $data);
    }

    /**
     * @OA\PUT(
     *     path="/api/v1/author/{id}",
     *     tags={"Author API"},
     *     summary="Author update",
     *     description="API for updating Author",
     *     operationId="update",
     *     @OA\Parameter(
     *         description="Author ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *           type="integer",
     *           format="int64"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         request="Author",
     *         description="Author object that needs to be added to the body",
     *         required=true,
     *         @OA\JsonContent(
     *           example={"name": "Fujiko F Fujio"}
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Success updating data",
     *         @OA\JsonContent(
     *           example={"status": 200, "success": true, "message": "Author updated successfully", "errors": null, "data": { "id": 5, "name": "Fujiko F Fujio", "created_at": "2020-02-15 11:58:35", "updated_at": "2020-02-15 11:58:35", "deleted_at": null}}
     *         )
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Invalid request data",
     *         @OA\JsonContent(
     *           example={"status": 400, "success": false, "message": "There's something wrong with your request", "errors": { "name": { "The name field is required." } }, "data": null}
     *         )
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Data not found",
     *         @OA\JsonContent(
     *           example={"status": 404, "success": false, "message": "Author not found", "errors": null, "data": null}
     *         )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        if (!is_numeric($id))
        {
            return $this->sendResponse(404, false, 'Author not found', null, null);
        }

        $input = $request->all();
   
        $validator = Validator::make($input, [
            'name' => 'required|max:255'
        ]);
   
        if ($validator->fails()){
            return $this->sendResponse(400, false, 'There\'s something wrong with your request', $validator->errors(), null);       
        }

        $data = $this->author->findById($id, Author::fields());

        if (is_null($data))
        {
            return $this->sendResponse(404, false, 'Author not found', null, null);
        }
    
        $update['name'] = $input['name'];
        $data->name = $input['name'];

        $this->author->update($id, $update);
   
        return $this->sendResponse(200, true, 'Author updated successfully', null, $data);
    }

    /**
     * @OA\DELETE(
     *     path="/api/v1/author/{id}",
     *     tags={"Author API"},
     *     summary="Author delete",
     *     description="API for deleting Author",
     *     operationId="destroy",
     *     @OA\Parameter(
     *         description="Author ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *           type="integer",
     *           format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Success deleting data",
     *         @OA\JsonContent(
     *           example={"status": 200, "success": true, "message": "Author deleted successfully", "errors": null, "data": null}
     *         )
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Data not found",
     *         @OA\JsonContent(
     *           example={"status": 404, "success": false, "message": "Author not found", "errors": null, "data": null}
     *         )
     *     )
     * )
     */
    public function destroy($id)
    {
        if (!is_numeric($id))
        {
            return $this->sendResponse(404, false, 'Author not found', null, null);
        }

        $this->author->delete($id);
        return $this->sendResponse(200, true, 'Author deleted successfully', null, null);
    }
}
