import React from 'react';

export default function BlogBanner() {
    return (
        <div className="container-fluid py-5" style={{ 
            background: '#FFF0DE',
            padding: '60px 0'
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 style={{ 
                            fontFamily: 'Agatho', 
                            fontSize: '90px',
                            color: '#1F2937',
                            fontWeight: '500',
                            lineHeight: '1.2',
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            Some Information<br/>
                            About Real Estate
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
