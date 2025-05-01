import React from 'react';

export default function OffPlanBanner() {
    return (
        <div className="off-plan-banner position-relative">
            {/* Hero Banner with Background Image */}
            <div className="position-relative" style={{ 
                height: '80vh', 
                minHeight: '600px',
                overflow: 'hidden',
                backgroundImage: 'url(/assets/img/dubai_skyline.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                {/* Dark Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100" 
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                </div>
                
                {/* Banner Content */}
                <div className="container position-relative h-100">
                    <div className="row h-100">
                        <div className="col-12 d-flex flex-column justify-content-center" 
                             style={{ 
                                zIndex: 1,
                                paddingBottom: '100px'
                             }}>
                            <h1 className="mb-0" style={{ 
                                fontFamily: 'Agatho', 
                                fontSize: '5rem',
                                fontWeight: '300',
                                lineHeight: '1.1',
                                color: '#fff',
                                textAlign: 'left'
                            }}>
                                Your Future.
                            </h1>
                            <h1 style={{ 
                                fontFamily: 'Agatho', 
                                fontSize: '6rem',
                                fontWeight: '300',
                                lineHeight: '1.1',
                                color: '#fff',
                                textAlign: 'left'
                            }}>
                                Boros Secured.
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Search Bar - Fixed at Bottom */}
                <div className="position-absolute w-100" style={{ bottom: '60px' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="search-container d-flex"
                                     style={{
                                         backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                         borderRadius: '50px',
                                         padding: '8px',
                                         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                                     }}>
                                    {/* Main Search Input */}
                                    <div className="flex-grow-1 d-flex align-items-center ms-3">
                                        <input 
                                            type="text" 
                                            className="form-control border-0 bg-transparent" 
                                            placeholder="Search Off Plan Project..." 
                                            style={{
                                                fontFamily: 'Glancyr',
                                                fontSize: '16px',
                                                boxShadow: 'none'
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Divider */}
                                    <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 10px' }}></div>
                                    
                                    {/* Developer Filter Dropdown */}
                                    <div className="d-flex align-items-center me-2">
                                        <select 
                                            className="form-select border-0 bg-transparent" 
                                            aria-label="Developer filter"
                                            style={{
                                                fontFamily: 'Glancyr',
                                                fontSize: '16px',
                                                minWidth: '150px',
                                                boxShadow: 'none'
                                            }}
                                        >
                                            <option selected>All Developers</option>
                                            <option value="emaar">Emaar</option>
                                            <option value="damac">Damac</option>
                                            <option value="nakheel">Nakheel</option>
                                            <option value="meraas">Meraas</option>
                                            <option value="select">Select Group</option>
                                        </select>
                                    </div>
                                    
                                    {/* Search Button */}
                                    <button 
                                        type="button" 
                                        className="btn rounded-circle"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            backgroundColor: '#F97316',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
