import React from 'react';

export default function PropertyListing() {
    return (
        <div className="property-listing-section py-5" style={{ 
            backgroundColor: '#FFF0DE'
        }}>
            <div className="container">
                <div className="row g-0">
                    {/* Left side - Property Information */}
                    <div className="col-md-6 p-4" style={{ 
                        backgroundColor: '#FFF0DE', 
                        borderRight: '1px solid #e8e0d3' 
                    }}>
                        {/* Property Title */}
                        <h1 style={{ 
                            fontFamily: 'Agatho', 
                            fontSize: '42px',
                            color: '#1F2937',
                            fontWeight: '500',
                            marginBottom: '5px',
                            lineHeight: '1.1'
                        }}>
                            Nad Al Sheba<br />Gardens Phase 7
                        </h1>
                        
                        {/* Location */}
                        <p style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '14px',
                            color: '#6B7280',
                            marginBottom: '25px',
                            letterSpacing: '1px'
                        }}>
                            JUMEIRAH VILLAGE CIRCLE
                        </p>
                        
                        {/* Enquire Button */}
                        <button 
                            className="btn w-100 mb-4" 
                            style={{
                                fontFamily: 'Glancyr',
                                backgroundColor: '#1F2937',
                                color: 'white',
                                padding: '12px',
                                fontSize: '16px',
                                border: 'none',
                                borderRadius: '30px'
                            }}
                        >
                            Enquire Now
                        </button>
                        
                        {/* Property Details */}
                        <div className="row text-center py-3 mb-4" style={{ borderTop: '1px solid #e8e0d3', borderBottom: '1px solid #e8e0d3' }}>
                            {/* Price */}
                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <div className="me-3">
                                    <img src="/assets/img/Hand.png" alt="Price Icon" width="28" height="28" />
                                </div>
                                <div className="text-start">
                                    <div style={{ color: '#1F2937', fontFamily: 'Agatho', fontSize: '18px', fontWeight: '500' }}>
                                        AED 4.4M
                                    </div>
                                    <div style={{ color: '#6B7280', fontFamily: 'Glancyr', fontSize: '12px' }}>
                                        STARTING PRICE
                                    </div>
                                </div>
                            </div>
                            
                            {/* Payment Plan */}
                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <div className="me-3">
                                    <img src="/assets/img/Calendar.png" alt="Payment Plan Icon" width="28" height="28" />
                                </div>
                                <div className="text-start">
                                    <div style={{ color: '#1F2937', fontFamily: 'Agatho', fontSize: '18px', fontWeight: '500' }}>
                                        60/40
                                    </div>
                                    <div style={{ color: '#6B7280', fontFamily: 'Glancyr', fontSize: '12px' }}>
                                        PAYMENT PLAN
                                    </div>
                                </div>
                            </div>
                            
                            {/* Handover */}
                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <div className="me-3">
                                    <img src="/assets/img/Key features.png" alt="Handover Icon" width="28" height="28" />
                                </div>
                                <div className="text-start">
                                    <div style={{ color: '#1F2937', fontFamily: 'Agatho', fontSize: '18px', fontWeight: '500' }}>
                                        Q4 2028
                                    </div>
                                    <div style={{ color: '#6B7280', fontFamily: 'Glancyr', fontSize: '12px' }}>
                                        HANDOVER
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Property Description */}
                        <p style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '15px',
                            color: '#1F2937',
                            lineHeight: '1.6',
                            marginBottom: '25px'
                        }}>
                            Nad Al Sheba Gardens Phase 7 Is The Latest Launch By Meraas, Offering A Stylish Mix Of 3-Bedroom Townhouses And 4 To 7-Bedroom Villas In Dubai. This New Community Blends Elegance, Peace, And Privacy In A Gated Setting, With Lush Green Surroundings And A Swimmable Lagoon At Its Heart, It's Designed To Give Families A Calm And Beautiful Place To Live.
                        </p>
                        
                        {/* Download Button */}
                        <button 
                            className="btn w-100 d-flex justify-content-center align-items-center" 
                            style={{
                                fontFamily: 'Glancyr',
                                backgroundColor: 'transparent',
                                color: '#1F2937',
                                padding: '12px',
                                fontSize: '16px',
                                border: '1px solid #e8e0d3',
                                borderRadius: '30px'
                            }}
                        >
                            Download PDF Brochure
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-2">
                                <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    
                    {/* Right side - Property Image */}
                    <div className="col-md-6 p-0">
                        <img 
                            src="/assets/img/luxury-property.png" 
                            alt="Nad Al Sheba Gardens Phase 7" 
                            className="img-fluid h-100 w-100"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
