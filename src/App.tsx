import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Appbar from "./components/root/Appbar";
import { Toolbar } from "@mui/material";
import Timetable from "./views/Timetable";
import { RecoilRoot } from "recoil";

const App = (): ReactElement => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Appbar />
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timetable" element={<Timetable />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
