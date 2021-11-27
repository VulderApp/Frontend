import React, { ReactElement } from "react";
import { Container, Typography } from "@mui/material";

const HomeLogo = (): ReactElement => {
  return (
    <Container>
      <Typography sx={{ textAlign: "center", fontWeight: "400" }} variant="h1">
        Vulder
      </Typography>
    </Container>
  );
};

export default HomeLogo;
