import { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Index({ properties, filters, dropdown_options, error }) {
    console.log("Properties received:", properties); // Debug output
    
    // Get auth state from usePage
    const { auth } = usePage().props;
    
    // Initialize state with safe values
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [propertyType, setPropertyType] = useState(filters?.property_type || '');
    const [isRental, setIsRental] = useState(filters?.is_rental || '');
    
    // Show error message if provided
    const [errorMessage, setErrorMessage] = useState(error || '');
    
    // Initialize safe properties structure if missing
    const safeProperties = properties || { 
        data: [], 
        meta: { 
            current_page: 1, 
            per_page: 15, 
            from: 0, 
            to: 0, 
            total: 0, 
            last_page: 1 
        } 
    };
    
    // Ensure dropdown_options is defined
    const safeDropdownOptions = dropdown_options || { property_types: [] };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Update route with filters
        router.get(route('admin.properties.index'), {
            search: searchQuery || undefined,
            property_type: propertyType || undefined,
            is_rental: isRental || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleToggleActive = (id) => {
        router.put(route('admin.properties.toggle-active', id));
    };

    const handleToggleFeatured = (id) => {
        router.put(route('admin.properties.toggle-featured', id));
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this property?')) {
            router.delete(route('admin.properties.destroy', id));
        }
    };

    return (
        <>
            <Head title="Manage Properties" />
            <div style={{background: 'rgb(255,241,222)', minHeight: '100vh'}}>
                <Navbar />
                
                <div className="container py-5">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h1 style={{ 
                                fontFamily: 'Agatho', 
                                fontSize: '36px',
                                color: '#232A40',
                                textAlign: 'center',
                                marginBottom: '30px'
                            }}>
                                Manage Properties
                            </h1>
                            
                            {/* Display error message if there is one */}
                            {errorMessage && (
                                <div className="alert alert-danger mb-4" role="alert">
                                    <strong>Error:</strong> {errorMessage}
                                </div>
                            )}
                            
                            <div className="card mb-4" style={{ 
                                border: '1px solid rgba(0,0,0,0.1)', 
                                borderRadius: '10px',
                                padding: '20px',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                            }}>
                                <form onSubmit={handleSubmit}>
                                    <div className="row align-items-end g-3">
                                        <div className="col-md-4">
                                            <label 
                                                htmlFor="search" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Search Properties
                                            </label>
                                            <input 
                                                type="text" 
                                                id="search" 
                                                className="form-control" 
                                                placeholder="Reference, name or community..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label 
                                                htmlFor="property_type" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Property Type
                                            </label>
                                            <select 
                                                id="property_type" 
                                                className="form-select" 
                                                value={propertyType}
                                                onChange={(e) => setPropertyType(e.target.value)}
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <option value="">All Types</option>
                                                {safeDropdownOptions.property_types.map((type, index) => (
                                                    <option key={index} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label 
                                                htmlFor="is_rental" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Property Category
                                            </label>
                                            <select 
                                                id="is_rental" 
                                                className="form-select" 
                                                value={isRental}
                                                onChange={(e) => setIsRental(e.target.value)}
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <option value="">All Categories</option>
                                                <option value="false">For Sale</option>
                                                <option value="true">For Rent</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary w-100" 
                                                style={{ 
                                                    backgroundColor: '#232A40',
                                                    borderColor: '#232A40',
                                                    fontFamily: 'Glancyr',
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                Filter
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                                <Link 
                                    href={route('admin.properties.create')} 
                                    className="btn" 
                                    style={{ 
                                        backgroundColor: '#F97316',
                                        color: 'white',
                                        borderRadius: '8px',
                                        padding: '10px 20px',
                                        fontFamily: 'Glancyr',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <i className="bi bi-plus-circle me-2"></i> Add New Property
                                </Link>
                            </div>
                            
                            <div className="card" style={{ 
                                border: '1px solid rgba(0,0,0,0.1)', 
                                borderRadius: '10px',
                                padding: '0',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                overflow: 'hidden'
                            }}>
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead style={{ backgroundColor: '#232A40', color: 'white' }}>
                                            <tr>
                                                <th style={{ fontFamily: 'Glancyr', padding: '15px' }}>ID</th>
                                                <th style={{ fontFamily: 'Glancyr', padding: '15px' }}>Reference</th>
                                                <th style={{ fontFamily: 'Glancyr', padding: '15px' }}>Name</th>
                                                <th style={{ fontFamily: 'Glancyr', padding: '15px' }}>Type</th>
                                                <th style={{ fontFamily: 'Glancyr', padding: '15px' }}>Category</th>
                                                <th style={{ fontFamily: 'Glancyr', padding: '15px' }}>Price</th>
                                                <th style={{ fontFamily: 'Glancyr', padding: '15px' }}>Status</th>
                                                <th style={{ fontFamily: 'Glancyr', padding: '15px', textAlign: 'center' }}>Featured</th>
                                                <th style={{ fontFamily: 'Glancyr', padding: '15px', textAlign: 'center' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {safeProperties.data && safeProperties.data.map(property => (
                                                <tr key={property.id}>
                                                    <td style={{ fontFamily: 'Glancyr', padding: '15px', verticalAlign: 'middle' }}>{property.id}</td>
                                                    <td style={{ fontFamily: 'Glancyr', padding: '15px', verticalAlign: 'middle' }}>{property.reference_number}</td>
                                                    <td style={{ fontFamily: 'Glancyr', padding: '15px', verticalAlign: 'middle' }}>{property.property_name}</td>
                                                    <td style={{ fontFamily: 'Glancyr', padding: '15px', verticalAlign: 'middle' }}>{property.property_type}</td>
                                                    <td style={{ fontFamily: 'Glancyr', padding: '15px', verticalAlign: 'middle' }}>
                                                        {property.is_rental ? 
                                                            <span className="badge bg-info">Rental</span> :
                                                            <span className="badge bg-primary">Sale</span>
                                                        }
                                                    </td>
                                                    <td style={{ fontFamily: 'Glancyr', padding: '15px', verticalAlign: 'middle' }}>
                                                        {property.formatted_price || `AED ${property.price?.toLocaleString() || 0}`}
                                                    </td>
                                                    <td style={{ fontFamily: 'Glancyr', padding: '15px', verticalAlign: 'middle' }}>
                                                        <div className="form-check form-switch">
                                                            <input 
                                                                className="form-check-input" 
                                                                type="checkbox" 
                                                                checked={property.is_active}
                                                                onChange={() => handleToggleActive(property.id)}
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                            <label className="form-check-label">
                                                                {property.is_active ? 'Active' : 'Inactive'}
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td style={{ fontFamily: 'Glancyr', padding: '15px', verticalAlign: 'middle', textAlign: 'center' }}>
                                                        <div className="form-check form-check-inline">
                                                            <input 
                                                                className="form-check-input" 
                                                                type="checkbox" 
                                                                checked={property.featured}
                                                                onChange={() => handleToggleFeatured(property.id)}
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td style={{ fontFamily: 'Glancyr', padding: '15px', verticalAlign: 'middle', textAlign: 'center' }}>
                                                        <div className="btn-group">
                                                            <Link 
                                                                href={route('properties.show', property.id)} 
                                                                className="btn btn-sm btn-outline-secondary"
                                                                title="View"
                                                                target="_blank"
                                                            >
                                                                <i className="bi bi-eye"></i>
                                                            </Link>
                                                            <Link 
                                                                href={route('admin.properties.edit', property.id)} 
                                                                className="btn btn-sm btn-outline-primary"
                                                                title="Edit"
                                                            >
                                                                <i className="bi bi-pencil"></i>
                                                            </Link>
                                                            <button 
                                                                type="button" 
                                                                className="btn btn-sm btn-outline-danger"
                                                                title="Delete"
                                                                onClick={() => handleDelete(property.id)}
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            
                                            {(!safeProperties.data || safeProperties.data.length === 0) && (
                                                <tr>
                                                    <td colSpan="9" style={{ textAlign: 'center', padding: '30px', fontFamily: 'Glancyr' }}>
                                                        No properties found. <Link href={route('admin.properties.create')}>Add a new property</Link>.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Pagination */}
                                {safeProperties.data && safeProperties.data.length > 0 && (
                                    <div className="card-footer" style={{ padding: '15px 20px' }}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div style={{ fontFamily: 'Glancyr', fontSize: '14px' }}>
                                                Showing {safeProperties.meta?.from || 0} to {safeProperties.meta?.to || 0} of {safeProperties.meta?.total || 0} properties
                                            </div>
                                            <div>
                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination pagination-sm mb-0">
                                                        {/* Previous Page Link */}
                                                        <li className={`page-item ${(safeProperties.meta?.current_page || 1) <= 1 ? 'disabled' : ''}`}>
                                                            <Link
                                                                href={`?page=${(safeProperties.meta?.current_page || 1) - 1}`}
                                                                className="page-link"
                                                                preserveState
                                                            >
                                                                &laquo; Previous
                                                            </Link>
                                                        </li>
                                                        
                                                        {/* Page Numbers */}
                                                        {Array.from({length: safeProperties.meta?.last_page || 1}, (_, i) => i + 1).map(page => (
                                                            <li key={page} className={`page-item ${page === (safeProperties.meta?.current_page || 1) ? 'active' : ''}`}>
                                                                <Link
                                                                    href={`?page=${page}`}
                                                                    className="page-link"
                                                                    preserveState
                                                                >
                                                                    {page}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                        
                                                        {/* Next Page Link */}
                                                        <li className={`page-item ${(safeProperties.meta?.current_page || 1) >= (safeProperties.meta?.last_page || 1) ? 'disabled' : ''}`}>
                                                            <Link
                                                                href={`?page=${(safeProperties.meta?.current_page || 1) + 1}`}
                                                                className="page-link"
                                                                preserveState
                                                            >
                                                                Next &raquo;
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
}