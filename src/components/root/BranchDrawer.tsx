import React, { ReactElement } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  styled,
  useTheme,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { actualTimetable, isTimetableView, menuOpen } from "../../states";
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
  const [, setSelectedBranch] = useRecoilState(actualTimetable);
  const [branchItem, setBranchItems] = React.useState<Branch[] | null>(null);
  const [isTimetable] = useRecoilState(isTimetableView);

  const onMount = async () => {
    const response = await getBranches(getItem(LAST_SCHOOL_ID)!);

    if (response?.status === 200) {
      setBranchItems(response?.data);
      setSelectedBranch(response?.data[0]);
    }
  };

  const renderBranchCategory = (category: BranchType) =>
    branchItem?.map((item) => {
      if (item.type === category) {
        return (
          <ListItem button key={item.name}>
            <ListItemText primary={item.name} />
          </ListItem>
        );
      }

      return null;
    });

  const renderBranchItems = (): ReactElement => (
    <>
      <List subheader={<ListSubheader>Classes</ListSubheader>}>
        {renderBranchCategory(BranchType.Class)}
      </List>
      <List subheader={<ListSubheader>Teachers</ListSubheader>}>
        {renderBranchCategory(BranchType.Teacher)}
      </List>
      <List subheader={<ListSubheader>Classrooms</ListSubheader>}>
        {renderBranchCategory(BranchType.ClassRoom)}
      </List>
    </>
  );

  React.useEffect(() => {
    (async () => await onMount())();
  }, [isTimetableView]);

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
      {isTimetable ? renderBranchItems() : null}
    </Drawer>
  );
};

export default BranchDrawer;
