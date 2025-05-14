import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Create({ dropdown_options }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        reference_number: '',
        property_name: '',
        community: '',
        sub_community: '',
        price: '',
        currency: 'AED',
        bedrooms: '',
        bathrooms: '',
        built_up_area: '',
        plot_area: '',
        status: '',
        district: '',
        city: '',
        state: '',
        country: '',
        agent_name: '',
        agent_contact: '',
        marketing_title: '',
        description: '',
        primary_view: '',
        secondary_view: '',
        unit_floor: '',
        floor_no: '',
        parking: '',
        property_type: '',
        is_rental: false,
        is_active: true,
        featured: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.properties.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Add New Property" />
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
                                    Add New Property
                                </h1>
                                <div>
                                    <Link 
                                        href={route('admin.properties.index')} 
                                        className="btn btn-outline-secondary" 
                                        style={{ 
                                            fontFamily: 'Glancyr',
                                        }}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i> Back to List
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="card" style={{ 
                                border: '1px solid rgba(0,0,0,0.1)', 
                                borderRadius: '10px',
                                padding: '30px',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                            }}>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <h2 style={{ 
                                                fontFamily: 'Agatho', 
                                                fontSize: '24px',
                                                color: '#232A40',
                                                marginBottom: '20px'
                                            }}>
                                                Basic Information
                                            </h2>
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <label 
                                                htmlFor="reference_number" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Reference Number*
                                            </label>
                                            <input 
                                                type="text" 
                                                id="reference_number" 
                                                className={`form-control ${errors.reference_number ? 'is-invalid' : ''}`}
                                                value={data.reference_number}
                                                onChange={(e) => setData('reference_number', e.target.value)}
                                                required
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            {errors.reference_number && (
                                                <div className="invalid-feedback" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.reference_number}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-8 mb-3">
                                            <label 
                                                htmlFor="property_name" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Property Name*
                                            </label>
                                            <input 
                                                type="text" 
                                                id="property_name" 
                                                className={`form-control ${errors.property_name ? 'is-invalid' : ''}`}
                                                value={data.property_name}
                                                onChange={(e) => setData('property_name', e.target.value)}
                                                required
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            {errors.property_name && (
                                                <div className="invalid-feedback" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.property_name}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
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
                                                className={`form-select ${errors.property_type ? 'is-invalid' : ''}`}
                                                value={data.property_type}
                                                onChange={(e) => setData('property_type', e.target.value)}
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <option value="">Select Type</option>
                                                {dropdown_options.property_types.map((type, index) => (
                                                    <option key={index} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            {errors.property_type && (
                                                <div className="invalid-feedback" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.property_type}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <label 
                                                htmlFor="community" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Community
                                            </label>
                                            <select 
                                                id="community" 
                                                className={`form-select ${errors.community ? 'is-invalid' : ''}`}
                                                value={data.community}
                                                onChange={(e) => setData('community', e.target.value)}
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <option value="">Select Community</option>
                                                {dropdown_options.communities.map((community, index) => (
                                                    <option key={index} value={community}>{community}</option>
                                                ))}
                                            </select>
                                            {errors.community && (
                                                <div className="invalid-feedback" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.community}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <label 
                                                htmlFor="sub_community" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Sub Community
                                            </label>
                                            <input 
                                                type="text" 
                                                id="sub_community" 
                                                className={`form-control ${errors.sub_community ? 'is-invalid' : ''}`}
                                                value={data.sub_community}
                                                onChange={(e) => setData('sub_community', e.target.value)}
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            {errors.sub_community && (
                                                <div className="invalid-feedback" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.sub_community}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <label 
                                                htmlFor="price" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Price*
                                            </label>
                                            <div className="input-group">
                                                <select 
                                                    id="currency" 
                                                    className={`form-select ${errors.currency ? 'is-invalid' : ''}`}
                                                    value={data.currency}
                                                    onChange={(e) => setData('currency', e.target.value)}
                                                    style={{ 
                                                        fontFamily: 'Glancyr', 
                                                        borderRadius: '8px 0 0 8px',
                                                        width: '80px'
                                                    }}
                                                >
                                                    <option value="AED">AED</option>
                                                    <option value="USD">USD</option>
                                                    <option value="EUR">EUR</option>
                                                </select>
                                                <input 
                                                    type="number" 
                                                    id="price" 
                                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    required
                                                    style={{ 
                                                        fontFamily: 'Glancyr', 
                                                        padding: '10px 15px',
                                                        borderRadius: '0 8px 8px 0'
                                                    }}
                                                />
                                            </div>
                                            {errors.price && (
                                                <div className="invalid-feedback d-block" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.price}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-2 mb-3">
                                            <label 
                                                htmlFor="bedrooms" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Bedrooms
                                            </label>
                                            <input 
                                                type="number" 
                                                id="bedrooms" 
                                                className={`form-control ${errors.bedrooms ? 'is-invalid' : ''}`}
                                                value={data.bedrooms}
                                                onChange={(e) => setData('bedrooms', e.target.value)}
                                                min="0"
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            {errors.bedrooms && (
                                                <div className="invalid-feedback" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.bedrooms}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-2 mb-3">
                                            <label 
                                                htmlFor="bathrooms" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Bathrooms
                                            </label>
                                            <input 
                                                type="number" 
                                                id="bathrooms" 
                                                className={`form-control ${errors.bathrooms ? 'is-invalid' : ''}`}
                                                value={data.bathrooms}
                                                onChange={(e) => setData('bathrooms', e.target.value)}
                                                min="0"
                                                step="0.5"
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            {errors.bathrooms && (
                                                <div className="invalid-feedback" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.bathrooms}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <label 
                                                htmlFor="built_up_area" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Built-up Area (sqft)
                                            </label>
                                            <input 
                                                type="number" 
                                                id="built_up_area" 
                                                className={`form-control ${errors.built_up_area ? 'is-invalid' : ''}`}
                                                value={data.built_up_area}
                                                onChange={(e) => setData('built_up_area', e.target.value)}
                                                min="0"
                                                step="0.01"
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            {errors.built_up_area && (
                                                <div className="invalid-feedback" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.built_up_area}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-12 mt-3">
                                            <h2 style={{ 
                                                fontFamily: 'Agatho', 
                                                fontSize: '24px',
                                                color: '#232A40',
                                                marginBottom: '20px'
                                            }}>
                                                Description & Status
                                            </h2>
                                        </div>
                                        
                                        <div className="col-md-12 mb-3">
                                            <label 
                                                htmlFor="marketing_title" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Marketing Title
                                            </label>
                                            <input 
                                                type="text" 
                                                id="marketing_title" 
                                                className={`form-control ${errors.marketing_title ? 'is-invalid' : ''}`}
                                                value={data.marketing_title}
                                                onChange={(e) => setData('marketing_title', e.target.value)}
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            {errors.marketing_title && (
                                                <div className="invalid-feedback" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.marketing_title}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-12 mb-3">
                                            <label 
                                                htmlFor="description" 
                                                className="form-label" 
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    fontSize: '14px',
                                                    fontWeight: '600' 
                                                }}
                                            >
                                                Description
                                            </label>
                                            <textarea 
                                                id="description" 
                                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                rows="5"
                                                style={{ 
                                                    fontFamily: 'Glancyr', 
                                                    padding: '10px 15px',
                                                    borderRadius: '8px'
                                                }}
                                            ></textarea>
                                            {errors.description && (
                                                <div className="invalid-feedback" style={{ fontFamily: 'Glancyr' }}>
                                                    {errors.description}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <div className="form-check form-switch">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    id="is_rental"
                                                    checked={data.is_rental}
                                                    onChange={(e) => setData('is_rental', e.target.checked)}
                                                />
                                                <label 
                                                    className="form-check-label" 
                                                    htmlFor="is_rental"
                                                    style={{ fontFamily: 'Glancyr' }}
                                                >
                                                    Rental Property
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <div className="form-check form-switch">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    id="is_active"
                                                    checked={data.is_active}
                                                    onChange={(e) => setData('is_active', e.target.checked)}
                                                />
                                                <label 
                                                    className="form-check-label" 
                                                    htmlFor="is_active"
                                                    style={{ fontFamily: 'Glancyr' }}
                                                >
                                                    Active
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <div className="form-check form-switch">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    id="featured"
                                                    checked={data.featured}
                                                    onChange={(e) => setData('featured', e.target.checked)}
                                                />
                                                <label 
                                                    className="form-check-label" 
                                                    htmlFor="featured"
                                                    style={{ fontFamily: 'Glancyr' }}
                                                >
                                                    Featured Property
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex justify-content-end">
                                        <Link 
                                            href={route('admin.properties.index')} 
                                            className="btn btn-outline-secondary me-2" 
                                            style={{ 
                                                fontFamily: 'Glancyr',
                                                padding: '10px 20px',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            Cancel
                                        </Link>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary" 
                                            style={{ 
                                                backgroundColor: '#F97316',
                                                borderColor: '#F97316',
                                                fontFamily: 'Glancyr',
                                                padding: '10px 20px',
                                                borderRadius: '8px'
                                            }}
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Creating...
                                                </>
                                            ) : (
                                                <>Create Property</>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
}