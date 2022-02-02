import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BranchDrawer from "./BranchDrawer";
import {
  actualTimetable,
  appbarTitle,
  isTimetableView,
  lightMode,
  menuOpen,
  subpage,
  timetableInfoDialogOpen,
} from "../../states";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { deleteItem, saveItem } from "../../utils/localStorageUtil";
import { LAST_SCHOOL_ID, LIGHT_MODE_KEY } from "../../constants";
import { useNavigate } from "react-router-dom";
import InfoIconOutlined from "@mui/icons-material/InfoOutlined";
import DarkModeIconOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeIconOutlined from "@mui/icons-material/LightModeOutlined";

const Appbar = (): ReactElement => {
  const [title] = useRecoilState(appbarTitle);
  const [isLightMode, setLightMode] = useRecoilState(lightMode);
  const [timetableView, setTimetableView] = useRecoilState(isTimetableView);
  const setSelectedBranch = useSetRecoilState(actualTimetable);
  const [drawerOpen, setDrawerOpen] = useRecoilState(menuOpen);
  const setTimetableInfoOpen = useSetRecoilState(timetableInfoDialogOpen);
  const isSubpage = useRecoilValue(subpage);
  const navigate = useNavigate();

  const handleTimetableInfoButton = () => setTimetableInfoOpen(true);
  const handleThemeButton = () => {
    setLightMode(!isLightMode);
    saveItem(LIGHT_MODE_KEY, String(!isLightMode));
  };

  const handleExitButton = () => {
    deleteItem(LAST_SCHOOL_ID);
    setTimetableView(false);
    setSelectedBranch(null);
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            gap: 1,
          }}
        >
          {timetableView ? (
            <IconButton
              sx={{ mr: 2 }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {timetableView ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleTimetableInfoButton}
              >
                <InfoIconOutlined />
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleExitButton}
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : null}
          {!isSubpage ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => navigate("/about")}
            >
              <InfoIconOutlined />
            </IconButton>
          ) : null}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleThemeButton}
          >
            {isLightMode ? <DarkModeIconOutlined /> : <LightModeIconOutlined />}
          </IconButton>
        </Toolbar>
      </AppBar>
      {timetableView ? <BranchDrawer /> : null}
    </Box>
  );
};

export default Appbar;
