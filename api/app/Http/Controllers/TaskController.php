<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate(['title' => 'required|string|max:255']);

        return response()->json(Task::create($data), 201);
    }
}
