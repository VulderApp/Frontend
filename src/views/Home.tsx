import React, { ReactElement } from "react";
import SearchBox from "../components/home/SearchBox";
import SearchInput from "../components/home/SearchInput";
import { Container, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    home: {
      height: "100%",
    },
  })
);

export default function Home(): ReactElement {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.home}>
        <SearchBox />
        <SearchInput />
      </div>
    </Container>
  );
}
