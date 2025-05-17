import React, { useState } from 'react';
import Modal from './Modal';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function ViewingModal({ show, onClose, property }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        preferred_date: '',
        preferred_time: '',
        message: '',
        property_id: property?.id || '',
        property_name: property?.property_name || 'Property',
        property_ref: property?.reference_number || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('property.viewing'), {
            onSuccess: () => {
                reset();
                onClose();
                alert('Your viewing request has been submitted successfully! We will contact you shortly.');
            },
            onError: () => {
                console.log('Error submitting form');
            }
        });
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-4">
                <h2 style={{ 
                    fontFamily: 'Agatho', 
                    fontSize: '24px',
                    color: '#1F2937',
                    marginBottom: '10px'
                }}>
                    Book a Viewing
                </h2>
                <p style={{ 
                    fontFamily: 'Glancyr', 
                    fontSize: '14px',
                    color: '#6B7280',
                    marginBottom: '20px'
                }}>
                    Property: {property.property_name} ({property.reference_number})
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <InputLabel htmlFor="name" value="Name *" />
                        <TextInput
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="form-control"
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="email" value="Email *" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="form-control"
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="phone" value="Phone *" />
                        <TextInput
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="form-control"
                            required
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <InputLabel htmlFor="preferred_date" value="Preferred Date" />
                            <TextInput
                                id="preferred_date"
                                type="date"
                                value={data.preferred_date}
                                onChange={(e) => setData('preferred_date', e.target.value)}
                                className="form-control"
                                min={new Date().toISOString().split('T')[0]}
                            />
                            <InputError message={errors.preferred_date} className="mt-2" />
                        </div>
                        <div className="col-md-6">
                            <InputLabel htmlFor="preferred_time" value="Preferred Time" />
                            <select
                                id="preferred_time"
                                value={data.preferred_time}
                                onChange={(e) => setData('preferred_time', e.target.value)}
                                className="form-control"
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
                            <InputError message={errors.preferred_time} className="mt-2" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="message" value="Additional Message" />
                        <textarea
                            id="message"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            className="form-control"
                            rows="3"
                        />
                        <InputError message={errors.message} className="mt-2" />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary"
                            style={{
                                borderRadius: '5px',
                                padding: '8px 20px',
                                fontFamily: 'Glancyr',
                                fontSize: '14px'
                            }}
                        >
                            Cancel
                        </button>
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            style={{
                                borderRadius: '5px',
                                padding: '8px 20px',
                                fontFamily: 'Glancyr',
                                fontSize: '14px'
                            }}
                        >
                            {processing ? 'Submitting...' : 'Book Viewing'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}