import {
  AppBar,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { ReactElement, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BranchDrawer from "./BranchDrawer";
import {
  actualTimetable,
  appbarTitle,
  isTimetableView,
  menuOpen,
  subpage,
  timetableInfoDialogOpen,
} from "../../states";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { deleteItem } from "../../utils/localStorageUtil";
import { LAST_SCHOOL_ID } from "../../constants";
import { useNavigate } from "react-router-dom";
import InfoIconOutlined from "@mui/icons-material/InfoOutlined";
import SettingsIconOutlined from "@mui/icons-material/SettingsOutlined";
import SettingsMenuItems from "./SettingsMenuItems";

const Appbar = (): ReactElement => {
  const [title] = useRecoilState(appbarTitle);
  const [timetableView, setTimetableView] = useRecoilState(isTimetableView);
  const setSelectedBranch = useSetRecoilState(actualTimetable);
  const [drawerOpen, setDrawerOpen] = useRecoilState(menuOpen);
  const setTimetableInfoOpen = useSetRecoilState(timetableInfoDialogOpen);
  const [settingsAnchorElement, setSettingsAnchorElement] =
    useState<HTMLElement | null>();
  const settingsOpen = Boolean(settingsAnchorElement);
  const isSubpage = useRecoilValue(subpage);
  const navigate = useNavigate();

  const handleSettingsOpen = (event: React.MouseEvent<HTMLElement>) =>
    setSettingsAnchorElement(event.currentTarget);
  const handleSettingsClose = () => setSettingsAnchorElement(null);

  const handleTimetableInfoButton = () => setTimetableInfoOpen(true);

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
          {timetableView ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleTimetableInfoButton}
            >
              <InfoIconOutlined />
            </IconButton>
          ) : null}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleSettingsOpen}
          >
            <SettingsIconOutlined />
          </IconButton>
          {timetableView ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleExitButton}
            >
              <ExitToAppIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      {timetableView ? <BranchDrawer /> : null}
      <Menu
        anchorEl={settingsAnchorElement}
        open={settingsOpen}
        onClose={handleSettingsClose}
      >
        <SettingsMenuItems />
      </Menu>
    </Box>
  );
};

export default Appbar;
