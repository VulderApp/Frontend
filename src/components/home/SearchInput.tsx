import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { ReactElement } from "react";
import { createStyles, Fab, makeStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from '@material-ui/core/CircularProgress';
import School from "../../api/data/school";
import api from '../../api/api';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "block",
    },
    autocomplete: {
      position: 'absolute',
      width: '80%',
      left: '10%',
      top: '50%',
    },
    floatingButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: 15,
    },
  })
);

export default function SearchInput(): ReactElement {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<School[]>([]);
  const [input, setInput] = React.useState<string>();
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active  = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = (await api.search(input)).data.schools;

      if (active) {
        setOptions(response)
      }
    })();
    return () => {
      active = false
    }
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.autocomplete}
        id="search-box"
        open={loading}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false)
        }}
        options={options}
        loading={loading}
        getOptionLabel={(option) => {
          setInput(option.name)
          return option.name
        }}
        getOptionSelected={(option, value) => option.name == value.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="School Name or URL"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Fab className={classes.floatingButton} color="primary" aria-label="add">
        <CheckIcon />
      </Fab>
    </div>
  );
}
