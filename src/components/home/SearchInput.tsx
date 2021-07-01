import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { ReactElement } from "react";
import { createStyles, Fab, makeStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const test = ["aaaaa", "ddddd", "dupa"];

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: "60%",
      display: "block",
    },
    autocomplete: {},
    floatingButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: 15,
    },
  })
);

export default function SearchInput(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.autocomplete}
        id="combo-box-demo"
        options={test}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label="School Name or URL"
            variant="outlined"
          />
        )}
      />
      <Fab className={classes.floatingButton} color="primary" aria-label="add">
        <CheckIcon />
      </Fab>
    </div>
  );
}
