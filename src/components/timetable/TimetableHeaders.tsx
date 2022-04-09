import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TimetableHeaders = () => {
  const { t } = useTranslation();
  const headers = [
    "Hours",
    t("monday"),
    t("tuesday"),
    t("wednesday"),
    t("thursday"),
    t("friday"),
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(6, 1fr)",
      }}
    >
      {headers.map((item, index) => {
        return (
          <Card key={index} sx={{ textAlign: "center", padding: 2 }}>
            <Typography variant="h6" component="div">
              {item}
            </Typography>
          </Card>
        );
      })}
    </Box>
  );
};

export default TimetableHeaders;
