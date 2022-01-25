import React from "react";
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
import { NavigateFunction } from "react-router-dom";

interface AboutMenuCardProps {
  navigate: NavigateFunction;
}

const AboutMenuCard: React.FC<AboutMenuCardProps> = ({ navigate }) => {
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
              <ListItemButton onClick={() => navigate("/about/licenses")}>
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
              <ListItemButton onClick={() => navigate("/about/contributors")}>
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
