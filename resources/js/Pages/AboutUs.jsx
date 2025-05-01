import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import AboutUsBanner from '../Components/AboutUsBanner';
import MeetFounders from '../Components/MeetFounders';
import PropertyShowcase from '../Components/PropertyShowcase';
import OurApproach from '../Components/OurApproach';
import OurVision from '../Components/OurVision';

export default function AboutUs({ auth }) {
    return (
        <>
            <Head title="About Us" />
            <div style={{borderColor: 'var(--bs-indigo)', background: 'rgb(255,241,222)'}}>
                <Navbar />
                <AboutUsBanner />
                <MeetFounders />
                <PropertyShowcase />
                <OurApproach />
                <PropertyShowcase />
                <OurVision />
                <Footer />
            </div>
        </>
    );
}
