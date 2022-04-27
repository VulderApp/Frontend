import React, { ReactElement } from "react";
import { Card, CardContent } from "@mui/material";
import LicenseList from "./LicenseList";

const LicenseCard = (): ReactElement => {
  return (
    <Card sx={{ marginBottom: "1rem" }}>
      <CardContent sx={{ padding: 0, "&:last-child": { paddingBottom: 0 } }}>
        <LicenseList />
      </CardContent>
    </Card>
  );
};

export default LicenseCard;
