import React from 'react';
import { Link } from '@inertiajs/react';

export default function DubaiInvestment() {
    return (
        <div className="position-relative" style={{ overflow: 'hidden' }}>
            <section 
                className="vw-100 py-0"
                style={{
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    position: 'relative',
                    width: '100vw',
                    minHeight: '500px',
                    backgroundColor: '#10253a'
                }}
            >
                <div className="container-fluid px-0 h-100">
                    <div className="row g-0 h-100">
                        {/* Background image overlay */}
                        <div className="position-absolute top-0 start-0 w-100 h-100" 
                            style={{
                                backgroundImage: 'url(/assets/img/dubai-skyline.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: '0.7'
                            }}>
                        </div>
                        
                        {/* Content Container - Top Section */}
                        <div className="container position-relative" style={{ zIndex: 2 }}>
                            <div className="row py-5">
                                {/* Dubai Logo - Left Column */}
                                <div className="col-md-4 border-end border-light-subtle d-flex align-items-center justify-content-center">
                                    <div className="text-center mb-4 mb-md-0">
                                        <img 
                                            src="/assets/img/dubai-logo.png" 
                                            alt="DUBAI" 
                                            className="img-fluid" 
                                            style={{ maxWidth: '180px' }}
                                        />
                                    </div>
                                </div>
                                
                                {/* Right Column - Title */}
                                <div className="col-md-8 ps-md-4 d-flex flex-column justify-content-center align-items-start">
                                    <p className="text-uppercase mb-1" style={{ color: '#e0d6c8', fontSize: '14px'}}>
                                        INVEST WHERE THE WORLD'S ELITE CHOOSE TO CALL HOME.
                                    </p>
                                    <h2 className="mb-4" style={{ 
                                        color: '#e0d6c8', 
                                        fontSize: '40px',
                                        lineHeight: '1.2',
                                        textAlign: 'left'
                                    }}>
                                        A Global Destination For Luxury<br />
                                        Living & Investment
                                    </h2>
                                </div>
                            </div>
                        </div>
                        
                        {/* Benefits Section - Only visible on scroll or additional content */}
                        <div className="container position-relative" style={{ zIndex: 2 }}>
                            <div className="row py-3 justify-content-center">
                                <div className="col-md-11">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8 contect-bot d-flex flex-column align-items-center">
                                            {/* Dubai Benefits List */}
                                            <div className="dubai-benefits mb-4 d-flex flex-column align-items-start">
                                                <p className="text-white mb-2 w-100 text-start" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>
                                                    Dubai Is More Than A City—It's A Lifestyle. As A World-Class Business And Luxury Hub, It Offers:
                                                </p>
                                                <p className="text-white mb-2 w-100 text-start" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>
                                                    100% Freehold Ownership For Foreign Investors
                                                </p>
                                                <p className="text-white mb-2 w-100 text-start" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>
                                                    High ROI & Tax-Free Benefits
                                                </p>
                                                <p className="text-white mb-2 w-100 text-start" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>
                                                    Golden Visa Opportunities
                                                </p>
                                                <p className="text-white mb-2 w-100 text-start" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>
                                                    A Thriving Luxury Market & Unmatched Architectural Marvels
                                                </p>
                                            </div>
                                            
                                            {/* View More Button */}
                                            <div className="mt-4 mb-3 d-flex justify-content-center w-100">
                                                <Link 
                                                    href="/sell" 
                                                    className="btn w-80 d-flex align-items-center justify-content-center"
                                                    style={{
                                                        borderRadius: '25px',
                                                        border: '1px solid #e0d6c8',
                                                        color: '#e0d6c8',
                                                        backgroundColor: 'transparent',
                                                        transition: 'all 0.3s ease'
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
                                        
                                        {/* Right image */}
                                        <div className="col-md-4 mt-4 mt-md-0 d-flex align-items-center justify-content-center">
                                            <div className="h-100 w-100" style={{
                                                backgroundImage: 'url(/assets/img/dubai-property.png)',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                minHeight: '450px',
                                                borderRadius: '6px'
                                            }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
