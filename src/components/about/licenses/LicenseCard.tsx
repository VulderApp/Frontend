import React, { ReactElement } from "react";
import { Card, CardContent } from "@mui/material";
import LicenseList from "./LicenseList";

const LicenseCard = (): ReactElement => {
  return (
    <Card>
      <CardContent>
        <LicenseList />
      </CardContent>
    </Card>
  );
};

export default LicenseCard;
