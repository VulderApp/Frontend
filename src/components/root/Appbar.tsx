import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BranchDrawer from "./BranchDrawer";
import { appbarTitle, isTimetableView, menuOpen } from "../../states";
import { useRecoilState } from "recoil";

const Appbar = (): ReactElement => {
  const [title] = useRecoilState(appbarTitle);
  const [timetableView] = useRecoilState(isTimetableView);
  const [drawerOpen, setDrawerOpen] = useRecoilState(menuOpen);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {timetableView && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon onClick={() => setDrawerOpen(!drawerOpen)} />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {timetableView ? <BranchDrawer /> : null}
    </Box>
  );
};

export default Appbar;
