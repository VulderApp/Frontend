import React, { ReactElement, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { appbarTitle } from "../../states";
import LicenseCard from "../../components/about/licenses/LicenseCard";
import { Container } from "@mui/material";

const Licenses = (): ReactElement => {
  const setTitle = useSetRecoilState(appbarTitle);

  useEffect(() => {
    setTitle("Licenses");
  }, []);

  return (
    <Container
      sx={{
        padding: "2rem",
      }}
    >
      <LicenseCard />
    </Container>
  );
};

export default Licenses;
