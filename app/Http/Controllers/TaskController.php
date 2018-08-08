<?php

namespace App\Http\Controllers;
use App\Task;
use Illuminate\Http\Request;
use Response;
use Validator;

class TaskController extends Controller
{

    public function showAllTask(){
		$tasks = Task::all();
		return view('welcome')->with('tasks',$tasks);
	}

	public function createTask(Request $request){
		$validator = Validator::make($request->all(),
			[
				'email' => 'required|email|unique:tasks,email',
			],
			[
				'email.email' => 'Email address in invalid format',
				'email.unique' => 'This email already exists',
			]);
		if ($validator->fails()) {
			return response()->json(['errors'=>$validator->errors()->all()]);
		}
		$task = Task::create($request->all());
		return Response::json($task);
		return response()->json(['success'=>'Added new records.']);
	}

	public function showEditTask($task_id){
		$task = Task::find($task_id);
		return Response::json($task);
	}

	public function saveEditTask(Request $request,$task_id){
		$task = Task::find($task_id);

		$task->task = $request->task;
		$task->description = $request->description;
		$task->email = $request->email;
		$task->save();
		return Response::json($task);
	}

	public function deleteTask($task_id){
		$task = Task::destroy($task_id);
		return Response::json($task);
	}
}
