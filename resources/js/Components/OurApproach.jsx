import React from 'react';
import { Link } from '@inertiajs/react';

export default function OurApproach() {
    return (
        <div className="meet-founders py-5" style={{ 
            backgroundColor: '#FFF0DE',
            overflow: 'hidden'
        }}>
            <div className="container">
                <div className="row border" style={{ 
                    backgroundColor: '#FFF0DE',
                    borderColor: '#e8e0d3 !important',
                    borderRadius: '6px'
                }}>
                    {/* Header section - 3 columns */}
                    <div className="col-12">
                        <div className="row border-bottom" style={{ borderColor: '#232A40 !important' }}>
                            <div className="col-md-1 border-end" style={{ borderColor: '#232A40 !important' }}></div>
                            <div className="col-md-5 py-4 ps-md-4 border-end" style={{ borderColor: '#232A40 !important' }}>
                                <div className="d-flex flex-column">
                                    <p className="mb-1 text-center" style={{ color: '#6B7280', fontFamily: 'Glancyr', fontSize: '14px' }}>OUR EXPERTISE</p>
                                    <h2 style={{ 
                                        fontFamily: 'Agatho', 
                                        fontSize: '36px',
                                        color: '#1F2937',
                                        fontWeight: '500',
                                        margin: 0,
                                        textAlign:'center'
                                    }}>Discover Our Approach</h2>
                                </div>
                            </div>
                            <div className="col-md-6"></div>
                        </div>
                    </div>
                    
                    {/* Content section */}
                    <div className="col-12">
                        <div className="row">
                            {/* Left image */}
                            
                            
                            {/* Right content */}
                            <div className="col-md-6 py-5 ps-md-5 d-flex flex-column justify-content-center">
                                <div>
                                    <p className="mb-4" style={{ 
                                        fontFamily: 'Glancyr', 
                                        fontSize: '14px',
                                        color: '#4B5563',
                                        lineHeight: '1.7',
                                        maxWidth: '95%',
                                        textAlign:'left'
                                    }}>
                                       At The Boros Collection, we leverage cutting-edge technology 
                                       and in-depth market research to offer unparalleled insights into 
                                       the real estate landscape. Our innovative strategies ensure that 
                                       you are equipped with the best information to make informed decisions, 
                                       whether you're entering the market for the first time or looking 
                                       to expand your portfolio. We believe in transparent 
                                       communication and are committed to keeping you informed 
                                       throughout the process, ensuring a seamless experience.
                                    </p>
                                    
                                    <p className="mb-5" style={{ 
                                        fontFamily: 'Glancyr', 
                                        fontSize: '14px',
                                        color: '#4B5563',
                                        lineHeight: '1.7',
                                        maxWidth: '95%',
                                        textAlign:'left'
                                    }}>
                                        At The Boros Collection, we leverage cutting-edge technology 
                                        and in-depth market research to offer unparalleled insights 
                                        into the real estate landscape. Our innovative strategies 
                                        ensure that you are equipped with 
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 p-3">
                                <img 
                                    src="/assets/img/Founder.png" 
                                    alt="The Founders" 
                                    className="img-fluid w-100 h-100"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
