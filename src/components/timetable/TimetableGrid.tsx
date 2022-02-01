import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { getTimetable } from "../../api/api";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import TimetableCard from "./TimetableCard";
import { Week } from "../../api/models/timetable/week";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorMessage, networkError, timetableData } from "../../states";
import NetworkFailMessage from "../../components/root/NetworkFailMessage";

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
  const [timetableItems, setTimetableItems] = useState<TimetableItem[] | null>(
    null
  );
  const [error, setNetworkError] = useRecoilState(networkError);
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
      setTimetableItems(response.data.timetableItems);
      setTimetableData(response.data);
    }
  };

  useEffect(() => {
    (async () => await onRender())();
  }, [error]);

  return (
    <Grid
      sx={{
        display: "flex",
        minHeight: "80vh",
        minWidth: "auto",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
      container
      spacing={2}
    >
      {timetableItems ? (
        <>
          <TimetableCard timetable={timetableItems} week={Week.Monday} />
          <TimetableCard timetable={timetableItems} week={Week.Tuesday} />
          <TimetableCard timetable={timetableItems} week={Week.Wednesday} />
          <TimetableCard timetable={timetableItems} week={Week.Thursday} />
          <TimetableCard timetable={timetableItems} week={Week.Friday} />
        </>
      ) : error ? (
        <NetworkFailMessage />
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default TimetableGrid;
