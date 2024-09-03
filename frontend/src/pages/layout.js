import React from "react";
import {Link} from "react-router-dom";
export function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><i class="bi bi-telephone-forward"></i> DialCheck</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      

    );
}

export function Footer() {

    return(
        <footer className="bg-dark text-white py-4">
  <div className="container text-center">
    <small className="d-block">Phone-Validation-Service</small>
    <small className="d-block mt-2">
      <Link to="mailto:kazemtarhini2@gmail.com" className="text-white">kazemtarhini2@gmail.com</Link>
    </small>
    <small className="d-block text-muted mt-2">&copy; 2024 Phone-Validation-Service. All rights reserved.</small>
  </div>
</footer>



    );
}