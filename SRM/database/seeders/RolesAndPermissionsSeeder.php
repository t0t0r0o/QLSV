<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // user role
        $admin = 'admin';
        $qlht = 'qlht';


        //permissions login
        $login = 'login';
        $logout = 'logout';
        $refresh = 'refresh';
        $register = 'register';
        $me = 'me';

        //user permission
        $createUser = 'create user';
        $editUser = 'edit user';
        $deleteUser = 'delete user';
        $viewUser = 'view user';

        //student permission        
        $createStudent = 'create student';
        $editStudent = 'edit student';
        $deleteStudent = 'delete student';
        $viewStudent = 'view student';

        //ban
        $banned = 'banned';

        Permission::create(['name' => $createUser]);
        Permission::create(['name' => $editUser]);
        Permission::create(['name' => $deleteUser]);
        Permission::create(['name' => $viewUser]);

        Permission::create(['name' => $login]);
        Permission::create(['name' => $logout]);
        Permission::create(['name' => $refresh]);
        Permission::create(['name' => $register]);
        Permission::create(['name' => $me]);


        Permission::create(['name' => $createStudent]);
        Permission::create(['name' => $editStudent]);
        Permission::create(['name' => $deleteStudent]);
        Permission::create(['name' => $viewStudent]);

        Permission::create(['name' => $banned]);


        Role::create(['name' => $admin])->givePermissionTo(Permission::all());
        Role::create(['name' => $qlht])->givePermissionTo([

            $createStudent,
            $createUser,
            $editStudent,
            $editUser,
            $login,
            $logout,
            $refresh,
            $register,
            $me
        ]);

        //
    }
}
