import React, { useEffect, useState } from "react";
import { DptService } from "../../../services/dptServices";
import { UsersService } from "../../../services/usersServices";
import DataTable from "react-data-table-component";
import PulseLoader from "react-spinners/PulseLoader";
import Select from "react-select";
import SweatAlert from "../../../config/SweatAlert";

const DPPData = () => {
  const [update, setUpdate] = useState(false);
  const [dppData, setDppData] = useState([]);
  const [pending, setPending] = useState(true);
  const [dppDetail, setDppDetail] = useState([]);
  const [tpsName, setTpsName] = useState(null);
  const [desaName, setDesaName] = useState(null);
  const [users, setUsers] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchData = async (page) => {
    setPending(true);
    let perPage = 10;
    const response = await DptService.getAllDpp(page, perPage);
    setDppData(response.data.data.data);
    setTotalRows(response.data.data.jumlahData);
    setPending(false);
  };

  const handleChangePage = (page) => {
    fetchData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPending(true);
    const response = await DptService.getDppByRows(page, newPerPage);
    setDppData(response.data.data.data);
    setPerPage(newPerPage);
    setPending(false);
  };

  useEffect(() => {
    fetchData(1); // fetch page 1 of users
  }, []);

  // Get All User
  useEffect(() => {
    UsersService.getUsers().then((response) => {
      setUsers(response.data.data);
    });
  }, []);

  // Handle User Change
  const handleUserChange = async (selectedOption) => {
    setPending(true);
    const userId = selectedOption.id;
    let page = 1;
    const response = await DptService.getDppByUserId(page, perPage, userId);
    setDppData(response.data.data.data);
    setPending(false);
  };

  // Option maps user
  const userOptions = users.map((user) => ({
    id: user.id,
    label: user.name,
  }));

  const dppDetailHandler = async (id) => {
    const response = await DptService.getDptById(id);
    setDppDetail(response.data.data);
    setTpsName(response.data.data.tps.name);
    setDesaName(response.data.data.tps.desa.name);
  }

  const dppDeleteHandler = async (id) => {
    const response = await DptService.deleteDpp(id);
    SweatAlert(response.data.message, 'success');
    setUpdate(!update);
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
        backgroundColor: "#ade792",
        color: "#fff",
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
      name: "No",
      cell: (row, index) => index + 1,
      width: "50px"
    },
    // {
    //   name: "NIK",
    //   selector: (row) => row.nik,
    //   sortable: true
    // },
    {
      name: "Nama",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Alamat",
      selector: (row) => `RT ${row.rt} RW ${row.rw}, ${row.address}`,
      sortable: true
    },
    {
      name: "Usia",
      width: "100px",
      selector: (row) => row.usia,
      sortable: true
    },
    {
      name: "JK",
      width: "100px",
      selector: (row) => row.gender,
      sortable: true
    },
    {
      name: "TPS",
      width: "300px",
      selector: (row) => `${row.tps.name} - ${row.tps.desa.name}, Kec. ${row.tps.desa.kecamatan.name}`,
      sortable: true
    },
    {
      name: "Petugas",
      width: "250px",
      selector: (row) => `${row.user.name} - ${row.user.role} ${row.user.working_area}`,
      sortable: true
    },
    {
      name: "Aksi",
      width: "170px",
      cell: (row) => (
        <>
          <div className="d-flex">
            <button className="btn btn-info btn-sm me-3 text-white" onClick={() => dppDetailHandler(row.id)} data-bs-toggle="modal" data-bs-target='#detailDPP'>Detail</button>
          </div>
          <div className="d-flex">
            <button className="btn btn-danger btn-sm me-3 text-white" onClick={() => dppDeleteHandler(row.id)}>Hapus</button>
          </div>
        </>
      ),
    }
  ]

  const conditionalRowStyles = [
    {
      when: row => row.is_new === true,
      style: {
        backgroundColor: '#B1E7FA',
      }
    },
  ];

  // const filteredData = customFilter(dppData, columns, filterText1, filterText2, filterText3);

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      // background: '#fff',
      // borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '30px',
      width: '200px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '25px',
      padding: '0 0'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '25px',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: 'red',
      fontSize: '14px',

    }),
  };

  return (
    <>
      <main className="container-usermanagement col-md-9 col-lg-11">
        <div className="content-usermanagement px-2 py-2">
          <div className="table-usermanagement text-center">
            <DataTable
              title="DATA DAFTAR PEMILIH POTENSIAL"
              columns={columns}
              // data={dptData.filter((row) => row.tps.desa.name.toLowerCase().includes(filterText.toLowerCase()))}
              data={dppData}
              conditionalRowStyles={conditionalRowStyles}
              noDataComponent="Data tidak ditemukan"
              subHeader
              subHeaderComponent={
                <div className="box-filter-dpt d-flex">
                  <h6 className="me-2">Petugas :</h6>
                  <Select
                    options={userOptions}
                    onChange={handleUserChange}
                    styles={selectStyles}
                  />
                </div>
              }
              customStyles={customStyles}
              progressPending={pending}
              progressComponent={
                <PulseLoader
                  color={'#ade792'}
                  size={30} />}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              paginationRowsPerPageOptions={[10, 25, 50, 100, 200]}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handleChangePage}
            />
          </div>
        </div>

        {/* Detail DPT */}
        <div className="modal fade" id="detailDPP" tabIndex="-1" role="dialog" aria-labelledby="detailDPTLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="detailDPTLabel">Detail Pemilih Potensial</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
              </div>
              <div className="modal-body">
                <div className="row detail-profile ps-5 pe-3">
                  <div className="col-lg">
                    <div className="content-dptDetail">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="title text-secondary">Nama</div>
                          <h5 className="value fw-semibold mb-4">{dppDetail.name}</h5>
                          <div className="title text-secondary">Nomor KK</div>
                          <h5 className="value fw-semibold mb-4">{dppDetail.no_KK}</h5>
                          <div className="title text-secondary">Nomor NIK</div>
                          <h5 className="value fw-semibold mb-4">{dppDetail.nik}</h5>
                          <div className="title text-secondary">Tempat Lahir</div>
                          <h5 className="value fw-semibold mb-4">{dppDetail.dob_place}</h5>
                          <div className="title text-secondary">Tanggal Lahir</div>
                          <h5 className="value fw-semibold mb-4">{dppDetail.dob}</h5>
                          <div className="title text-secondary">Jenis Kelamin</div>
                          <h5 className="value fw-semibold mb-4">{dppDetail.gender === "L" ? "Laki-laki" : "Perempuan"}</h5>
                          <div className="title text-secondary">Status</div>
                          <h5 className="value fw-semibold mb-4">
                            {dppDetail.marital_status === "B" ? "Belum Kawin"
                              :
                              dppDetail.marital_status === "S" ? "Sudah Kawin"
                                :
                                dppDetail.marital_status === "P" ? "Pernah Kawin"
                                  :
                                  "-"}
                          </h5>
                        </div>
                        <div className="col-lg-6">
                          <div className="title text-secondary">Alamat</div>
                          <h5 className="value fw-semibold mb-4">{dppDetail.address}</h5>
                          <div className="title text-secondary">Disabilitas</div>
                          <h5 className="value fw-semibold mb-4">
                            {dppDetail.disability === "0" || dppDetail.disability === null ? "Tidak"
                              :
                              dppDetail.disability === "1" ? "Tuna Daksa"
                                :
                                dppDetail.disability === "2" ? "Tuna Netra"
                                  :
                                  dppDetail.disability === "3" ? "Tuna Rungu"
                                    :
                                    dppDetail.disability === "4" ? "Tuna Grahita"
                                      :
                                      "Disabilitas Lainnya"}
                          </h5>
                          <div className="title text-secondary">Keterangan</div>
                          <h5 className="value fw-semibold mb-4">{dppDetail.keterangan ? dppDetail.keterangan : "-"}</h5>
                          <div className="title text-secondary">TPS</div>
                          <h5 className="value fw-semibold mb-4">{`${tpsName} - ${desaName}`}</h5>
                          <div className="title text-secondary">Foto KTP</div>
                          {dppDetail.photo_KTP === "" || dppDetail.photo_KTP === null ? <h5 className="value fw-semibold mb-4 text-warning">Belum Ada</h5> : <img className="ktp_img" src={`data:image/jpeg;base64,${dppDetail.photo_KTP}`} alt="Foto KTP" />}
                        </div>
                        <div className="col-lg-12">
                          <div className="title text-secondary">Foto Kartu Keluarga</div>
                          {dppDetail.photo_KK === "" || dppDetail.photo_KK === null ? <h5 className="value fw-semibold mb-4">-</h5> : <img className="ktp_img" src={`data:image/jpeg;base64,${dppDetail.photo_KK}`} alt="Foto KK" />}
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
  );
};

export default DPPData;