<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\PropertyInquiry;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class PropertyInquiryController extends Controller
{
    /**
     * Handle viewing request
     */
    public function storeViewing(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'preferred_date' => 'nullable|date|after_or_equal:today',
            'preferred_time' => 'nullable|string',
            'message' => 'nullable|string|max:1000',
            'property_id' => 'required|exists:properties,id',
            'property_name' => 'required|string',
            'property_ref' => 'required|string'
        ]);

        try {
            // Save to database
            $inquiry = PropertyInquiry::create([
                'property_id' => $validated['property_id'],
                'type' => 'viewing',
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'preferred_date' => $validated['preferred_date'] ?? null,
                'preferred_time' => $validated['preferred_time'] ?? null,
                'message' => $validated['message'] ?? null,
                'status' => 'pending'
            ]);

            // Log the inquiry
            Log::info('Viewing Request:', $validated);

            // Send email to admin
            $adminEmail = config('mail.from.address', 'info@boros.com');
            
            Mail::send([], [], function ($message) use ($validated, $adminEmail) {
                $message->to($adminEmail)
                    ->subject('New Viewing Request - ' . $validated['property_ref'])
                    ->html(
                        '<h2>New Viewing Request</h2>' .
                        '<p><strong>Property:</strong> ' . $validated['property_name'] . ' (' . $validated['property_ref'] . ')</p>' .
                        '<p><strong>Name:</strong> ' . $validated['name'] . '</p>' .
                        '<p><strong>Email:</strong> ' . $validated['email'] . '</p>' .
                        '<p><strong>Phone:</strong> ' . $validated['phone'] . '</p>' .
                        '<p><strong>Preferred Date:</strong> ' . ($validated['preferred_date'] ?? 'Not specified') . '</p>' .
                        '<p><strong>Preferred Time:</strong> ' . ($validated['preferred_time'] ?? 'Not specified') . '</p>' .
                        '<p><strong>Message:</strong> ' . ($validated['message'] ?? 'No message') . '</p>'
                    );
            });

            // Send confirmation to customer
            Mail::send([], [], function ($message) use ($validated) {
                $message->to($validated['email'])
                    ->subject('Viewing Request Confirmation - ' . $validated['property_name'])
                    ->html(
                        '<h2>Thank you for your viewing request</h2>' .
                        '<p>We have received your request to view <strong>' . $validated['property_name'] . '</strong>.</p>' .
                        '<p>Our agent will contact you shortly to confirm the viewing appointment.</p>' .
                        '<p>Best regards,<br>Boros Real Estate Team</p>'
                    );
            });

            return redirect()->back()->with('success', 'Your viewing request has been submitted successfully!');
        } catch (\Exception $e) {
            Log::error('Error processing viewing request: ' . $e->getMessage());
            return redirect()->back()->with('error', 'There was an error submitting your request. Please try again.');
        }
    }

    /**
     * Handle contact request
     */
    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
            'property_id' => 'required|exists:properties,id',
            'property_name' => 'nullable|string',
            'property_ref' => 'nullable|string'
        ]);

        // Set defaults
        $validated['subject'] = $validated['subject'] ?? 'Property Inquiry';
        $validated['property_name'] = $validated['property_name'] ?? 'Property';
        $validated['property_ref'] = $validated['property_ref'] ?? 'N/A';

        try {
            // Save to database
            $inquiry = PropertyInquiry::create([
                'property_id' => $validated['property_id'],
                'type' => 'contact',
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'subject' => $validated['subject'],
                'message' => $validated['message'],
                'status' => 'pending'
            ]);

            // Log the inquiry
            Log::info('Contact Request:', $validated);

            // Send email to admin
            $adminEmail = config('mail.from.address', 'info@boros.com');
            
            Mail::send([], [], function ($message) use ($validated, $adminEmail) {
                $message->to($adminEmail)
                    ->subject('Property Inquiry - ' . $validated['property_ref'])
                    ->html(
                        '<h2>New Property Inquiry</h2>' .
                        '<p><strong>Property:</strong> ' . $validated['property_name'] . ' (' . $validated['property_ref'] . ')</p>' .
                        '<p><strong>Name:</strong> ' . $validated['name'] . '</p>' .
                        '<p><strong>Email:</strong> ' . $validated['email'] . '</p>' .
                        '<p><strong>Phone:</strong> ' . ($validated['phone'] ?? 'Not provided') . '</p>' .
                        '<p><strong>Subject:</strong> ' . $validated['subject'] . '</p>' .
                        '<p><strong>Message:</strong><br>' . nl2br($validated['message']) . '</p>'
                    );
            });

            // Send confirmation to customer
            Mail::send([], [], function ($message) use ($validated) {
                $message->to($validated['email'])
                    ->subject('Inquiry Received - ' . $validated['property_name'])
                    ->html(
                        '<h2>Thank you for your inquiry</h2>' .
                        '<p>We have received your message regarding <strong>' . $validated['property_name'] . '</strong>.</p>' .
                        '<p>Our agent will respond to your inquiry within 24 hours.</p>' .
                        '<p>Best regards,<br>Boros Real Estate Team</p>'
                    );
            });

            return redirect()->back()->with('success', 'Your message has been sent successfully!');
        } catch (\Exception $e) {
            Log::error('Error processing contact request: ' . $e->getMessage());
            return redirect()->back()->with('error', 'There was an error sending your message. Please try again.');
        }
    }
}