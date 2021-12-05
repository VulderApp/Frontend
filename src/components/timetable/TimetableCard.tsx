import React from "react";
import { Card, Container, Divider, Grid, Typography } from "@mui/material";
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

  return (
    <Grid item xs={4}>
      <Card>
        <Typography>{week?.toString()}</Typography>
      </Card>
      <Card
        sx={{
          marginTop: 2,
        }}
      >
        {timetable.map((item, index) => {
          if (item.dayOfWeek !== week) return null;

          return (
            <Container key={index}>
              <Typography sx={{ float: "left" }}>
                {item.lessonNumber}
              </Typography>
              <Typography sx={{ float: "left", marginLeft: 2 }}>
                {getTimeToString(item.startAt)}-{getTimeToString(item.endAt)}
              </Typography>
              <Typography sx={{ float: "right" }}>
                {item.subject?.join("/")}
              </Typography>
              <Divider />
            </Container>
          );
        })}
      </Card>
    </Grid>
  );
};

export default TimetableCard;
