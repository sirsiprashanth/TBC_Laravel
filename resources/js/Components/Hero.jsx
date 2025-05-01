export default function Hero() {
    return (
        <section className="my-3">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1 border border-end-0"></div>
                    <div className="col-md-5 text-center text-md-start border">
                        <p className="fw-light m-0 mt-2 text-secondary" style={{fontFamily: 'Glancyr'}}>OUR COLLECTION</p>
                        <h1 className="display-1" style={{fontFamily: 'Agatho', color: '#232A40'}}>Exclusive Residences</h1>
                    </div>
                    <div className="col-md-6 d-flex align-items-center border border-start-0">
                        <p className="text-muted" style={{fontFamily: 'Glancyr'}}>
                            Dubai's finest properties, hand-selected for the discerning buyer.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
