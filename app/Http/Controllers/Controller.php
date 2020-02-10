<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

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
