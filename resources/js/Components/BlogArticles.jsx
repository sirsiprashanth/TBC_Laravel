import React from 'react';
import { Link } from '@inertiajs/react';

export default function BlogArticles() {
    // Sample blog articles data
    const articles = [
        {
            id: 1,
            title: "Why Choose Damac Hills 1? A Premium Living Experience",
            date: "September 25, 2024",
            summary: "Damac Hills 1 Offers A Sophisticated Lifestyle With Access To World-Class Amenities. Find Out Why This Community Is A Top Choice For Luxury Living.",
            image: "/assets/img/property.png"
        },
        {
            id: 2,
            title: "The Benefits Of Investing In Dubai Real Estate: Why It's A Smart Move",
            date: "September 25, 2024",
            summary: "Dubai's Real Estate Market Offers Exciting Opportunities For Investors. Discover The Financial And Lifestyle Advantages Of Investing In This Thriving City.",
            image: "/assets/img/dubai-skyline.png"
        },
        {
            id: 3,
            title: "Palm Jumeirah: Luxury Living on Dubai's Iconic Island",
            date: "September 22, 2024",
            summary: "Explore the exceptional lifestyle offered by Palm Jumeirah residences, with breathtaking ocean views and world-class amenities at your doorstep.",
            image: "/assets/img/property.png"
        },
        {
            id: 4,
            title: "Downtown Dubai: The Heart of Urban Elegance",
            date: "September 20, 2024",
            summary: "Discover why Downtown Dubai remains the premier destination for those seeking luxury living in the center of the city's vibrant culture.",
            image: "/assets/img/property.png"
        }
    ];

    return (
        <div className="container-fluid py-5" style={{ background: '#FFF0DE' }}>
            <div className="container">
                <div className="row">
                    {articles.map((article, index) => (
                        <div key={article.id} className="col-md-6 mb-5">
                            <div className="blog-article">
                                {/* Article Image */}
                                <div className="article-image mb-4">
                                    <img 
                                        src={article.image} 
                                        alt={article.title}
                                        className="img-fluid w-100"
                                        style={{
                                            height: '300px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                                
                                {/* Article Content */}
                                <div className="article-content">
                                    <h2 style={{
                                        fontFamily: 'Agatho',
                                        fontSize: '28px',
                                        color: '#1F2937',
                                        fontWeight: '500',
                                        lineHeight: '1.2',
                                        marginBottom: '10px'
                                    }}>
                                        {article.title}
                                    </h2>
                                    
                                    <p style={{
                                        fontFamily: 'Glancyr',
                                        fontSize: '14px',
                                        color: '#6B7280',
                                        marginBottom: '15px'
                                    }}>
                                        {article.date}
                                    </p>
                                    
                                    <p style={{
                                        fontFamily: 'Glancyr',
                                        fontSize: '16px',
                                        color: '#4B5563',
                                        marginBottom: '20px',
                                        lineHeight: '1.6'
                                    }}>
                                        {article.summary}
                                    </p>
                                    
                                    <Link 
                                        href="#" 
                                        className="d-inline-block"
                                        style={{
                                            fontFamily: 'Glancyr',
                                            fontSize: '16px',
                                            color: '#1F2937',
                                            textDecoration: 'none',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
