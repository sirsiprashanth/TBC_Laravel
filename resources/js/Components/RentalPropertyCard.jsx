import React from 'react';
import { Link } from '@inertiajs/react';

export default function RentalPropertyCard({ property }) {
    return (
        <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: '#FFF', borderColor: '#e8e0d3' }}>
            <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                <img 
                    src={property.image} 
                    className="card-img-top" 
                    alt={property.name} 
                    style={{ 
                        height: '100%', 
                        width: '100%', 
                        objectFit: 'cover' 
                    }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/img/property.png'; // Fallback image
                    }}
                />
                {/* Property type badge */}
                {property.unitType && (
                    <span style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#F7945F',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontFamily: 'Glancyr'
                    }}>
                        {property.unitType}
                    </span>
                )}
            </div>
            <div className="card-body">
                <h5 className="card-title" style={{ fontFamily: 'Agatho', fontSize: '18px', color: '#1F2937' }}>{property.name}</h5>
                
                {/* Display both yearly and monthly prices for rentals */}
                <div className="mb-2">
                    <p className="card-text mb-0" style={{ fontFamily: 'Agatho', fontSize: '20px', fontWeight: 'bold', color: '#F7945F' }}>
                        {property.price}
                    </p>
                    {property.pricePerMonth && (
                        <p className="card-text" style={{ fontFamily: 'Glancyr', fontSize: '14px', color: '#4B5563' }}>
                            {property.pricePerMonth}
                        </p>
                    )}
                </div>
                
                {property.location && (
                    <p className="card-text" style={{ fontFamily: 'Glancyr', fontSize: '14px', color: '#6B7280' }}>
                        <i className="bi bi-geo-alt me-1"></i> {property.location}
                    </p>
                )}
                {property.reference && (
                    <p className="card-text mb-2" style={{ fontFamily: 'Glancyr', fontSize: '14px', color: '#6B7280' }}>
                        <span style={{ fontWeight: 'bold' }}>Ref:</span> {property.reference}
                    </p>
                )}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex">
                        <div className="me-3">
                            <small className="text-muted" style={{ fontFamily: 'Glancyr' }}>
                                <i className="bi bi-door-closed me-1"></i> {property.bedrooms} Bed
                            </small>
                        </div>
                        <div>
                            <small className="text-muted" style={{ fontFamily: 'Glancyr' }}>
                                <i className="bi bi-water me-1"></i> {property.bathrooms} Bath
                            </small>
                        </div>
                    </div>
                </div>
                
                {/* Amenities preview - just show first 2 */}
                {property.amenities && property.amenities.length > 0 && (
                    <div className="mt-2">
                        <small className="text-muted" style={{ fontFamily: 'Glancyr', fontSize: '12px' }}>
                            <i className="bi bi-check-circle me-1"></i> 
                            {property.amenities.slice(0, 2).join(', ')}
                            {property.amenities.length > 2 && '...'}
                        </small>
                    </div>
                )}
                
                <div className="d-flex mt-3">
                    <Link 
                        href={property.link} 
                        className="btn btn-sm btn-outline-dark me-2"
                        style={{ 
                            fontFamily: 'Glancyr',
                            flex: 1
                        }}
                    >
                        View Details
                    </Link>
                    <button 
                        className="btn btn-sm btn-primary"
                        style={{ 
                            fontFamily: 'Glancyr',
                            flex: 1,
                            backgroundColor: '#F7945F',
                            borderColor: '#F7945F'
                        }}
                    >
                        <i className="bi bi-calendar-check me-1"></i> Book a Viewing
                    </button>
                </div>
            </div>
        </div>
    );
}