import React, { ReactElement, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { TimetableItem } from "../../api/models/timetable/timetableItem";
import { getTimetableTime } from "../../utils/timeUtil";
import TimetableCard from "./TimetableCard";

interface TimetableDesktopViewProps {
  items: TimetableItem[];
  lesson: number;
}

const TimetableDesktopView: React.FC<TimetableDesktopViewProps> = ({
  items,
  lesson,
}) => {
  const [time, setTime] = useState<string | null>(null);
  let lastDay: number = 0;

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
            flexWrap: "wrap",
            alignItems: "center",
            width: "auto",
            marginTop: 2,
            marginBottom: 2,
            padding: 1,
            minHeight: "6rem",
            gap: 1,
          }}
        >
          <Typography component="a">{time}</Typography>
        </Card>
      ) : null}
      {items.map((item, index) => {
        const difference: number = item.dayOfWeek! - lastDay;
        const emptyBoxes: ReactElement[] = [];
        if (item.lessonNumber !== lesson) return null;
        if (time === null) setTime(getTimetableTime(item.startAt, item.endAt));
        if (difference > 0) {
          for (let i = 0; i < difference; i++) {
            const emptyCard = (
              <Box
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
                  minHeight: "6rem",
                  gap: 1,
                }}
              ></Box>
            );
            lastDay = item.dayOfWeek!;
            emptyBoxes!.push(emptyCard);
          }
        }

        lastDay++;

        return (
          <TimetableCard key={index} item={item} emptyBoxes={emptyBoxes} />
        );
      })}
    </Box>
  );
};

export default TimetableDesktopView;
