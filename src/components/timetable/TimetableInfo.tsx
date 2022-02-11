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
import { useTranslation } from "react-i18next";

const TimetableInfo = (): ReactElement => {
  const [open, setOpen] = useRecoilState(timetableInfoDialogOpen);
  const [timetableInfo] = useRecoilState(timetableData);
  const { t } = useTranslation();

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open}>
      <DialogTitle>{t("informationAboutTimetableTitle")}</DialogTitle>
      <DialogContent>
        <Typography>
          {t("informationAboutTimetableGeneratedAt")}{" "}
          {new Date(timetableInfo?.generatedAt!).toLocaleDateString()}
        </Typography>
        <Typography>
          {t("informationAboutTimetableValidFrom")} {timetableInfo?.validFrom}
        </Typography>
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
