import React, { ReactElement } from "react";
import TimetableGrid from "../components/timetable/TimetableGrid";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  actualSchoolId,
  actualTimetable,
  appbarTitle,
  errorMessage,
  isTimetableView,
  subpage,
  timetableTitle,
} from "../states";
import { LAST_SCHOOL_ID } from "../constants";
import { getItem } from "../utils/localStorageUtil";
import { CircularProgress, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TimetableTitle from "../components/timetable/TimetableTitle";
import { getSchoolDetails } from "../api/api";
import TimetableInfo from "../components/timetable/TimetableInfo";

const Timetable = (): ReactElement => {
  const [selectedBranch] = useRecoilState(actualTimetable);
  const [, setTitle] = useRecoilState(timetableTitle);
  const [timetableView, setTimetableView] = useRecoilState(isTimetableView);
  const [, setAppbarTitle] = useRecoilState(appbarTitle);
  const [schoolName, setSchoolName] = React.useState<string | null>(null);
  const [, setSchoolId] = useRecoilState(actualSchoolId);
  const [resetTimetable, setResetTimetable] = React.useState<number | null>(
    null
  );
  const [, setErrorMessage] = useRecoilState(errorMessage);
  const setSubpage = useSetRecoilState(subpage);
  const { id } = useParams();

  const onMount = () => {
    const navigate = useNavigate();
    setSchoolId(id);
    setSubpage(true);

    if (id === null) {
      navigate("/");
    }
  };

  const setSchoolNameToAppbar = async () => {
    const response = await getSchoolDetails(id!);

    if (typeof response === "string") {
      setErrorMessage(response);
      return;
    }

    if (response.status === 204) return;

    setSchoolName(response.data.name);
    setAppbarTitle(response.data.name);
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
      ) : (
        <>
          <Container
            sx={{
              display: "flex",
              minHeight: "80vh",
              minWidth: "auto",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Container>
        </>
      )}
      <TimetableInfo />
    </Container>
  );
};

export default Timetable;
