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
        <Card key={index} sx={{ textAlign: "center", padding: 2 }}>
          <Typography component="a">{item}</Typography>
        </Card>
      ))}
    </Grid>
  );
};

export default TimetableHours;
