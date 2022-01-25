import React, { ReactElement, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ContributorCard from "./ContributorCard";
import { Contributor } from "../../../api/models/github/contributor";
import { getGithubRepoContributors } from "../../../api/api";
import Contributors from "../../../assets/contributors.json";

const ContributorList = (): ReactElement => {
  const [contributors, setContributors] = useState<
    (Contributor | null)[] | null
  >(null);

  const handleContributorsLoad = async () => {
    const response = await getGithubRepoContributors();
    const mappedContributors = response.data.map((value) => {
      if (Contributors.filterUsers.indexOf(value.login) === -1) return null;

      return value;
    });

    setContributors(mappedContributors);
  };

  useEffect(() => {
    (async () => await handleContributorsLoad())();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      sx={{
        width: "auto",
        padding: "1rem",
      }}
    >
      {contributors
        ? contributors!.map((item, index) => {
            if (!item) return null;

            return (
              <Grid item key={index}>
                <ContributorCard contributor={item!} />
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default ContributorList;
