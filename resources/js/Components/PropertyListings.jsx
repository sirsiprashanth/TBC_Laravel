import PropertyCard from './PropertyCard';

export default function PropertyListings() {
    // Property data based on the screenshot
    const properties = [
        {
            title: "Villas & Estates",
            description: "Private Sanctuaries in Dubai's Elite Communities.",
            buttonText: "View Villas",
            imageSrc: "/assets/img/image.png",
            href: "/sell?property_type=Villa"
        },
        {
            title: "Penthouses & Apartments",
            description: "Architectural Masterpieces in The City's Most Coveted Towers.",
            buttonText: "View Apartments",
            imageSrc: "/assets/img/image1.png",
            href: "/sell?property_type=Apartment"
        },
        {
            title: "Off-Plan & Investment Opportunities",
            description: "High-Yield, Future-Ready Developments.",
            buttonText: "View Opportunities",
            imageSrc: "/assets/img/image2.png",
            href: "/off-plan"
        }
    ];

    return (
        <section className="py-5" style={{backgroundColor: 'rgb(253, 240, 221)'}}>
            <div className="container">
                <div className="row">
                    {properties.map((property, index) => (
                        <PropertyCard 
                            key={index}
                            title={property.title}
                            description={property.description}
                            buttonText={property.buttonText}
                            imageSrc={property.imageSrc}
                            href={property.href}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
