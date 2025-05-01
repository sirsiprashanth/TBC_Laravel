import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function OffPlanProjects() {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 3;
    
    // Sample data for properties
    const allProperties = [
        {
            id: 1,
            image: '/assets/img/property.png',
            developer: 'MERAAS PROPERTIES',
            name: 'Nad Al Sheba Gardens Phase 7',
            description: 'Nad Al Sheba Gardens Phase 7 Jumeirah Village Circle Enquire Now Nad Al Sheba Gardens',
            estimatedTime: 'MARCH 2026'
        },
        {
            id: 2,
            image: '/assets/img/property.png',
            developer: 'MERAAS PROPERTIES',
            name: 'Nad Al Sheba Gardens Phase 7',
            description: 'Nad Al Sheba Gardens Phase 7 Jumeirah Village Circle Enquire Now Nad Al Sheba Gardens',
            estimatedTime: 'MARCH 2026'
        },
        {
            id: 3,
            image: '/assets/img/property.png',
            developer: 'MERAAS PROPERTIES',
            name: 'Nad Al Sheba Gardens Phase 7',
            description: 'Nad Al Sheba Gardens Phase 7 Jumeirah Village Circle Enquire Now Nad Al Sheba Gardens',
            estimatedTime: 'MARCH 2026'
        },
        {
            id: 4,
            image: '/assets/img/property.png',
            developer: 'EMAAR PROPERTIES',
            name: 'Creek Vista Heights',
            description: 'Creek Vista Heights Dubai Creek Harbour Premium Waterfront Living With Breathtaking Views',
            estimatedTime: 'JUNE 2026'
        },
        {
            id: 5,
            image: '/assets/img/property.png',
            developer: 'DAMAC PROPERTIES',
            name: 'The Residences at DAMAC Hills',
            description: 'The Residences at DAMAC Hills Luxury Apartments Overlooking World-Class Golf Course',
            estimatedTime: 'DECEMBER 2025'
        },
        {
            id: 6,
            image: '/assets/img/property.png',
            developer: 'NAKHEEL',
            name: 'Palm Tower Residences',
            description: 'Palm Tower Residences Iconic Living on Palm Jumeirah with Panoramic Views of Dubai Coastline',
            estimatedTime: 'SEPTEMBER 2026'
        }
    ];
    
    // Calculate total pages
    const totalPages = Math.ceil(allProperties.length / propertiesPerPage);
    
    // Get current properties
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = allProperties.slice(indexOfFirstProperty, indexOfLastProperty);
    
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Next page
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="off-plan-projects py-5" style={{ backgroundColor: '#FFF0DE' }}>
            <div className="container">
                <div className="row">
                    {currentProperties.map(property => (
                        <div key={property.id} className="col-md-4 mb-4">
                            <div style={{ 
                                border: '1px solid #E5E7EB',
                                borderRadius: '5px',
                                backgroundColor: '#FFF0DE',
                                overflow: 'hidden',
                                height: '100%'
                            }}>
                                {/* Property Image with Developer Badge */}
                                <div className="position-relative" style={{ padding: '15px' }}>
                                    <img 
                                        src={property.image} 
                                        alt={property.name} 
                                        className="img-fluid"
                                        style={{ 
                                            width: '90%',
                                            height: '240px', 
                                            objectFit: 'cover',
                                            display: 'block',
                                            margin: '0 auto'
                                        }}
                                    />
                                    <div 
                                        className="position-absolute" 
                                        style={{ 
                                            top: '30px', 
                                            right: '10%',
                                            backgroundColor: '#F97316',
                                            color: 'white',
                                            padding: '5px 15px',
                                            fontSize: '12px',
                                            fontFamily: 'Glancyr',
                                            borderTopLeftRadius: '4px',
                                            borderBottomLeftRadius: '4px'
                                        }}
                                    >
                                        {property.developer}
                                    </div>
                                </div>
                                
                                {/* Property Details */}
                                <div className="p-4">
                                    <h3 style={{ 
                                        fontFamily: 'Agatho',
                                        fontSize: '20px',
                                        color: '#1F2937',
                                        fontWeight: '500',
                                        marginBottom: '10px'
                                    }}>
                                        {property.name}
                                    </h3>
                                    
                                    <p style={{ 
                                        fontFamily: 'Glancyr',
                                        fontSize: '14px',
                                        color: '#4B5563',
                                        marginBottom: '20px',
                                        lineHeight: '1.5'
                                    }}>
                                        {property.description}
                                    </p>
                                    
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <p style={{ 
                                                fontFamily: 'Glancyr',
                                                fontSize: '12px',
                                                margin: 0,
                                                textTransform: 'uppercase'
                                            }}>
                                                <span style={{ color: '#F7945F' }}>EST. TIME:</span> <span style={{ color: '#F7945F' }}>{property.estimatedTime}</span>
                                            </p>
                                            <p style={{ 
                                                fontFamily: 'Glancyr',
                                                fontSize: '14px',
                                                color: '#F7945F',
                                                fontWeight: '500',
                                                margin: 0,
                                                textTransform: 'uppercase'
                                            }}>
                                                
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <Link 
                                        href="#" 
                                        className="btn d-flex align-items-center justify-content-center"
                                        style={{
                                            border: '1px solid #E5E7EB',
                                            backgroundColor: 'transparent',
                                            color: '#1F2937',
                                            borderRadius: '30px',
                                            padding: '10px 25px',
                                            fontFamily: 'Glancyr',
                                            fontSize: '14px',
                                            width: '100%'
                                        }}
                                    >
                                        <span>View Project</span>
                                        <svg className="ms-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Pagination */}
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="d-flex justify-content-center">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className="btn mx-1"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        padding: '0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontFamily: 'Glancyr',
                                        fontSize: '16px',
                                        backgroundColor: currentPage === index + 1 ? '#F97316' : 'transparent',
                                        color: currentPage === index + 1 ? 'white' : '#1F2937',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            
                            {/* Next button */}
                            <button
                                onClick={nextPage}
                                className="btn mx-1"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'Glancyr',
                                    fontSize: '16px',
                                    backgroundColor: 'transparent',
                                    color: '#1F2937',
                                    border: '1px solid #E5E7EB',
                                    cursor: 'pointer'
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
