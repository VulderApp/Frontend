import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, {ReactElement} from "react";
import {createStyles, Fab, makeStyles} from "@material-ui/core";
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

const getSearchedData = async (inputValue: string): Promise<Array<School>> => {
  return await api.search(inputValue);
};

export default function SearchInput(): ReactElement {
  const [inputValue, setInputValue] = React.useState<string>();
  const [open, setOpen] = React.useState<boolean>()
  const [options, setOptions] = React.useState<School[]>([]);
  const loading = open && options.length === 0;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.autocomplete}
        id="search-box"
        inputValue={inputValue}
        open={loading}
        onInputChange={async (event, newInputValue) => {
          setInputValue(newInputValue)
          setOptions(await getSearchedData(newInputValue))
        }}
        options={options}
        loading={loading}
        getOptionLabel={(option) =>  option.name}
        onClose={() => setOpen(false)}
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
