import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { url, auth } = usePage().props;
    
    // Function to check if a link is active
    const isActive = (path) => {
        if (!url) return false; // Safety check for undefined url
        if (path === '/' && url === '/') return true;
        if (path !== '/' && url.startsWith(path)) return true;
        return false;
    };
    
    const navStyles = {
        container: {
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            margin: '25px 0',
            backgroundColor: 'rgb(253, 240, 221)'
        },
        brand: {
            maxWidth: '180px'
        },
        navItem: {
            fontFamily: 'Glancyr',
            fontSize: '16px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            margin: '0 15px',
            color: '#232A40'
        },
        activeNavItem: {
            fontWeight: '600',
            color: '#030812'
        },
        contactButton: {
            fontFamily: 'Glancyr',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: '#232A40',
            color: 'white',
            borderRadius: '25px',
            padding: '8px 24px',
            marginLeft: '20px',
            border: 'none'
        },
        activeContactButton: {
            backgroundColor: '#F7945F',
            color: 'white'
        }
    };
    
    return (
        <nav className="navbar navbar-expand-md py-0" style={navStyles.container}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" href="/">
                    <img className="img-fluid" src="/assets/img/Frame 30 (1).png" alt="The Boros Collection" />
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navcol-5"
                >
                    <span className="visually-hidden">Toggle navigation</span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-5">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                href="/sell"
                                style={{
                                    ...navStyles.navItem,
                                    ...(isActive('/sell') ? navStyles.activeNavItem : {})
                                }}
                            >
                                Sell
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                href="/rent"
                                style={{
                                    ...navStyles.navItem,
                                    ...(isActive('/rent') ? navStyles.activeNavItem : {})
                                }}
                            >
                                Rent
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                href="/off-plan"
                                style={{
                                    ...navStyles.navItem,
                                    ...(isActive('/off-plan') ? navStyles.activeNavItem : {})
                                }}
                            >
                                Off Plan
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                href="/about-us"
                                style={{
                                    ...navStyles.navItem,
                                    ...(isActive('/about-us') ? navStyles.activeNavItem : {})
                                }}
                            >
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                href="/blogs"
                                style={{
                                    ...navStyles.navItem,
                                    ...(isActive('/blogs') ? navStyles.activeNavItem : {})
                                }}
                            >
                                Blogs
                            </Link>
                        </li>
                    </ul>
                    <Link 
                        className="btn me-2" 
                        role="button" 
                        href="/contact-us"
                        style={{
                            ...navStyles.contactButton,
                            ...(isActive('/contact-us') ? navStyles.activeContactButton : {})
                        }}
                    >
                        Contact Us
                    </Link>
                    
                    {auth.user ? (
                        <Link 
                            className="btn" 
                            role="button" 
                            href="/dashboard"
                            style={{
                                fontFamily: 'Glancyr',
                                fontSize: '16px',
                                fontWeight: '500',
                                backgroundColor: '#F97316',
                                color: 'white',
                                borderRadius: '25px',
                                padding: '8px 24px',
                                border: 'none'
                            }}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link 
                            className="btn" 
                            role="button" 
                            href="/login"
                            style={{
                                fontFamily: 'Glancyr',
                                fontSize: '16px',
                                fontWeight: '500',
                                backgroundColor: '#F97316',
                                color: 'white',
                                borderRadius: '25px',
                                padding: '8px 24px',
                                border: 'none'
                            }}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}