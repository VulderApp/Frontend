import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const RenderCardWithDay = (): ReactElement => {
    let day;

    switch (week) {
      case Week.Monday:
        day = t("monday");
        break;
      case Week.Tuesday:
        day = t("tuesday");
        break;
      case Week.Wednesday:
        day = t("wednesday");
        break;
      case Week.Thursday:
        day = t("thursday");
        break;
      case Week.Friday:
        day = t("friday");
        break;
    }

    return (
      <>
        <Card sx={{ textAlign: "center", padding: 2 }}>
          <Typography variant="h6" component="div">
            {day}
          </Typography>
        </Card>
      </>
    );
  };

  return (
    <Grid item xs={10}>
      {RenderCardWithDay()}
      {timetable.map((item, index) => {
        if (item.dayOfWeek !== week) return null;

        return <TimetableCard key={index} item={item} emptyBoxes={null} />;
      })}
    </Grid>
  );
};

export default TimetableMobileView;
