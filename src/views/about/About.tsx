import React, { ReactElement, useEffect } from "react";
import AboutLogo from "../../components/about/AboutLogo";
import AboutMenuCard from "../../components/about/AboutMenuCard";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { appbarTitle, subpage } from "../../states";
import i18next from "../../i18n";

const About = (): ReactElement => {
  const setSubpage = useSetRecoilState(subpage);
  const setAppbarTitle = useSetRecoilState(appbarTitle);
  const navigate = useNavigate();

  useEffect(() => {
    setAppbarTitle(i18next.t("about"));
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
