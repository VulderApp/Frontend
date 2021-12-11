import { Container } from "@mui/material";
import React, { ReactElement } from "react";
import HomeLogo from "../components/home/HomeLogo";
import HomeSearch from "../components/home/HomeSearch";
import { useRecoilState } from "recoil";
import { isTimetableView } from "../states";

const Home = (): ReactElement => {
  const [, setTimetableView] = useRecoilState(isTimetableView);

  setTimetableView(false);

  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "70vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HomeLogo />
      <HomeSearch />
    </Container>
  );
};

export default Home;
