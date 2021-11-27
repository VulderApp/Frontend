import { Container } from "@mui/material";
import React, { ReactElement } from "react";
import HomeLogo from "../components/home/HomeLogo";
import HomeSearch from "../components/home/HomeSearch";

const Home = (): ReactElement => {
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
