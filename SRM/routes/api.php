<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LogController;
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


// Route::get('/users/search', [UserController::class, 'search']);
// Route::get('/students/search', [StudentController::class, 'search']);


// Route::resource('users',UserController::class);
// Route::resource('students',StudentController::class);

// Route::group(['middleware' => ['role:admin']], function () {
//     Route::post('/users', [UserController::class, 'store']);
//     Route::delete('/users/{user}', [UserController::class, 'destroy']);
//     Route::delete('/students/{student}', [StudentController::class, 'destroy']);
// });

// Route::group(['middleware' => ['XSS','checkUser']],function() {
//     Route::get('/students/search', [StudentController::class, 'search']);
//     Route::get('/users/search', [UserController::class, 'search']);
//     Route::get('/students', [StudentController::class, 'index']);
//     Route::get('/users', [UserController::class, 'index']);
// });



Route::group(['middleware' => ['checkPermission','XSS']], function () {
    Route::group([
    
        'middleware' => 'api',
        'prefix' => 'auth'
    
    ], function ($router) {
        Route::post('login', [AuthController::class, 'login'])->name('login');
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
        Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
        Route::post('me', [AuthController::class, 'me'])->name('me');
        Route::post('register', [AuthController::class, 'register'])->name('register');
    });
    
    Route::get('/students', [StudentController::class, 'index'])->name('view student');
    Route::get('/users', [UserController::class, 'index'])->name('view user');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('delete user');
    Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('delete student');
    // Route::get('/users/search', [UserController::class, 'search']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update'])->name('edit user');
    Route::post('/users', [UserController::class, 'store'])->name('create user');
    Route::post('/students', [StudentController::class, 'store'])->name('create student');
    Route::get('/students/{student}', [StudentController::class, 'show']);
    Route::put('/students/{student}', [StudentController::class, 'update'])->name('edit student');
    // Route::post('/students/search',[StudentController::class,'search']);

    Route::get('/log', [LogController::class, 'index']);
    // Route::post('/students/search',[StudentController::class,'search']);
});




// Route::group(['middleware' => ['XSS','role:qlht']], function () {
//     Route::get('/users/{user}', [UserController::class, 'show']);
//     Route::put('/users/{user}', [UserController::class, 'update']);
//     Route::post('/users', [UserController::class, 'store']);
//     Route::post('/students', [StudentController::class, 'store']);
//     Route::get('/students/{student}', [StudentController::class, 'show']);
//     Route::put('/students/{student}', [StudentController::class, 'update']);
//     // Route::post('/students/search',[StudentController::class,'search']);

//     // Route::post('/students/search',[StudentController::class,'search']);
// });

