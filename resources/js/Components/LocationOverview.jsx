import React from 'react';

export default function LocationOverview() {
    return (
        <div className="location-overview-section py-5" style={{ 
            backgroundColor: '#FFF0DE'
        }}>
            <div className="container">
                <div className="row g-0">
                    {/* Left side - Location Information */}
                    <div className="col-md-6 p-4 d-flex flex-column justify-content-center" style={{ 
                        backgroundColor: '#FFF0DE'
                    }}>
                        {/* Location Title */}
                        <h2 style={{ 
                            fontFamily: 'Agatho', 
                            fontSize: '24px',
                            color: '#1F2937',
                            fontWeight: '500',
                            marginBottom: '20px'
                        }}>
                            About Location
                        </h2>
                        
                        {/* First Paragraph - Location */}
                        <p style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '15px',
                            color: '#1F2937',
                            lineHeight: '1.6',
                            marginBottom: '20px'
                        }}>
                            Located in Nad Al Sheba, The Community Is Just A Short Drive From Downtown Dubai. It Offers A Quiet, Suburban Feel While Keeping You Close To The City's Main Attractions. Whether It's The Meydan Racetrack, Dubai International Airport, Or Major Roads - Everything Is Within Easy Reach, Making It Both A Peaceful Home And A Convenient Base.
                        </p>
                        
                        {/* Second Paragraph - Home Design */}
                        <p style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '15px',
                            color: '#1F2937',
                            lineHeight: '1.6',
                            marginBottom: '0'
                        }}>
                            The Homes Combine Modern Design With Natural Beauty. The Townhouses Come In G+1 And G+2 Layouts, Featuring Clean Lines And Stylish Bronze Screens. The Villas Are Designed In A Range Of Styles, All Fitting Beautifully Into The Overall Look Of The Neighbourhood. Each Home Is Crafted With Care, Offering Both Luxury And Privacy.
                        </p>
                    </div>
                    
                    {/* Right side - Property Image */}
                    <div className="col-md-6 p-0">
                        <img 
                            src="/assets/img/Luxury Villa.png" 
                            alt="Nad Al Sheba Luxury Villa" 
                            className="img-fluid w-100"
                            style={{
                                objectFit: 'cover',
                                height: '100%'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
