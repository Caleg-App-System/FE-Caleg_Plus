import React from "react";

import "./notFound404.css";
import { NotFound } from "../../assets";

const NotFound404 = () => {
  return (
    <>
    <div>
        <div className='container'>
            <div className='content-hero my-5 mx-5'>
                <div className='row'>
                    <div className='col-4 d-flex justify-content-between'>
                        <img className='image-fourzerofour' src={NotFound} alt="" />
                    </div>
                    
                    <div className='col-8 text-center my-auto'>
                        <h1 className="display-1 fw-bold">Error 404</h1>
                        <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                        <p className="lead">
                            The page youre looking for doesnt exist. The URL is invalid.
                        </p>
                        <a href="/" className="btn btn-primary">Back to Home</a>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default NotFound404;