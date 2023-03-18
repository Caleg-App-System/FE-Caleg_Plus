import React, { useEffect, useState } from "react";
import "./usermanagement.css";
import { UsersService } from "../../../services/usersServices";
import DataTable from "react-data-table-component";
import SweatAlertTimer from "../../../config/SweatAlert/timer";
import SweatAlert from "../../../config/SweatAlert";
import { Search } from "react-bootstrap-icons";
import PuffLoader from "react-spinners/PuffLoader";
import { Bookmarks, Pencil } from 'react-bootstrap-icons';

const UserManagement = () => {
  const [update, setUpdate] = useState(false);
  const [users, setUsers] = React.useState([]);
  const [filterText, setFilterText] = useState("");
  const [pending, setPending] = useState(true);
  const [detailValue, setDetailValue] = useState([]);

  const [blobUrl, setBlobUrl] = useState(null);
  console.log(blobUrl)

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

  const detailHandler = async (id) => {
    const HitUser = await UsersService.getUsersById(id);
    // console.log(HitUser.data.data);

    setDetailValue(HitUser.data.data);
    // setWorkingArea(HitUser.data.data.working_area)
    console.log(HitUser.data.data.photo)
    // const blob = new Blob([HitUser.data.data.photo], { type: 'image/jpeg' });
    // const blobUrl = URL.createObjectURL(blob);
    // setBlobUrl(blobUrl);
    const img = new Buffer.from(HitUser.data.data.photo).toString("base64")
    console.log(img)
    setBlobUrl("data:image/png;base64," + img)
  }

  const updateWorkingAreaHandler = async (id) => {
    const response = await UsersService.updateWorkingArea(id, detailValue);
    SweatAlert(response.data.message, 'success');
    setUpdate(!update);
  }
  // const base64String = btoa(String.fromCharCode(...new Uint8Array(blobUrl)));

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
      width: "75px",
      cell: (row) => (
        row.is_verified_role === false ? (
          <button className="btn btn-primary btn-sm w-100" onClick={() => approvalHandler(row.id)}>
            Acc
          </button>
        ) : (
          <button className="btn btn-secondary btn-sm w-100" disabled>
            Acc
          </button>
        )
      ),
    },
    {
      name: "",
      cell: (row) => (
        <>
          <button className="btn btn-info btn-sm me-3 text-white w-75" onClick={() => detailHandler(row.id)} data-bs-toggle="modal" data-bs-target='#detailModal' >
            Detail
          </button>
          <button className="btn btn-success btn-sm w-75" onClick={() => archivedHandler(row.username)}>
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
              // data={users.filter((row) => row.is_archived === false && row.name && row.name.toLowerCase().includes(filterText.toLowerCase()))}
              data={users.filter((row) => row.is_archived === false)}
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

        {/* Modal detail */}
        <div className="modal fade z-1" id='detailModal' aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{`Detail Personal User`}</h5>
                <button className="btn btn-outline-primary btn-sm rounded-3 button-workingArea" data-bs-toggle="modal" data-bs-target='#WorkingAreaModal' style={detailValue.role === "CALEG" ? { display: "none" } : { display: "inline" }}>
                  <Pencil size={20} className='me-2' />
                  Area Kerja
                </button>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row detail-profile">
                  <div className="col-lg-4">
                    <div className="card card-one shadow-sm">
                      <div className="card-header card-two bg-transparent text-center">
                        <img className="profile_img mb-2" src={detailValue.photo ? detailValue.photo : "https://i.ibb.co/SyGtPFs/Profile.png"} alt="Profile_Pict" />
                        <h3>{detailValue.name}</h3>
                      </div>
                      <div className="card-body">
                        <h4 className="mb-0 text-center"><b className="pr-1">{detailValue.role}</b></h4>
                        <h5 className="mb-0 text-center"><b className="pr-1">{detailValue.working_area}</b></h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card card-one shadow-sm">
                      <div className="card-header card-two bg-transparent border-0">
                        <h5 className="mb-0"><Bookmarks size={20} className='me-2' />Informasi Umum</h5>
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

        {/* Modal WorkingArea */}
        <div className="modal fade z-1" id='WorkingAreaModal' aria-labelledby="exampleModalLabel2" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{`Area Kerja ${detailValue.name}`}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p className="mb-2">{detailValue.role} :</p>
                <input type="text"
                  className="form-control mb-4"
                  placeholder="Masukkan Area Kerja"

                  value={detailValue.working_area}
                  onChange={(e) => setDetailValue({ ...detailValue, working_area: e.target.value })}
                  name="working_area"
                />
                <div className="form-group mb-2 d-grid gap-1">
                  <button className="btn btn-primary text-light rounded-3" onClick={() => updateWorkingAreaHandler(detailValue.id)}>Simpan</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}
      </main>
    </>
  );
};

export default UserManagement;
