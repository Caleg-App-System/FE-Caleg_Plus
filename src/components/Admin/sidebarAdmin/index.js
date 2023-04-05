import React, { useState, useEffect } from "react";
import "./sidebarAdmin.css";
import { ClipboardData, Person, BoxArrowRight, Archive, Speedometer2, PersonVcard, FileEarmarkPerson, CardChecklist } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutActions } from "../../../config/redux/actions/authActions";
import { DptService } from "../../../services/dptServices";

const SidebarAdmin = ({ page }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [newDptData, setNewDptData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [lengthNotification, setLengthNotification] = useState(0);

  const logoutHandle = () => {
    dispatch(logoutActions(history, 'admin'));
  }

  useEffect(() => {
    DptService.getAllDpt().then((response) => {
      // setNewDptData(response.data.data);
      const filterNewDpt = response.data.data.filter((row) => row.is_new === true)
      const length = filterNewDpt.length;
      setLengthNotification(length);
      setUpdate(!update);
    });
  }, [update]);



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
            <div className="ms-2 text-secondary">Menu</div>
            <li className="nav-item">
              <button className="nav-link btn" onClick={(e) => page('dashboard')}>
                <Speedometer2 color="black" size={25} className='me-2' />
                Dashboard
              </button>
            </li>

            <div className="ms-2 mt-3 text-secondary">Data</div>
            <li className="nav-item">
              <button className="nav-link btn" onClick={(e) => page('dataDPT')}>
                <PersonVcard color="black" size={25} className='me-2' />
                Data DPT
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={(e) => page('newDPTData')}>
                <CardChecklist color="black" size={25} className='me-2' />
                DPT Baru
                {lengthNotification === 0 ? (
                  ""
                ) : (
                  <span class="badge rounded-pill text-bg-danger ms-2">
                    {lengthNotification}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                )}
              </button>
            </li>

            <div className="ms-2 mt-3 text-secondary">Manajamen File</div>
            <li className="nav-item">
              <button className="nav-link btn" onClick={(e) => page('import')}>
                <ClipboardData color="black" size={25} className='me-2' />
                Import Suara
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={(e) => page('importDPT')}>
                <FileEarmarkPerson color="black" size={25} className='me-2' />
                Import DPT
              </button>
            </li>

            <div className="ms-2 mt-3 text-secondary">Manajamen User</div>
            <li className="nav-item">
              <button className="nav-link btn" onClick={(e) => page('users')}>
                <Person color="black" size={25} className='me-2' />
                Data User
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={(e) => page('arsip')}>
                <Archive color="black" size={25} className='me-2' />
                User Arsip
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link px-3 btn logout-button" onClick={logoutHandle} >
                Logout
                <BoxArrowRight size={25} className='icon-logout ms-2' />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SidebarAdmin;
