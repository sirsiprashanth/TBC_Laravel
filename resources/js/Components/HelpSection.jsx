import React from 'react';

export default function HelpSection() {
    return (
        <div className="position-relative" style={{ overflow: 'hidden' }}>
            <section 
                style={{
                    background: '#FDF0DD',
                    borderTop: '1px solid rgba(35, 42, 64, 0.3)',
                    borderBottom: '1px solid rgba(35, 42, 64, 0.3)',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    position: 'relative',
                    width: '100vw'
                }}
            >
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-5" style={{ 
                            borderRight: '1px solid rgba(35, 42, 64, 0.3)'
                        }}>
                            <div style={{ height: '100px' }}></div>
                        </div>
                        
                        <div className="col-6" style={{ 
                            borderRight: '1px solid rgba(35, 42, 64, 0.3)'
                        }}>
                            <div className="d-flex align-items-center h-100 ps-4">
                                <div className="w-100">
                                    <div className="d-flex flex-column align-items-end pe-4">
                                        <p className="text-uppercase mb-1" style={{ color: '#7C99B4', fontSize: '14px' }}>
                                            OUR SERVICES
                                        </p>
                                        <h2 className="fw-normal mb-0" style={{ fontFamily: 'Agatho', color: '#232A40', fontSize: '34px' }}>
                                            How Can We Help You?
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-1">
                            <div style={{ height: '100px' }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
