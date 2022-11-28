<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{

    public function index(Request $request)
    {   
        $query = User::with("roles");
        if ($request["column"] === "none") {
            return $query->paginate($request["records"]);
        } elseif ($request["column"] === "gender") {
            return $query->Where($request["column"], $request["keyword"])->paginate($request["records"]);
        } else {
            return $query->Where($request["column"],'LIKE', '%' . $request["keyword"] . '%')->paginate($request["records"]);
        }
        return $query->paginate($request["records"]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        $role = 'admin';
        if(Auth::user()->hasRole('qlht')) {
            $role = 'qlht';
        } 
        $newuser = array_merge($request->all(), ["password" => bcrypt($request["password"])]);
        $user = User::create($newuser);
        if (Auth::user()->hasRole('admin') && $request['role'] == 'admin') {
            $user->assignRole('admin');
            $user->update(['created_by' => $role]);
        } else {
            $user->assignRole('qlht');
            $user->update(['created_by' => $role]);
        }
        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::findOrFail($id);
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

        $user = User::findOrFail($id);

        if (Auth::user()->hasRole('admin')) {
            if($request['role'] == 'admin' || $request['role'] == 'qlht') {
                $user->syncRoles($request['role']);
            }
            $user->update(['updated_by' => 'admin']);
            $newUpdate = $request->except('username');
            $user->update($newUpdate);
        } elseif (Auth::user()->hasRole('qlht') && User::find($id)->hasRole('admin')) {
            return "Not permission to update";
        } else {
            $newUpdate = $request->except('username');
            $user->update($newUpdate);
            $user->update(['updated_by' => 'qlht']);
        }

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
        if(Auth::user()->hasRole('qlht')) {
            $role = 'qlht';
        } 
        $user = User::findOrFail($id);
        $user->update(['deleted_by' => $role]);
        $user->delete();
        return '';
    }
}
