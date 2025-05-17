import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function PropertyContactModal({ show, onClose, property, type = 'contact' }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: type === 'viewing' ? `Viewing Request for ${property?.property_name}` : `Inquiry about ${property?.property_name}`,
        message: '',
        preferred_date: '',
        preferred_time: '',
        property_id: property?.id,
        property_name: property?.property_name,
        property_ref: property?.reference_number,
    });

    const submit = (e) => {
        e.preventDefault();

        const endpoint = type === 'viewing' 
            ? '/property/viewing'
            : '/property/contact';
        
        post(endpoint, {
            onSuccess: () => {
                reset();
                onClose();
            },
            preserveScroll: true,
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {type === 'viewing' ? 'Book a Viewing' : 'Contact Agent'}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Property: {property?.property_name} ({property?.reference_number})
                </p>

                <div className="mt-6">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone" />
                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('phone', e.target.value)}
                        required={type === 'viewing'}
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>

                {type === 'viewing' && (
                    <>
                        <div className="mt-4">
                            <InputLabel htmlFor="preferred_date" value="Preferred Date" />
                            <TextInput
                                id="preferred_date"
                                type="date"
                                name="preferred_date"
                                value={data.preferred_date}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('preferred_date', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            <InputError message={errors.preferred_date} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="preferred_time" value="Preferred Time" />
                            <select
                                id="preferred_time"
                                name="preferred_time"
                                value={data.preferred_time}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                onChange={(e) => setData('preferred_time', e.target.value)}
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
                    </>
                )}

                <div className="mt-4">
                    <InputLabel htmlFor="message" value={type === 'viewing' ? 'Message (Optional)' : 'Message'} />
                    <textarea
                        id="message"
                        name="message"
                        value={data.message}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        rows="4"
                        onChange={(e) => setData('message', e.target.value)}
                        required={type === 'contact'}
                        placeholder={type === 'viewing' ? 'Any special requests...' : "I'm interested in this property..."}
                    />
                    <InputError message={errors.message} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton className="ml-3" disabled={processing}>
                        {processing ? 'Sending...' : (type === 'viewing' ? 'Book Viewing' : 'Send Message')}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}