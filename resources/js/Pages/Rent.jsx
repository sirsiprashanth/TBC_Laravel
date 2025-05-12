import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import SellBanner from '../Components/SellBanner'; // Using SellBanner for consistent filtering
import RentalPropertyCard from '../Components/RentalPropertyCard';
import LogoBanner from '../Components/LogoBanner';
import TestimonialVideos from '../Components/TestimonialVideos';

export default function Rent({ auth, properties = [], count = 0, filters = {}, dropdown_options = {} }) {
    // State for filtered properties
    const [filteredProperties, setFilteredProperties] = useState(properties);
    const [activeFilter, setActiveFilter] = useState('All');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // 2 rows of 3 properties

    // Calculate current properties for pagination
    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    // Calculate total pages
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Filter by property type
    const applyFilter = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1); // Reset to first page when filter changes

        if (filter === 'All') {
            setFilteredProperties(properties);
        } else {
            const filtered = properties.filter(property =>
                property.unitType === filter
            );
            setFilteredProperties(filtered);
        }
    };

    // Initialize properties
    useEffect(() => {
        setFilteredProperties(properties);
    }, [properties]);

    return (
        <>
            <Head title="Rent Properties" />
            <div style={{borderColor: 'var(--bs-indigo)', background: 'rgb(255,241,222)'}}>
                <Navbar />
                <SellBanner filters={filters} dropdownOptions={dropdown_options} />

                {/* Property listings section */}
                <div className="property-section py-5" style={{ backgroundColor: '#FFF0DE' }}>
                    <div className="container">
                        {/* Header with filter buttons */}
                        <div className="row">
                            <div className="col-md-12 mb-5">
                                <div className="header-section d-md-flex align-items-center justify-content-between mb-5">
                                    <h2 style={{ fontFamily: 'Agatho', fontSize: '32px', marginBottom: '0' }}>
                                        {count} Rental Properties
                                    </h2>
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

                        {/* Property Cards */}
                        <div className="row">
                            {currentProperties.length > 0 ? (
                                currentProperties.map((property) => (
                                    <div key={property.id} className="col-md-4 mb-4">
                                        <RentalPropertyCard property={property} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <div className="alert alert-warning" role="alert" style={{ backgroundColor: '#FFF0DE', borderColor: '#F7945F', color: '#1F2937' }}>
                                        No properties found matching your criteria. Please try a different filter.
                                    </div>
                                </div>
                            )}
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
                    </div>
                </div>

                <LogoBanner />
                <TestimonialVideos />
                <Footer />
            </div>
        </>
    );
}
