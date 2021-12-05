import React, { ReactElement } from "react";
import TimetableGrid from "../components/timetable/TimetableGrid";
import { useRecoilState } from "recoil";
import { actualTimetable } from "../states";
import { LAST_SCHOOL_ID } from "../constants";
import { getItem } from "../utils/localStorageUtil";
import { Container } from "@mui/material";

const Timetable = (): ReactElement => {
  const [selectedBranch] = useRecoilState(actualTimetable);

  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "70vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selectedBranch ? (
        <TimetableGrid
          schoolId={getItem(LAST_SCHOOL_ID)!}
          className={selectedBranch!.name!}
          shortPath={selectedBranch!.url!}
        />
      ) : null}
    </Container>
  );
};

export default Timetable;
