import React, { useState, useEffect, useRef } from 'react';
import { router, useForm } from '@inertiajs/react';

export default function SellBanner({ filters = {}, dropdownOptions = {} }) {
    // Form state with Inertia.js useForm
    const { data, setData, get } = useForm({
        propertyFor: filters.propertyFor || 'Buy',
        location: filters.location || '',
        bedrooms: filters.bedrooms || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        property_type: filters.property_type || ''
    });

    // State for dropdowns
    const [bedroomsOpen, setBedroomsOpen] = useState(false);
    const [priceRangeOpen, setPriceRangeOpen] = useState(false);
    const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
    const [propertyForOpen, setPropertyForOpen] = useState(false);

    // Refs for dropdown containers
    const bedroomsRef = useRef(null);
    const priceRangeRef = useRef(null);
    const propertyTypeRef = useRef(null);
    const propertyForRef = useRef(null);

    // Options for dropdowns from database, with fallbacks to hardcoded values if empty
    const bedroomsOptions = dropdownOptions && dropdownOptions.bedrooms && dropdownOptions.bedrooms.length > 0
        ? ['Any', ...dropdownOptions.bedrooms.map(bed => bed.toString())]
        : ['Any', '1', '2', '3', '4', '5+'];
        
    const priceRangeOptions = [
        { label: 'Any', min: '', max: '' },
        { label: 'Under 1M', min: '0', max: '1000000' },
        { label: '1M - 2M', min: '1000000', max: '2000000' },
        { label: '2M - 5M', min: '2000000', max: '5000000' },
        { label: '5M - 10M', min: '5000000', max: '10000000' },
        { label: '10M+', min: '10000000', max: '' }
    ];
    
    const propertyTypeOptions = dropdownOptions && dropdownOptions.property_types && dropdownOptions.property_types.length > 0
        ? ['Any', ...dropdownOptions.property_types]
        : ['Any', 'Apartment', 'Villa', 'Townhouse', 'Penthouse'];
        
    const propertyForOptions = ['Buy', 'Rent'];

    // Handle outside click to close dropdowns
    useEffect(() => {
        function handleClickOutside(event) {
            if (bedroomsRef.current && !bedroomsRef.current.contains(event.target)) {
                setBedroomsOpen(false);
            }
            if (priceRangeRef.current && !priceRangeRef.current.contains(event.target)) {
                setPriceRangeOpen(false);
            }
            if (propertyTypeRef.current && !propertyTypeRef.current.contains(event.target)) {
                setPropertyTypeOpen(false);
            }
            if (propertyForRef.current && !propertyForRef.current.contains(event.target)) {
                setPropertyForOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle search form submission
    const handleSearch = () => {
        const targetRoute = data.propertyFor.toLowerCase() === 'rent' ? 'rent' : 'sell';

        // Prepare query parameters
        const params = {};
        if (data.location) params.location = data.location;
        if (data.bedrooms && data.bedrooms !== 'Any') params.bedrooms = data.bedrooms;
        if (data.min_price) params.min_price = data.min_price;
        if (data.max_price) params.max_price = data.max_price;
        if (data.property_type && data.property_type !== 'Any') params.property_type = data.property_type;

        // Navigate to the appropriate route with filters
        router.get(route(targetRoute), params);
    };

    // Handle selection from dropdowns
    const handleBedroomsSelect = (option) => {
        setData('bedrooms', option);
        setBedroomsOpen(false);
    };

    const handlePriceRangeSelect = (option) => {
        setData('min_price', option.min);
        setData('max_price', option.max);
        setPriceRangeOpen(false);
    };

    const handlePropertyTypeSelect = (option) => {
        setData('property_type', option);
        setPropertyTypeOpen(false);
    };

    const handlePropertyForSelect = (option) => {
        setData('propertyFor', option);
        setPropertyForOpen(false);
    };

    // Helper function to get display text for price range
    const getPriceRangeDisplayText = () => {
        const selectedRange = priceRangeOptions.find(
            option => option.min === data.min_price && option.max === data.max_price
        );
        return selectedRange ? selectedRange.label : 'Price Range';
    };

    // Dropdown styling for individual items
    const dropdownItemStyle = {
        fontFamily: 'Glancyr',
        padding: '10px 16px',
        display: 'block',
        width: '100%',
        textAlign: 'left',
        color: '#1f2937',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none'
    };

    return (
        <div className="position-relative">
            {/* Banner Background Image */}
            <div className="position-relative" style={{
                height: '80vh',
                overflow: 'visible', // Allow dropdowns to overflow
                backgroundImage: 'url(/assets/img/City_view.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                {/* Overlay for better text visibility */}
                <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                </div>

                {/* Banner Content */}
                <div className="position-absolute"
                     style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        zIndex: 2,
                        textAlign: 'left'
                     }}>
                    {/* <h1 className="mb-0" style={{
                        fontFamily: 'Agatho',
                        fontSize: '5rem',
                        fontWeight: '300',
                        lineHeight: '1.1',
                        color: '#fff',
                    }}>
                        Create Your
                    </h1>
                    <h1 style={{
                        fontFamily: 'Agatho',
                        fontSize: '6rem',
                        fontWeight: '300',
                        lineHeight: '1.1',
                        color: '#fff',
                    }}>
                        Concrete Reality
                    </h1> */}
                </div>

                {/* Search Form - Functional */}
                <div className="position-absolute" style={{ 
                    bottom: '2rem', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    width: '80%', 
                    maxWidth: '1000px', 
                    zIndex: 100  // Higher z-index
                }}>
                    <div className="bg-white rounded-pill shadow d-flex">
                        {/* Buy/Rent Dropdown */}
                        <div className="dropdown p-2 flex-grow-1 border-end" style={{ position: 'relative' }} ref={propertyForRef}>
                            <button
                                className="btn dropdown-toggle w-100 text-start"
                                type="button"
                                onClick={() => setPropertyForOpen(!propertyForOpen)}
                                style={{ fontFamily: 'Glancyr' }}
                            >
                                <span className={data.propertyFor ? 'text-dark' : 'text-muted'}>
                                    {data.propertyFor || 'Buy'}
                                </span>
                            </button>
                            
                            {/* Buy/Rent Dropdown Options */}
                            {propertyForOpen && (
                                <div className="position-absolute" style={{ 
                                    top: '100%', 
                                    left: 0, 
                                    minWidth: '150px',
                                    backgroundColor: '#fff',
                                    border: '2px solid #f7945f',
                                    borderRadius: '0.5rem',
                                    zIndex: 1050,
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    marginTop: '5px'
                                }}>
                                    <button 
                                        className="w-100 text-start" 
                                        style={{
                                            ...dropdownItemStyle,
                                            fontWeight: data.propertyFor === 'Buy' ? 'bold' : 'normal',
                                            backgroundColor: data.propertyFor === 'Buy' ? '#f7945f20' : 'transparent'
                                        }}
                                        onClick={() => handlePropertyForSelect('Buy')}
                                    >
                                        Buy
                                    </button>
                                    <button 
                                        className="w-100 text-start" 
                                        style={{
                                            ...dropdownItemStyle,
                                            fontWeight: data.propertyFor === 'Rent' ? 'bold' : 'normal',
                                            backgroundColor: data.propertyFor === 'Rent' ? '#f7945f20' : 'transparent',
                                            borderBottom: 'none'
                                        }}
                                        onClick={() => handlePropertyForSelect('Rent')}
                                    >
                                        Rent
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* City Search */}
                        <div className="p-2 flex-grow-1 border-end position-relative">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control border-0"
                                    placeholder="City, Community or Area"
                                    style={{ fontFamily: 'Glancyr', paddingRight: '30px' }}
                                    value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                />
                                <div className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Bedrooms Dropdown */}
                        <div className="dropdown p-2 flex-grow-1 border-end" style={{ position: 'relative' }} ref={bedroomsRef}>
                            <button
                                className="btn dropdown-toggle w-100 text-start"
                                type="button"
                                onClick={() => setBedroomsOpen(!bedroomsOpen)}
                                style={{ fontFamily: 'Glancyr' }}
                            >
                                <span className={data.bedrooms ? 'text-dark' : 'text-muted'}>
                                    {data.bedrooms || 'Bedrooms'}
                                </span>
                            </button>
                            
                            {/* Bedrooms Dropdown Options */}
                            {bedroomsOpen && (
                                <div className="position-absolute" style={{ 
                                    top: '100%', 
                                    left: 0, 
                                    minWidth: '150px',
                                    backgroundColor: '#fff',
                                    border: '2px solid #f7945f',
                                    borderRadius: '0.5rem',
                                    zIndex: 1050,
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    marginTop: '5px'
                                }}>
                                    {bedroomsOptions.map((option, index) => (
                                        <button 
                                            key={option}
                                            className="w-100 text-start" 
                                            style={{
                                                ...dropdownItemStyle,
                                                fontWeight: data.bedrooms === option ? 'bold' : 'normal',
                                                backgroundColor: data.bedrooms === option ? '#f7945f20' : 'transparent',
                                                borderBottom: index === bedroomsOptions.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.1)'
                                            }}
                                            onClick={() => handleBedroomsSelect(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Price Range Dropdown */}
                        <div className="dropdown p-2 flex-grow-1 border-end" style={{ position: 'relative' }} ref={priceRangeRef}>
                            <button
                                className="btn dropdown-toggle w-100 text-start"
                                type="button"
                                onClick={() => setPriceRangeOpen(!priceRangeOpen)}
                                style={{ fontFamily: 'Glancyr' }}
                            >
                                <span className={(data.min_price || data.max_price) ? 'text-dark' : 'text-muted'}>
                                    {(data.min_price || data.max_price) ? getPriceRangeDisplayText() : 'Price Range'}
                                </span>
                            </button>
                            
                            {/* Price Range Dropdown Options */}
                            {priceRangeOpen && (
                                <div className="position-absolute" style={{ 
                                    top: '100%', 
                                    left: 0, 
                                    minWidth: '150px',
                                    backgroundColor: '#fff',
                                    border: '2px solid #f7945f',
                                    borderRadius: '0.5rem',
                                    zIndex: 1050,
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    marginTop: '5px'
                                }}>
                                    {priceRangeOptions.map((option, index) => (
                                        <button 
                                            key={index}
                                            className="w-100 text-start" 
                                            style={{
                                                ...dropdownItemStyle,
                                                fontWeight: getPriceRangeDisplayText() === option.label ? 'bold' : 'normal',
                                                backgroundColor: getPriceRangeDisplayText() === option.label ? '#f7945f20' : 'transparent',
                                                borderBottom: index === priceRangeOptions.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.1)'
                                            }}
                                            onClick={() => handlePriceRangeSelect(option)}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Property Types Dropdown */}
                        <div className="dropdown p-2 flex-grow-1" style={{ position: 'relative' }} ref={propertyTypeRef}>
                            <button
                                className="btn dropdown-toggle w-100 text-start"
                                type="button"
                                onClick={() => setPropertyTypeOpen(!propertyTypeOpen)}
                                style={{ fontFamily: 'Glancyr' }}
                            >
                                <span className={data.property_type ? 'text-dark' : 'text-muted'}>
                                    {data.property_type || 'All Types'}
                                </span>
                            </button>
                            
                            {/* Property Types Dropdown Options */}
                            {propertyTypeOpen && (
                                <div className="position-absolute" style={{ 
                                    top: '100%', 
                                    right: 0, 
                                    minWidth: '150px',
                                    backgroundColor: '#fff',
                                    border: '2px solid #f7945f',
                                    borderRadius: '0.5rem',
                                    zIndex: 1050,
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    marginTop: '5px'
                                }}>
                                    {propertyTypeOptions.map((option, index) => (
                                        <button 
                                            key={option}
                                            className="w-100 text-start" 
                                            style={{
                                                ...dropdownItemStyle,
                                                fontWeight: data.property_type === option ? 'bold' : 'normal',
                                                backgroundColor: data.property_type === option ? '#f7945f20' : 'transparent',
                                                borderBottom: index === propertyTypeOptions.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.1)'
                                            }}
                                            onClick={() => handlePropertyTypeSelect(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="position-absolute" style={{ right: '-60px', top: '50%', transform: 'translateY(-50%)' }}>
                        <button
                            className="btn rounded-circle d-flex align-items-center justify-content-center shadow"
                            style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: '#1A202C',
                            }}
                            onClick={handleSearch}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}