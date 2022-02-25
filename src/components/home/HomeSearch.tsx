import React, { ReactElement, useRef } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Link,
  TextField,
} from "@mui/material";
import { FindItem } from "../../api/models/find/FindItem";
import { getSearchedSchools } from "../../api/api";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { saveItem } from "../../utils/localStorageUtil";
import { LAST_SCHOOL_ID } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { appbarTitle, errorMessage } from "../../states";
import { useTranslation } from "react-i18next";

declare const FORM_APP_URL: string;

const HomeSearch = (): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<FindItem | null>(null);
  const [options, setOptions] = React.useState<readonly FindItem[]>([]);
  const loading = open && options.length === 0;
  const [, setAppbarTitle] = useRecoilState(appbarTitle);
  const [, setErrorMessage] = useRecoilState(errorMessage);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = async (input: string) => {
    if (input.trim().length === 0) return;

    const response = await getSearchedSchools(input);
    if (typeof response === "string") {
      setErrorMessage(response);
      return;
    }

    if (response?.status !== 200) return;
    setOptions(response.data);
  };

  const handleSchoolConfirm = () => {
    saveItem(LAST_SCHOOL_ID, value?.id!);
    setAppbarTitle(value?.name!);
    navigate(`/timetable/${value?.id!}`);
  };

  const debouncedSearch = useRef(
    debounce(async (input: string) => await handleSearch(input), 1500)
  ).current;

  React.useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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
        onInputChange={(_, value) => debouncedSearch(value)}
        onChange={(event, value) => {
          setOptions(value ? [value, ...options] : options);
          setValue(value);
        }}
        options={options}
        loadingText={t("loadingSearchBarText")}
        noOptionsText={
          <Box>
            {t("noOptionsSearchBarText")}{" "}
            <Link
              sx={{ cursor: "pointer" }}
              href={FORM_APP_URL}
              color="inherit"
              underline="hover"
            >
              {t("noOptionsRegisterLinkText")}
            </Link>
          </Box>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("searchBoxDescription")}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  <IconButton onClick={handleSchoolConfirm}>
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
