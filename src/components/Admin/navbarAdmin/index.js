import React from 'react'
import './navbarAdmin.css'
import { LogoWhite } from '../../../assets';
import { PersonCircle } from 'react-bootstrap-icons';

const NavbarAdmin = () => {

  // const logoutHandle = () => {
  //     dispatch(logoutActions(history,'admin'));
  // }
  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/admin"><img className='img-logo' src={LogoWhite} alt="" />       ADMIN CALEG PLUS</a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <button className="nav-link px-3 btn" onClick="" >
              Admin
              <PersonCircle size={30} className='icon-logout ms-2' />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default NavbarAdmin
