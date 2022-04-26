import React, { MouseEventHandler, ReactElement } from "react";
import {
  Card,
  CardContent,
  Container,
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

type Menu = {
  icon: ReactElement;
  primary: string;
  secondary: string;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
};

const AboutMenuCard: React.FC<AboutMenuCardProps> = ({ navigate }) => {
  const { t } = useTranslation();
  const items: Menu[] = [
    {
      icon: <InfoIcon />,
      primary: t("versionLabel"),
      secondary: VERSION,
      onClick: undefined,
    },
    {
      icon: <HandymanIcon />,
      primary: t("buildLabel"),
      secondary: getBuildDate(BUILD_AT),
      onClick: undefined,
    },
    {
      icon: <GavelIcon />,
      primary: t("licensesLabel"),
      secondary: t("licensesDescription"),
      onClick: () => navigate("/about/licenses"),
    },
    {
      icon: <PeopleIcon />,
      primary: t("contributorsLabel"),
      secondary: t("contributorsDescription"),
      onClick: () => navigate("/about/contributors"),
    },
    {
      icon: <GitHubIcon />,
      primary: "Github",
      secondary: "VulderApp",
      onClick: () => open("https://github.com/VulderApp"),
    },
    {
      icon: <FaDiscord style={{ fontSize: "1.5rem" }} />,
      primary: "Discord",
      secondary: t("discordDescription"),
      onClick: () => () => open("https://discord.gg/RP6JNRpnph"),
    },
  ];

  return (
    <Container sx={{ marginBottom: "1rem" }}>
      <Card>
        <CardContent sx={{ padding: 0, "&:last-child": { paddingBottom: 0 } }}>
          <List sx={{ padding: 0, margin: 0 }}>
            {items.map((item, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.primary}
                    secondary={item.secondary}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutMenuCard;
