import React, { ReactElement, useEffect, useState } from "react";
import TimetableGrid from "../components/timetable/TimetableGrid";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  actualSchoolId,
  actualTimetable,
  appbarTitle,
  errorMessage,
  isTimetableView,
  networkError,
  subpage,
  timetableTitle,
} from "../states";
import { LAST_SCHOOL_ID } from "../constants";
import { getItem } from "../utils/localStorageUtil";
import { Container, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TimetableTitle from "../components/timetable/TimetableTitle";
import { getSchoolDetails } from "../api/api";
import TimetableInfo from "../components/timetable/TimetableInfo";
import NetworkFailMessage from "../components/root/NetworkFailMessage";
import { changeTitle } from "../utils/titleUtil";

const Timetable = (): ReactElement => {
  const selectedBranch = useRecoilValue(actualTimetable);
  const setTitle = useSetRecoilState(timetableTitle);
  const [timetableView, setTimetableView] = useRecoilState(isTimetableView);
  const setAppbarTitle = useSetRecoilState(appbarTitle);
  const [schoolName, setSchoolName] = useState<string | null>(null);
  const setSchoolId = useSetRecoilState(actualSchoolId);
  const [resetTimetable, setResetTimetable] = useState<number | null>(null);
  const setErrorMessage = useSetRecoilState(errorMessage);
  const [netError, setNetworkErrorMessage] = useRecoilState(networkError);
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
      setNetworkErrorMessage(true);
      return;
    }

    if (response.status === 204) return;

    setSchoolName(response.data.name);
    setAppbarTitle(response.data.name);
    setTimetableView(true);
  };

  useEffect(() => {
    (async () => {
      if (schoolName !== null) return;
      if (netError) return;

      await setSchoolNameToAppbar();
    })();
  }, [timetableView, netError]);

  useEffect(() => {
    if (selectedBranch === null) return;
    if (netError) return;

    setResetTimetable(new Date().getTime());
    setTitle(selectedBranch.name);
    document.title = changeTitle(`${schoolName} / ${selectedBranch!.name!}`);
  }, [selectedBranch, netError]);

  onMount();

  const NetworkErrorContainer = () => (
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
      <NetworkFailMessage />
    </Container>
  );

  return (
    <Container
      sx={{
        minWidth: "90%",
      }}
    >
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
      ) : netError ? (
        <NetworkErrorContainer />
      ) : (
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
      )}
      <TimetableInfo />
    </Container>
  );
};

export default Timetable;
