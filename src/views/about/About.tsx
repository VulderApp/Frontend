import React, { ReactElement, useEffect } from "react";
import AboutLogo from "../../components/about/AboutLogo";
import AboutMenuCard from "../../components/about/AboutMenuCard";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { subpage } from "../../states";

const About = (): ReactElement => {
  const setSubpage = useSetRecoilState(subpage);
  const navigate = useNavigate();

  useEffect(() => {
    setSubpage(true);
  }, []);

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
