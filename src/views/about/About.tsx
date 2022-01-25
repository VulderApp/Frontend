import React, { ReactElement } from "react";
import AboutLogo from "../../components/about/AboutLogo";
import AboutMenuCard from "../../components/about/AboutMenuCard";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const About = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AboutLogo />
      <AboutMenuCard navigate={navigate} />
    </Container>
  );
};

export default About;
