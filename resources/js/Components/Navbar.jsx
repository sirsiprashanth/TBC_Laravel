import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { url } = usePage();

    // Function to check if a link is active
    const isActive = (path) => {
        if (path === '/' && url === '/') return true;
        if (path !== '/' && url.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="navbar navbar-dark navbar-expand-md bg-dark py-3">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" href="/">
                    <img className="img-fluid" src="/assets/img/Frame%2030.png" alt="Logo" />
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
                    <ul className="navbar-nav ms-auto">
                        {/* Buy and Off-Plan links hidden until content is available */}
                        {/* <li className="nav-item"><Link className={`nav-link ${isActive('/buy') ? 'active' : ''}`} href="/buy">Buy</Link></li> */}
                        <li className="nav-item"><Link className={`nav-link ${isActive('/sell') ? 'active' : ''}`} href="/sell">Sell</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${isActive('/rent') ? 'active' : ''}`} href="/rent">Rent</Link></li>
                        {/* <li className="nav-item"><Link className={`nav-link ${isActive('/off-plan') ? 'active' : ''}`} href="/off-plan">Off-Plan</Link></li> */}
                        <li className="nav-item"><Link className={`nav-link ${isActive('/about-us') ? 'active' : ''}`} href="/about-us">About US</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${isActive('/blogs') ? 'active' : ''}`} href="/blogs">Blogs</Link></li>
                    </ul>
                    <Link
                        className={`btn ${isActive('/contact-us') ? 'btn-light' : 'btn-primary'} ms-md-2`}
                        role="button"
                        href="/contact-us"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </nav>
    );
}
