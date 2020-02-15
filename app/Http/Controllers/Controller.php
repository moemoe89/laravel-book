<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     description="This is a documentation for Book API",
 *     version="1.0.0",
 *     title="Book API swagger documentation",
 *     termsOfService="http:\/\/swagger.io\/terms\/",
 *     @OA\Contact(
 *         email="bismobaruno@gmail.com"
 *     ),
 *     @OA\License(
 *         name="Apache 2.0",
 *         url="http:\/\/www.apache.org\/licenses\/LICENSE-2.0.html"
 *     )
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendResponse($status, $success, $message, $errors, $data)
    {
    	$response = [
    		'status'  => $status,
            'success' => $success,
            'message' => $message,
            'errors'  => $errors,
            'data'    => $data,
        ];

        return response()->json($response, $status);
    }
}
