import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import SimpleModal from './SimpleModal';

export default function PropertyContactForm({ show, onClose, property, type = 'contact' }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferred_date: '',
        preferred_time: '',
        property_id: property?.id,
        property_name: property?.property_name,
        property_ref: property?.reference_number,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const endpoint = type === 'viewing' ? '/property/viewing' : '/property/contact';

        post(endpoint, {
            onSuccess: () => {
                setShowSuccess(true);
                reset();
                setTimeout(() => {
                    setShowSuccess(false);
                    onClose();
                }, 2000);
            },
            preserveScroll: true,
        });
    };

    const title = type === 'viewing' ? 'Book a Viewing' : 'Contact Agent';

    return (
        <SimpleModal show={show} onClose={onClose} title={title}>
            {showSuccess ? (
                <div className="text-center py-5">
                    <div className="mb-4">
                        <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            backgroundColor: '#F97316',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto'
                        }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <h3 style={{
                        fontFamily: 'Agatho',
                        fontSize: '24px',
                        color: '#1A202C',
                        marginBottom: '10px'
                    }}>
                        Request Submitted!
                    </h3>
                    <p style={{
                        fontFamily: 'Glancyr',
                        color: '#666',
                        fontSize: '16px'
                    }}>
                        We've received your {type === 'viewing' ? 'viewing request' : 'message'} and will get back to you soon.
                    </p>
                </div>
            ) : (
            <form onSubmit={handleSubmit}>
                <div className="mb-4 p-3" style={{
                    backgroundColor: '#FFF7EC',
                    borderRadius: '8px',
                    border: '1px solid #F97316',
                    borderLeftWidth: '4px'
                }}>
                    <p style={{ 
                        fontFamily: 'Glancyr', 
                        color: '#1A202C',
                        marginBottom: '5px',
                        fontWeight: '600'
                    }}>
                        Property: {property?.property_name}
                    </p>
                    <p style={{ 
                        fontFamily: 'Glancyr', 
                        color: '#666',
                        fontSize: '14px',
                        margin: 0
                    }}>
                        Reference: {property?.reference_number}
                    </p>
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ 
                        fontFamily: 'Glancyr',
                        color: '#1A202C',
                        fontWeight: '500',
                        marginBottom: '8px'
                    }}>Name <span style={{ color: '#F97316' }}>*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        style={{ 
                            fontFamily: 'Glancyr',
                            backgroundColor: '#FFFAF3',
                            border: '1px solid #E5D7C3',
                            padding: '12px',
                            borderRadius: '8px'
                        }}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <div className="text-danger mt-1" style={{ fontSize: '14px' }}>{errors.name}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ 
                        fontFamily: 'Glancyr',
                        color: '#1A202C',
                        fontWeight: '500',
                        marginBottom: '8px'
                    }}>Email <span style={{ color: '#F97316' }}>*</span></label>
                    <input
                        type="email"
                        className="form-control"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        style={{ 
                            fontFamily: 'Glancyr',
                            backgroundColor: '#FFFAF3',
                            border: '1px solid #E5D7C3',
                            padding: '12px',
                            borderRadius: '8px'
                        }}
                        placeholder="your.email@example.com"
                    />
                    {errors.email && <div className="text-danger mt-1" style={{ fontSize: '14px' }}>{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ 
                        fontFamily: 'Glancyr',
                        color: '#1A202C',
                        fontWeight: '500',
                        marginBottom: '8px'
                    }}>Phone <span style={{ color: '#F97316' }}>*</span></label>
                    <input
                        type="tel"
                        className="form-control"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                        style={{ 
                            fontFamily: 'Glancyr',
                            backgroundColor: '#FFFAF3',
                            border: '1px solid #E5D7C3',
                            padding: '12px',
                            borderRadius: '8px'
                        }}
                        placeholder="+971 50 000 0000"
                    />
                    {errors.phone && <div className="text-danger mt-1" style={{ fontSize: '14px' }}>{errors.phone}</div>}
                </div>

                {type === 'viewing' && (
                    <>
                        <div className="mb-3">
                            <label className="form-label" style={{ 
                                fontFamily: 'Glancyr',
                                color: '#1A202C',
                                fontWeight: '500',
                                marginBottom: '8px'
                            }}>Preferred Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={data.preferred_date}
                                onChange={(e) => setData('preferred_date', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                style={{ 
                                    fontFamily: 'Glancyr',
                                    backgroundColor: '#FFFAF3',
                                    border: '1px solid #E5D7C3',
                                    padding: '12px',
                                    borderRadius: '8px'
                                }}
                            />
                            {errors.preferred_date && <div className="text-danger mt-1" style={{ fontSize: '14px' }}>{errors.preferred_date}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ 
                                fontFamily: 'Glancyr',
                                color: '#1A202C',
                                fontWeight: '500',
                                marginBottom: '8px'
                            }}>Preferred Time</label>
                            <select
                                className="form-select"
                                value={data.preferred_time}
                                onChange={(e) => setData('preferred_time', e.target.value)}
                                style={{ 
                                    fontFamily: 'Glancyr',
                                    backgroundColor: '#FFFAF3',
                                    border: '1px solid #E5D7C3',
                                    padding: '12px',
                                    borderRadius: '8px'
                                }}
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
                            {errors.preferred_time && <div className="text-danger mt-1" style={{ fontSize: '14px' }}>{errors.preferred_time}</div>}
                        </div>
                    </>
                )}

                <div className="mb-3">
                    <label className="form-label" style={{ 
                        fontFamily: 'Glancyr',
                        color: '#1A202C',
                        fontWeight: '500',
                        marginBottom: '8px'
                    }}>Message</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        style={{ 
                            fontFamily: 'Glancyr',
                            backgroundColor: '#FFFAF3',
                            border: '1px solid #E5D7C3',
                            padding: '12px',
                            borderRadius: '8px'
                        }}
                        placeholder="Tell us more about your interest in this property..."
                    ></textarea>
                    {errors.message && <div className="text-danger mt-1" style={{ fontSize: '14px' }}>{errors.message}</div>}
                </div>

                <div className="d-flex justify-content-end gap-3 mt-4">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onClose}
                        style={{ 
                            fontFamily: 'Glancyr',
                            backgroundColor: 'transparent',
                            color: '#666',
                            border: '1px solid #E5D7C3',
                            padding: '10px 25px',
                            borderRadius: '8px',
                            fontWeight: '500'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            backgroundColor: '#F97316',
                            color: 'white',
                            fontFamily: 'Glancyr',
                            padding: '10px 30px',
                            borderRadius: '8px',
                            fontWeight: '500',
                            border: 'none',
                            boxShadow: '0 2px 4px rgba(249, 115, 22, 0.2)'
                        }}
                        disabled={processing}
                    >
                        {processing ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </form>
            )}
        </SimpleModal>
    );
}