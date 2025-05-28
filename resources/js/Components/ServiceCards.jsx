import React from 'react';
import { Link } from '@inertiajs/react';

// Individual service card component
const ServiceCard = ({ title, description, imageSrc, href }) => {
    return (
        <div className="service-card p-4 mb-4" style={{ 
            border: '1px solid rgba(35, 42, 64, 0.3)',
            borderRadius: '8px',
            backgroundColor: '#FDF0DD'
        }}>
            <div className="row">
                <div className="col-md-5">
                    <img 
                        src={imageSrc} 
                        alt={title} 
                        className="img-fluid w-100 h-100 object-fit-cover" 
                        style={{ borderRadius: '6px' }}
                    />
                </div>
                <div className="col-md-7 ps-md-4 d-flex flex-column">
                    <h3 className="mb-3">
                        {title}
                    </h3>
                    <p className="mb-4">
                        {description}
                    </p>
                    <div className="mt-auto">
                        <Link 
                            href={href || "#"} 
                            className="btn d-flex align-items-center justify-content-center mx-auto" 
                            style={{
                                borderRadius: '25px',
                                border: '1px solid rgba(35, 42, 64, 0.5)',
                                color: '#232A40',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <span className="me-2">View More</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ServiceCards() {
    // Service data
    const services = [
        {
            title: "Buy A Home",
            description: "Your Dream Home Awaits. Let Us Guide You To The Perfect Residence That Complements Your Lifestyle.",
            imageSrc: "/assets/img/image3.png",
            href: "/sell"
        },
        {
            title: "Sell A Home",
            description: "Maximize Your Property's Value With Our Tailored Marketing Strategies And Expert Negotiation.",
            imageSrc: "/assets/img/image4.png",
            href: "/sell"
        },
        {
            title: "Rent A Home",
            description: "From Off-Market Opportunities To High-Yield Rentals, We Identify Real Estate Assets That Build Wealth.",
            imageSrc: "/assets/img/image5.png",
            href: "/rent"
        }
    ];

    return (
        <section className="py-5" style={{ backgroundColor: '#FDF0DD' }}>
            <div className="container">
                <div className="row mb-4">
                    <div className="col-md-6">
                        <ServiceCard {...services[0]} />
                    </div>
                    <div className="col-md-6">
                        <ServiceCard {...services[1]} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <ServiceCard {...services[2]} />
                    </div>
                </div>
            </div>
        </section>
    );
}
