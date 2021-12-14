import React, { ReactElement } from "react";
import TimetableGrid from "../components/timetable/TimetableGrid";
import { useRecoilState } from "recoil";
import {
  actualTimetable,
  appbarTitle,
  isTimetableView,
  timetableTitle,
} from "../states";
import { LAST_SCHOOL_ID } from "../constants";
import { getItem } from "../utils/localStorageUtil";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TimetableTitle from "../components/timetable/TimetableTitle";
import { getSchoolDetails } from "../api/api";

const Timetable = (): ReactElement => {
  const [selectedBranch] = useRecoilState(actualTimetable);
  const [, setTitle] = useRecoilState(timetableTitle);
  const [timetableView, setTimetableView] = useRecoilState(isTimetableView);
  const [, setAppbarTitle] = useRecoilState(appbarTitle);
  const [schoolName, setSchoolName] = React.useState<string | null>(null);
  const [resetTimetable, setResetTimetable] = React.useState<number | null>(
    null
  );
  const schoolId = getItem(LAST_SCHOOL_ID);

  const onMount = () => {
    const navigate = useNavigate();
    if (schoolId === null) {
      navigate("/");
    }
  };

  const setSchoolNameToAppbar = async () => {
    const school = await getSchoolDetails(schoolId!);
    if (school.status === 204) return;

    setSchoolName(school.data.name);
    setAppbarTitle(school.data.name);
    setTimetableView(true);
  };

  React.useEffect(() => {
    (async () => {
      if (schoolName !== null) return;
      await setSchoolNameToAppbar();
    })();
  }, [timetableView]);

  React.useEffect(() => {
    if (selectedBranch === null) return;

    setResetTimetable(new Date().getTime());
    setTitle(selectedBranch.name);
  }, [selectedBranch]);

  onMount();

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
