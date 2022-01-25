import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Appbar from "./components/root/Appbar";
import { createTheme, ThemeProvider, Toolbar } from "@mui/material";
import Timetable from "./views/Timetable";
import { RecoilRoot } from "recoil";
import SnackbarError from "./components/root/SnackbarError";
import About from "./views/about/About";
import Contributors from "./views/about/Contributors";
import Licenses from "./views/about/Licenses";

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
          <SnackbarError />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timetable">
              <Route index element={<Home />} />
              <Route path=":id" element={<Timetable />} />
            </Route>
            <Route path="/about">
              <Route index element={<About />} />
              <Route path="contributors" element={<Contributors />} />
              <Route path="licenses" element={<Licenses />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
