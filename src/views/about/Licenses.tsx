import React, { ReactElement, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { appbarTitle } from "../../states";
import LicenseCard from "../../components/about/licenses/LicenseCard";
import { Container } from "@mui/material";
import i18next from "../../i18n";

const Licenses = (): ReactElement => {
  const setTitle = useSetRecoilState(appbarTitle);

  useEffect(() => {
    setTitle(i18next.t("licensesLabel"));
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
