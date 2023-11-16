import { connect } from "react-redux";

const Page404 = () => {
    return(
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 data-testid="notif1" className="display-1 fw-bold">404</h1>
                <p data-testid="notif2" className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead" data-testid="notif3">
                    The page you’re looking for doesn’t exist.
                  </p>
            </div>
        </div>
    )
}
export default connect()(Page404);