import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import SellBanner from '../Components/SellBanner';
import FeaturedProperties from '../Components/FeaturedProperties';
import TestimonialVideos from '../Components/TestimonialVideos';

export default function Sell({ auth, properties, count }) {
    const propertiesData = {
        properties,
        count
    };

    return (
        <>
            <Head title="Sell Your Property" />
            <div style={{borderColor: 'var(--bs-indigo)', background: 'rgb(255,241,222)'}}>
                <Navbar />
                <SellBanner />
                <FeaturedProperties propertiesData={propertiesData} />
                <TestimonialVideos />
                <Footer />
            </div>
        </>
    );
}
