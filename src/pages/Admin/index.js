import React, { useState } from "react";

import { DashboardAdmin, UserManagement, UserArchived, SidebarAdmin, NavbarAdmin, ImportFile, ImportFileDPT, NewDPTData } from "../../components";

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
          {componentOpen === 'dashboard' && <DashboardAdmin />}
          {componentOpen === 'users' && <UserManagement />}
          {componentOpen === 'arsip' && <UserArchived />}
          {componentOpen === 'import' && <ImportFile />}
          {componentOpen === 'importDPT' && <ImportFileDPT />}
          {componentOpen === 'newDPTData' && <NewDPTData />}
        </div>
      </div>
    </>
  );
};

export default Admin;
