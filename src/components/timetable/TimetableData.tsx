import React, { useState } from "react";
import { Box, Card, Divider, Typography, useMediaQuery } from "@mui/material";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import { getTimetableTime } from "../../utils/timeUtil";

interface TimetableDataProps {
  items: TimetableItem[];
  lesson: number;
}

const TimetableData: React.FC<TimetableDataProps> = ({ items, lesson }) => {
  const isMobile = useMediaQuery("(max-width:1850px)");
  const [time, setTime] = useState<string | null>(null);

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(6, 1fr)",
      }}
    >
      {time ? (
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            width: "auto",
            marginTop: 2,
            marginBottom: 2,
            padding: 1,
            minHeight: isMobile ? "4rem" : "6rem",
            gap: 1,
          }}
        >
          <Typography component="a">{time}</Typography>
        </Card>
      ) : null}
      {items.map((item, index) => {
        if (item.lessonNumber !== lesson) return null;
        if (time === null) setTime(getTimetableTime(item.startAt, item.endAt));

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
              marginBottom: 2,
              padding: 1,
              minHeight: isMobile ? "4rem" : "6rem",
              gap: 1,
            }}
          >
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
    </Box>
  );
};

export default TimetableData;
