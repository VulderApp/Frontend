import React, { ReactElement } from "react";
import {
  Card,
  CardContent,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import GavelIcon from "@mui/icons-material/Gavel";
import PeopleIcon from "@mui/icons-material/People";
import GitHubIcon from "@mui/icons-material/GitHub";

const AboutMenuCard = (): ReactElement => {
  const VERSION = "0.1.0";

  return (
    <Container>
      <Card>
        <CardContent>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Version" secondary={VERSION} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <GavelIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Licenses"
                  secondary="See used licences"
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Contributors"
                  secondary="See all the people who help us"
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton
                onClick={() => open("https://github.com/VulderApp")}
              >
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText primary="Github" secondary="VulderApp" />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutMenuCard;
