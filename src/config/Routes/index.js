import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Register, Login, Admin } from "../../pages";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
