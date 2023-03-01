import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home, Register, Login, Admin, LoginAdminPage, ShowElection, SuccessVerificationPage, NotFound404Page } from "../../pages";
import Protected from "./Protected";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return children;
  }
  return <Navigate to="/" />;
}

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound404Page />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin" element={<LoginAdminPage />} />
        <Route path="/admin" element={<Protected><Admin /></Protected>} />
        <Route path="/election/data" element={<PrivateRoute><ShowElection /></PrivateRoute>} />
        <Route path="/success/verification" element={<SuccessVerificationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
