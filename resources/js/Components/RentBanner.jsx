import React from 'react';
import { Link } from '@inertiajs/react';

export default function RentBanner() {
    return (
        <div className="rent-banner py-5" style={{ backgroundColor: '#FFF0DE' }}>
            <div className="container">

                <div className="row">
                    <div className="col-md-12">
                        <div style={{ 
                            border: '1px solid #E8E0D3',
                            borderRadius: '5px',
                            padding: '15px',
                            backgroundColor: '#FFF0DE'
                        }}>
                            <div className="row g-3">
                                {/* Large main property image */}
                                <div className="col-md-6">
                                    <div style={{ height: '400px', overflow: 'hidden' }}>
                                        <img 
                                            src="/assets/img/property.png" 
                                            alt="Property Exterior" 
                                            className="img-fluid w-100 h-100"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>
                                
                                {/* Grid of smaller property images */}
                                <div className="col-md-6">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div style={{ height: '190px', overflow: 'hidden' }}>
                                                <img 
                                                    src="/assets/img/property.png" 
                                                    alt="Property View" 
                                                    className="img-fluid w-100 h-100"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{ height: '190px', overflow: 'hidden' }}>
                                                <img 
                                                    src="/assets/img/property.png" 
                                                    alt="Property Bathroom" 
                                                    className="img-fluid w-100 h-100"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{ height: '190px', overflow: 'hidden' }}>
                                                <img 
                                                    src="/assets/img/property.png" 
                                                    alt="Property Hallway" 
                                                    className="img-fluid w-100 h-100"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{ height: '190px', overflow: 'hidden' }}>
                                                <img 
                                                    src="/assets/img/property.png" 
                                                    alt="Property Bedroom" 
                                                    className="img-fluid w-100 h-100"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
