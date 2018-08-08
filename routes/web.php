<?php

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
Route::get('/','TaskController@showAllTask');
Route::post('/tasks','TaskCOntroller@createTask');
Route::get('/tasks/{task_id?}','TaskController@showEditTask');
Route::put('/tasks/{task_id?}','TaskController@saveEditTask');
Route::delete('/tasks/{task_id?}','TaskController@deleteTask');