import React from "react";
import "./sidebarAdmin.css";
import { ClipboardData, Person} from 'react-bootstrap-icons';

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
              Users
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" onClick={(e)=>page('import')}>
            <ClipboardData color="black" size={30} className='me-2' />
              Import Data
            </button>
          </li>
        </ul>
        </div>
        </nav>
    </>
  );
};

export default SidebarAdmin;
