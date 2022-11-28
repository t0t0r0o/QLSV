<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Models\Role;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable implements JWTSubject
{
    use  HasFactory, Notifiable,SoftDeletes,LogsActivity;
    use HasRoles;

    protected $table = 'users';

    protected static $logName = 'user';
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->useLogName('user')->logOnly(['firstname','lastname','email','phoneNumber','gender','active']);;
    }

    protected static $logAttributes = ['firstname','lastname','email','phoneNumber','gender','active'];

    protected static $ignoreChangedAttributes = ['password','updated_at','deleted_at'];

    protected static $recordEvents = ['created','updated','deleted'];

    protected static $logOnlyDirty = true;



    public function getDescriptionForEvent(string $event): string
    {
        return "You have {$event} user";
    }


    protected $fillable = [
        'username',
        'email',
        'password',
        'firstname',
        'lastname',
        'phoneNumber',
        'gender',
        'active',
        'updated_by',
        'deleted_by',
        'created_by'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'role' => $this->getRoleNames()[0],
            'created_at' => $this->created_at,
            'permission' => Role::findByName($this->getRoleNames()[0])->getPermissionNames()->toArray()
        ];
    }
}
