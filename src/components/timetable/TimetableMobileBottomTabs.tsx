import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { tabWeekDay } from "../../states";

const TimetableMobileBottomTabs = () => {
  const [tabIndex, setTabIndex] = useRecoilState(tabWeekDay);
  const { t } = useTranslation();

  const handleTabChange = (value: number) => setTabIndex(value);

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={(event, value) => handleTabChange(value)}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="timetable week day select"
        indicatorColor="secondary"
        centered
      >
        <Tab label={t("monday")}></Tab>
        <Tab label={t("tuesday")}></Tab>
        <Tab label={t("wednesday")}></Tab>
        <Tab label={t("thursday")}></Tab>
        <Tab label={t("friday")}></Tab>
      </Tabs>
    </Box>
  );
};

export default TimetableMobileBottomTabs;
