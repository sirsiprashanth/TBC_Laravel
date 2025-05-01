import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="p-4" style={{ 
            backgroundColor: '#1E2335', 
            color: '#fff',
            border: '1px solid #313752'
        }}>
            <div className="container-fluid" style={{ border: '1px solid #313752', padding: '30px 15px' }}>
                <div className="row">
                    <div className="col-md-12 mb-4">
                        {/* Navigation Links */}
                        <div className="d-flex justify-content-end mb-4">
                            <Link href="#" className="text-white mx-3" style={{ textDecoration: 'none', fontFamily: 'Glancyr' }}>Buy</Link>
                            <Link href="#" className="text-white mx-3" style={{ textDecoration: 'none', fontFamily: 'Glancyr' }}>Sell</Link>
                            <Link href="#" className="text-white mx-3" style={{ textDecoration: 'none', fontFamily: 'Glancyr' }}>Rent</Link>
                            <Link href="#" className="text-white mx-3" style={{ textDecoration: 'none', fontFamily: 'Glancyr' }}>Off-Plan</Link>
                            <Link href="#" className="text-white mx-3" style={{ textDecoration: 'none', fontFamily: 'Glancyr' }}>About Us</Link>
                        </div>
                    </div>

                    <div className="col-md-6">
                        {/* Main Heading */}
                        <h2 style={{ 
                            fontFamily: 'Agatho', 
                            fontSize: '42px', 
                            color: '#E0D6C8',
                            letterSpacing: '1px',
                            fontWeight: '400'
                        }}>
                            The Ultimate Collection
                        </h2>
                        <p style={{ 
                            fontFamily: 'Agatho', 
                            fontSize: '36px', 
                            color: '#E0D6C8',
                            letterSpacing: '1px',
                            fontWeight: '300'
                        }}>
                            Where Luxury Meets Legacy.
                        </p>
                    </div>

                    <div className="col-md-6">
                        {/* Social Media Icons */}
                        <div className="d-flex justify-content-end mt-4">
                            <Link href="#" className="mx-2">
                                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                                    style={{ width: '40px', height: '40px', border: '1px solid #E0D6C8' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#E0D6C8" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                                        <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                                        <circle cx="18.406" cy="5.594" r="1.44" />
                                    </svg>
                                </div>
                            </Link>
                            <Link href="#" className="mx-2">
                                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                                    style={{ width: '40px', height: '40px', border: '1px solid #E0D6C8' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#E0D6C8" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                                        <polygon fill="#1E2335" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                    </svg>
                                </div>
                            </Link>
                            <Link href="#" className="mx-2">
                                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                                    style={{ width: '40px', height: '40px', border: '1px solid #E0D6C8' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#E0D6C8" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </div>
                            </Link>
                            <Link href="#" className="mx-2">
                                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                                    style={{ width: '40px', height: '40px', border: '1px solid #E0D6C8' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#E0D6C8" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                </div>
                            </Link>
                            <Link href="#" className="mx-2">
                                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                                    style={{ width: '40px', height: '40px', border: '1px solid #E0D6C8' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#E0D6C8" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider before Boros Collection Logo */}
                <div className="border-top mt-4 mb-4" style={{ borderColor: '#E0D6C8 !important' }}></div>

                {/* Boros Collection Logo */}
                <div className="row">
                    <div className="col-12 text-center">
                        <img 
                            src="/assets/img/Group.png" 
                            alt="THE BOROS COLLECTION" 
                            className="img-fluid" 
                            style={{ maxWidth: '700px' }}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
