import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthService } from "../../services/authServices";

function Protected({ children }) {
  // Navigate
  const navigate = useNavigate();
  const role = useSelector(state => state.auth.role)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

useEffect(() => {
    if (role !== "ADMIN" || !isLoggedIn) {
        navigate("/");
    }
}, [role, navigate, isLoggedIn]);

  return children;
}

export default Protected;