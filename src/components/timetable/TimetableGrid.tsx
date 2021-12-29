import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { getTimetable } from "../../api/api";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import TimetableCard from "./TimetableCard";
import { Week } from "../../api/models/timetable/week";
import { useRecoilState } from "recoil";
import { errorMessage, timetableData } from "../../states";

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
  const [timetableItems, setTimetableItems] = React.useState<
    TimetableItem[] | null
  >(null);
  const [, setErrorMessage] = useRecoilState(errorMessage);
  const [, setTimetableData] = useRecoilState(timetableData);

  const onRender = async () => {
    const response = await getTimetable(schoolId, className, shortPath);

    if (typeof response === "string") {
      setErrorMessage(response);
      return;
    }

    if (response.status === 200) {
      setTimetableItems(response.data.timetableItems);
      setTimetableData(response.data);
    }
  };

  React.useEffect(() => {
    (async () => await onRender())();
  }, []);

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
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default TimetableGrid;
