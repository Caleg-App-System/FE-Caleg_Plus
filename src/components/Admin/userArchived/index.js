import React, { useState, useEffect } from 'react'
import './userArchived.css'
import { UsersService } from "../../../services/usersServices";
import DataTable from "react-data-table-component";
import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";
import SweatAlert from '../../../config/SweatAlert';
import { Search } from "react-bootstrap-icons";
import PuffLoader from "react-spinners/PuffLoader";
import { Bookmarks } from 'react-bootstrap-icons';

const UserArchived = () => {
  const [update, setUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  console.log(users)
  const [filterText, setFilterText] = useState("");
  const [pending, setPending] = useState(true);
  const [detailValue, setDetailValue] = useState([]);

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

  const detailHandler = async (id) => {
    const HitUser = await UsersService.getUsersById(id);
    setDetailValue(HitUser.data.data);
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
      cell: (row) => (
        <>
          <button className="btn btn-info btn-sm me-3 text-white w-100" onClick={() => detailHandler(row.id)} data-bs-toggle="modal" data-bs-target='#detailModal' >
            Detail
          </button>
          <button className="btn btn-success btn-sm w-100" onClick={() => unarchivedHandler(row.username)}>
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
            // data={users.filter((row) => row.is_archived === true && row.name && row.name.toLowerCase().includes(filterText.toLowerCase()))}
            data={users.filter((row) => row.is_archived === true)}
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

        {/* Modal detail */}
        <div className="modal fade" id='detailModal' aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{`Detail personal ${detailValue.name}`}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row detail-profile">
                  <div className="col-lg-4">
                    <div className="card card-one shadow-sm">
                      <div className="card-header card-two bg-transparent text-center">
                        <img className="profile_img" src={detailValue.photo ? detailValue.photo : "https://i.ibb.co/SyGtPFs/Profile.png"} alt="Profile_Pict" />
                        <h3>{detailValue.name}</h3>
                      </div>
                      <div className="card-body">
                        <h3 className="mb-0 text-center"><strong className="pr-1">{detailValue.role}</strong></h3>
                        <h4 className="mb-0 text-center"><strong className="pr-1">{detailValue.working_area}</strong></h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card card-one shadow-sm">
                      <div className="card-header card-two bg-transparent border-0">
                        <h5 className="mb-0"><Bookmarks size={20} className='me-2' />Informasi umum</h5>
                      </div>
                      <div className="card-body pt-0">
                        <table className="table table-borderless">
                          <tr>
                            <th width="30%">Username</th>
                            <td width="2%">:</td>
                            <td>{detailValue.username}</td>
                          </tr>
                          <tr>
                            <th width="30%">Email	</th>
                            <td width="2%">:</td>
                            <td>{detailValue.email}</td>
                          </tr>
                          <tr>
                            <th width="30%">No. Telp</th>
                            <td width="2%">:</td>
                            <td>{detailValue.phone}</td>
                          </tr>
                          <tr>
                            <th width="30%" className="align-top">Alamat</th>
                            <td width="2%" className="align-top">:</td>
                            <td>{detailValue.address}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className="card card-one shadow-sm mt-4">
                      <div className="card-header card-two bg-transparent border-0">
                        <h5 className="mb-0"><Bookmarks size={20} className='me-2' />Informasi Tambahan</h5>
                      </div>
                      <div className="card-body pt-0">
                        <div className="row">
                          <div className="col-4">
                            <p>Email Verifikasi</p>
                            <div className={detailValue.is_verified_account === true ? "btn btn-info text-white rounded-pill btn-sm" : "btn btn-danger rounded-pill btn-sm"} style={{ width: "90%" }}>{detailValue.is_verified_account === true ? "Verified" : "Unverified"}</div>
                          </div>
                          <div className="col-4">
                            <p>Approval</p>
                            <div className={detailValue.is_verified_role === true ? "btn btn-info text-white rounded-pill btn-sm" : "btn btn-danger rounded-pill btn-sm"} style={{ width: "90%" }}>{detailValue.is_verified_role === true ? "Approved" : "Unapproved"}</div>
                          </div>
                          <div className="col-4">
                            <p>Status Akun</p>
                            <div className={detailValue.is_archived === false ? "btn btn-info text-white rounded-pill btn-sm" : "btn btn-danger rounded-pill btn-sm"} style={{ width: "90%" }}>{detailValue.is_archived === false ? "Aktif" : "Nonaktif"}</div>
                          </div>
                          <div className="col mt-3">
                            <p>Foto KTP</p>
                            <img className="ktp_img" src={detailValue.photo_ktp ? detailValue.photo_ktp : "https://i.ibb.co/DVfpvSK/pngwing-com.png"} alt="KTP_Pict" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default UserArchived