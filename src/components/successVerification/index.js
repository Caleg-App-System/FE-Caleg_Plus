import React from "react";
import "./successVerification.css"
import { Check2Circle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyAccountActions } from "../../config/redux/actions/authActions";

const SuccessVerification = (props) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  if (props.tokenVerify) {
    const token = { token: props.tokenVerify };
    dispatch(verifyAccountActions(token, history));
    // console.log(token);
  }

  return (
    <div className="box-verif mx-auto my-5 px-5 py-5 text-center text-white">
      <h1 className="mb-4">Success Verification</h1>
      <Check2Circle size={200} color={"#50e333"} />
      <h4 className="mt-4">Silahkan kontak admin untuk info lebih lanjut agar akun anda bisa login ke aplikasi <b>Caleg Plus</b></h4>
    </div>
  );
}

export default SuccessVerification;