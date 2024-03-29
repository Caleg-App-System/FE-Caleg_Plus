import React from "react";
import "./navbar.css";
import { LogoBlack } from "../../assets";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutActions } from "../../config/redux/actions/authActions";

const Navbar = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const logoutHandle = () => {
    dispatch(logoutActions(history, "user"));
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg bg-light px-5">
        <div className="container-fluid">
          <a className="navbar-brand text-danger fw-bold" href="/">
            <img className="logo me-2" src={LogoBlack} alt="Logo" />
            CALEG_PLUS
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Menu Utama
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/election/data">
                      Suara 2019
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
            </ul>
            <button className="btn btn-danger" onClick={logoutHandle}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
