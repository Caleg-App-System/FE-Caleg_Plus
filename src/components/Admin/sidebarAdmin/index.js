import React from "react";
import "./sidebarAdmin.css";
import { ClipboardData, Person, BoxArrowRight, Archive } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutActions } from "../../../config/redux/actions/authActions";

const SidebarAdmin = ({ page }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const logoutHandle = () => {
    dispatch(logoutActions(history, 'admin'));
  }
  return (
    <>
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse mt-2">
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            {/* <li className="nav-item">
            <button className="nav-link active btn" onClick={(e)=>page('dashboard')} >
            <HouseExclamation color="black" className='me-2' />
              Dashboard
            </button>
          </li> */}
            <li className="nav-item">
              <button className="nav-link btn" onClick={(e) => page('users')}>
                <Person color="black" size={30} className='me-2' />
                Data User
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={(e) => page('import')}>
                <ClipboardData color="black" size={30} className='me-2' />
                Import Data
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={(e) => page('arsip')}>
                <Archive color="black" size={30} className='me-2' />
                User Arsip
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link px-3 btn logout-button" onClick={logoutHandle} >
                Logout
                <BoxArrowRight size={30} className='icon-logout ms-2' />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SidebarAdmin;
