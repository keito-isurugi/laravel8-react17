<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\Api\Auth\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout']);

Route::group(['middleware' => 'auth:sanctum'], function() {
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
  Route::get('/fetch_todos', [TodoController::class, 'fetchTodos']);
  Route::post('/push_todo', [TodoController::class, 'pushTodo']);
  Route::post('/change_status', [TodoController::class, 'changeStatus']);
  Route::post('/delete_todo', [TodoController::class, 'deleteTodo']);
});

