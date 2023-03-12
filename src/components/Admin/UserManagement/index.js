import React, { useEffect, useState } from "react";
import "./usermanagement.css";
import { UsersService } from "../../../services/usersServices";
import DataTable from "react-data-table-component";
import SweatAlertTimer from "../../../config/SweatAlert/timer";
import SweatAlert from "../../../config/SweatAlert";
import { Search } from "react-bootstrap-icons";
import PuffLoader from "react-spinners/PuffLoader";

const UserManagement = () => {
  const [update, setUpdate] = useState(false);
  const [users, setUsers] = React.useState([]);
  const [filterText, setFilterText] = useState("");
  const [pending, setPending] = useState(true);

  useEffect(() => {
    UsersService.getUsers().then((res) => {
      setUsers(res.data.data);
    });
    const timeout = setTimeout(() => {
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [update]);

  const approvalHandler = async (id) => {
    console.log(id);
    await UsersService.approval(id);
    SweatAlertTimer("User Berhasil di Approve", "success");
    setUpdate(!update);
  };

  const archivedHandler = async (username) => {
    const response = await UsersService.archived(username);
    SweatAlert(response.data.message, 'success');
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
      name: "Name",
      selector: "name",
      sortable: true,
      cell: row => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', textAlign: 'left' }}>{row.name}</div>,
    },
    {
      name: "Role",
      selector: "role",
      sortable: true,
      cell: row => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', textAlign: 'left' }}>{row.role}</div>,
    },
    {
      name: "Area Kerja",
      selector: "working_area",
      sortable: true,
      cell: row => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', textAlign: 'left' }}>{row.working_area ? row.working_area : "N/A"}</div>,
      conditionalCellStyles: [
        {
          when: (row) => row.working_area === null,
          style: {
            color: "red",
          }
        },
      ]
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
      width: "63px",
      cell: (row) => (
        row.is_verified_role === false ? (
          <button className="btn btn-primary btn-sm" onClick={() => approvalHandler(row.id)}>
            Acc
          </button>
        ) : (
          <button className="btn btn-secondary btn-sm" disabled>
            Acc
          </button>
        )
      ),
    },
    {
      name: "",
      cell: (row) => (
        <>
          <button className="btn btn-info btn-sm me-3 text-white">
            Detail
          </button>
          <button className="btn btn-success btn-sm" onClick={() => archivedHandler(row.username)}>
            Arsip
          </button>
        </>
      ),
    }
  ];

  return (
    <>
      <main className="container-usermanagement col-md-9 col-lg-11">
        <div className="content-usermanagement px-2 py-2">
          <div className="table-usermanagement text-center">
            <DataTable
              title="DATA USER TERDAFTAR"
              columns={columns}
              data={users.filter((row) => row.is_archived === false && row.name && row.name.toLowerCase().includes(filterText.toLowerCase()))}
              subHeader
              subHeaderComponent={
                <div className="box-filter">
                  <Search></Search>
                  <input className="input-filter" type="search" placeholder="Cari nama user" onChange={handleFilter} />
                </div>
              }
              customStyles={customStyles}
              progressPending={pending}
              progressComponent={
                <PuffLoader
                  color={'#e49011'}
                  size={80} />}
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
