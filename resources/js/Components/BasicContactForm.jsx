import React, { useState } from 'react';
import axios from 'axios';

// Set up CSRF token
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

export default function BasicContactForm({ property, onClose, type = 'contact' }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferred_date: '',
        preferred_time: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = type === 'viewing' ? '/property/viewing' : '/property/contact';
            const dataToSend = {
                ...formData,
                property_id: property.id,
                property_name: property.property_name || 'Property',
                property_ref: property.reference_number || 'N/A',
                subject: type === 'viewing' ? `Viewing Request for ${property.property_name}` : `Inquiry about ${property.property_name}`
            };

            await axios.post(endpoint, dataToSend);
            
            alert(type === 'viewing' ? 'Viewing request submitted!' : 'Message sent successfully!');
            onClose();
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            onClick={closeModal}
            style={{
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
            }}
        >
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto'
            }}>
                <h2 style={{ marginBottom: '20px' }}>
                    {type === 'viewing' ? 'Book a Viewing' : 'Contact Agent'}
                </h2>
                <p style={{ marginBottom: '20px', color: '#666' }}>
                    Property: {property.property_name} ({property.reference_number})
                </p>
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Name: *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            required
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email: *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            required
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label>Phone: {type === 'viewing' ? '*' : ''}</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            required={type === 'viewing'}
                        />
                    </div>
                    
                    {type === 'viewing' && (
                        <>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Preferred Date:</label>
                                <input
                                    type="date"
                                    name="preferred_date"
                                    value={formData.preferred_date}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label>Preferred Time:</label>
                                <select
                                    name="preferred_time"
                                    value={formData.preferred_time}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                >
                                    <option value="">Select Time</option>
                                    <option value="9:00 AM">9:00 AM</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="11:00 AM">11:00 AM</option>
                                    <option value="12:00 PM">12:00 PM</option>
                                    <option value="1:00 PM">1:00 PM</option>
                                    <option value="2:00 PM">2:00 PM</option>
                                    <option value="3:00 PM">3:00 PM</option>
                                    <option value="4:00 PM">4:00 PM</option>
                                    <option value="5:00 PM">5:00 PM</option>
                                </select>
                            </div>
                        </>
                    )}
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label>Message: {type === 'contact' ? '*' : ''}</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            rows="4"
                            required={type === 'contact'}
                            placeholder={type === 'viewing' ? 'Additional comments (optional)' : 'I\'m interested in this property...'}
                        />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                backgroundColor: '#F97316',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Submitting...' : (type === 'viewing' ? 'Book Viewing' : 'Send Message')}
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