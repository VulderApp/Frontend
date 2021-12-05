import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { getTimetable } from "../../api/api";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import TimetableCard from "./TimetableCard";
import { Week } from "../../api/models/timetable/week";

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

  const onRender = async () => {
    const response = await getTimetable(schoolId, className, shortPath);

    if (response.status === 200) {
      setTimetableItems(response.data.timetableItems);
    }
  };

  React.useEffect(() => {
    (async () => await onRender())();
  }, []);

  return (
    <Grid container spacing={2}>
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
