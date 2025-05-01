import React, { useState } from 'react';

export default function TestimonialVideos() {
    const [activeSlide, setActiveSlide] = useState(2);
    
    const testimonials = [
        {
            id: 1,
            image: '/assets/img/Group 3.png',
        },
        {
            id: 2,
            image: '/assets/img/Group 3.png',
        },
        {
            id: 3,
            image: '/assets/img/Group 3.png',
        },
        {
            id: 4,
            image: '/assets/img/Group 3.png',
        },
        {
            id: 5,
            image: '/assets/img/Group 3.png',
        }
    ];

    const handleDotClick = (index) => {
        setActiveSlide(index);
    };

    return (
        <div className="testimonial-section position-relative py-5" style={{ 
            backgroundColor: '#FFF0DE',
            overflow: 'hidden'
        }}>
            <div className="container-fluid px-0">
                {/* Header section - 3 columns with top border */}
                <div className="row border-top border-bottom mb-5" style={{ borderColor: '#232A40 !important' }}>
                    <div className="col-2 border-end" style={{ borderColor: '#232A40 !important' }}></div>
                    <div className="col-5 py-4 text-center border-end" style={{ borderColor: '#232A40 !important' }}>
                        <p className="mb-1" style={{ color: '#6B7280', fontFamily: 'Glancyr', fontSize: '14px' }}>CUSTOMER REVIEWS</p>
                        <h2 style={{ 
                            fontFamily: 'Agatho', 
                            fontSize: '36px',
                            color: '#1F2937',
                            fontWeight: '500',
                            margin: 0
                        }}>Real Experience, Real People</h2>
                    </div>
                    <div className="col-5"></div>
                </div>

                {/* Testimonial Carousel */}
                <div className="testimonial-carousel px-4">
                    <div className="row">
                        <div className="col-12 position-relative">
                            {/* Carousel items */}
                            <div className="d-flex justify-content-center" style={{ overflow: 'hidden' }}>
                                {testimonials.map((testimonial, index) => {
                                    // Calculate position: left, center or right
                                    let position = 'center';
                                    let visibilityClass = 'd-none';
                                    let opacity = 1;
                                    
                                    // Show 3 slides - active, previous and next
                                    if (index === activeSlide) {
                                        position = 'center';
                                        visibilityClass = 'd-block';
                                    } else if (index === activeSlide - 1 || (activeSlide === 0 && index === testimonials.length - 1)) {
                                        position = 'left';
                                        visibilityClass = 'd-block';
                                        opacity = 0.5;
                                    } else if (index === activeSlide + 1 || (activeSlide === testimonials.length - 1 && index === 0)) {
                                        position = 'right';
                                        visibilityClass = 'd-block';
                                        opacity = 0.5;
                                    }
                                    
                                    return (
                                        <div 
                                            key={testimonial.id} 
                                            className={`testimonial-item text-center mx-2 ${visibilityClass}`}
                                            style={{ 
                                                width: '400px',
                                                transition: 'all 0.3s ease',
                                                opacity
                                            }}
                                        >
                                            {/* Video thumbnail with play button */}
                                            <div className="video-thumbnail position-relative mb-4">
                                                <img 
                                                    src={testimonial.image} 
                                                    alt="Testimonial video" 
                                                    className="img-fluid w-100"
                                                    style={{ 
                                                        borderRadius: '8px',
                                                        height: '240px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                {/* Play button overlay */}
                                                <div className="play-button position-absolute" style={{
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '60px',
                                                    height: '60px',
                                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer'
                                                }}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill="#1A202C" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            {/* Carousel navigation dots */}
                            <div className="carousel-dots d-flex justify-content-center mt-4">
                                {testimonials.map((_, index) => (
                                    <button 
                                        key={index}
                                        className="carousel-dot mx-1"
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            border: 'none',
                                            backgroundColor: index === activeSlide ? '#1A202C' : '#D1D5DB',
                                            cursor: 'pointer',
                                            padding: 0
                                        }}
                                        onClick={() => handleDotClick(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
