import React, { ReactElement } from "react";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import { Week } from "../../api/models/timetable/week";

interface TimetableCardProps {
  timetable: TimetableItem[];
  week: Week | null;
}

const TimetableCard: React.FC<TimetableCardProps> = ({ timetable, week }) => {
  // const getTimeToString = (date: Date): string =>
  //   new Date(date).toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });

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
    <Grid item xs={10}>
      {RenderCardWithDay()}
      {timetable.map((item, index) => {
        if (item.dayOfWeek !== week) return null;

        return (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center",
              width: "auto",
              marginTop: 2,
              padding: 1,
              gap: 1,
            }}
          >
            {/* <Typography sx={{ float: "left" }} component="a"> */}
            {/*  {item.lessonNumber} */}
            {/* </Typography> */}
            {/* <Typography sx={{ float: "left", marginLeft: 2 }} component="a"> */}
            {/*  {getTimeToString(item.startAt)} - {getTimeToString(item.endAt)} */}
            {/* </Typography> */}
            <Typography component="a">
              {item.subject?.flatMap((value, index) =>
                item.subject?.length === index + 1 ? (
                  value
                ) : (
                  <Box key={index}>
                    {value}
                    <Divider />
                  </Box>
                )
              )}
            </Typography>
            <Typography component="a">
              {item.teacher?.flatMap((value, index) =>
                item.teacher?.length === index + 1 ? (
                  value.initials
                ) : (
                  <Box key={index}>
                    {value.initials}
                    <Divider />
                  </Box>
                )
              )}
            </Typography>
            <Typography component="a">
              {item.classroom?.flatMap((classroom, index) =>
                item.classroom?.length === index + 1 ? (
                  classroom.classroomNumber
                ) : (
                  <Box key={index}>
                    {classroom.classroomNumber}
                    <Divider />
                  </Box>
                )
              )}
            </Typography>
          </Card>
        );
      })}
    </Grid>
  );
};

export default TimetableCard;
