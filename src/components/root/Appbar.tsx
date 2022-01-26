import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { ReactElement } from "react";
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
import { HOME_APPBAR_TITLE, LAST_SCHOOL_ID } from "../../constants";
import { useNavigate } from "react-router-dom";
import InfoIconOutlined from "@mui/icons-material/InfoOutlined";

const Appbar = (): ReactElement => {
  const [title, setTitle] = useRecoilState(appbarTitle);
  const [timetableView, setTimetableView] = useRecoilState(isTimetableView);
  const setSelectedBranch = useSetRecoilState(actualTimetable);
  const [drawerOpen, setDrawerOpen] = useRecoilState(menuOpen);
  const setTimetableInfoOpen = useSetRecoilState(timetableInfoDialogOpen);
  const isSubpage = useRecoilValue(subpage);
  const navigate = useNavigate();

  const handleTimetableInfoButton = () => setTimetableInfoOpen(true);

  const handleExitButton = () => {
    deleteItem(LAST_SCHOOL_ID);
    setTitle(HOME_APPBAR_TITLE);
    setTimetableView(false);
    setSelectedBranch(null);
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
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
        </Toolbar>
      </AppBar>
      {timetableView ? <BranchDrawer /> : null}
    </Box>
  );
};

export default Appbar;
