import { Box, Card, Typography, useMediaQuery } from "@mui/material";
import React, { ReactElement } from "react";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import { MOBILE_QUERY_STRING } from "../../constants";
import { getTimetableTime } from "../../utils/dateUtil";

interface TimetableCardProps {
  item: TimetableItem;
  emptyBoxes: ReactElement[] | null;
}

interface TimetableDividerProps {
  index: number;
}

const TimetableCell: React.FC<TimetableCardProps> = ({ item, emptyBoxes }) => {
  const isMobile = useMediaQuery(MOBILE_QUERY_STRING);

  const TimetableDivider: React.FC<TimetableDividerProps> = ({ index }) => (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
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
      <Typography component="a">{item.subject?.[index]}</Typography>
      <Typography component="a">{item.teacher?.[index].initials}</Typography>
      <Typography component="a">
        {item.classroom?.[index].classroomNumber}
      </Typography>
    </Card>
  );

  const renderCells = () => {
    const timetableCells: ReactElement[] = [];

    for (let index = 0; index < item.subject?.length!; ++index) {
      timetableCells.push(<TimetableDivider index={index} />);
    }

    return timetableCells;
  };

  return (
    <>
      {emptyBoxes}
      <Box>{renderCells()}</Box>
    </>
  );
};

export default TimetableCell;
