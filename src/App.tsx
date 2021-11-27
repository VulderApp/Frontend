import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Appbar from "./components/root/Appbar";
import { Toolbar } from "@mui/material";

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Appbar />
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
