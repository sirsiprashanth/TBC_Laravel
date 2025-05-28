import React, { useEffect, useRef, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Navbar from './Navbar';

export default function Banner() {
    const { auth } = usePage().props;
    const iframeRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        // Check if mobile on mount and window resize
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Listen for messages from iframe
        const handleMessage = (event) => {
            if (event.data.type === 'getAuthStatus' && iframeRef.current) {
                // Send auth status back to iframe
                iframeRef.current.contentWindow.postMessage({
                    type: 'authStatus',
                    isAuthenticated: !!auth.user
                }, '*');
            } else if (event.data.type === 'navigate' && event.data.url) {
                // Handle navigation from iframe using Inertia
                router.visit(event.data.url);
            }
        };
        
        window.addEventListener('message', handleMessage);
        
        return () => {
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('resize', checkMobile);
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
            {isMobile ? (
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}>
                    <div style={{ 
                        flexShrink: 0,
                        backgroundColor: 'rgb(253, 240, 221)'
                    }}>
                        <Navbar />
                    </div>
                    <div style={{ 
                        flex: 1,
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <img 
                            src="/assets/img/mobile_banner.jpg"
                            alt="Mobile Banner"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    </div>
                </div>
            ) : (
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
            )}
        </div>
    );
}