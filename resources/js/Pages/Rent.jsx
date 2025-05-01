import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import RentBanner from '../Components/RentBanner';
import RentPropertyDetails from '../Components/RentPropertyDetails';
import SimilarProperties from '../Components/SimilarProperties';
import LogoBanner from '../Components/LogoBanner';
import SimilarPropertiesSection from '../Components/SimilarPropertiesSection';
import TestimonialVideos from '../Components/TestimonialVideos';

export default function Rent({ auth }) {
    return (
        <>
            <Head title="Rent Properties" />
            <div style={{borderColor: 'var(--bs-indigo)', background: 'rgb(255,241,222)'}}>
                <Navbar />
                <RentBanner />
                <RentPropertyDetails />
                <LogoBanner />
                
                {/* Spacer */}
                <div style={{ height: '60px' }}></div>
                
                <SimilarPropertiesSection />
                <SimilarProperties />
                <TestimonialVideos />
                <Footer />
            </div>
        </>
    );
}
