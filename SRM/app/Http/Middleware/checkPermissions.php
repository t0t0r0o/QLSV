<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;

class checkPermissions
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {   
        $requestname = $request->route()->getName();

        if ($requestname == 'login') {
            $credentials = request(['email', 'password']);
            if (!$token = auth()->attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
        $user = User::where('email', $request['email'])->first();
        if ($user && $user->active == 0) {
            Auth::logout();
            return response()->json(["message" => "You have been banned"], 401);
        } else {

            $roleAuthUser = User::find(Auth::id())->getRoleNames();

            $adminRole = Role::findById('1');
            $qlhtRole = Role::findById('2');

            $adminPermission = $adminRole->getPermissionNames()->toArray();
            $qlhtPermission = $qlhtRole->getPermissionNames()->toArray();

            if ($roleAuthUser[0] == $adminRole['name'] || in_array($requestname, $qlhtPermission)) {
                if (Auth::user()->active == 0) {
                    Auth::logout();
                    return response()->json(["message" => "You have been banned"], 401);
                }
                if ($requestname == "edit user") {
                    if ($request['active'] != null) {
                        return  $roleAuthUser[0] == $adminRole['name'] ? $next($request) : response()->json(["message" => "You don't have permission"], 403);
                    }

                    if ($request['role'] == 'admin') {
                        return  $roleAuthUser[0] == $adminRole['name'] ? $next($request) : response()->json(["message" => "You don't have permission"], 403);
                    }
                    $userIsChanged = User::where("username", $request["username"])->first()->getRoleNames();
                    return ($roleAuthUser[0] == $adminRole['name'] || $userIsChanged[0] != $adminRole['name']) ? $next($request) : response()->json(["message" => "You don't have permission"], 403);
                }
                return $next($request);
            }

            // dd("chay den sday");


            return response()->json(["message" => "You don't have permission "], 403);
        }
    }
}
