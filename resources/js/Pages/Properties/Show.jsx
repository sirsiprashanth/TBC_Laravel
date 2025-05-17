import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import SimilarPropertiesSection from '../../Components/SimilarPropertiesSection';
import TestimonialVideos from '../../Components/TestimonialVideos';
import PropertyContactForm from '../../Components/PropertyContactForm';
import { Link } from '@inertiajs/react';

export default function PropertyShow({ property, similarProperties }) {
    // Debug log to check if data is being received
    console.log('PropertyShow component mounted with:', { property, similarProperties });
    
    // Ensure property is defined
    if (!property) {
        console.error('Property is undefined');
        return <div>Property not found</div>;
    }
    
    // State for current main image
    const [mainImage, setMainImage] = useState(
        property.images && property.images.length > 0 
            ? property.images[0] 
            : '/assets/img/property.png'
    );
    
    // State for modals
    const [showViewingModal, setShowViewingModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    
    // Format amenities for display if they exist
    const amenitiesList = property.amenities
        ? (typeof property.amenities === 'string' ? JSON.parse(property.amenities) : property.amenities)
        : null;
    
    return (
        <>
            <Head title={`${property.property_name || 'Property Details'}`} />
            <div style={{borderColor: 'var(--bs-indigo)', background: 'rgb(255,241,222)'}}>
                <Navbar />
                
                {/* Property Gallery */}
                <div className="property-gallery py-4" style={{ backgroundColor: '#FFF0DE' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 mb-4">
                                <div style={{ 
                                    height: '500px', 
                                    borderRadius: '8px',
                                    overflow: 'hidden'
                                }}>
                                    <img 
                                        src={mainImage} 
                                        alt={property.property_name} 
                                        className="img-fluid w-100 h-100" 
                                        style={{ objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/assets/img/property.png';
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    {property.images && property.images.slice(0, 4).map((image, index) => (
                                        <div className="col-6 mb-4" key={index}>
                                            <div 
                                                style={{ 
                                                    height: '120px', 
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                    border: mainImage === image ? '2px solid #F97316' : 'none'
                                                }}
                                                onClick={() => setMainImage(image)}
                                            >
                                                <img 
                                                    src={image} 
                                                    alt={`Property view ${index + 1}`} 
                                                    className="img-fluid w-100 h-100" 
                                                    style={{ objectFit: 'cover' }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/assets/img/property.png';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {(!property.images || property.images.length === 0) && (
                                        <div className="col-12 text-center">
                                            <p style={{ fontFamily: 'Glancyr' }}>No additional images available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Property Details */}
                <div className="property-details py-5" style={{ backgroundColor: '#FFF0DE' }}>
                    <div className="container">
                        <div className="row">
                            {/* Left Column - Property Information */}
                            <div className="col-md-8">
                                <div className="d-flex align-items-center mb-3">
                                    <span 
                                        className="badge me-2" 
                                        style={{ 
                                            backgroundColor: '#F97316',
                                            color: 'white',
                                            padding: '5px 10px',
                                            fontFamily: 'Glancyr'
                                        }}
                                    >
                                        {property.property_type || 'Property'}
                                    </span>
                                    <span style={{ 
                                        fontFamily: 'Glancyr', 
                                        fontSize: '14px',
                                        color: '#4B5563'
                                    }}>
                                        Ref: {property.reference_number || 'N/A'}
                                    </span>
                                </div>
                                
                                <h1 style={{ 
                                    fontFamily: 'Agatho', 
                                    fontSize: '40px',
                                    color: '#1F2937',
                                    fontWeight: '500',
                                    lineHeight: '1.2',
                                    marginBottom: '5px'
                                }}>
                                    {property.property_name || 'Property Name Not Available'}
                                </h1>
                                
                                <p style={{ 
                                    fontFamily: 'Glancyr', 
                                    fontSize: '14px',
                                    color: '#4B5563',
                                    marginBottom: '20px',
                                    textTransform: 'uppercase'
                                }}>
                                    {property.full_location || property.community || 'Location Not Available'}
                                </p>
                                
                                <div className="d-flex mb-4">
                                    {property.bedrooms !== null && (
                                        <div className="me-4 d-flex align-items-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                                <path d="M3 5V19M3 16H21V19M3 8H7M15 8H21M21 5V19M7 8V16M15 8V16M7 12H15" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span style={{ fontFamily: 'Glancyr', fontSize: '14px' }}>
                                                {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {property.bathrooms !== null && (
                                        <div className="me-4 d-flex align-items-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                                <path d="M4 12H20M4 12V19H20V12M4 12V5H20V12M8 5V7M8 12V19M16 5V7M16 12V19" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span style={{ fontFamily: 'Glancyr', fontSize: '14px' }}>
                                                {property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {property.built_up_area && (
                                        <div className="d-flex align-items-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                                <path d="M4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V4C20 3.46957 19.7893 2.96086 19.4142 2.58579C19.0391 2.21071 18.5304 2 18 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span style={{ fontFamily: 'Glancyr', fontSize: '14px' }}>
                                                {typeof property.built_up_area === 'number' 
                                                    ? property.built_up_area.toLocaleString() 
                                                    : property.built_up_area} sqft
                                            </span>
                                        </div>
                                    )}
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
                                    {property.formatted_price || `AED ${typeof property.price === 'number' ? property.price.toLocaleString() : property.price}`}
                                </h2>
                                
                                <h3 style={{ 
                                    fontFamily: 'Agatho', 
                                    fontSize: '24px',
                                    color: '#1F2937',
                                    fontWeight: '500',
                                    marginBottom: '20px'
                                }}>
                                    {property.marketing_title || property.property_name || 'Property Details'}
                                </h3>
                                
                                <div style={{ 
                                    fontFamily: 'Glancyr', 
                                    fontSize: '16px',
                                    color: '#4B5563',
                                    marginBottom: '15px',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {property.description || 'No description available for this property.'}
                                </div>
                                
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
                                    {property.bedrooms && (
                                        <li>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</li>
                                    )}
                                    {property.bathrooms && (
                                        <li>{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</li>
                                    )}
                                    {property.primary_view && (
                                        <li>{property.primary_view} View</li>
                                    )}
                                    {property.built_up_area && (
                                        <li>Built-up Area: {typeof property.built_up_area === 'number' 
                                                ? property.built_up_area.toLocaleString() 
                                                : property.built_up_area} sqft</li>
                                    )}
                                    {property.plot_area && (
                                        <li>Plot Area: {typeof property.plot_area === 'number' 
                                                ? property.plot_area.toLocaleString() 
                                                : property.plot_area} sqft</li>
                                    )}
                                    {property.parking && (
                                        <li>Parking: {property.parking}</li>
                                    )}
                                    {property.unit_floor && (
                                        <li>Floor: {property.unit_floor}</li>
                                    )}
                                </ul>
                                
                                {amenitiesList && amenitiesList.length > 0 && (
                                    <>
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
                                            columns: '2'
                                        }}>
                                            {amenitiesList.map((amenity, index) => (
                                                <li key={index}>{amenity}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
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
                                                {property.agent_name || 'Boros Real Estate'}
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
                                                {property.agent_contact || 'info@boros.com'}
                                            </p>
                                        </div>
                                        <div>
                                            <img 
                                                src="/assets/img/agent.png" 
                                                alt={property.agent_name || 'Boros Agent'} 
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
                                        <a href={`tel:${property.agent_contact}`} className="mx-2">
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
                                    
                                    <button 
                                        onClick={() => {
                                            console.log('Book a viewing clicked');
                                            setShowViewingModal(true);
                                        }}
                                        className="btn d-block mb-3"
                                        style={{
                                            backgroundColor: '#1A202C',
                                            color: 'white',
                                            borderRadius: '5px',
                                            padding: '12px 25px',
                                            fontFamily: 'Glancyr',
                                            fontSize: '14px',
                                            textAlign: 'center',
                                            border: 'none',
                                            width: '100%'
                                        }}
                                    >
                                        Book A Viewing
                                    </button>
                                    
                                    <button 
                                        onClick={() => {
                                            console.log('DM agent clicked');
                                            setShowContactModal(true);
                                        }}
                                        className="btn d-block"
                                        style={{
                                            backgroundColor: '#F97316',
                                            color: 'white',
                                            borderRadius: '5px',
                                            padding: '12px 25px',
                                            fontFamily: 'Glancyr',
                                            fontSize: '14px',
                                            textAlign: 'center',
                                            border: 'none',
                                            width: '100%'
                                        }}
                                    >
                                        DM Our Agent
                                    </button>
                                </div>
                                
                                {/* Map */}
                                {(property.latitude && property.longitude) ? (
                                    <div style={{ 
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        height: '300px'
                                    }}>
                                        <img 
                                            src={`https://maps.googleapis.com/maps/api/staticmap?center=${property.latitude},${property.longitude}&zoom=15&size=400x300&markers=color:red%7C${property.latitude},${property.longitude}&key=YOUR_API_KEY`} 
                                            alt="Property Location Map" 
                                            className="img-fluid w-100 h-100"
                                            style={{ objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/assets/img/map.png';
                                            }}
                                        />
                                    </div>
                                ) : (
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
                                )}
                            </div>
                        </div>
                        
                        {/* Back to listings button */}
                        <div className="row mt-4">
                            <div className="col-12">
                                <Link 
                                    href={property.is_rental ? "/rent" : "/sell"}
                                    className="btn"
                                    style={{
                                        backgroundColor: '#F97316',
                                        color: 'white',
                                        borderRadius: '5px',
                                        padding: '12px 25px',
                                        fontFamily: 'Glancyr',
                                        fontSize: '14px'
                                    }}
                                >
                                    &larr; Back to Listings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Spacer */}
                <div style={{ height: '60px' }}></div>
                
                {/* Similar Properties */}
                {similarProperties && similarProperties.length > 0 && (
                    <>
                        <SimilarPropertiesSection />
                        <div className="similar-properties py-5" style={{ backgroundColor: '#FFF0DE' }}>
                            <div className="container">
                                <div className="row">
                                    {similarProperties.map((similar, index) => (
                                        <div className="col-md-4 mb-4" key={index}>
                                            <div className="card h-100 border-0 shadow-sm">
                                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                                    <img 
                                                        src={
                                                            similar.images && Array.isArray(similar.images) && similar.images.length > 0
                                                                ? similar.images[0]
                                                                : '/assets/img/property.png'
                                                        } 
                                                        className="card-img-top"
                                                        alt={similar.property_name}
                                                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = '/assets/img/property.png';
                                                        }}
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ fontFamily: 'Agatho', fontSize: '18px' }}>
                                                        {similar.property_name}
                                                    </h5>
                                                    <p className="card-text" style={{ fontFamily: 'Agatho', fontSize: '20px', fontWeight: 'bold', color: '#F97316' }}>
                                                        {similar.formatted_price || `AED ${typeof similar.price === 'number' ? similar.price.toLocaleString() : similar.price}`}
                                                    </p>
                                                    <div className="d-flex justify-content-between mt-3">
                                                        <div className="d-flex">
                                                            {similar.bedrooms !== null && (
                                                                <div className="me-3">
                                                                    <small className="text-muted" style={{ fontFamily: 'Glancyr' }}>
                                                                        <i className="bi bi-door-closed me-1"></i> {similar.bedrooms} Bed
                                                                    </small>
                                                                </div>
                                                            )}
                                                            {similar.bathrooms !== null && (
                                                                <div>
                                                                    <small className="text-muted" style={{ fontFamily: 'Glancyr' }}>
                                                                        <i className="bi bi-water me-1"></i> {similar.bathrooms} Bath
                                                                    </small>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Link 
                                                        href={`/properties/${similar.id}`}
                                                        className="btn btn-sm btn-outline-dark mt-3 w-100"
                                                        style={{ fontFamily: 'Glancyr' }}
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                
                <TestimonialVideos />
                <Footer />
            </div>
            
            {/* Contact Modals */}
            <PropertyContactForm 
                show={showViewingModal}
                onClose={() => setShowViewingModal(false)}
                property={property}
                type="viewing"
            />
            
            <PropertyContactForm 
                show={showContactModal}
                onClose={() => setShowContactModal(false)}
                property={property}
                type="contact"
            />
        </>
    );
}