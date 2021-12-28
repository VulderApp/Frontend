import { Alert, Snackbar } from "@mui/material";
import React, { ReactElement } from "react";
import { errorMessage } from "../../states";
import { useRecoilState } from "recoil";

const SnackbarError = (): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useRecoilState(errorMessage);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setOpen(false);
    setError(null);
  };

  React.useEffect(() => {
    if (error === null) return;

    setOpen(true);
  }, [error]);

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert severity="error" onClose={handleClose}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarError;
