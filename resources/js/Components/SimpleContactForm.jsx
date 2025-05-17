import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function SimpleContactForm({ property, onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        property_id: property.id,
        property_ref: property.reference_number
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post('/property/contact', {
            onSuccess: () => {
                alert('Your message has been sent!');
                onClose();
            },
            onError: () => {
                alert('Error sending message. Please try again.');
            }
        });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto'
            }}>
                <h2 style={{ marginBottom: '20px' }}>Contact Agent</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                            required
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                            required
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label>Phone:</label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label>Message:</label>
                        <textarea
                            value={data.message}
                            onChange={e => setData('message', e.target.value)}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                            rows="4"
                            required
                        />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                backgroundColor: '#F97316',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            {processing ? 'Sending...' : 'Send Message'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                backgroundColor: '#6B7280',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}