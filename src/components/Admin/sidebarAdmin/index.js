import React from "react";
import "./sidebarAdmin.css";
import { ClipboardData, Person, BoxArrowRight} from 'react-bootstrap-icons';

const SidebarAdmin = ({page}) => {
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
            <button className="nav-link btn" onClick={(e)=>page('users')}>
            <Person color="black" size={30} className='me-2' />
              Data User
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" onClick={(e)=>page('import')}>
            <ClipboardData color="black" size={30} className='me-2' />
              Import Data
            </button>
          </li>
          <li className="nav-item">
          <button className="nav-link px-3 btn logout-button" onClick="" >
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
