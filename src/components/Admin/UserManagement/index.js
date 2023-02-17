import React, { useEffect, useState } from "react";
import "./usermanagement.css";
import { UsersService } from "../../../services/usersServices";
import DataTable from "react-data-table-component";
import SweatAlertTimer from "../../../config/SweatAlert/timer";
import { Search } from "react-bootstrap-icons";

const UserManagement = () => {
  const [update, setUpdate] = useState(false);
  const [users, setUsers] = React.useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    UsersService.getUsers().then((res) => {
      setUsers(res.data.data);
    });
  }, [update]);

  const approvalHandler = async (id) => {
    console.log(id);
    await UsersService.approval(id);
    SweatAlertTimer("User Berhasil di Approve", "success");
    setUpdate(!update);
  };

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  const customStyles = {
    rows: {
      style: {
        fontSize: "14px", // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "#d3d3d3",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const columns = [
    {
      name: "NO",
      cell: (row, index) => index + 1,
      width: "80px", //RDT provides index by default
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      width: "100px",
    },
    {
      name: "Status Akun",
      selector: (row) => (row.is_verified_account === true ? "Terverifikasi" : "Belum Verifikasi"),
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.is_verified_account === false,
          style: {
            color: "red",
          }
        },
      ]
    },
    {
      name: "Status Approval",
      selector: (row) => (row.is_verified_role === true ? "Approve" : "Belum Approve"),
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.is_verified_role === false,
          style: {
            color: "red",
          }
        },
      ]
    },
    {
      name: "Aksi",
      cell: (row) => (
        <button className="btn btn-primary btn-sm" onClick={() => approvalHandler(row.id)}>
          Acc
        </button>
      ),
    },
  ];

  return (
    <>
      <main className="container-usermanagement col-md-9 col-lg-11">
        <div className="content-usermanagement px-2 py-2">
          <div className="table-usermanagement text-center">
            <DataTable
              title="Users"
              columns={columns}
              data={users.filter((row) => row.username.toLowerCase().includes(filterText.toLowerCase()))}
              subHeader
              subHeaderComponent={
                <div className="box-filter">
                  <Search></Search>
                  <input className="input-filter" type="search" placeholder="Cari username" onChange={handleFilter} />
                </div>
              }
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>
        {/* </div> */}
      </main>
    </>
  );
};

export default UserManagement;
