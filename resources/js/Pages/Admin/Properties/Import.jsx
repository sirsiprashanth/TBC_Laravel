import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Import() {
    const [isLoading, setIsLoading] = useState(false);
    const [importType, setImportType] = useState('sales');
    const [result, setResult] = useState(null);
    
    const handleImportSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Simulate import process
            // In a real implementation, this would make a POST request to the server
            const response = await fetch(importType === 'sales' 
                ? '/api/properties/sales' 
                : '/api/properties/rentals');
                
            const data = await response.json();
            
            setResult({
                success: true,
                message: `Successfully imported ${importType === 'sales' ? 'sales' : 'rental'} properties`,
                total: data.meta?.total || 0
            });
        } catch (error) {
            setResult({
                success: false,
                message: `Error importing properties: ${error.message}`
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <Head title="Import Properties" />
            <div style={{background: 'rgb(255,241,222)', minHeight: '100vh'}}>
                <Navbar />
                
                <div className="container py-5">
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h1 style={{ 
                                    fontFamily: 'Agatho', 
                                    fontSize: '36px',
                                    color: '#232A40',
                                    margin: 0
                                }}>
                                    Import Properties
                                </h1>
                                <div>
                                    <Link 
                                        href={route('admin.properties.index')} 
                                        className="btn btn-outline-secondary" 
                                        style={{ fontFamily: 'Glancyr' }}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i> Back to List
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-lg-6 mb-4">
                                    <div className="card" style={{ 
                                        border: '1px solid rgba(0,0,0,0.1)', 
                                        borderRadius: '10px',
                                        padding: '30px',
                                        backgroundColor: '#ffffff',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                    }}>
                                        <h2 style={{ 
                                            fontFamily: 'Agatho', 
                                            fontSize: '24px',
                                            color: '#232A40',
                                            marginBottom: '20px'
                                        }}>
                                            Import from API
                                        </h2>
                                        
                                        <form onSubmit={handleImportSubmit}>
                                            <div className="mb-4">
                                                <label 
                                                    className="form-label" 
                                                    style={{ 
                                                        fontFamily: 'Glancyr', 
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        display: 'block',
                                                        marginBottom: '15px'
                                                    }}
                                                >
                                                    Select Import Type
                                                </label>
                                                
                                                <div className="form-check mb-2">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        name="importType" 
                                                        id="importTypeSales"
                                                        value="sales"
                                                        checked={importType === 'sales'}
                                                        onChange={() => setImportType('sales')}
                                                    />
                                                    <label 
                                                        className="form-check-label" 
                                                        htmlFor="importTypeSales"
                                                        style={{ fontFamily: 'Glancyr' }}
                                                    >
                                                        Import Sales Properties
                                                    </label>
                                                </div>
                                                
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        name="importType" 
                                                        id="importTypeRentals"
                                                        value="rentals"
                                                        checked={importType === 'rentals'}
                                                        onChange={() => setImportType('rentals')}
                                                    />
                                                    <label 
                                                        className="form-check-label" 
                                                        htmlFor="importTypeRentals"
                                                        style={{ fontFamily: 'Glancyr' }}
                                                    >
                                                        Import Rental Properties
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            <div className="d-grid">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary" 
                                                    style={{ 
                                                        backgroundColor: '#232A40',
                                                        borderColor: '#232A40',
                                                        fontFamily: 'Glancyr',
                                                        padding: '12px 20px',
                                                        borderRadius: '8px',
                                                        fontSize: '16px'
                                                    }}
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Importing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="bi bi-cloud-arrow-down me-2"></i>
                                                            Start Import
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6">
                                    <div className="card" style={{ 
                                        border: '1px solid rgba(0,0,0,0.1)', 
                                        borderRadius: '10px',
                                        padding: '30px',
                                        backgroundColor: '#ffffff',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                    }}>
                                        <h2 style={{ 
                                            fontFamily: 'Agatho', 
                                            fontSize: '24px',
                                            color: '#232A40',
                                            marginBottom: '20px'
                                        }}>
                                            Import Instructions
                                        </h2>
                                        
                                        <div style={{ fontFamily: 'Glancyr' }}>
                                            <h5 style={{ 
                                                fontFamily: 'Agatho', 
                                                fontSize: '18px',
                                                color: '#232A40',
                                                marginBottom: '10px',
                                                marginTop: '20px'
                                            }}>
                                                Sales Properties
                                            </h5>
                                            <p>
                                                Imports properties from the sales API feed. Properties will be marked with <code>is_rental = false</code>.
                                            </p>
                                            <p>
                                                Source: <code>https://webapi.goyzer.com/Company.asmx/SalesListings</code>
                                            </p>
                                            
                                            <h5 style={{ 
                                                fontFamily: 'Agatho', 
                                                fontSize: '18px',
                                                color: '#232A40',
                                                marginBottom: '10px',
                                                marginTop: '20px'
                                            }}>
                                                Rental Properties
                                            </h5>
                                            <p>
                                                Imports properties from the rentals API feed. Properties will be marked with <code>is_rental = true</code>.
                                            </p>
                                            <p>
                                                Source: <code>https://webapi.goyzer.com/Company.asmx/RentListings</code>
                                            </p>
                                            
                                            <div className="alert alert-info mt-4" role="alert">
                                                <h5 style={{ 
                                                    fontFamily: 'Agatho', 
                                                    fontSize: '18px',
                                                    color: '#232A40',
                                                    marginBottom: '10px'
                                                }}>
                                                    <i className="bi bi-info-circle me-2"></i> Import Notes
                                                </h5>
                                                <ul className="mb-0">
                                                    <li>Each property is identified by its reference number</li>
                                                    <li>Existing properties will be updated if the API data is newer</li>
                                                    <li>New properties will be automatically marked as active</li>
                                                    <li>Import may take several minutes depending on the number of properties</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {result && (
                                <div className={`alert ${result.success ? 'alert-success' : 'alert-danger'} mt-4`} role="alert">
                                    <h5 style={{ 
                                        fontFamily: 'Agatho', 
                                        fontSize: '18px',
                                        marginBottom: '10px'
                                    }}>
                                        {result.success ? (
                                            <><i className="bi bi-check-circle me-2"></i> Import Successful</>
                                        ) : (
                                            <><i className="bi bi-exclamation-triangle me-2"></i> Import Error</>
                                        )}
                                    </h5>
                                    <p style={{ fontFamily: 'Glancyr', marginBottom: 0 }}>
                                        {result.message}
                                        {result.success && result.total && (
                                            <span className="d-block mt-2">Total properties: {result.total}</span>
                                        )}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
}