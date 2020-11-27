<?php

use App\Http\Controllers\API\Admin\AdminController;
use App\Http\Controllers\API\Admin\ArticleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\User\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['prefix' => 'v1'], function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::get('article', [ArticleController::class, 'index']);
        Route::get('/article/{slug}', [ArticleController::class, 'getArticle']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/signup', [AuthController::class, 'signup']);
        Route::post('/comment', [ArticleController::class, 'comment']);
        Route::group(['middleware' => 'auth:api'], function () {
            Route::get('logout', [AuthController::class, 'logout']);
            Route::get('user', [AuthController::class, 'user']);
        });
    });
    Route::group(['prefix' => 'user'], function () {
        Route::group(['middleware' => 'auth:user'], function () {
              // authenticated user routes here 
        });
    });
    Route::group(['prefix' => 'admin'], function () {
        Route::group(['middleware' => ['auth:admin', 'scopes:admin']], function () {
            // authenticated admin routes here 
            Route::post('/searcharticle', [ArticleController::class, 'search']);

            // article routes api   
            Route::post('dashboard', [AdminController::class, 'index']);
            Route::get('article', [ArticleController::class, 'index']);
            Route::post('/article/store', [ArticleController::class, 'store']);
            Route::get('/article/{id}', [ArticleController::class, 'getArticle']);
            Route::post('/article/{id}', [ArticleController::class, 'update']);
            Route::post('/article/delete/{id}', [ArticleController::class, 'delete']);

        });
    });
});
