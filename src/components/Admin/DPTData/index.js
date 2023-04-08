import React, { useState, useEffect } from "react";
import { DptService } from "../../../services/dptServices";
import DataTable from "react-data-table-component";
import PulseLoader from "react-spinners/PulseLoader";
import Select from "react-select";
import "./DPTData.css";

const DPTData = () => {
  const [dptData, setDptData] = useState([]);
  const [pending, setPending] = useState(true);
  const [dptDetail, setDptDetail] = useState([]);
  const [tpsName, setTpsName] = useState(null);
  const [desaName, setDesaName] = useState(null);
  // const [filterText, setFilterText] = useState("");

  const [kecamatan, setKecamatan] = useState([]);
  const [desa, setDesa] = useState([]);
  const [tps, setTps] = useState([]);

  const [filterText1, setFilterText1] = useState("");
  const [filterText2, setFilterText2] = useState("");
  const [filterText3, setFilterText3] = useState("");

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

  // Get Data All Kecamatan
  useEffect(() => {
    DptService.getAllKecamatan().then((response) => {
      setKecamatan(response.data.data);
    });
  }, []);

  // Get Data Desa By Id
  const getDesaById = async (kecamatanId) => {
    const response = await DptService.getAllDesaByKecamatanId(kecamatanId);
    setDesa(response.data.data);
  };

  // Get Data Tps By Id
  const getTpsById = async (desaId) => {
    const response = await DptService.getTpsById(desaId);
    setTps(response.data.data);
  };

  // Handle Change Kecamatan
  const handleKecamatanChange = (selectedOption) => {
    setFilterText3(selectedOption.label)
    const kecamatanId = selectedOption.id;
    getDesaById(kecamatanId);
  };

  // Handle Change Desa
  const handleDesaChange = (selectedOption) => {
    setFilterText2(selectedOption.label)
    const desaId = selectedOption.id;
    getTpsById(desaId);
  };

  // Handle Change Tps
  const handleTpsChange = (selectedOption) => {
    setFilterText1(selectedOption.label)
  };

  // Options map for select
  const kecamatanOptions = kecamatan.map((kecamatan) => ({
    id: kecamatan.id,
    label: kecamatan.name,
  }));

  const desaOptions = desa.map((desa) => ({
    id: desa.id,
    label: desa.name,
  }));

  const tpsOptions = tps.map((tps) => ({
    id: tps.id,
    label: tps.name,
  }));

  const dptDetailHandler = async (id) => {
    const response = await DptService.getDptById(id);
    setDptDetail(response.data.data);
    setTpsName(response.data.data.tps.name);
    setDesaName(response.data.data.tps.desa.name);
  }

  // const handleFilter = (e) => {
  //   setFilterText(e.target.value);
  // };

  const customFilter = (rows, columns, filterText1, filterText2, filterText3) => {
    return rows.filter((row) =>
      row.tps.name
        .toString()
        .toLowerCase()
        .indexOf(filterText1.toLowerCase()) !== -1
      &&
      row.tps.desa.name
        .toString()
        .toLowerCase()
        .indexOf(filterText2.toLowerCase()) !== -1
      &&
      row.tps.desa.kecamatan.name
        .toString()
        .toLowerCase()
        .indexOf(filterText3.toLowerCase()) !== -1
    );
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
      width: "100px",
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-info btn-sm me-3 text-white" onClick={() => dptDetailHandler(row.id)} data-bs-toggle="modal" data-bs-target='#detailDPT'>Detail</button>
        </div>
      ),
    }
  ]

  const filteredData = customFilter(dptData, columns, filterText1, filterText2, filterText3);

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      // background: '#fff',
      // borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '30px',
      width: '150px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '20px',
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
      height: '30px',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: 'red',
      fontSize: '14px',

    }),
  };

  return (
    <main className="container-usermanagement col-md-9 col-lg-11">
      <div className="content-usermanagement px-2 py-2">
        <div className="table-usermanagement text-center">
          <DataTable
            title="DATA DAFTAR PEMILIH TETAP"
            columns={columns}
            // data={dptData.filter((row) => row.tps.desa.name.toLowerCase().includes(filterText.toLowerCase()))}
            data={filteredData}
            noDataComponent="Data tidak ditemukan"
            subHeader
            subHeaderComponent={
              <div className="box-filter-dpt d-flex">
                <h6 className="me-2">Kecamatan :</h6>
                <Select
                  options={kecamatanOptions}
                  onChange={handleKecamatanChange}
                  styles={selectStyles}
                />
                <h6 className="ms-5 me-2">Desa :</h6>
                <Select
                  options={desaOptions}
                  onChange={handleDesaChange}
                  styles={selectStyles}
                  isDisabled={filterText3 === ""}
                />
                <h6 className="ms-5 me-2">TPS :</h6>
                <Select
                  options={tpsOptions}
                  onChange={handleTpsChange}
                  styles={selectStyles}
                  isDisabled={filterText2 === ""}
                />
              </div>
            }
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