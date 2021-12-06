import React, { ReactElement } from "react";
import { Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { timetableTitle } from "../../states";

const TimetableTitle = (): ReactElement => {
  const [title] = useRecoilState(timetableTitle);

  return (
    <Typography
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      variant="h2"
      component="div"
    >
      {title}
    </Typography>
  );
};

export default TimetableTitle;
