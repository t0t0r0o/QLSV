<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Student extends Model
{
    use HasFactory,SoftDeletes,LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->useLogName('user')->logOnly(['firstname','lastname','email','phoneNumber','gender','identification','school-id','address']);;
    }

    protected $table = 'students';

    protected static $logAttributes = ['firstname','lastname','email','phoneNumber','gender','identification','school-id','address'];

    protected static $ignoreChangedAttributes = ['password','updated_at','deleted_at'];

    protected static $recordEvents = ['created','updated','deleted'];

    protected static $logOnlyDirty = true;

    public function getDescriptionForEvent(string $event): string
    {
        return "You have {$event} student";
    }


    protected $fillable = [
        'username',
        'email',
        'password',
        'firstname',
        'lastname',
        'identification',
        'phoneNumber',
        'gender',
        'school-id',
        'address',
        'updated_by',
        'deleted_by',
        'created_by'
    ];
}
