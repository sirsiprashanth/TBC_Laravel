import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import BlogBanner from '../Components/BlogBanner';
import BlogArticles from '../Components/BlogArticles';
import TestimonialVideos from '../Components/TestimonialVideos';

export default function Blogs({ auth }) {
    return (
        <>
            <Head title="Blogs" />
            <div style={{borderColor: 'var(--bs-indigo)', background: 'rgb(255,241,222)'}}>
                <Navbar />
                <BlogBanner />
                <BlogArticles />
                <TestimonialVideos />
                <Footer />
            </div>
        </>
    );
}
