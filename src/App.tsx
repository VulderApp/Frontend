import React, { ReactElement } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./views/Home";
import Appbar from "./components/app/Appbar";

const history = createBrowserHistory();

export default function App(): ReactElement {
  return (
    <Router history={history}>
      <div className="App">
        <Appbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
