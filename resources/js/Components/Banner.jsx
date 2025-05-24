import React, { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default function Banner() {
    const { auth } = usePage().props;
    const iframeRef = useRef(null);
    
    useEffect(() => {
        // Listen for messages from iframe
        const handleMessage = (event) => {
            if (event.data.type === 'getAuthStatus' && iframeRef.current) {
                // Send auth status back to iframe
                iframeRef.current.contentWindow.postMessage({
                    type: 'authStatus',
                    isAuthenticated: !!auth.user
                }, '*');
            }
        };
        
        window.addEventListener('message', handleMessage);
        
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [auth.user]);
    
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
                ref={iframeRef}
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