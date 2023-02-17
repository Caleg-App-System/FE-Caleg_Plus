import React, {useState} from "react";

import { UserManagement, SidebarAdmin, NavbarAdmin, UploadFile, ImportFile } from "../../components";

const Admin = () => {
  const [componentOpen, setComponentOpen] = useState('users')

  const handleComponent = (e) => {
    setComponentOpen(e)
  }
  return (
    <>
    <NavbarAdmin />
      <div className="container-fluid">
        <div className="row">
            <SidebarAdmin page={handleComponent} />
            {componentOpen === 'users' && <UserManagement />}
            {componentOpen === 'import' && <ImportFile />}
        </div>
    </div>
    </>
  );
};

export default Admin;
