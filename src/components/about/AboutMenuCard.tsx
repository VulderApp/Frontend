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
import HandymanIcon from "@mui/icons-material/Handyman";
import { FaDiscord } from "react-icons/fa";
import { NavigateFunction } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getBuildDate } from "../../utils/dateUtil";

interface AboutMenuCardProps {
  navigate: NavigateFunction;
}

declare const VERSION: string;
declare const BUILD_AT: string;

const AboutMenuCard: React.FC<AboutMenuCardProps> = ({ navigate }) => {
  const { t } = useTranslation();

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
                <ListItemText primary={t("versionLabel")} secondary={VERSION} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <HandymanIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("buildLabel")}
                  secondary={getBuildDate(BUILD_AT)}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton onClick={() => navigate("/about/licenses")}>
                <ListItemIcon>
                  <GavelIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("licensesLabel")}
                  secondary={t("licensesDescription")}
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
                  primary={t("contributorsLabel")}
                  secondary={t("contributorsDescription")}
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
            <Divider />
            <ListItem>
              <ListItemButton
                onClick={() => open("https://discord.gg/RP6JNRpnph")}
              >
                <ListItemIcon>
                  <FaDiscord style={{ fontSize: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Discord"
                  secondary={t("discordDescription")}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutMenuCard;
