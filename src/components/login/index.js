import React from "react";
import "./login.css";
import IconMasuk from "../../assets/icons/masuk.svg";
import {Airplane} from "react-bootstrap-icons"

const LoginComponent = () => {
  return (
    <>
      <div className="content mx-auto my-5 px-5 py-5">
        <div className="container">
          <form className="">
            <h3 className="mb-4 fw-bold text-center">MASUK</h3>
            <div className="row d-flex justify-content-center ">
              <div className="col">
                <div className="form-group mb-3">
                  <div className="col">
                    <input className="" type="text" placeholder="Username..." aria-label="" name="username" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center ">
              <div className="col">
                <div className="form-group mb-3">
                  <div className="col">
                    <input className="" type="password" placeholder="Password..." aria-label="" name="password" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button className="btn btn-danger button-register mb-3 align-item-center text-white fw-bold">
                <img src={IconMasuk} alt="icon-masuk" className="icon-masuk" />
                MASUK
              </button>
            </div>
            <p className="text-medium">
              Belum punya akun ?{" "}
              <a href="/register" className="text-danger fw-bold text-decoration-none">
                {" "}
                Daftar
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
