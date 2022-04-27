import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Contributor } from "../../../api/models/github/contributor";

interface ContributorCardProps {
  contributor: Contributor;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ contributor }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
      onClick={() => open(contributor.htmlUrl)}
    >
      <CardActionArea sx={{ display: "inherit" }}>
        <CardMedia
          sx={{ width: 160 }}
          component="img"
          src={contributor.avatarUrl}
          alt={`${contributor.login}'s avatar`}
        />
        <CardContent>
          <Typography sx={{ padding: "1rem" }}>{contributor.login}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ContributorCard;
