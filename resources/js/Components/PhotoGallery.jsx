import React from 'react';

export default function PhotoGallery() {
    return (
        <div className="photo-gallery-section py-5" style={{ 
            backgroundColor: '#FFF0DE'
        }}>
            <div className="container">
                {/* Gallery Title */}
                <h2 style={{ 
                    fontFamily: 'Agatho', 
                    fontSize: '24px',
                    color: '#1F2937',
                    fontWeight: '500',
                    marginBottom: '20px'
                }}>
                    Photo Gallery
                </h2>
                
                <div className="row g-3">
                    {/* Left side - Large Featured Image */}
                    <div className="col-md-6">
                        <div className="featured-image">
                            <img 
                                src="/assets/img/Luxury Villa.png" 
                                alt="Featured Villa" 
                                className="img-fluid w-100"
                                style={{
                                    objectFit: 'cover',
                                    height: 'auto'
                                }}
                            />
                        </div>
                    </div>
                    
                    {/* Right side - Thumbnail Grid */}
                    <div className="col-md-6">
                        <div className="row g-3">
                            {/* First Thumbnail */}
                            <div className="col-6">
                                <img 
                                    src="/assets/img/Luxury Villa.png" 
                                    alt="Villa Thumbnail 1" 
                                    className="img-fluid w-100"
                                    style={{
                                        objectFit: 'cover',
                                        height: 'auto'
                                    }}
                                />
                            </div>
                            
                            {/* Second Thumbnail */}
                            <div className="col-6">
                                <img 
                                    src="/assets/img/Luxury Villa.png" 
                                    alt="Villa Thumbnail 2" 
                                    className="img-fluid w-100"
                                    style={{
                                        objectFit: 'cover',
                                        height: 'auto'
                                    }}
                                />
                            </div>
                            
                            {/* Third Thumbnail */}
                            <div className="col-6">
                                <img 
                                    src="/assets/img/Luxury Villa.png" 
                                    alt="Villa Thumbnail 3" 
                                    className="img-fluid w-100"
                                    style={{
                                        objectFit: 'cover',
                                        height: 'auto'
                                    }}
                                />
                            </div>
                            
                            {/* Fourth Thumbnail */}
                            <div className="col-6">
                                <img 
                                    src="/assets/img/Luxury Villa.png" 
                                    alt="Villa Thumbnail 4" 
                                    className="img-fluid w-100"
                                    style={{
                                        objectFit: 'cover',
                                        height: 'auto'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
