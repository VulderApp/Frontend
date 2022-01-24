import React, { ReactElement } from "react";
import AboutLogo from "../components/about/AboutLogo";
import AboutMenuCard from "../components/about/AboutMenuCard";
import { Container } from "@mui/material";

const About = (): ReactElement => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AboutLogo />
      <AboutMenuCard />
    </Container>
  );
};

export default About;
