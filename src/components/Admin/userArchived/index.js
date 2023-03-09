import React, { useState, useEffect } from 'react'
import './userArchived.css'
import { UsersService } from "../../../services/usersServices";
import DataTable from "react-data-table-component";
import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";
import SweatAlert from '../../../config/SweatAlert';
import { Search } from "react-bootstrap-icons";
import PuffLoader from "react-spinners/PuffLoader";

const UserArchived = () => {
  const [update, setUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  console.log(users)
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

  // hit api for unarchived
  const unarchivedHandler = async (username) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Apakah anda yakin?',
      text: `Username ${username} akan diaktifkan kembali`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, aktifkan!'
    }).then((result) => {
      if (result.isConfirmed) {
        UsersService.unarchived(username);
        SweatAlert(`Username ${username} berhasil diaktifkan`, 'success');
        setUpdate(!update);
      }
    })
  }

  // const unarchivedHandler = async (username) => {
  //   const response = await UsersService.unarchived(username);
  //   SweatAlert(response.data.message, 'success');
  //   setUpdate(!update);
  // }

  //filtering function
  const handleFilter = (e) => {
    setFilterText(e.target.value);
  }

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
      name: "Alamat",
      selector: "address",
      sortable: true,
      cell: row => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', textAlign: 'left' }}>{row.address}</div>,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: row => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', textAlign: 'left' }}>{row.name}</div>,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      width: "100px",
    },
    {
      name: "Status Aktif",
      selector: (row) => (row.is_archived === true ? "Tidak Aktif" : "Aktif"),
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.is_archived === true,
          style: {
            color: "red",
          }
        },
      ]
    },
    {
      name: "Aksi",
      width: "100px",
      cell: (row) => (
        <>
          <button className="btn btn-success btn-sm" onClick={() => unarchivedHandler(row.username)}>
            Aktifkan
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <main className="container-userarchived col-md-9 col-lg-11">
        <div className="content-userarchived px-2 py-2 text-center">
          <DataTable
            title="DATA USER DIARSIPKAN"
            columns={columns}
            // data={users.filter((row) => row.name && row.name.toLowerCase().includes(filterText.toLowerCase()))}
            data={users.filter((row) => row.is_archived === true && row.name && row.name.toLowerCase().includes(filterText.toLowerCase()))}
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
      </main>
    </>
  )
}

export default UserArchived