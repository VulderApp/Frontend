import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
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
        width: "20rem",
        cursor: "pointer",
      }}
      onClick={() => open(contributor.htmlUrl)}
    >
      <CardMedia
        sx={{ width: 160 }}
        component="img"
        src={contributor.avatarUrl}
        alt={`${contributor.login}'s avatar`}
      />
      <CardContent>
        <Typography>{contributor.login}</Typography>
      </CardContent>
    </Card>
  );
};

export default ContributorCard;
