import React, { ReactElement } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { menuOpen } from "../../states";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Branch } from "../../api/models/branch/branch";
import { getBranches } from "../../api/api";
import { getItem } from "../../utils/localStorageUtil";
import { LAST_SCHOOL_ID } from "../../constants";
import { BranchType } from "../../api/models/branch/branchType";

const drawerWidth = 250;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const BranchDrawer = (): ReactElement => {
  const theme = useTheme();
  const [open, setOpen] = useRecoilState(menuOpen);
  const [branchItem, setBranchItems] = React.useState<Branch[] | null>(null);

  const onMount = async () => {
    const response = await getBranches(getItem(LAST_SCHOOL_ID)!);

    if (response?.status === 200) {
      setBranchItems(response?.data);
    }
  };

  React.useEffect(() => {
    (async () => await onMount())();
  }, []);

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
      {branchItem?.map((item) => {
        if (item.type === BranchType.Class) {
          return (
            <ListItem button key={item.name}>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        }

        return null;
      })}
      <Divider />
      {branchItem?.map((item) => {
        if (item.type === BranchType.Teacher) {
          return (
            <ListItem button key={item.name}>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        }

        return null;
      })}
      <Divider />
      {branchItem?.map((item) => {
        if (item.type === BranchType.ClassRoom) {
          return (
            <ListItem button key={item.name}>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        }

        return null;
      })}
    </Drawer>
  );
};

export default BranchDrawer;
