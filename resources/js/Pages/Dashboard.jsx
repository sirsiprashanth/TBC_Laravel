import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Dashboard() {
    const { auth } = usePage().props;
    const isAdmin = auth.user?.is_admin;
    
    return (
        <>
            <Head title="Dashboard" />
            <div style={{background: 'rgb(255,241,222)', minHeight: '100vh'}}>
                <Navbar />
                
                <div className="container py-5">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h1 style={{ 
                                fontFamily: 'Agatho', 
                                fontSize: '36px',
                                color: '#232A40',
                                textAlign: 'center',
                                marginBottom: '30px'
                            }}>
                                Dashboard
                            </h1>
                            
                            <div className="card" style={{ 
                                border: '1px solid rgba(0,0,0,0.1)', 
                                borderRadius: '10px',
                                padding: '35px 30px',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                            }}>
                                <h2 style={{ 
                                    fontFamily: 'Agatho', 
                                    fontSize: '24px',
                                    color: '#232A40',
                                    marginBottom: '20px'
                                }}>
                                    Welcome, {auth.user.name}!
                                </h2>
                                
                                {isAdmin && (
                                    <div className="admin-options mb-5">
                                        <h3 style={{ 
                                            fontFamily: 'Glancyr', 
                                            fontSize: '18px',
                                            color: '#232A40',
                                            marginBottom: '15px',
                                            fontWeight: '600'
                                        }}>
                                            Admin Options
                                        </h3>
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <Link 
                                                    href={route('admin.properties.index')} 
                                                    className="d-block text-decoration-none"
                                                >
                                                    <div style={{ 
                                                        backgroundColor: '#232A40', 
                                                        borderRadius: '8px',
                                                        padding: '20px',
                                                        textAlign: 'center',
                                                        color: 'white',
                                                        fontFamily: 'Glancyr',
                                                        transition: 'all 0.3s ease',
                                                        height: '100%'
                                                    }}>
                                                        <i className="bi bi-house-gear" style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}></i>
                                                        <span style={{ fontSize: '16px' }}>Manage Properties</span>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4">
                                                <Link 
                                                    href={route('admin.properties.create')} 
                                                    className="d-block text-decoration-none"
                                                >
                                                    <div style={{ 
                                                        backgroundColor: '#F97316', 
                                                        borderRadius: '8px',
                                                        padding: '20px',
                                                        textAlign: 'center',
                                                        color: 'white',
                                                        fontFamily: 'Glancyr',
                                                        transition: 'all 0.3s ease',
                                                        height: '100%'
                                                    }}>
                                                        <i className="bi bi-plus-square" style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}></i>
                                                        <span style={{ fontSize: '16px' }}>Add New Property</span>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4">
                                                <Link 
                                                    href={route('admin.properties.import')}
                                                    className="d-block text-decoration-none"
                                                >
                                                    <div style={{ 
                                                        backgroundColor: '#4f46e5', 
                                                        borderRadius: '8px',
                                                        padding: '20px',
                                                        textAlign: 'center',
                                                        color: 'white',
                                                        fontFamily: 'Glancyr',
                                                        transition: 'all 0.3s ease',
                                                        height: '100%'
                                                    }}>
                                                        <i className="bi bi-cloud-arrow-down" style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}></i>
                                                        <span style={{ fontSize: '16px' }}>Import Properties</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="user-options">
                                    <h3 style={{ 
                                        fontFamily: 'Glancyr', 
                                        fontSize: '18px',
                                        color: '#232A40',
                                        marginBottom: '15px',
                                        fontWeight: '600'
                                    }}>
                                        Quick Links
                                    </h3>
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <Link
                                                href={route('sell')}
                                                className="d-block text-decoration-none"
                                            >
                                                <div style={{ 
                                                    backgroundColor: '#ffedd5', 
                                                    borderRadius: '8px',
                                                    padding: '20px',
                                                    textAlign: 'center',
                                                    color: '#232A40',
                                                    fontFamily: 'Glancyr',
                                                    transition: 'all 0.3s ease',
                                                    border: '1px solid #fcd7aa',
                                                    height: '100%'
                                                }}>
                                                    <i className="bi bi-house-door" style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}></i>
                                                    <span style={{ fontSize: '16px' }}>Properties for Sale</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col-md-4">
                                            <Link
                                                href={route('rent')}
                                                className="d-block text-decoration-none"
                                            >
                                                <div style={{ 
                                                    backgroundColor: '#ffedd5', 
                                                    borderRadius: '8px',
                                                    padding: '20px',
                                                    textAlign: 'center',
                                                    color: '#232A40',
                                                    fontFamily: 'Glancyr',
                                                    transition: 'all 0.3s ease',
                                                    border: '1px solid #fcd7aa',
                                                    height: '100%'
                                                }}>
                                                    <i className="bi bi-key" style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}></i>
                                                    <span style={{ fontSize: '16px' }}>Rental Properties</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col-md-4">
                                            <Link
                                                href={route('profile.edit')}
                                                className="d-block text-decoration-none"
                                            >
                                                <div style={{ 
                                                    backgroundColor: '#ffedd5', 
                                                    borderRadius: '8px',
                                                    padding: '20px',
                                                    textAlign: 'center',
                                                    color: '#232A40',
                                                    fontFamily: 'Glancyr',
                                                    transition: 'all 0.3s ease',
                                                    border: '1px solid #fcd7aa',
                                                    height: '100%'
                                                }}>
                                                    <i className="bi bi-person-circle" style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}></i>
                                                    <span style={{ fontSize: '16px' }}>Edit Profile</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
}
