import React from 'react';

export default function AboutUsBanner() {
    return (
        <div 
            className="container-fluid p-0" 
            style={{
                backgroundImage: 'url(/assets/img/about_us.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '90vh',
                position: 'relative'
            }}
        >
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(31, 41, 55, 0.7)' // Darker overlay to match screenshot
                }}
            ></div>
            
            <div className="container-fluid h-100 position-relative">
                <div className="row h-100">
                    <div className="col-md-6 d-flex align-items-center">
                        {/* <h1 
                            style={{ 
                                fontFamily: 'Agatho', 
                                fontSize: '5rem',
                                color: '#FFF0DE', // Off-white/cream color
                                fontWeight: '500',
                                marginLeft: '10%',
                                lineHeight: '1.1'
                            }}
                        >
                            Who<br/>Are We?
                        </h1>
                    </div>
                    
                    <div className="col-md-6 d-flex align-items-end justify-content-end">
                        <h2 
                            style={{ 
                                fontFamily: 'Agatho', 
                                fontSize: '4rem',
                                color: '#FFF0DE', // Off-white/cream color
                                fontWeight: '500',
                                marginRight: '10%',
                                marginBottom: '10%',
                                lineHeight: '1.1'
                            }}
                        >
                            What<br/>Is Boros?
                        </h2> */}
                    </div>
                </div>
            </div>
        </div>
    );
}