import React from 'react';
import { Link } from '@inertiajs/react';

export default function SellBanner() {
    return (
        <div className="position-relative">
            {/* Banner Background Image */}
            <div className="position-relative" style={{ 
                height: '80vh', 
                overflow: 'hidden',
                backgroundImage: 'url(/assets/img/City_view.png)',
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
                    <h1 className="mb-0" style={{ 
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
                    </h1>
                </div>
                
                {/* Search Form - Placeholder Elements (Not Functional) */}
                <div className="position-absolute" style={{ bottom: '2rem', left: '50%', transform: 'translateX(-50%)', width: '80%', maxWidth: '1000px', zIndex: 3 }}>
                    <div className="bg-white rounded-pill shadow d-flex">
                        {/* Buy Dropdown - Placeholder */}
                        <div className="dropdown p-2 flex-grow-1 border-end">
                            <button className="btn dropdown-toggle w-100 text-start" type="button" aria-expanded="false" style={{ cursor: 'default' }}>
                                <span className="text-muted" style={{ fontFamily: 'Glancyr' }}>Buy</span>
                            </button>
                        </div>
                        {/* City Search - Placeholder with Search Icon */}
                        <div className="p-2 flex-grow-1 border-end position-relative">
                            <div className="position-relative">
                                <input type="text" className="form-control border-0" placeholder="City, Community or Area" style={{ fontFamily: 'Glancyr', paddingRight: '30px', cursor: 'default' }} readOnly />
                                <div className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* Bedrooms Dropdown - Placeholder */}
                        <div className="dropdown p-2 flex-grow-1 border-end">
                            <button className="btn dropdown-toggle w-100 text-start" type="button" aria-expanded="false" style={{ cursor: 'default' }}>
                                <span className="text-muted" style={{ fontFamily: 'Glancyr' }}>Bedrooms</span>
                            </button>
                        </div>
                        {/* Price Range Dropdown - Placeholder */}
                        <div className="dropdown p-2 flex-grow-1 border-end">
                            <button className="btn dropdown-toggle w-100 text-start" type="button" aria-expanded="false" style={{ cursor: 'default' }}>
                                <span className="text-muted" style={{ fontFamily: 'Glancyr' }}>Price Range</span>
                            </button>
                        </div>
                        {/* All Types Dropdown - Placeholder */}
                        <div className="dropdown p-2 flex-grow-1">
                            <button className="btn dropdown-toggle w-100 text-start" type="button" aria-expanded="false" style={{ cursor: 'default' }}>
                                <span className="text-muted" style={{ fontFamily: 'Glancyr' }}>All Types</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Search Button - Outside the box */}
                    <div className="position-absolute" style={{ right: '-60px', top: '50%', transform: 'translateY(-50%)' }}>
                        <button className="btn rounded-circle d-flex align-items-center justify-content-center shadow" 
                            style={{ 
                                width: '48px', 
                                height: '48px', 
                                backgroundColor: '#1A202C',
                            }}>
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
