import { Link } from '@inertiajs/react';

export default function Navbar() {
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
                        <li className="nav-item"><Link className="nav-link active" href="#">Buy</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="/sell">Sell</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="/rent">Rent</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="/off-plan">Off-Plan</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="/about-us">About US</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="/blogs">Blogs</Link></li>
                    </ul>
                    <Link className="btn btn-primary ms-md-2" role="button" href="/contact-us">Contact Us</Link>
                </div>
            </div>
        </nav>
    );
}
