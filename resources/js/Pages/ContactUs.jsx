import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import PropertyShowcase from '../Components/PropertyShowcase';
import PropertyListing from '../Components/PropertyListing';
import CommunityOverview from '../Components/CommunityOverview';
import LocationOverview from '../Components/LocationOverview';
import PhotoGallery from '../Components/PhotoGallery';
import TestimonialVideos from '../Components/TestimonialVideos';

export default function ContactUs({ auth }) {
    return (
        <>
            <Head title="Contact Us" />
            <div style={{borderColor: 'var(--bs-indigo)', background: 'rgb(255,241,222)'}}>
                <Navbar />
                <PropertyShowcase />
                <PropertyListing />
                <CommunityOverview />
                <LocationOverview />
                <PhotoGallery />
                <TestimonialVideos />
                <Footer />
            </div>
        </>
    );
}
