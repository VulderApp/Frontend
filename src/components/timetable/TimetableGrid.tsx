import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { getTimetable } from "../../api/api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorMessage, networkError, timetableData } from "../../states";
import NetworkFailMessage from "../../components/root/NetworkFailMessage";
import TimetableData from "./TimetableData";
import TimetableHeaders from "./TimetableHeaders";
import { TimetableItem } from "../../api/models/timetable/timetableItem";

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
  const desktopWidth = useMediaQuery("(min-width:1850px)");
  const [timetableItems, setTimetableItems] = useState<TimetableItem[] | null>(
    null
  );
  const [maxLesson, setMaxLessons] = useState(0);
  const [netError, setNetworkError] = useRecoilState(networkError);
  const setErrorMessage = useSetRecoilState(errorMessage);
  const setTimetableData = useSetRecoilState(timetableData);

  const onRender = async () => {
    const response = await getTimetable(schoolId, className, shortPath);

    if (typeof response === "string") {
      setErrorMessage(response);
      setNetworkError(true);
      return;
    }

    if (response.status === 200) {
      const sortedItems = response.data.timetableItems.sort(
        (a, b) => a.lessonNumber! - b.lessonNumber!
      );

      setMaxLessons(sortedItems[sortedItems.length - 1].lessonNumber!);
      setTimetableItems(sortedItems);
      setTimetableData(response.data);
    }
  };

  useEffect(() => {
    (async () => await onRender())();
  }, [netError]);

  return (
    <Grid
      sx={{
        display: "flex",
        minHeight: "80vh",
        minWidth: "auto",
        flexDirection: "row",
        flexWrap: desktopWidth ? "nowrap" : "wrap",
        alignContent: "center",
        alignItems: "baseline",
        justifyContent: "center",
      }}
      container
      spacing={2}
    >
      {timetableItems ? (
        <>
          <TimetableHeaders />
          {[...Array(maxLesson + 1)].map((_, index) => {
            return (
              <TimetableData
                key={index}
                items={timetableItems}
                lesson={index}
              />
            );
          })}
        </>
      ) : netError ? (
        <NetworkFailMessage />
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default TimetableGrid;
