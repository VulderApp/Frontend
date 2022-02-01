import React, { ReactElement } from "react";
import { Container, Button, styled } from "@mui/material";
import { useRecoilState } from "recoil";
import { networkError } from "../../states";
import SignalWifiStatusbarConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4";

const Message = styled("div")(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: 18,
  fontWeight: 500,
}));

const NetworkFailMessage = (): ReactElement | null => {
  const [error, setError] = useRecoilState(networkError);

  const handleReload = () => setError(false);

  return error ? (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <SignalWifiStatusbarConnectedNoInternet4Icon sx={{ fontSize: 100 }} />
      <Message>Check your internet connection and press reload</Message>
      <Button variant="outlined" onClick={() => handleReload()}>
        Reload
      </Button>
    </Container>
  ) : null;
};

export default NetworkFailMessage;
