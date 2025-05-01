import React from 'react';

export default function LogoBanner() {
    return (
        <div className="position-relative" style={{ overflow: 'hidden', marginTop: '3rem' }}>
            <section 
                className="vw-100 py-0"
                style={{
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    position: 'relative',
                    width: '100vw',
                    backgroundColor: '#FFF0DE' // Light beige background color
                }}
            >
                {/* Fully fluid container with no padding */}
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-12 p-0">
                            {/* Image with width of 100%, no max-width restrictions */}
                            <img 
                                src="/assets/img/Layer.png" 
                                alt="Banner Logo" 
                                className="img-fluid w-100" 
                                style={{ 
                                    display: 'block',
                                    verticalAlign: 'middle'
                                }} 
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}