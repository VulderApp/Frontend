import { Container } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import HomeLogo from "../components/home/HomeLogo";
import HomeSearch from "../components/home/HomeSearch";
import { useSetRecoilState } from "recoil";
import { appbarTitle, isTimetableView, subpage } from "../states";
import { HOME_APPBAR_TITLE } from "../constants";

const Home = (): ReactElement => {
  const setSubpage = useSetRecoilState(subpage);
  const setTimetableView = useSetRecoilState(isTimetableView);
  const setAppbarTitle = useSetRecoilState(appbarTitle);

  useEffect(() => {
    setAppbarTitle(HOME_APPBAR_TITLE);
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
