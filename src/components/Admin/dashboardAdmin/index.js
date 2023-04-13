import React, { useState, useEffect } from "react";
import { CountServices } from "../../../services/countServices";
import { BarChart, Calendar2Check, People } from "react-bootstrap-icons";

const DashboardAdmin = () => {
  const [countDPT, setCountDPT] = useState(0);
  const [countDPP, setCountDPP] = useState(0);
  const [countUser, setCountUser] = useState(0);

  useEffect(() => {
    CountServices.countDPT().then((response) => {
      setCountDPT(response.data.data);
    });
    CountServices.countDPP().then((response) => {
      setCountDPP(response.data.data);
    });
    CountServices.countUser().then((response) => {
      setCountUser(response.data.data);
    });
  }, []);

  return (
    <>
      <main className="container-usermanagement col-md-9 col-lg-11">
        <div className="content-usermanagement px-2 py-2">
          <div className="table-usermanagement">
            <h3 className="">Dashboard</h3>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm mb-4 mt-4 ms-lg-5">
                <div className="card shadow mb-4 rounded-3 border-0" style={{ backgroundColor: "#FAAB78" }}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-auto">
                        <BarChart size={40} color="white" className="mt-2" />
                      </div>
                      <div className="col">
                        <div className="text-white fw-bold mb-3">
                          Total Pemilih Tetap
                        </div>
                        <div className="h5 mb-0 fw-bold text-white">{countDPT}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm mb-4 mt-4 ms-lg-5">
                <div className="card shadow mb-4 rounded-3 border-0" style={{ backgroundColor: "#ADE792" }}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-auto">
                        <Calendar2Check size={40} color="white" className="mt-2" />
                      </div>
                      <div className="col">
                        <div className="text-white fw-bold mb-3">
                          Total Pemilih Potensial
                        </div>
                        <div className="h5 mb-0 fw-bold text-white">{countDPP}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mt-4 ms-lg-5">
                <div className="card shadow mb-4 rounded-3 border-0" style={{ backgroundColor: "#7978FF" }}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-auto">
                        <People size={40} color="white" className="mt-2" />
                      </div>
                      <div className="col">
                        <div className="text-white fw-bold mb-3">
                          Total Petugas
                        </div>
                        <div className="h5 mb-0 fw-bold text-white">{countUser}</div>
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
}

export default DashboardAdmin;