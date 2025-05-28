import { Link } from '@inertiajs/react';

export default function PropertyCard({ title, description, buttonText, imageSrc, href }) {
    return (
        <div className="col-md-4">
            <div className='pro-list-box'>
                <img 
                    src={imageSrc || "https://via.placeholder.com/350x200"} 
                    alt={title} 
                    className="w-100 d-block mb-3" 
                    style={{borderRadius: '6px'}}
                />
                <h4 className="text-center mb-2">{title || "Villas & Estates"}</h4>
                <p className="text-center mb-4">
                    {description || "Private Sanctuaries in Dubai's Elite Communities."}
                </p>
                <div className="text-center">
                    <Link 
                        href={href || "#"} 
                        className="btn px-4" 
                        style={{
                            borderRadius: '25px', 
                            border: '1px solid #232A40',
                            color: '#232A40',
                            backgroundColor: 'transparent'
                        }}
                    >
                        {buttonText || "View Villas"} <span>&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
