import { useEffect, useRef } from 'react';

export default function BootstrapModal({ show, onClose, title, children }) {
    const modalRef = useRef(null);
    const bootstrapModalRef = useRef(null);

    useEffect(() => {
        // Check if Bootstrap is loaded
        if (typeof window !== 'undefined' && window.bootstrap && window.bootstrap.Modal) {
            const modalElement = modalRef.current;
            if (modalElement && !bootstrapModalRef.current) {
                bootstrapModalRef.current = new window.bootstrap.Modal(modalElement, {
                    backdrop: 'static',
                    keyboard: false
                });
            }

            if (bootstrapModalRef.current) {
                if (show) {
                    bootstrapModalRef.current.show();
                } else {
                    bootstrapModalRef.current.hide();
                }
            }
        }
    }, [show]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (bootstrapModalRef.current) {
                bootstrapModalRef.current.dispose();
            }
        };
    }, []);

    if (!show) return null;

    return (
        <div 
            ref={modalRef}
            className="modal fade" 
            id="propertyModal" 
            tabIndex="-1" 
            aria-labelledby="propertyModalLabel" 
            aria-hidden="true"
            onClick={(e) => {
                if (e.target.classList.contains('modal')) {
                    onClose();
                }
            }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ backgroundColor: '#FFF0DE' }}>
                    <div className="modal-header border-0">
                        <h5 
                            className="modal-title" 
                            id="propertyModalLabel"
                            style={{ fontFamily: 'Agatho', fontSize: '24px' }}
                        >
                            {title}
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}