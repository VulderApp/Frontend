import React, { ReactElement, useEffect, useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  styled,
  useTheme,
} from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  actualSchoolId,
  actualTimetable,
  errorMessage,
  isTimetableView,
  menuOpen,
} from "../../states";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Branch } from "../../api/models/branch/branch";
import { getBranches } from "../../api/api";
import { BranchType } from "../../api/models/branch/branchType";
import { useTranslation } from "react-i18next";

const drawerWidth = 250;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const BranchDrawer = (): ReactElement => {
  const [open, setOpen] = useRecoilState(menuOpen);
  const [branchIndex, setBranchIndex] = useState(0);
  const setSelectedBranch = useSetRecoilState(actualTimetable);
  const [branchItem, setBranchItems] = useState<Branch[] | null>(null);
  const [actualBranch, setActualBranch] = useRecoilState(actualTimetable);
  const [schoolId] = useRecoilState(actualSchoolId);
  const [load, setLoad] = useState(true);
  const [, setErrorMessage] = useRecoilState(errorMessage);
  const { t } = useTranslation();
  const theme = useTheme();

  const onMount = async () => {
    const response = await getBranches(schoolId!);

    if (typeof response === "string") {
      setErrorMessage(response);
      return;
    }

    if (response?.status === 200) {
      setBranchItems(response?.data);
      setSelectedBranch(response?.data[0]);
      setLoad(false);
    }
  };

  const handleListClick = (index: number) => {
    setBranchIndex(index);
    if (branchItem) {
      setActualBranch(branchItem[index]);
      setOpen(false);
    }
  };

  const renderBranchCategory = (category: BranchType) =>
    branchItem?.map((item, index) => {
      if (item.type === category) {
        return (
          <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
            <ListItemButton
              style={{ margin: 0 }}
              selected={branchIndex === index}
              onClick={() => handleListClick(index)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        );
      }

      return null;
    });

  const renderBranchItems = (): ReactElement => (
    <>
      <List subheader={<ListSubheader>{t("branchClasses")}</ListSubheader>}>
        {renderBranchCategory(BranchType.Class)}
      </List>
      <List subheader={<ListSubheader>{t("branchTeachers")}</ListSubheader>}>
        {renderBranchCategory(BranchType.Teacher)}
      </List>
      <List subheader={<ListSubheader>{t("branchClassrooms")}</ListSubheader>}>
        {renderBranchCategory(BranchType.ClassRoom)}
      </List>
    </>
  );

  useEffect(() => {
    (async () => await onMount())();
  }, [isTimetableView]);

  useEffect(() => {}, [actualBranch]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={() => setOpen(!open)}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      {load ? null : renderBranchItems()}
    </Drawer>
  );
};

export default BranchDrawer;
