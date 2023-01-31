import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Home} from '../../pages';

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default index;