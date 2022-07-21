import { Box, Card, Typography, useMediaQuery } from "@mui/material";
import React, { ReactElement } from "react";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import { MOBILE_QUERY_STRING } from "../../constants";
import { getTimetableTime } from "../../utils/dateUtil";
import * as _ from "lodash";

interface TimetableCardProps {
  item: TimetableItem;
  emptyBoxes: ReactElement[] | null;
}

interface TimetableDividerProps {
  index: number;
}

const TimetableCell: React.FC<TimetableCardProps> = ({ item, emptyBoxes }) => {
  const isMobile = useMediaQuery(MOBILE_QUERY_STRING);

  const getSubject = (index: number): string | null | undefined => {
    try {
      return item.subject?.[index];
    } catch (e: any) {
      return null;
    }
  };

  const getTeacherInitials = (index: number): string | null | undefined => {
    try {
      return item.teacher?.[index].initials;
    } catch (e: any) {
      return null;
    }
  };

  const getClassroomNumber = (index: number): string | null | undefined => {
    try {
      return item.classroom?.[index].classroomNumber;
    } catch (e: any) {
      return null;
    }
  };

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
      <Typography component="a">{getSubject(index)}</Typography>
      <Typography component="a">
        {_.isEmpty(item.teacher) ? null : getTeacherInitials(index)}
      </Typography>
      <Typography component="a">
        {_.isEmpty(item.classroom) ? null : getClassroomNumber(index)}
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
