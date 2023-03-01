import React from "react";
import "./successVerification.css"
import { Check2Circle } from "react-bootstrap-icons";

const SuccessVerification = () => {
  return (
    <div className="box-verif mx-auto my-5 px-5 py-5 text-center text-white">
      <h1 className="mb-4">Success Verification</h1>
      <Check2Circle size={200} color={"#56f63d"}/>
      <h4 className="mt-4">Silahkan kontak admin agar melakukan approve akun anda supaya bisa digunakan untuk login ke aplikasi <b>Caleg Plus</b></h4>
    </div>
  );
}

export default SuccessVerification;