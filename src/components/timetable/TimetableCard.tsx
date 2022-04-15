import { Box, Card, Divider, Typography, useMediaQuery } from "@mui/material";
import React, { ReactElement } from "react";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import { MOBILE_QUERY_STRING } from "../../constants";
import { getTimetableTime } from "../../utils/timeUtil";

interface TimetableCardProps {
  item: TimetableItem;
  emptyBoxes: ReactElement[] | null;
}

const TimetableCard: React.FC<TimetableCardProps> = ({ item, emptyBoxes }) => {
  const isMobile = useMediaQuery(MOBILE_QUERY_STRING);

  return (
    <>
      {emptyBoxes}
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: isMobile ? "start" : "center",
          width: "auto",
          marginTop: 2,
          marginBottom: 2,
          padding: 1,
          minHeight: "6rem",
          textIndent: 2,
          gap: 1,
        }}
      >
        {isMobile ? (
          <>
            <Typography sx={{ float: "left" }} component="a">
              {item.lessonNumber}.
            </Typography>
            <Typography sx={{ float: "left" }} component="a">
              {getTimetableTime(item.startAt, item.endAt)}
            </Typography>
          </>
        ) : null}
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
    </>
  );
};

export default TimetableCard;
