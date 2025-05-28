import React from 'react';
import { Link } from '@inertiajs/react';

export default function MeetFounders() {
    return (
        <div className="meet-founders py-5" style={{ 
            backgroundColor: '#FFF0DE',
            overflow: 'hidden'
        }}>
            <div className="container">
                <div className="row border" style={{ 
                    backgroundColor: '#FFF0DE',
                    borderColor: 'rgba(35, 42, 64, 0.5) !important',
                    borderRadius: '6px'
                }}>
                    {/* Header section - 3 columns */}
                    <div className="col-12">
                        <div className="row border-bottom" style={{ borderColor: '#232A40 !important' }}>
                            <div className="col-md-5 border-end" style={{ borderColor: '#232A40 !important' }}></div>
                            <div className="col-md-5 py-4 ps-md-4 border-end" style={{ borderColor: '#232A40 !important' }}>
                                <div className="d-flex flex-column">
                                    <p className="mb-1" style={{ color: '#6B7280', fontSize: '14px', textAlign:'right' }}>OUR TEAM</p>
                                    <h2 style={{ 
                                        fontSize: '36px',
                                        color: '#1F2937',
                                        fontWeight: '500',
                                        margin: 0,
                                        textAlign:'right'
                                    }}>Meet The Founders</h2>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                    
                    {/* Content section */}
                    <div className="col-12">
                        <div className="row">
                            {/* Left image */}
                            <div className="col-md-6 p-3">
                                <img 
                                    src="/assets/img/Founder.png" 
                                    alt="The Founders" 
                                    className="img-fluid w-100 h-100"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            
                            {/* Right content */}
                            <div className="col-md-6 py-5 ps-md-5 d-flex flex-column justify-content-center">
                                <div>
                                    <p className="mb-4" style={{ 
                                        fontSize: '14px',
                                        color: '#4B5563',
                                        lineHeight: '1.7',
                                        maxWidth: '95%',
                                        textAlign:'left'
                                    }}>
                                        At The Boros Collection, Our Team Of Expert Advisors Is 
                                        Dedicated To Redefining The Standards Of Real Estate 
                                        Excellence. With An Extensive Understanding Of The Market 
                                        Dynamics, Coupled With Years Of Global Experience, We 
                                        Pride Ourselves On Our Ability To Navigate The Complexities 
                                        Of Real Estate Transactions.
                                    </p>
                                    
                                    <p className="mb-5" style={{ 
                                        fontFamily: 'Glancyr', 
                                        fontSize: '14px',
                                        color: '#4B5563',
                                        lineHeight: '1.7',
                                        maxWidth: '95%',
                                        textAlign:'left'
                                    }}>
                                        Our Commitment To Discretion Ensures That Your Privacy Is 
                                        Always Respected, While We Create Bespoke Solutions That 
                                        Are Meticulously Tailored To Meet Your Unique Needs And 
                                        Aspirations. Whether You Are Looking To Buy, Sell, Or Invest, 
                                        We Are Here To Provide You With Personalized Guidance 
                                        Every Step Of The Way.
                                    </p>
                                    
                                    <Link 
                                        href="/about-us" 
                                        className="btn text-white d-flex align-items-center justify-content-center mx-auto"
                                        style={{
                                            backgroundColor: '#1A202C',
                                            borderRadius: '30px',
                                            fontSize: '14px',
                                            padding: '12px 24px',
                                            width:'100%',
                                            textAlign:'center'
                                        }}
                                    >
                                        <span>Meet Our Team</span>
                                        <svg className="ms-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
