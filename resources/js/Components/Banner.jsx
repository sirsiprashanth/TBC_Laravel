import React from 'react';

export default function Banner() {
    return (
        <div 
            style={{ 
                height: '100vh', 
                width: '100%', 
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <iframe 
                src="/banner/index.html"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                }}
                title="Banner Content"
            />
        </div>
    );
}