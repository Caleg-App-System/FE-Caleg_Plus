import React, { useEffect, useState } from "react";
import { DptService } from "../../../services/dptServices";
import DataTable from "react-data-table-component";
import PulseLoader from "react-spinners/PulseLoader";

const NewDPTData = () => {
  const [newDptData, setNewDptData] = useState([]);
  const [pending, setPending] = useState(true);
  const [newDptDetail, setNewDptDetail] = useState([]);
  const [tpsName, setTpsName] = useState(null);
  const [desaName, setDesaName] = useState(null);

  useEffect(() => {
    DptService.getAllDpt().then((response) => {
      setNewDptData(response.data.data);
    });
    const timeout = setTimeout(() => {
      setPending(false);
    }
      , 1000);
    return () => clearTimeout(timeout);
  }, []);

  const newDptDetailHandler = async (id) => {
    const response = await DptService.getDptById(id);
    setNewDptDetail(response.data.data);
    setTpsName(response.data.data.tps.name);
    setDesaName(response.data.data.tps.desa.name);
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
        backgroundColor: "#e49011",
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
    {
      name: "NO KK",
      selector: (row) => row.no_KK,
      sortable: true
    },
    {
      name: "NIK",
      selector: (row) => row.nik,
      sortable: true
    },
    {
      name: "Nama",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Alamat",
      selector: (row) => row.address,
      sortable: true
    },
    {
      name: "TPS",
      width: "300px",
      selector: (row) => `${row.tps.name} - ${row.tps.desa.name}, Kec. ${row.tps.desa.kecamatan.name}`,
      sortable: true
    },
    {
      name: "Aksi",
      width: "150px",
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-info btn-sm me-3 text-white" onClick={() => newDptDetailHandler(row.id)} data-bs-toggle="modal" data-bs-target='#detailNewDPT'>Detail</button>
          <button className="btn btn-success btn-sm text-white">Acc</button>
        </div>
      ),
    }
  ]

  return (
    <main className="container-usermanagement col-md-9 col-lg-11">
      <div className="content-usermanagement px-2 py-2">
        <div className="table-usermanagement text-center">
          <DataTable
            title="DATA DAFTAR PEMILIH BARU"
            columns={columns}
            // data={dptData.filter((row) => row.tps.desa.name.toLowerCase().includes(filterText.toLowerCase()))}
            data={newDptData.filter((row) => row.is_new === true)}
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
              <h5 className="modal-title" id="detailDPTLabel">Detail DPT Baru</h5>
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
                          {newDptDetail.disability === "0" ? "Tidak"
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
                        <div className="title text-secondary">TPS</div>
                        <h5 className="value fw-semibold mb-4">{`${tpsName} - ${desaName}`}</h5>
                        <div className="title text-secondary">Foto KTP</div>
                        <img className="ktp_img" src="https://i.ibb.co/DVfpvSK/pngwing-com.png" alt="KTP" />
                      </div>
                      <div className="col-lg-12">
                        <div className="title text-secondary">Foto Kartu Keluarga</div>
                        <img className="ktp_img" src="" alt="KK" />
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