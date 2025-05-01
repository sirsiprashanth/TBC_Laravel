import React from 'react';
import { Link } from '@inertiajs/react';

export default function RentPropertyDetails() {
    return (
        <div className="property-details py-5" style={{ backgroundColor: '#FFF0DE' }}>
            <div className="container">
                <div className="row">
                    {/* Left Column - Property Information */}
                    <div className="col-md-8">
                        <h1 style={{ 
                            fontFamily: 'Agatho', 
                            fontSize: '40px',
                            color: '#1F2937',
                            fontWeight: '500',
                            lineHeight: '1.2',
                            marginBottom: '5px'
                        }}>
                            Damac Hills 1,<br />
                            Calero Cluster ADR
                        </h1>
                        
                        <p style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '14px',
                            color: '#4B5563',
                            marginBottom: '20px'
                        }}>
                            DAMAC HILLS, DUBAI, UAE
                        </p>
                        
                        <div className="d-flex mb-4">
                            <div className="me-4 d-flex align-items-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                    <path d="M3 5V19M3 16H21V19M3 8H7M15 8H21M21 5V19M7 8V16M15 8V16M7 12H15" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span style={{ fontFamily: 'Glancyr', fontSize: '14px' }}>4 Bedrooms</span>
                            </div>
                            <div className="me-4 d-flex align-items-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                    <path d="M4 12H20M4 12V19H20V12M4 12V5H20V12M8 5V7M8 12V19M16 5V7M16 12V19" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span style={{ fontFamily: 'Glancyr', fontSize: '14px' }}>3 Bathrooms</span>
                            </div>
                        </div>
                        
                        <h2 style={{ 
                            fontFamily: 'Agatho', 
                            fontSize: '32px',
                            color: '#1F2937',
                            fontWeight: '500',
                            marginBottom: '30px',
                            borderBottom: '1px solid #E5E7EB',
                            paddingBottom: '15px'
                        }}>
                            AED. 6,000,000
                        </h2>
                        
                        <h3 style={{ 
                            fontFamily: 'Agatho', 
                            fontSize: '24px',
                            color: '#1F2937',
                            fontWeight: '500',
                            marginBottom: '20px'
                        }}>
                            New Luxurious 3 Bedroom Townhouse<br />
                            With Stunning Golf Course View
                        </h3>
                        
                        <p style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '16px',
                            color: '#4B5563',
                            marginBottom: '15px'
                        }}>
                            The Boros Collection is Proud To Present This Beautiful 3 Bedroom Townhouse Located in The Prestigious Calero Cluster Of Damac Hills 1.
                        </p>
                        
                        <h4 style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '18px',
                            color: '#1F2937',
                            fontWeight: '600',
                            marginTop: '25px',
                            marginBottom: '15px'
                        }}>
                            Property Features:
                        </h4>
                        
                        <ul style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '16px',
                            color: '#4B5563',
                            paddingLeft: '20px',
                            marginBottom: '25px'
                        }}>
                            <li>3 Bedrooms</li>
                            <li>3 Bathrooms</li>
                            <li>Breathtaking Golf Course View</li>
                            <li>Spacious Open Plan Living Area</li>
                            <li>Modern Kitchen With High-End Appliances</li>
                            <li>Spacious Terrace</li>
                            <li>Built-In Wardrobes</li>
                            <li>Luxury Finishes With Natural Materials</li>
                        </ul>
                        
                        <p style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '16px',
                            color: '#4B5563',
                            marginBottom: '25px'
                        }}>
                            Located In One Of The Most Sought-After Communities In Dubai, This Residence Offers A Serene And Comfortable Living Environment With Easy Access To World-Class Amenities, Including The Trump International Golf Club, Schools, And Retail Outlets.
                        </p>
                        
                        <h4 style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '18px',
                            color: '#1F2937',
                            fontWeight: '600',
                            marginTop: '25px',
                            marginBottom: '15px'
                        }}>
                            Amenities:
                        </h4>
                        
                        <ul style={{ 
                            fontFamily: 'Glancyr', 
                            fontSize: '16px',
                            color: '#4B5563',
                            paddingLeft: '20px',
                            marginBottom: '25px',
                            columns: '1'
                        }}>
                            <li>Golf Course Access</li>
                            <li>Swimming Pool</li>
                            <li>Fitness Center</li>
                            <li>Barbecue Area</li>
                            <li>Kids Play Area</li>
                            <li>Secure Gated Community</li>
                            <li>Covered Parking</li>
                            <li>Retail And Dining Options</li>
                            <li>Central A/C & Heating</li>
                            <li>Maid's Room</li>
                            <li>Balcony</li>
                            <li>Shared Pool</li>
                            <li>Shared Garden</li>
                            <li>View Of Golf Course</li>
                        </ul>
                    </div>
                    
                    {/* Right Column - Agent Info and Map */}
                    <div className="col-md-4">
                        <div style={{ 
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            padding: '25px',
                            backgroundColor: '#FFF0DE',
                            marginBottom: '30px'
                        }}>
                            <div className="d-flex justify-content-between mb-4">
                                <div>
                                    <h4 style={{ 
                                        fontFamily: 'Glancyr', 
                                        fontSize: '18px',
                                        color: '#1F2937',
                                        fontWeight: '600',
                                        marginBottom: '5px',
                                        textTransform: 'uppercase'
                                    }}>
                                        Adriano Borges
                                    </h4>
                                    <p style={{ 
                                        fontFamily: 'Glancyr', 
                                        fontSize: '14px',
                                        color: '#4B5563',
                                        marginBottom: '10px',
                                        textTransform: 'uppercase'
                                    }}>
                                        Property Consultant
                                    </p>
                                    <p style={{ 
                                        fontFamily: 'Glancyr', 
                                        fontSize: '14px',
                                        color: '#F97316'
                                    }}>
                                        adrianoborges@tlc.com
                                    </p>
                                </div>
                                <div>
                                    <img 
                                        src="/assets/img/agent.png" 
                                        alt="Adriano Borges" 
                                        className="rounded-circle"
                                        style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            
                            <div className="d-flex justify-content-center mb-4">
                                <a href="#" className="mx-2">
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '50%',
                                        border: '1px solid #E5E7EB',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 8.25C11.0054 8.25 10.0516 8.64509 9.34835 9.34835C8.64509 10.0516 8.25 11.0054 8.25 12C8.25 12.9946 8.64509 13.9484 9.34835 14.6517C10.0516 15.3549 11.0054 15.75 12 15.75C12.9946 15.75 13.9484 15.3549 14.6517 14.6517C15.3549 13.9484 15.75 12.9946 15.75 12C15.75 11.0054 15.3549 10.0516 14.6517 9.34835C13.9484 8.64509 12.9946 8.25 12 8.25Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16.5 3.75H7.5C5.42893 3.75 3.75 5.42893 3.75 7.5V16.5C3.75 18.5711 5.42893 20.25 7.5 20.25H16.5C18.5711 20.25 20.25 18.5711 20.25 16.5V7.5C20.25 5.42893 18.5711 3.75 16.5 3.75Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M17.25 8.25C17.6642 8.25 18 7.91421 18 7.5C18 7.08579 17.6642 6.75 17.25 6.75C16.8358 6.75 16.5 7.08579 16.5 7.5C16.5 7.91421 16.8358 8.25 17.25 8.25Z" fill="#1F2937"/>
                                        </svg>
                                    </div>
                                </a>
                                <a href="#" className="mx-2">
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '50%',
                                        border: '1px solid #E5E7EB',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M6 9H2V21H6V9Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </a>
                                <a href="#" className="mx-2">
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '50%',
                                        border: '1px solid #E5E7EB',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </a>
                            </div>
                            
                            <a 
                                href="#" 
                                className="btn d-block mb-3"
                                style={{
                                    backgroundColor: '#1A202C',
                                    color: 'white',
                                    borderRadius: '5px',
                                    padding: '12px 25px',
                                    fontFamily: 'Glancyr',
                                    fontSize: '14px',
                                    textAlign: 'center'
                                }}
                            >
                                Book A Viewing
                            </a>
                            
                            <a 
                                href="#" 
                                className="btn d-block"
                                style={{
                                    backgroundColor: '#F97316',
                                    color: 'white',
                                    borderRadius: '5px',
                                    padding: '12px 25px',
                                    fontFamily: 'Glancyr',
                                    fontSize: '14px',
                                    textAlign: 'center'
                                }}
                            >
                                DM Our Agent
                            </a>
                        </div>
                        
                        {/* Map */}
                        <div style={{ 
                            borderRadius: '8px',
                            overflow: 'hidden',
                            height: '300px'
                        }}>
                            <img 
                                src="/assets/img/map.png" 
                                alt="Property Location Map" 
                                className="img-fluid w-100 h-100"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}