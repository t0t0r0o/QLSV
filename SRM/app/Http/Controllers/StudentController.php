<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Bus\Dispatcher;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Permission\Contracts\Role;

class StudentController extends Controller
{

    public function index(Request $request)
    {
        $users = DB::table('students')->whereNull('deleted_at');
        if ($request["column"] === "none") {
            return $users->paginate($request["records"]);
        } elseif ($request["column"] === "gender") {
            return DB::table('students')->Where($request["column"], $request["keyword"])->paginate($request["records"]);
        } else {
            return DB::table('students')->Where($request["column"], 'LIKE', '%' . $request["keyword"] . '%')->paginate($request["records"]);
        }
        // return DB::table('students')->where($request["column"], 'LIKE', '%' . $request["keyword"] . '%')->get();
        return $users->paginate($request["records"]);

        // return response()->json(["e"=>"somthing wrong when search"]);
    }


    public function search(Request $request)
    {
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $role = 'admin';
        if (Auth::user()->hasRole('qlht')) {
            $role = 'qlht';
        }
        $users = array_merge($request->all(), ["identification" => Str::random(10)]);
        $user = Student::create($users);
        $user->update(['created_by' => $role]);
        return $users;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Student::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $role = 'admin';
        if (Auth::user()->hasRole('qlht')) {
            $role = 'qlht';
        }
        $user = Student::findOrFail($id);
        $newUpdate = $request->except('username');
        $user->update($newUpdate);
        $user->update(['deleted_by' => $role]);

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = 'admin';
        if (Auth::user()->hasRole('qlht')) {
            $role = 'qlht';
        }
        $user = Student::findOrFail($id);
        $user->update(['deleted_by' => $role]);
        $user->delete();
        return "Success deleted";
    }
}
