import React, { ReactElement } from "react";
import {
  Autocomplete,
  CircularProgress,
  Container,
  TextField,
} from "@mui/material";
import { FindItem } from "../../api/models/find/FindItem";
import { getSearchedSchools } from "../../api/api";

const HomeSearch = (): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [userInput, setUserInput] = React.useState("");
  const [options, setOptions] = React.useState<readonly FindItem[]>([]);
  const loading = open && options.length === 0;

  const handleSearch = async () => {
    const response = await getSearchedSchools(userInput);

    if (response.status !== 200) return;

    setOptions(response.data);
  };

  React.useEffect(() => {
    if (!loading) return undefined;

    (async () => {
      await handleSearch();
    })();
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Container>
      <Autocomplete
        sx={{ width: "60%" }}
        open={open}
        loading={loading}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onInputChange={(event, value) => setUserInput(value)}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Asynchronous"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
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
