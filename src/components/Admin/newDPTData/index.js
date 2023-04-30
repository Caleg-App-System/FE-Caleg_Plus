import React, { useEffect, useState } from "react";
import { DptService } from "../../../services/dptServices";
import DataTable from "react-data-table-component";
import PulseLoader from "react-spinners/PulseLoader";
import SweatAlertTimer from "../../../config/SweatAlert/timer";

const NewDPTData = () => {
  const [update, setUpdate] = useState(false);
  const [newDptData, setNewDptData] = useState([]);
  const [pending, setPending] = useState(true);
  const [newDptDetail, setNewDptDetail] = useState([]);
  const [tpsName, setTpsName] = useState(null);
  const [desaName, setDesaName] = useState(null);

  useEffect(() => {
    setPending(true);
    DptService.getNewDpt().then((response) => {
      setNewDptData(response.data.data);
      setPending(false);
    });
  }, [update]);

  const newDptDetailHandler = async (id) => {
    const response = await DptService.getDptById(id);
    setNewDptDetail(response.data.data);
    setTpsName(response.data.data.tps.name);
    setDesaName(response.data.data.tps.desa.name);
  };

  const newDptDeleteHandler = async (id) => {
    const response = await DptService.deleteNewDpt(id);
    SweatAlertTimer(response.data.message, "success", 2000);
    setUpdate(!update);
  };

  const approveDpt = async (id) => {
    const response = await DptService.approveDpp(id);
    SweatAlertTimer(response.data.message, "success", 2000);
    setUpdate(!update);
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
        backgroundColor: "#62CDFF",
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
    // {
    //   name: "Usia",
    //   width: "100px",
    //   selector: (row) => row.usia,
    //   sortable: true
    // },
    {
      name: "JK",
      width: "100px",
      selector: (row) => row.gender,
      sortable: true
    },
    {
      name: "Petugas",
      selector: (row) => `${row.user.name} - ${row.user.role} ${row.user.working_area}`,
      sortable: true
    },
    {
      name: "Aksi",
      width: "75px",
      cell: (row) => (
        row.is_acc === false || row.is_acc === null ? (
          <button className="btn btn-success btn-sm w-100" onClick={() => approveDpt(row.id)}>
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
      width: "170px",
      cell: (row) => (
        <>
          <div className="d-flex">
            <button className="btn btn-info btn-sm text-white me-3 w-80" onClick={() => newDptDetailHandler(row.id)} data-bs-toggle="modal" data-bs-target='#detailNewDPT'>Detail</button>
          </div>
          <div className="d-flex">
            <button className="btn btn-danger btn-sm text-white w-80" onClick={() => newDptDeleteHandler(row.id)}>Hapus</button>
          </div>
        </>
      ),
    },
  ]

  return (
    <main className="container-usermanagement col-md-9 col-lg-11">
      <div className="content-usermanagement px-2 py-2">
        <div className="table-usermanagement text-center">
          <DataTable
            title="DATA DAFTAR PEMILIH BARU"
            columns={columns}
            // data={dptData.filter((row) => row.tps.desa.name.toLowerCase().includes(filterText.toLowerCase()))}
            data={newDptData}
            noDataComponent="Data DPT baru tidak ditemukan"
            customStyles={customStyles}
            progressPending={pending}
            progressComponent={
              <PulseLoader
                color={'#e49011'}
                size={30} />}
            pagination
          />
        </div>
      </div>

      {/* Modals */}
      <div className="modal fade" id="detailNewDPT" tabIndex="-1" role="dialog" aria-labelledby="detailDPTLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="detailDPTLabel">Detail Pemilih Tetap / Potensial Baru</h5>
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
                        <h5 className="value fw-semibold mb-4">{newDptDetail.name}</h5>
                        <div className="title text-secondary">Nomor KK</div>
                        <h5 className="value fw-semibold mb-4">{newDptDetail.no_KK}</h5>
                        <div className="title text-secondary">Nomor NIK</div>
                        <h5 className="value fw-semibold mb-4">{newDptDetail.nik}</h5>
                        <div className="title text-secondary">Tempat Lahir</div>
                        <h5 className="value fw-semibold mb-4">{newDptDetail.dob_place}</h5>
                        <div className="title text-secondary">Tanggal Lahir</div>
                        <h5 className="value fw-semibold mb-4">{newDptDetail.dob}</h5>
                        <div className="title text-secondary">Jenis Kelamin</div>
                        <h5 className="value fw-semibold mb-4">{newDptDetail.gender === "L" ? "Laki-laki" : "Perempuan"}</h5>
                        <div className="title text-secondary">Status</div>
                        <h5 className="value fw-semibold mb-4">
                          {newDptDetail.marital_status === "B" ? "Belum Kawin"
                            :
                            newDptDetail.marital_status === "S" ? "Sudah Kawin"
                              :
                              newDptDetail.marital_status === "P" ? "Pernah Kawin"
                                :
                                "-"}
                        </h5>
                      </div>
                      <div className="col-lg-6">
                        <div className="title text-secondary">Alamat</div>
                        <h5 className="value fw-semibold mb-4">{newDptDetail.address}</h5>
                        <div className="title text-secondary">Disabilitas</div>
                        <h5 className="value fw-semibold mb-4">
                          {newDptDetail.disability === "0" || newDptDetail.disability === null ? "Tidak"
                            :
                            newDptDetail.disability === "1" ? "Tuna Daksa"
                              :
                              newDptDetail.disability === "2" ? "Tuna Netra"
                                :
                                newDptDetail.disability === "3" ? "Tuna Rungu"
                                  :
                                  newDptDetail.disability === "4" ? "Tuna Grahita"
                                    :
                                    "Disabilitas Lainnya"}
                        </h5>
                        <div className="title text-secondary">Keterangan</div>
                        <h5 className="value fw-semibold mb-4">{newDptDetail.keterangan ? newDptDetail.keterangan : "-"}</h5>
                        <div className="title text-secondary">Foto KTP</div>
                        {newDptDetail.photo_KTP === "" || newDptDetail.photo_KTP === null ? <h5 className="value fw-semibold mb-4 text-warning">Belum Ada</h5> : <img className="ktp_img" src={`data:image/jpeg;base64,${newDptDetail.photo_KTP}`} alt="Foto KTP" />}
                      </div>
                      <div className="col-lg-12">
                        <div className="title text-secondary">Foto Kartu Keluarga</div>
                        {newDptDetail.photo_KK === "" ? <h5 className="value fw-semibold mb-4">-</h5> : <img className="ktp_img" src={`data:image/jpeg;base64,${newDptDetail.photo_KK}`} alt="Foto KK" />}
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
  );
}

export default NewDPTData;