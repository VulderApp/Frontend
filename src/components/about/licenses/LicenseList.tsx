import React, { ReactElement } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import licenses from "../../../assets/licenses.json";

const LicenseList = (): ReactElement => {
  return (
    <List sx={{ padding: 0 }}>
      {licenses.map((item, index) => {
        return (
          <ListItem key={index} sx={{ padding: 0 }}>
            <ListItemButton onClick={() => open(item.link.replace("git+", ""))}>
              <ListItemText
                primary={`${item.name} ${item.installedVersion}`}
                secondary={item.licenseType}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default LicenseList;
