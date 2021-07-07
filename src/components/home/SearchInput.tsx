import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { ReactElement, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import School from "../../api/data/school";
import api from "../../api/api";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "block",
    },
    autocomplete: {
      position: "absolute",
      width: "80%",
      left: "10%",
      top: "50%",
    },
    floatingButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: 15,
    },
  })
);

const getSearchedData = async (inputValue: string): Promise<Array<School>> => {
  return await api.search(inputValue);
};

export default function SearchInput(): ReactElement {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<School[]>([]);
  const loading = open && options.length === 0;
  let timeout: NodeJS.Timeout;

  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (inputValue.length > 0) setOptions(await getSearchedData(inputValue));
    }, 1000);
  }, [inputValue]);

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
        open={open}
        inputValue={inputValue}
        options={options}
        loading={loading}
        getOptionLabel={(option) => option.name}
        onInputChange={(event, value) => {
          setInputValue(value);
          setOpen(true);
        }}
        onClose={() => {
          clearTimeout(timeout);
          setOpen(false);
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
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
