import React, { useEffect } from "react";

import { LoginAdmin } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const LoginAdminPage = () => {
  const history = useNavigate()
  const checkLogin = useSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    if (checkLogin === true) {
      history('/admin')
    }
  }, [checkLogin, history])

  return (
    <div>
      <LoginAdmin />
    </div>
  );
}

export default LoginAdminPage;