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
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [kecamatan, setKecamatan] = useState([]);
  const [desa, setDesa] = useState([]);
  const [tps, setTps] = useState([]);

  const [idDesa, setIdDesa] = useState(null);

  const [countByTpsId, setCountByTpsId] = useState([]);

  const [filterText1, setFilterText1] = useState(1);
  const [filterText2, setFilterText2] = useState(1);
  const [filterText3, setFilterText3] = useState("");

  const fetchData = async (page) => {
    setPending(true);
    let perPage = 10;
    const response = await DptService.getDptAll(page, perPage);
    setDptData(response.data.data.data);
    setTotalRows(response.data.data.totalPages);
    setPending(false);
  };

  const handleChangePage = (page) => {
    fetchData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPending(true);
    const response = await DptService.getDptByRows(page, newPerPage);
    setDptData(response.data.data.data);
    setPerPage(newPerPage);
    setPending(false);
  };



  useEffect(() => {
    fetchData(1); // fetch page 1 of users
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

  const countTpsById = async (tpsId) => {
    const response = await DptService.countDptByTpsId(tpsId);
    setCountByTpsId(response.data.data);
  };

  // Handle Change Kecamatan
  const handleKecamatanChange = (selectedOption) => {
    setFilterText3(selectedOption.label)
    const kecamatanId = selectedOption.id;
    getDesaById(kecamatanId);
  };

  const handleDesaChange = async (selectedOption) => {
    setPending(true);
    const desaId = selectedOption.id;
    let page = 1;
    const response = await DptService.getDptByDesa(page, desaId, perPage);
    setDptData(response.data.data.data);
    setIdDesa(desaId);
    getTpsById(desaId);
    setPending(false);
  };

  const handleTpsChange = async (selectedOption) => {
    setPending(true);
    const tpsId = selectedOption.id;
    let page = 1;
    const response = await DptService.getDptByTps(page, idDesa, tpsId, perPage);
    setDptData(response.data.data.data);
    setPending(false);
  };

  // // Handle Change Desa
  // const handleDesaChange = (selectedOption, filterText2) => {
  //   setFilterText2(selectedOption.id)
  //   filterText2 = selectedOption.id
  //   fetchData(filterText2)
  //   const desaId = selectedOption.id;
  //   getTpsById(desaId);
  // };

  // // Handle Change Tps
  // const handleTpsChange = (selectedOption) => {
  //   setFilterText1(selectedOption.id)
  //   const tpsId = selectedOption.id;
  //   console.log(tpsId)
  //   countTpsById(tpsId);
  // };

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

  // const customFilter = (rows, columns, filterText1, filterText2, filterText3) => {
  //   return rows.filter((row) =>
  //     row.tps.name
  //       .toString()
  //       .toLowerCase()
  //       .indexOf(filterText1.toLowerCase()) !== -1
  //     &&
  //     row.tps.desa.name
  //       .toString()
  //       .toLowerCase()
  //       .indexOf(filterText2.toLowerCase()) !== -1
  //     &&
  //     row.tps.desa.kecamatan.name
  //       .toString()
  //       .toLowerCase()
  //       .indexOf(filterText3.toLowerCase()) !== -1
  //   );
  // };

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
        backgroundColor: "#FF8C00",
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
    //   name: "NO KK",
    //   selector: (row) => row.no_KK,
    //   sortable: true
    // },
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
      name: "Aksi",
      width: "100px",
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-info btn-sm me-3 text-white" onClick={() => dptDetailHandler(row.id)} data-bs-toggle="modal" data-bs-target='#detailDPT'>Detail</button>
        </div>
      ),
    }
  ]

  const conditionalRowStyles = [
    {
      when: row => row.is_check === true,
      style: {
        backgroundColor: '#FCCF80',
      }
    },
  ];

  // const filteredData = customFilter(dptData, columns, filterText1, filterText2, filterText3);

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
            data={dptData}
            noDataComponent="Data tidak ditemukan"
            conditionalRowStyles={conditionalRowStyles}
            subHeader
            subHeaderComponent={
              <>
                <div className="box-filter-dpt d-flex">
                  {/* <h6 className="me-5" style={filterText2 === "" ? { color: "white" } : { color: "black" }}>Total:{countByTpsId.count}</h6> */}
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
                  />
                  <h6 className="ms-5 me-2">TPS :</h6>
                  <Select
                    options={tpsOptions}
                    onChange={handleTpsChange}
                    styles={selectStyles}
                  />
                </div>
              </>
            }
            customStyles={customStyles}
            progressPending={pending}
            progressComponent={
              <PulseLoader
                color={'#e49011'}
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
      <div className="modal fade" id="detailDPT" tabIndex="-1" role="dialog" aria-labelledby="detailDPTLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="detailDPTLabel">Detail Pemilih Tetap</h5>
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
                      </div>
                      <div className="col-lg-6">
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
                        <div className="title text-secondary">Alamat</div>
                        <h5 className="value fw-semibold mb-4">{dptDetail.address}</h5>
                        <div className="title text-secondary">Disabilitas</div>
                        <h5 className="value fw-semibold mb-4">
                          {dptDetail.disability === "0" || dptDetail.disability === null ? "Tidak"
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