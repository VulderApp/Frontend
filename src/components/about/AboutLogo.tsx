import React, { ReactElement } from "react";
import { Container, Typography } from "@mui/material";

const AboutLogo = (): ReactElement => {
  return (
    <Container sx={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h1" component="div">
        Vulder
      </Typography>
    </Container>
  );
};

export default AboutLogo;
