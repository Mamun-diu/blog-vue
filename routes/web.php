<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::get('/{any?}',function(){
//     return view('welcome');
// })->where('any', '[\/\w\.-]*');

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/{anypath?}', 'HomeController@index')->name('home')->where('path', '.*');
// Route::get('/posts', 'PostController@index');
// Route::get('/category', 'CategoryController@index');
Route::resource('category', 'CategoryController');
