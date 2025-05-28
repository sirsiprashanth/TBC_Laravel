import React from 'react';

export default function PropertyShowcase() {
    return (
        <div className="container-fluid py-5" style={{ 
            background: '#FFF0DE'
        }}>
            <div className="container p-0">
                <div 
                    className="property-image-container" 
                    style={{
                        padding: '20px',
                        border: '1px solid #e8e0d3',
                        backgroundColor: '#FFF0DE'
                    }}
                >
                    <img 
                        src="/assets/img/luxury-property.png" 
                        alt="Luxury Dubai Property" 
                        className="img-fluid w-100"
                        style={{
                            boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                            maxHeight: '600px',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
