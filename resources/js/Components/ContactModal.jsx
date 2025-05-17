import React, { useState } from 'react';
import Modal from './Modal';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function ContactModal({ show, onClose, property }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: `Inquiry about ${property?.property_name || 'Property'} (${property?.reference_number || ''})`,
        message: '',
        property_id: property?.id || '',
        property_name: property?.property_name || 'Property',
        property_ref: property?.reference_number || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('property.contact'), {
            onSuccess: () => {
                reset();
                onClose();
                alert('Your message has been sent successfully! Our agent will contact you shortly.');
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
                    Contact Our Agent
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
                        <InputLabel htmlFor="phone" value="Phone" />
                        <TextInput
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="form-control"
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="subject" value="Subject" />
                        <TextInput
                            id="subject"
                            type="text"
                            value={data.subject}
                            onChange={(e) => setData('subject', e.target.value)}
                            className="form-control"
                        />
                        <InputError message={errors.subject} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="message" value="Message *" />
                        <textarea
                            id="message"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            className="form-control"
                            rows="5"
                            required
                            placeholder="I'm interested in this property..."
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
                            {processing ? 'Sending...' : 'Send Message'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}