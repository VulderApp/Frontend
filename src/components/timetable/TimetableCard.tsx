import React, { ReactElement } from "react";
import { Card, Container, Grid, Typography } from "@mui/material";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import { Week } from "../../api/models/timetable/week";

interface TimetableCardProps {
  timetable: TimetableItem[];
  week: Week | null;
}

const TimetableCard: React.FC<TimetableCardProps> = ({ timetable, week }) => {
  const getTimeToString = (date: Date): string =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const RenderCardWithDay = (): ReactElement => {
    let day;

    switch (week) {
      case Week.Monday:
        day = "Monday";
        break;
      case Week.Tuesday:
        day = "Tuesday";
        break;
      case Week.Wednesday:
        day = "Wednesday";
        break;
      case Week.Thursday:
        day = "Thursday";
        break;
      case Week.Friday:
        day = "Friday";
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
    <Grid item xs={4}>
      {RenderCardWithDay()}
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 2,
        }}
      >
        {timetable.map((item, index) => {
          if (item.dayOfWeek !== week) return null;

          return (
            <Container key={index} sx={{ display: "flex" }}>
              <Typography sx={{ float: "left" }}>
                {item.lessonNumber}
              </Typography>
              <Typography sx={{ float: "left", marginLeft: 2 }}>
                {getTimeToString(item.startAt)}-{getTimeToString(item.endAt)}
              </Typography>
              <Typography>{item.subject?.join("/")}</Typography>
              <Typography>
                {item.subject?.join("/")}
                {item.teacher?.map((item, index) => (
                  <Typography key={index}>{item.initials}</Typography>
                ))}
              </Typography>
            </Container>
          );
        })}
      </Card>
    </Grid>
  );
};

export default TimetableCard;
