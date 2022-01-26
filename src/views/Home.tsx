import { Container } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import HomeLogo from "../components/home/HomeLogo";
import HomeSearch from "../components/home/HomeSearch";
import { useSetRecoilState } from "recoil";
import { isTimetableView, subpage } from "../states";

const Home = (): ReactElement => {
  const setSubpage = useSetRecoilState(subpage);
  const setTimetableView = useSetRecoilState(isTimetableView);

  useEffect(() => {
    setSubpage(false);
    setTimetableView(false);
  });

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
