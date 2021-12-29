import React, { ReactElement } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { timetableData, timetableInfoDialogOpen } from "../../states";

const TimetableInfo = (): ReactElement => {
  const [open, setOpen] = useRecoilState(timetableInfoDialogOpen);
  const [timetableInfo] = useRecoilState(timetableData);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open}>
      <DialogTitle>More information about timetable</DialogTitle>
      <DialogContent>
        <Typography>
          Generated at{" "}
          {new Date(timetableInfo?.generatedAt!).toLocaleDateString()}
        </Typography>
        <Typography>Valid from {timetableInfo?.validFrom}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimetableInfo;
