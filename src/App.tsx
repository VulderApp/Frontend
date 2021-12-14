import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Appbar from "./components/root/Appbar";
import { createTheme, ThemeProvider, Toolbar } from "@mui/material";
import Timetable from "./views/Timetable";
import { RecoilRoot } from "recoil";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffc107",
    },
    secondary: {
      main: "#ff9100",
    },
  },
});

const App = (): ReactElement => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Appbar />
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timetable" element={<Timetable />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
