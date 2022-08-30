<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Todo;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TodoController extends Controller
{
    public function index()
    {
        $todos =  Todo::paginate(15);
        return $todos;
    }
    
    public function fetchTodos() {
        header("Access-Control-Allow-Origin: *");
        $todos = Todo::select('id', 'name', 'status')->get();
        return response()->json($todos);
    }

    public function pushTodo(Request $request) {
        header("Access-Control-Allow-Origin: *");
        $todo = new Todo();
        $todo->name = $request->input('name');
        $todo->status = $request->input('status');
        $todo->save();
    }

    public function changeStatus(Request $request) {
        header("Access-Control-Allow-Origin: *");
        $id = (int) $request->input('id');
        $todo = Todo::find($id);
        $todo->status = $request->input('status');
        $todo->save();
    }

    public function deleteTodo(Request $request) {
        header("Access-Control-Allow-Origin: *");
        $id = (int) $request->input('id');
        $todo = Todo::find($id);
        $todo->delete();
    }
}
