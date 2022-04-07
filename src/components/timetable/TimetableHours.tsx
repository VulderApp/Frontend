import React from "react";
import { Card, Grid, Typography } from "@mui/material";

interface TimetableHoursProps {
  hours: string[];
}

const TimetableHours: React.FC<TimetableHoursProps> = ({ hours }) => {
  return (
    <Grid item xs={10}>
      <Card sx={{ textAlign: "center", padding: 2 }}>
        <Typography variant="h6" component="div">
          No
        </Typography>
      </Card>
      {hours.map((item, index) => (
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
            minHeight: "6rem",
            gap: 1,
          }}
        >
          <Typography component="a">{item}</Typography>
        </Card>
      ))}
    </Grid>
  );
};

export default TimetableHours;
