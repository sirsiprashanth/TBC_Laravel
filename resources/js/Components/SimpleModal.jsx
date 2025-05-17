export default function SimpleModal({ show, onClose, title, children }) {
    if (!show) return null;

    return (
        <>
            {/* Modal Backdrop */}
            <div 
                className="modal-backdrop show"
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(26, 32, 44, 0.8)',
                    zIndex: 1040,
                    backdropFilter: 'blur(5px)'
                }}
            />
            
            {/* Modal Dialog */}
            <div 
                className="modal show d-block"
                tabIndex="-1"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1050
                }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ 
                        backgroundColor: '#FFF0DE',
                        border: 'none',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}>
                        <div className="modal-header border-0" style={{
                            padding: '30px 30px 20px 30px',
                            background: 'linear-gradient(to bottom, #FFF7EC, #FFF0DE)'
                        }}>
                            <h5 
                                className="modal-title"
                                style={{ 
                                    fontFamily: 'Agatho', 
                                    fontSize: '28px',
                                    color: '#1A202C',
                                    fontWeight: '500'
                                }}
                            >
                                {title}
                            </h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                aria-label="Close"
                                onClick={onClose}
                                style={{
                                    backgroundColor: '#F97316',
                                    borderRadius: '50%',
                                    opacity: '1',
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            ></button>
                        </div>
                        <div className="modal-body" style={{ padding: '30px' }}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}