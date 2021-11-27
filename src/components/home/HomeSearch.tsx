import React, { ReactElement, useCallback } from "react";
import {
  Autocomplete,
  CircularProgress,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import { FindItem } from "../../api/models/find/FindItem";
import { getSearchedSchools } from "../../api/api";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";

const HomeSearch = (): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [userInput, setUserInput] = React.useState("");
  const [value, setValue] = React.useState<FindItem | null>(null);
  const [options, setOptions] = React.useState<readonly FindItem[]>([]);
  const loading = open && options.length === 0;

  const handleSearch = async () => {
    const response = await getSearchedSchools(userInput);
    if (response?.status !== 200) return;

    setOptions(response.data);
  };

  const debounceOnInputChange = useCallback(debounce(handleSearch, 1500), [
    userInput,
  ]);

  React.useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  return (
    <Container>
      <Autocomplete
        sx={{ width: "100%" }}
        open={open}
        value={value}
        loading={loading}
        getOptionLabel={(option) => option.name}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onInputChange={(_, value) => {
          setUserInput(value);
          debounceOnInputChange();
        }}
        onChange={(event, value) => {
          setOptions(value ? [value, ...options] : options);
          setValue(value);
        }}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Type here your school name"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Container>
  );
};

export default HomeSearch;
