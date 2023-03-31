import React, { useState } from "react";
import "./importFileExcel.css";
import { useDispatch } from "react-redux";
import { PostImportExcel } from "../../../config/redux/actions/importActions";

const ImportFile = () => {
  const [file, setFile] = useState(null);
  console.log(file);
  const dispatch = useDispatch();

  const handleFileUpload = async () => {
    const data = new FormData();
    data.append("file", file);
    console.log(data);
    await dispatch(PostImportExcel(data));
  };

  return (
    <>
      <div className="import-file">
        <div className="box">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 mt-3">Import Data Calon Legislatif dan Perolehan Suara</h1>
          </div>

          <div className="row content-form">
            <div className="col-lg-12">
              <div className="card shadow mb-4 border-warning">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-warning">PERHATIAN !!!</h6>
                </div>
                <div className="card-body">
                  Sebelum mengupload file dokumen, mohon perhatikan aturan dibawah berikut :<li>Format file harus berbentuk excel atau ekstensi xls.</li>
                  <li>Nama file harus sesuai dengan format yang telah disediakan.</li>
                  <li>Jika nama filenya tidak sesuai file tidak dapat diupload.</li>
                  <li>Sebelum mengupload, pastikan isi dari file sesuai dengan format baku yang sudah disediakan.</li>
                  <li>
                    <b>PENTING! </b>Pastikan daftar nama calon legislatif sudah masuk dalam sistem sebelum mengupload file data perolehan suara
                  </li>
                </div>
              </div>
            </div>

            <div className="col-lg-12">

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold .text-gray-900">Upload File Data Perolehan Suara</h6>
                </div>
                <div className="card-body">
                  <label className="form-label">
                    Format nama file: <span className="text-dark">PerolehanSuara_Dapil.xlsx</span>
                  </label>
                  <input className="form-control input-file" required type="file" accept=".xlsx" onChange={event => {
                    const file = event.target.files[0];
                    setFile(file);
                  }} />

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

export default ImportFile;
