import React, { ReactElement } from "react";
import TimetableGrid from "../components/timetable/TimetableGrid";
import { useRecoilState } from "recoil";
import { actualTimetable, timetableTitle } from "../states";
import { LAST_SCHOOL_ID } from "../constants";
import { getItem } from "../utils/localStorageUtil";
import { Container } from "@mui/material";
import TimetableTitle from "../components/timetable/TimetableTitle";

const Timetable = (): ReactElement => {
  const [selectedBranch] = useRecoilState(actualTimetable);
  const [, setTitle] = useRecoilState(timetableTitle);
  const [resetTimetable, setResetTimetable] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    if (selectedBranch === null) return;

    setResetTimetable(new Date().getTime());
    setTitle(selectedBranch.name);
  }, [selectedBranch]);

  return (
    <Container>
      {resetTimetable ? (
        <>
          <TimetableTitle />
          <TimetableGrid
            key={resetTimetable}
            schoolId={getItem(LAST_SCHOOL_ID)!}
            className={selectedBranch!.name!}
            shortPath={selectedBranch!.url!}
          />
        </>
      ) : null}
    </Container>
  );
};

export default Timetable;
