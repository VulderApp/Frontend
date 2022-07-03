import React from "react";
import { Grid } from "@mui/material";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import { Week } from "../../api/models/timetable/week";
import TimetableCard from "./TimetableCard";

interface TimetableMobileViewProps {
  timetable: TimetableItem[];
  week: Week | null;
}

const TimetableMobileView: React.FC<TimetableMobileViewProps> = ({
  timetable,
  week,
}) => {
  return (
    <Grid item xs={10}>
      {timetable.map((item, index) => {
        if (item.dayOfWeek !== week) return null;

        return <TimetableCard key={index} item={item} emptyBoxes={null} />;
      })}
    </Grid>
  );
};

export default TimetableMobileView;
