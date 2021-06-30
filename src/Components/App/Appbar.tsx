import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import React, {ReactElement} from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const githubClicked = () => {
  window.open("https://github.com/VulderApp")
};

export default function Appbar(): ReactElement {
  const classes = useStyles();

  return <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Vulder
        </Typography>
        <IconButton color="inherit" onClick={ githubClicked }>
          <GitHubIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  </div>;
}