import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { getTimetable } from "../../api/api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  errorMessage,
  networkError,
  tabWeekDay,
  timetableData,
} from "../../states";
import NetworkFailMessage from "../../components/root/NetworkFailMessage";
import TimetableDesktopView from "./TimetableDesktopView";
import TimetableHeaders from "./TimetableHeaders";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import TimetableMobileView from "./TimetableMobileView";
import { MOBILE_QUERY_STRING } from "../../constants";
import TimetableMobileBottomTabs from "./TimetableMobileBottomTabs";

interface TimetableGridProps {
  schoolId: string;
  className: string;
  shortPath: string;
}

const TimetableGrid: React.FC<TimetableGridProps> = ({
  schoolId,
  className,
  shortPath,
}) => {
  const isMobile = useMediaQuery(MOBILE_QUERY_STRING);
  const [timetableItems, setTimetableItems] = useState<TimetableItem[] | null>(
    null
  );
  const [maxLesson, setMaxLessons] = useState(0);
  const [netError, setNetworkError] = useRecoilState(networkError);
  const weekDay = useRecoilValue(tabWeekDay);
  const setErrorMessage = useSetRecoilState(errorMessage);
  const setTimetableData = useSetRecoilState(timetableData);

  const onRender = async () => {
    const response = await getTimetable(schoolId, className, shortPath);

    if (typeof response === "string") {
      setErrorMessage(response);
      setNetworkError(true);
      return;
    }
    if (response.status !== 200) return;

    const sortedItems = response.data.timetableItems.sort(
      (a, b) => a.lessonNumber! - b.lessonNumber!
    );

    setMaxLessons(sortedItems[sortedItems.length - 1].lessonNumber!);
    setTimetableItems(sortedItems);
    setTimetableData(response.data);
  };

  const DesktopView = () => (
    <>
      <TimetableHeaders />
      {[...Array(maxLesson + 1)].map((_, index) => {
        return (
          <TimetableDesktopView
            key={index}
            items={timetableItems!}
            lesson={index}
          />
        );
      })}
    </>
  );

  const MobileView = () => (
    <>
      <TimetableMobileView timetable={timetableItems!} week={weekDay} />
      <TimetableMobileBottomTabs />
    </>
  );

  useEffect(() => {
    (async () => await onRender())();
  }, [netError]);

  return (
    <Grid
      sx={{
        display: "flex",
        minWidth: "auto",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "baseline",
        justifyContent: "center",
      }}
      container
      spacing={2}
    >
      {timetableItems ? (
        isMobile ? (
          <MobileView />
        ) : (
          <DesktopView />
        )
      ) : netError ? (
        <NetworkFailMessage />
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default TimetableGrid;
