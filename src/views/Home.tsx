import React, { ReactElement } from "react";
import SearchBox from "../components/home/SearchBox";
import SearchInput from "../components/home/SearchInput";
import { Container, createStyles, makeStyles } from "@material-ui/core";
import Background from '../assets/background.jpg';

const useStyles = makeStyles(() =>
  createStyles({
    home: {
      height: "100%",
      backgroundImage: `url(${Background})`
    },
    header: {
      fontSize: 22,
      textAlign: 'center'
    }
  })
);

export default function Home(): ReactElement {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.home}>
        <div className={classes.header}>
          <h2>Free and Open Source application for timetables</h2>
        </div>
        <SearchBox />
        <SearchInput />
      </div>
    </Container>
  );
}
