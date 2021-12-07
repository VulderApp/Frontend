import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BranchDrawer from "./BranchDrawer";
import { appbarTitle, isTimetableView, menuOpen } from "../../states";
import { useRecoilState } from "recoil";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { deleteItem } from "../../utils/localStorageUtil";
import { HOME_APPBAR_TITLE, LAST_SCHOOL_ID } from "../../constants";
import { useNavigate } from "react-router-dom";

const Appbar = (): ReactElement => {
  const [title, setTitle] = useRecoilState(appbarTitle);
  const [timetableView, setTimetableView] = useRecoilState(isTimetableView);
  const [drawerOpen, setDrawerOpen] = useRecoilState(menuOpen);
  const navigate = useNavigate();

  const handleBackButton = () => {
    deleteItem(LAST_SCHOOL_ID);
    setTitle(HOME_APPBAR_TITLE);
    setTimetableView(false);
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {timetableView ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon onClick={() => setDrawerOpen(!drawerOpen)} />
            </IconButton>
          ) : null}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {timetableView ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleBackButton}
            >
              <ExitToAppIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      {timetableView ? <BranchDrawer /> : null}
    </Box>
  );
};

export default Appbar;
