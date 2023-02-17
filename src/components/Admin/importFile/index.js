import React, { useState, useEffect } from "react";
import "./importFileExcel.css";
import * as XLSX from "xlsx";
import axios from "axios";
import SweatAlert from "../../../config/SweatAlert";

const UploadFile = () => {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  console.log(excelFile);

  // handle file upload and check file type
  const fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Mohon untuk memilih file excel");
        setExcelFile(null);
      }
    } else {
      console.log("no file selected");
    }
  };

  // submit caleg
  const handleSubmitCaleg = (e) => {
    e.preventDefault();
    // if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data);
      // setExcelData(data);
      sendDataCaleg(data);
    // }
    // else{
    //   setExcelData(null);
    // }
    // dispatch(ImportService.importExcel(excelData))
  };

  // submit vote
  const handleSubmitVote = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data);
      // setExcelData(data);
      sendDataVote(data);
    }
    // else{
    //   setExcelData(null);
    // }
    // dispatch(ImportService.importExcel(excelData))
  };

  const sendDataCaleg = (data) => {
    axios.post("http://localhost:8000/caleg/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    SweatAlert("Data berhasil di upload", "success");
  };
  // const sendDataCaleg = (data) => async () => {
  //   try {
  //     await axios.post("http://localhost:8000/caleg/create", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     SweatAlert("Data caleg berhasil diupload", "success");
  //   } catch (error) {
  //     SweatAlert(String(error.response.data.message), "warning");
  //   }
  // };

  const sendDataVote = (data) => {
    axios.post("http://localhost:8000/suara/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    SweatAlert("Data berhasil di upload", "success");
  };

  // const sendDataVote = (data) => async () => {
  //   try {
  //     await axios.post("http://localhost:8000/dpp/create", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     SweatAlert("Data perolehan suara berhasil diupload", "success");
  //   } catch (error) {
  //     SweatAlert(String(error.response.data.message), "warning");
  //   }
  // };

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
                  <h6 className="m-0 font-weight-bold .text-gray-900">Upload Data Calon Legislatif</h6>
                </div>
                <div className="card-body">
                  <form className="user">
                    <label className="form-label">
                      Format nama file: <span className="text-dark">NamaCaleg_NamaPartai_Dapil.xlsx</span>
                    </label>
                    <input className="form-control input-file" required type="file" onChange={handleFile} />
                    {excelFileError && (
                      <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                        {excelFileError}
                      </div>
                    )}
                    <div className="row">
                      <button type="submit" onClick={handleSubmitCaleg} className="mt-2 ms-3 col-lg-2 btn btn-primary btn-user btn-block">
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold .text-gray-900">Upload daftar pemilih potensial</h6>
                </div>
                <div className="card-body">
                  <form className="user">
                    <label className="form-label">
                      Format nama file: <span className="text-dark">dummy.xls</span>
                    </label>
                    <input className="form-control" required type="file" onChange={handleFile} />
                    {excelFileError && (
                      <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                        {excelFileError}
                      </div>
                    )}
                    <div className="row">
                      <button type="submit" onClick={handleSubmit} className="mt-2 ms-3 col-lg-2 btn btn-primary btn-user btn-block">
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div> */}

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold .text-gray-900">Upload File Data Perolehan Suara</h6>
                </div>
                <div className="card-body">
                  <form className="user">
                    <label className="form-label">
                      Format nama file: <span className="text-dark">PerolehanSuara_Dapil.xlsx</span>
                    </label>
                    <input className="form-control input-file" required type="file" onChange={handleFile} />
                    {excelFileError && (
                      <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                        {excelFileError}
                      </div>
                    )}
                    <div className="row">
                      <button type="submit" onClick={handleSubmitVote} className="mt-2 ms-3 col-lg-2 btn btn-primary btn-user btn-block">
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
