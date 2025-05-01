import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import PropertyListings from '../Components/PropertyListings';
import HelpSection from '../Components/HelpSection';
import ServiceCards from '../Components/ServiceCards';
import DubaiInvestment from '../Components/DubaiInvestment';
import LogoBanner from '../Components/LogoBanner';
import MeetFounders from '../Components/MeetFounders';
import TestimonialVideos from '../Components/TestimonialVideos';
import Footer from '../Components/Footer';

export default function Home({ auth }) {
    return (
        <>
            <Head title="Home" />
            <div className="text-center" style={{borderColor: 'var(--bs-indigo)', background: 'rgb(255,241,222)'}}>
                <Navbar />
                <Hero />
                <PropertyListings />
                <HelpSection />
                <ServiceCards />
                <DubaiInvestment />
                <LogoBanner />
                <MeetFounders />
                <TestimonialVideos />
                <Footer />
                
                {auth.user ? (
                    <Link href={route('dashboard')} className="btn btn-primary">
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link href={route('login')} className="btn btn-primary me-2">
                            Log in
                        </Link>
                        <Link href={route('register')} className="btn btn-secondary">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </>
    );
}
