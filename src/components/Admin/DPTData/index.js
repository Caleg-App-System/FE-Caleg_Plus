import React, { useState, useEffect } from "react";
import { DptService } from "../../../services/dptServices";
import DataTable from "react-data-table-component";
import PulseLoader from "react-spinners/PulseLoader";
import "./DPTData.css";

const DPTData = () => {
  const [dptData, setDptData] = useState([]);
  const [pending, setPending] = useState(true);
  const [dptDetail, setDptDetail] = useState([]);
  const [tpsName, setTpsName] = useState(null);
  const [desaName, setDesaName] = useState(null);

  useEffect(() => {
    DptService.getAllDpt().then((response) => {
      setDptData(response.data.data);
    });
    const timeout = setTimeout(() => {
      setPending(false);
    }
      , 5000);
    return () => clearTimeout(timeout);
  }, []);

  const dptDetailHandler = async (id) => {
    const response = await DptService.getDptById(id);
    setDptDetail(response.data.data);
    setTpsName(response.data.data.tps.name);
    setDesaName(response.data.data.tps.desa.name);
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
      selector: (row) => `${row.tps.name} - ${row.tps.desa.name}`,
      sortable: true
    },
    {
      name: "Aksi",
      width: "100px",
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-info btn-sm me-3 text-white" onClick={() => dptDetailHandler(row.id)} data-bs-toggle="modal" data-bs-target='#detailDPT'>Detail</button>
        </div>
      ),
    }
  ]

  return (
    <main className="container-usermanagement col-md-9 col-lg-11">
      <div className="content-usermanagement px-2 py-2">
        <div className="table-usermanagement text-center">
          <DataTable
            title="DATA DAFTAR PEMILIH TETAP"
            columns={columns}
            // data={users.filter((row) => row.is_archived === false && row.name && row.name.toLowerCase().includes(filterText.toLowerCase()))}
            data={dptData}
            subHeader
            // subHeaderComponent={
            //   <div className="box-filter">
            //     <Search></Search>
            //     <input className="input-filter" type="search" placeholder="Cari nama user" onChange={handleFilter} />
            //   </div>
            // }
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

      {/* Detail DPT */}
      <div className="modal fade" id="detailDPT" tabIndex="-1" role="dialog" aria-labelledby="detailDPTLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="detailDPTLabel">Detail DPT</h5>
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
                        <h5 className="value fw-semibold mb-4">{dptDetail.name}</h5>
                        <div className="title text-secondary">Nomor KK</div>
                        <h5 className="value fw-semibold mb-4">{dptDetail.no_KK}</h5>
                        <div className="title text-secondary">Nomor NIK</div>
                        <h5 className="value fw-semibold mb-4">{dptDetail.nik}</h5>
                        <div className="title text-secondary">Tempat Lahir</div>
                        <h5 className="value fw-semibold mb-4">{dptDetail.dob_place}</h5>
                        <div className="title text-secondary">Tanggal Lahir</div>
                        <h5 className="value fw-semibold mb-4">{dptDetail.dob}</h5>
                        <div className="title text-secondary">Jenis Kelamin</div>
                        <h5 className="value fw-semibold mb-4">{dptDetail.gender === "L" ? "Laki-laki" : "Perempuan"}</h5>
                        <div className="title text-secondary">Status</div>
                        <h5 className="value fw-semibold mb-4">
                          {dptDetail.marital_status === "B" ? "Belum Kawin"
                            :
                            dptDetail.marital_status === "S" ? "Sudah Kawin"
                              :
                              dptDetail.marital_status === "P" ? "Pernah Kawin"
                                :
                                "-"}
                        </h5>
                      </div>
                      <div className="col-lg-6">
                        <div className="title text-secondary">Alamat</div>
                        <h5 className="value fw-semibold mb-4">{dptDetail.address}</h5>
                        <div className="title text-secondary">Disabilitas</div>
                        <h5 className="value fw-semibold mb-4">
                          {dptDetail.disability === "0" ? "Tidak"
                            :
                            dptDetail.disability === "1" ? "Tuna Daksa"
                              :
                              dptDetail.disability === "2" ? "Tuna Netra"
                                :
                                dptDetail.disability === "3" ? "Tuna Rungu"
                                  :
                                  dptDetail.disability === "4" ? "Tuna Grahita"
                                    :
                                    "Disabilitas Lainnya"}
                        </h5>
                        <div className="title text-secondary">Keterangan</div>
                        <h5 className="value fw-semibold mb-4">{dptDetail.keterangan ? dptDetail.keterangan : "-"}</h5>
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

export default DPTData;