import React, { useState, useEffect } from "react";
import "./importFileDPT.css";
import { useDispatch } from "react-redux";
import { ImportDPT, ImportDPTNewVersion } from "../../../config/redux/actions/importActions";
import { VoteService } from "../../../services/voteServices";
import Select from "react-select";

const ImportFileDPT = () => {
  const [file, setFile] = useState(null);
  const [selectedTps, setSelectedTps] = useState(null);
  const [selectedDesa, setSelectedDesa] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [cellAwal, setCellAwal] = useState(null);
  const [cellAkhir, setCellAkhir] = useState(null);

  const [tps, setTPS] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    VoteService.getTPS().then((response) => {
      // console.log(response.data.data);
      setTPS(response.data.data);
    });
  }, []);

  const tpsOptions = tps.map((item) => {
    return {
      id: item.id,
      label: `${item.name} - ${item.desa.name}`,
      desa: item.desa.id,
    };
  });

  const handleTpsChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedTps(selectedOption.id);
    setSelectedDesa(selectedOption.desa);
  };


  const handleFileUpload = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("tps_id", selectedTps);
    data.append("noSheet", sheet);
    data.append("startCell", cellAwal);
    data.append("endCell", cellAkhir);
    data.append("desa_id", selectedDesa);
    await dispatch(ImportDPTNewVersion(data));
  };

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      // background: '#fff',
      // borderColor: '#9e9e9e',
      minHeight: '35px',
      height: '35px',
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
      height: '20px',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: 'red',
      fontSize: '14px',

    }),
  };

  return (
    <>
      <div className="import-file">
        <div className="box">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 mt-3">Import Data Pemilih Tetap</h1>
          </div>

          <div className="row content-form">
            <div className="col-lg-12">
              <div className="card shadow mb-4 border-warning">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-warning">PERHATIAN !!!</h6>
                </div>
                <div className="card-body">
                  Sebelum mengupload file dokumen, mohon perhatikan aturan berikut :<li>Format file harus berbentuk excel atau ekstensi xls.</li>

                  <li>
                    <b>PENTING! </b>
                  </li>
                  <ul className="list-warn">
                    <li>1. Pastikan data yang akan diupload sudah benar. Data yang akan diupload adalah data pemilih tetap yang sudah dihitung jumlahnya.</li>
                    <li>2. Pastikan cell awal dan cell akhir sudah benar. Cell awal adalah cell pertama, dan cell akhir adalah cell terakhir yang berisi data.</li>
                    <li>3. Pastikan sheet yang akan diupload sudah benar. Angka sheet <b>dimulai dari 0</b> untuk sheet pertama, 1 untuk sheet kedua, dan seterusnya.</li>
                    <li>4. Pastikan TPS yang akan diupload sudah benar. TPS sesuai dengan data yang diinputkan.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-12">

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold .text-gray-900">Upload File Data Pemilih Tetap</h6>
                </div>
                <div className="card-body">
                  <label className="form-label">
                    Format nama file: <span className="text-dark">DPT Desa y.xlsx</span>
                  </label>
                  <input className="form-control input-file" required type="file" accept=".xlsx" onChange={event => {
                    const file = event.target.files[0];
                    setFile(file);
                  }} />

                  <div className="row mb-2">
                    <div className="col-lg-3">
                      <label className="mt-3">Cell Awal*</label>
                      <input className="form-control input-file" required type="text" placeholder="Contoh: A1" onChange={e => {
                        const cellAwal = e.target.value;
                        setCellAwal(cellAwal);
                      }} />
                    </div>
                    <div className="col-lg-3">
                      <label className="mt-3">Cell Akhir*</label>
                      <input className="form-control input-file" required type="text" placeholder="Contoh: B2" onChange={e => {
                        const cellAkhir = e.target.value;
                        setCellAkhir(cellAkhir);
                      }} />
                    </div>
                    <div className="col-lg-3">
                      <label className="mt-3">Sheet*</label>
                      <input className="form-control input-file" required type="text" placeholder="Contoh: 1" onChange={e => {
                        const sheet = e.target.value;
                        setSheet(sheet);
                      }} />
                    </div>
                    <div className="col-lg-3">
                      <label className="mt-3">TPS*</label>
                      <Select
                        className="input-file"
                        options={tpsOptions}
                        onChange={handleTpsChange}
                        styles={selectStyles}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <button type="submit" onClick={handleFileUpload} className="mt-2 ms-3 col-lg-2 btn btn-primary btn-user btn-block">
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportFileDPT;
