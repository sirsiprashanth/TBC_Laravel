import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import OffPlanBanner from '../Components/OffPlanBanner';
import OffPlanProjects from '../Components/OffPlanProjects';
import TestimonialVideos from '../Components/TestimonialVideos';

export default function OffPlan({ auth }) {
    return (
        <>
            <Head title="Off-Plan Properties" />
            <div style={{borderColor: 'var(--bs-indigo)', background: 'rgb(255,241,222)'}}>
                <Navbar />
                <OffPlanBanner />
                <OffPlanProjects />
                <TestimonialVideos />
                <Footer />
            </div>
        </>
    );
}
