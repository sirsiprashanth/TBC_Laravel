import { Head, usePage } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import SellBanner from '../Components/SellBanner';
import FeaturedProperties from '../Components/FeaturedProperties';
import TestimonialVideos from '../Components/TestimonialVideos';
import Banner from '@/Components/Banner';

export default function Sell({ auth, properties, count, filters, dropdown_options }) {
    const propertiesData = {
        properties,
        count
    };

    return (
        <>
            <Head title="Sell Your Property" />
            {/* <Banner /> */}
            <div style={{borderColor: 'var(--bs-indigo)', background: 'rgb(255,241,222)'}}>
                <Navbar />
                <SellBanner filters={filters} dropdownOptions={dropdown_options} />
                <FeaturedProperties propertiesData={propertiesData} />
                <TestimonialVideos />
                <Footer />
            </div>
        </>
    );
}
