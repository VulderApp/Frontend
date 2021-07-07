import React, { ReactElement } from "react";
import SearchInput from "../components/home/SearchInput";
import { Container, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    home: {
      height: "100%",
    },
    header: {
      fontSize: 22,
      textAlign: "center",
    },
  })
);

export default function Home(): ReactElement {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.home}>
        <SearchInput />
      </div>
    </Container>
  );
}
