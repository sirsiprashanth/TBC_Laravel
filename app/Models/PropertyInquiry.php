<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyInquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'type',
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'preferred_date',
        'preferred_time',
        'status',
        'admin_notes'
    ];

    protected $casts = [
        'preferred_date' => 'date',
    ];

    /**
     * Get the property associated with the inquiry
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Scope for viewing requests
     */
    public function scopeViewings($query)
    {
        return $query->where('type', 'viewing');
    }

    /**
     * Scope for contact requests
     */
    public function scopeContacts($query)
    {
        return $query->where('type', 'contact');
    }

    /**
     * Scope for pending inquiries
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}