import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Show({ property }) {
    return (
        <>
            <Head title={`Property: ${property.property_name}`} />
            <div style={{background: 'rgb(255,241,222)', minHeight: '100vh'}}>
                <Navbar />
                
                <div className="container py-5">
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h1 style={{ 
                                    fontFamily: 'Agatho', 
                                    fontSize: '36px',
                                    color: '#232A40',
                                    margin: 0
                                }}>
                                    Property Details
                                </h1>
                                <div>
                                    <Link 
                                        href={route('admin.properties.index')} 
                                        className="btn btn-outline-secondary me-2" 
                                        style={{ fontFamily: 'Glancyr' }}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i> Back to List
                                    </Link>
                                    <Link 
                                        href={route('admin.properties.edit', property.id)} 
                                        className="btn btn-primary" 
                                        style={{ 
                                            backgroundColor: '#F97316',
                                            borderColor: '#F97316',
                                            fontFamily: 'Glancyr',
                                        }}
                                    >
                                        <i className="bi bi-pencil me-2"></i> Edit Property
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="card" style={{ 
                                border: '1px solid rgba(0,0,0,0.1)', 
                                borderRadius: '10px',
                                padding: '0px',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                overflow: 'hidden'
                            }}>
                                <div className="row g-0">
                                    <div className="col-md-5">
                                        <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
                                            {property.images && property.images.length > 0 ? (
                                                <img 
                                                    src={property.images[0]} 
                                                    alt={property.property_name} 
                                                    className="img-fluid w-100 h-100"
                                                    style={{ objectFit: 'cover' }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/assets/img/property.png';
                                                    }}
                                                />
                                            ) : (
                                                <img 
                                                    src="/assets/img/property.png" 
                                                    alt={property.property_name} 
                                                    className="img-fluid w-100 h-100"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            )}
                                            
                                            <div style={{ 
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                display: 'flex',
                                                gap: '5px'
                                            }}>
                                                {property.is_rental ? (
                                                    <span className="badge bg-info" style={{ fontFamily: 'Glancyr' }}>Rental</span>
                                                ) : (
                                                    <span className="badge bg-primary" style={{ fontFamily: 'Glancyr' }}>Sale</span>
                                                )}
                                                
                                                {property.featured && (
                                                    <span className="badge bg-warning text-dark" style={{ fontFamily: 'Glancyr' }}>Featured</span>
                                                )}
                                                
                                                {property.is_active ? (
                                                    <span className="badge bg-success" style={{ fontFamily: 'Glancyr' }}>Active</span>
                                                ) : (
                                                    <span className="badge bg-danger" style={{ fontFamily: 'Glancyr' }}>Inactive</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body" style={{ padding: '25px' }}>
                                            <h2 style={{ 
                                                fontFamily: 'Agatho', 
                                                fontSize: '28px',
                                                color: '#232A40',
                                                marginBottom: '5px'
                                            }}>
                                                {property.property_name}
                                            </h2>
                                            
                                            <p className="text-muted mb-2" style={{ fontFamily: 'Glancyr' }}>
                                                Ref: {property.reference_number}
                                            </p>
                                            
                                            <h3 style={{ 
                                                fontFamily: 'Agatho', 
                                                fontSize: '24px',
                                                color: '#F97316',
                                                marginBottom: '20px',
                                                marginTop: '15px'
                                            }}>
                                                {property.formatted_price || `${property.currency} ${property.price.toLocaleString()}`}
                                                {property.is_rental && <span className="fs-6 ms-1" style={{ color: '#6c757d' }}>/year</span>}
                                            </h3>
                                            
                                            <div className="row mb-4">
                                                <div className="col-4 text-center">
                                                    <div style={{ 
                                                        backgroundColor: '#f8f9fa', 
                                                        padding: '10px', 
                                                        borderRadius: '8px' 
                                                    }}>
                                                        <i className="bi bi-door-closed" style={{ fontSize: '18px' }}></i>
                                                        <p style={{ fontFamily: 'Glancyr', marginBottom: 0, marginTop: '5px' }}>
                                                            {property.bedrooms || 0} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-4 text-center">
                                                    <div style={{ 
                                                        backgroundColor: '#f8f9fa', 
                                                        padding: '10px', 
                                                        borderRadius: '8px' 
                                                    }}>
                                                        <i className="bi bi-droplet" style={{ fontSize: '18px' }}></i>
                                                        <p style={{ fontFamily: 'Glancyr', marginBottom: 0, marginTop: '5px' }}>
                                                            {property.bathrooms || 0} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-4 text-center">
                                                    <div style={{ 
                                                        backgroundColor: '#f8f9fa', 
                                                        padding: '10px', 
                                                        borderRadius: '8px' 
                                                    }}>
                                                        <i className="bi bi-rulers" style={{ fontSize: '18px' }}></i>
                                                        <p style={{ fontFamily: 'Glancyr', marginBottom: 0, marginTop: '5px' }}>
                                                            {property.built_up_area ? `${property.built_up_area} sqft` : 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th style={{ 
                                                            fontFamily: 'Glancyr', 
                                                            width: '150px',
                                                            verticalAlign: 'middle'
                                                        }}>Type</th>
                                                        <td style={{ fontFamily: 'Glancyr' }}>
                                                            {property.property_type || 'N/A'}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ 
                                                            fontFamily: 'Glancyr', 
                                                            width: '150px',
                                                            verticalAlign: 'middle'
                                                        }}>Location</th>
                                                        <td style={{ fontFamily: 'Glancyr' }}>
                                                            {[
                                                                property.community, 
                                                                property.sub_community,
                                                                property.district,
                                                                property.city,
                                                                property.country
                                                            ]
                                                            .filter(Boolean)
                                                            .join(', ') || 'N/A'}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ 
                                                            fontFamily: 'Glancyr', 
                                                            width: '150px',
                                                            verticalAlign: 'middle'
                                                        }}>Status</th>
                                                        <td style={{ fontFamily: 'Glancyr' }}>
                                                            {property.status || 'N/A'}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ 
                                                            fontFamily: 'Glancyr', 
                                                            width: '150px',
                                                            verticalAlign: 'middle'
                                                        }}>Agent</th>
                                                        <td style={{ fontFamily: 'Glancyr' }}>
                                                            {property.agent_name || 'N/A'}
                                                            {property.agent_contact && (
                                                                <span className="ms-2 text-muted">({property.agent_contact})</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card-footer bg-white" style={{ padding: '20px' }}>
                                    <h4 style={{ 
                                        fontFamily: 'Agatho', 
                                        fontSize: '20px',
                                        color: '#232A40',
                                        marginBottom: '15px'
                                    }}>
                                        Description
                                    </h4>
                                    <div style={{ 
                                        fontFamily: 'Glancyr', 
                                        whiteSpace: 'pre-line',
                                        color: '#6c757d',
                                        fontSize: '14px',
                                        marginBottom: '20px'
                                    }}>
                                        {property.description || 'No description provided.'}
                                    </div>
                                    
                                    {property.images && property.images.length > 1 && (
                                        <>
                                            <h4 style={{ 
                                                fontFamily: 'Agatho', 
                                                fontSize: '20px',
                                                color: '#232A40',
                                                marginBottom: '15px',
                                                marginTop: '30px'
                                            }}>
                                                Images
                                            </h4>
                                            <div className="row g-3">
                                                {property.images.slice(1).map((image, index) => (
                                                    <div className="col-md-3" key={index}>
                                                        <img 
                                                            src={image} 
                                                            alt={`${property.property_name} - Image ${index + 2}`} 
                                                            className="img-fluid"
                                                            style={{ 
                                                                width: '100%', 
                                                                height: '150px', 
                                                                objectFit: 'cover',
                                                                borderRadius: '8px'
                                                            }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = '/assets/img/property.png';
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
}