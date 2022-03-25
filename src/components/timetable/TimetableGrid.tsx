import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { getTimetable } from "../../api/api";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import TimetableCard from "./TimetableCard";
import { Week } from "../../api/models/timetable/week";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorMessage, networkError, timetableData } from "../../states";
import NetworkFailMessage from "../../components/root/NetworkFailMessage";
import moment from "moment";
import TimetableHours from "./TimetableHours";

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
  const [netError, setNetworkError] = useRecoilState(networkError);
  const [hours, setHours] = useState<string[]>([]);
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
      let lesson = 0;
      setTimetableItems(
        response.data.timetableItems.sort(
          (a, b) => a.lessonNumber! + b.lessonNumber!
        )
      );

      response.data.timetableItems?.forEach((item) => {
        if (item.lessonNumber! > lesson) {
          const date = `${moment(item.startAt).format("LT")} - ${moment(
            item.endAt
          ).format("LT")}`;
          setHours([...hours, date]);
        }

        lesson++;
      });

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
          <TimetableHours hours={hours} />
          <TimetableCard timetable={timetableItems} week={Week.Monday} />
          <TimetableCard timetable={timetableItems} week={Week.Tuesday} />
          <TimetableCard timetable={timetableItems} week={Week.Wednesday} />
          <TimetableCard timetable={timetableItems} week={Week.Thursday} />
          <TimetableCard timetable={timetableItems} week={Week.Friday} />
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
