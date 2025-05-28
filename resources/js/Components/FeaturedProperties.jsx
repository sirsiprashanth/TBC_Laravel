import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function FeaturedProperties({ propertiesData = { properties: [], count: 0 } }) {
    // Extract properties and count from props with defaults
    const { properties: initialProperties = [], count = 0 } = propertiesData;

    // State for loading and error
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // State for properties
    const [properties, setProperties] = useState(initialProperties);

    // Property type filter
    const [activeFilter, setActiveFilter] = useState('All');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // 2 rows of 3 properties

    // Apply filter when changed
    const applyFilter = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1); // Reset to first page when filter changes

        if (filter === 'All') {
            setProperties(initialProperties);
        } else {
            const filtered = initialProperties.filter(property =>
                property.unitType === filter
            );
            setProperties(filtered);
        }
    };

    // Initialize properties from props when they change
    useEffect(() => {
        setProperties(initialProperties);
    }, [initialProperties]);
    
    // Get current properties based on pagination
    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
    
    // Calculate total pages
    const totalPages = Math.ceil(properties.length / itemsPerPage);
    
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Function to format the property details for download
    const formatPropertyDetails = (property) => {
        return `
========================================================
             BOROS EXCLUSIVE PROPERTY
========================================================

PROPERTY: ${property.name}
REF: ${property.reference}

PRICE: ${property.price}
LOCATION: ${property.location}

DETAILS:
• ${property.bedrooms} Bedrooms
• ${property.bathrooms} Bathrooms
• ${property.builtupArea} Built-up Area
• Property Type: ${property.unitType}

DESCRIPTION:
${property.description}

--------------------------------------------------------
Contact BOROS Real Estate for more information:
Email: info@boros.com
Phone: +971 4 123 4567
Website: www.boros.com
========================================================
        `;
    };
    
    // Function to download a single property's details
    const downloadPropertyDetails = (property) => {
        const propertyDetails = formatPropertyDetails(property);
        
        // Create a blob with the text
        const blob = new Blob([propertyDetails], { type: 'text/plain' });
        
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${property.reference} - ${property.name}.txt`;
        
        // Append to the document and trigger download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };
    
    
    // This is kept for reference but no longer used since we now get properties from the backend
    const fallbackProperties = [];

    return (
        <div className="property-section py-5" style={{ backgroundColor: '#FFF0DE' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-5">
                        <div className="header-section d-md-flex align-items-center justify-content-between mb-5">
                            <h2 style={{ fontFamily: 'Agatho', fontSize: '32px', marginBottom: '0' }}>Featured Properties</h2>
                            <div className="d-flex align-items-center">
                                <div className="search-sort-filters me-3">
                                    <button
                                        className={`btn btn-sm me-2 ${activeFilter === 'All' ? 'btn-dark' : 'btn-outline-dark'}`}
                                        onClick={() => applyFilter('All')}
                                    >
                                        All
                                    </button>
                                    <button
                                        className={`btn btn-sm me-2 ${activeFilter === 'Villa' ? 'btn-dark' : 'btn-outline-dark'}`}
                                        onClick={() => applyFilter('Villa')}
                                    >
                                        Villa
                                    </button>
                                    <button
                                        className={`btn btn-sm me-2 ${activeFilter === 'Apartment' ? 'btn-dark' : 'btn-outline-dark'}`}
                                        onClick={() => applyFilter('Apartment')}
                                    >
                                        Apartment
                                    </button>
                                    <button
                                        className={`btn btn-sm me-2 ${activeFilter === 'Townhouse' ? 'btn-dark' : 'btn-outline-dark'}`}
                                        onClick={() => applyFilter('Townhouse')}
                                    >
                                        Townhouse
                                    </button>
                                    <button
                                        className={`btn btn-sm ${activeFilter === 'Penthouse' ? 'btn-dark' : 'btn-outline-dark'}`}
                                        onClick={() => applyFilter('Penthouse')}
                                    >
                                        Penthouse
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="row">
                        <div className="col-12 text-center py-5">
                            <div className="spinner-border" style={{ color: '#F7945F' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3" style={{ fontFamily: 'Glancyr' }}>Loading properties...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="row">
                        <div className="col-12 text-center py-5">
                            <div className="alert alert-warning" role="alert" style={{ backgroundColor: '#FFF0DE', borderColor: '#F7945F', color: '#1F2937' }}>
                                {error}
                                <p className="mt-2"><small>Note: Currently using demo properties while the Goyzer API integration is being finalized. The system will display our premium listings soon.</small></p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="row">
                            {currentProperties.map((property) => (
                                <div key={property.id} className="col-md-4 mb-4">
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
                                                    e.target.src = '/assets/img/property.png'; // Fallback image if the API image fails to load
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
                                            <p className="card-text" style={{ fontFamily: 'Agatho', fontSize: '20px', fontWeight: 'bold', color: '#F7945F' }}>{property.price}</p>
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
                                            
                                            <div className="d-flex mt-3">
                                                <Link
                                                    href={`/properties/${property.id}`}
                                                    className="btn btn-sm btn-outline-dark me-2"
                                                    style={{
                                                        fontFamily: 'Glancyr',
                                                        flex: 1
                                                    }}
                                                >
                                                    View Details
                                                </Link>
                                                <button 
                                                    onClick={() => downloadPropertyDetails(property)}
                                                    className="btn btn-sm btn-primary"
                                                    style={{ 
                                                        fontFamily: 'Glancyr',
                                                        flex: 1,
                                                        backgroundColor: '#F7945F',
                                                        borderColor: '#F7945F'
                                                    }}
                                                >
                                                    <i className="bi bi-download me-1"></i> Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="row mt-4">
                                <div className="col-12 d-flex justify-content-center">
                                    <nav aria-label="Property pagination">
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button
                                                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                                    className="page-link"
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: '1px solid #e8e0d3',
                                                        color: '#1F2937',
                                                        fontFamily: 'Glancyr'
                                                    }}
                                                    aria-label="Previous"
                                                >
                                                    &laquo;
                                                </button>
                                            </li>
                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                    <button 
                                                        onClick={() => paginate(i + 1)} 
                                                        className="page-link"
                                                        style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            border: '1px solid #e8e0d3',
                                                            backgroundColor: currentPage === i + 1 ? '#F7945F' : '#FFF',
                                                            color: currentPage === i + 1 ? '#FFF' : '#1F2937',
                                                            fontFamily: 'Glancyr'
                                                        }}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
                                            <li className="page-item">
                                                <button
                                                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                                    className="page-link"
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: '1px solid #e8e0d3',
                                                        color: '#1F2937',
                                                        fontFamily: 'Glancyr'
                                                    }}
                                                    aria-label="Next"
                                                >
                                                    &raquo;
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
