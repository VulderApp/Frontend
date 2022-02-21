import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Appbar from "./components/root/Appbar";
import { createTheme, ThemeProvider, Toolbar } from "@mui/material";
import Timetable from "./views/Timetable";
import { useRecoilValue } from "recoil";
import SnackbarError from "./components/root/SnackbarError";
import About from "./views/about/About";
import Contributors from "./views/about/Contributors";
import Licenses from "./views/about/Licenses";
import CssBaseline from "@mui/material/CssBaseline";
import { lightMode } from "./states";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffc107",
    },
    secondary: {
      main: "#ff9100",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: lightTheme.palette.primary,
    secondary: lightTheme.palette.secondary,
  },
});

const App = (): ReactElement => {
  const mode = useRecoilValue(lightMode);

  return (
    <ThemeProvider theme={mode ? lightTheme : darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Appbar />
        <Toolbar />
        <SnackbarError />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timetable">
            <Route index element={<Home />} />
            <Route path=":id" element={<Timetable />}>
              <Route index element={<Timetable />} />
            </Route>
          </Route>
          <Route path="/about">
            <Route index element={<About />} />
            <Route path="contributors" element={<Contributors />} />
            <Route path="licenses" element={<Licenses />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
