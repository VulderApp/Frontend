import React, { ReactElement } from "react";
import TimetableGrid from "../components/timetable/TimetableGrid";
import { useRecoilState } from "recoil";
import { actualTimetable } from "../states";
import { LAST_SCHOOL_ID } from "../constants";
import { getItem } from "../utils/localStorageUtil";
import { Container } from "@mui/material";

const Timetable = (): ReactElement => {
  const [selectedBranch] = useRecoilState(actualTimetable);
  const [resetTimetable, setResetTimetable] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    if (selectedBranch === null) return;

    setResetTimetable(new Date().getTime());
  }, [selectedBranch]);

  return (
    <Container>
      {resetTimetable ? (
        <TimetableGrid
          key={resetTimetable}
          schoolId={getItem(LAST_SCHOOL_ID)!}
          className={selectedBranch!.name!}
          shortPath={selectedBranch!.url!}
        />
      ) : null}
    </Container>
  );
};

export default Timetable;
