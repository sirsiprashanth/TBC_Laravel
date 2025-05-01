import React from 'react';

export default function CommunityOverview() {
    return (
        <div className="community-overview-section py-5" style={{ 
            backgroundColor: '#FFF0DE'
        }}>
            <div className="container">
                <div className="row g-0">
                    {/* Left side - Community Image */}
                    <div className="col-md-6 p-0">
                        <img 
                            src="/assets/img/greenvilla.png" 
                            alt="Nad Al Sheba Gardens Aerial View" 
                            className="img-fluid w-100"
                            style={{
                                objectFit: 'cover',
                                height: '100%'
                            }}
                        />
                    </div>
                    
                    {/* Right side - Community Information */}
                    <div className="col-md-6 p-4 d-flex flex-column justify-content-between" style={{ 
                        backgroundColor: '#FFF0DE'
                    }}>
                        {/* Community Title */}
                        <div>
                            <h2 style={{ 
                                fontFamily: 'Agatho', 
                                fontSize: '28px',
                                color: '#1F2937',
                                fontWeight: '500',
                                marginBottom: '20px'
                            }}>
                                Nad Al Sheba Gardens
                            </h2>
                            
                            {/* First Paragraph - Property Features */}
                            <p style={{ 
                                fontFamily: 'Glancyr', 
                                fontSize: '15px',
                                color: '#1F2937',
                                lineHeight: '1.6',
                                marginBottom: '20px'
                            }}>
                                Inside, The Townhouses Have Open, Airy Layouts Perfect For Comfortable Family Living. The Villas Are Even More Spacious, With High Ceilings And Elegant Designs. Larger Villas Offer Premium Finishes, Smart Layouts, And A Perfect Mix Of Private And Shared Spaces. Every Home Shows Great Attention To Detail, Making It Both Practical And Beautiful.
                            </p>
                            
                            {/* Second Paragraph - Community Amenities */}
                            <p style={{ 
                                fontFamily: 'Glancyr', 
                                fontSize: '15px',
                                color: '#1F2937',
                                lineHeight: '1.6',
                                marginBottom: '30px'
                            }}>
                                The Community Is Full Of Leisure And Lifestyle Amenities. Whether You Enjoy Yoga, Jogging, Swimming In Wave Pools, Or Letting Kids Play Outdoors - There's Something For Everyone. There Are Also Event Lawns, Amphitheatres For Community Events, Dog Parks, And Healthcare Facilities, Making This A Well-Rounded And Self-Sufficient Place To Live.
                            </p>
                        </div>
                        
                        {/* Request Button */}
                        <div>
                            <button 
                                className="btn w-100 d-flex justify-content-center align-items-center" 
                                style={{
                                    fontFamily: 'Glancyr',
                                    backgroundColor: 'transparent',
                                    color: '#1F2937',
                                    padding: '16px',
                                    fontSize: '16px',
                                    border: '1px solid #e8e0d3',
                                    borderRadius: '30px'
                                }}
                            >
                                Request Available Units & Prices
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-2">
                                    <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
