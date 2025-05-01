import React from 'react';
import { Link } from '@inertiajs/react';

export default function SimilarProperties() {
    const propertyList = [
        {
            id: 1,
            image: '/assets/img/property.png',
            name: 'Damac Hills 1, Calero Cluster ADR',
            price: 'AED. 6,000,000',
            bedrooms: '4 Bedrooms',
            bathrooms: '3 Bathrooms'
        },
        {
            id: 2,
            image: '/assets/img/property.png',
            name: 'Damac Hills 1, Calero Cluster ADR',
            price: 'AED. 6,000,000',
            bedrooms: '4 Bedrooms',
            bathrooms: '3 Bathrooms'
        },
        {
            id: 3,
            image: '/assets/img/property.png',
            name: 'Damac Hills 1, Calero Cluster ADR',
            price: 'AED. 6,000,000',
            bedrooms: '4 Bedrooms',
            bathrooms: '3 Bathrooms'
        }
    ];

    return (
        <div className="similar-properties-section py-5" style={{ backgroundColor: '#FFF0DE' }}>
            <div className="container">
                <div className="row">
                    {propertyList.map((property) => (
                        <div key={property.id} className="col-md-4 mb-4">
                            <div style={{ 
                                border: '1px solid #E5E7EB',
                                borderRadius: '0',
                                backgroundColor: '#FFF0DE',
                                height: '100%'
                            }}>
                                <div style={{ height: '300px', overflow: 'hidden' }}>
                                    <img 
                                        src={property.image} 
                                        alt={property.name} 
                                        className="img-fluid w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 style={{ 
                                        fontFamily: 'Agatho',
                                        fontSize: '18px',
                                        color: '#1F2937',
                                        fontWeight: '500',
                                        marginBottom: '8px'
                                    }}>
                                        {property.name}
                                    </h4>
                                    <p style={{ 
                                        fontFamily: 'Glancyr',
                                        fontSize: '16px',
                                        color: '#1F2937',
                                        fontWeight: '500',
                                        marginBottom: '16px'
                                    }}>
                                        {property.price}
                                    </p>
                                    <div className="d-flex mb-4">
                                        <div className="me-4 d-flex align-items-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                                <path d="M3 5V19M3 16H21V19M3 8H7M15 8H21M21 5V19M7 8V16M15 8V16M7 12H15" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span style={{ fontFamily: 'Glancyr', fontSize: '14px' }}>{property.bedrooms}</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                                <path d="M4 12H20M4 12V19H20V12M4 12V5H20V12M8 5V7M8 12V19M16 5V7M16 12V19" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span style={{ fontFamily: 'Glancyr', fontSize: '14px' }}>{property.bathrooms}</span>
                                        </div>
                                    </div>
                                    <Link 
                                        href="#" 
                                        className="btn d-flex align-items-center justify-content-center"
                                        style={{
                                            border: '1px solid #1F2937',
                                            backgroundColor: 'transparent',
                                            color: '#1F2937',
                                            borderRadius: '30px',
                                            padding: '10px 25px',
                                            fontFamily: 'Glancyr',
                                            fontSize: '14px',
                                            width: '100%'
                                        }}
                                    >
                                        <span>View Property</span>
                                        <svg className="ms-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
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
