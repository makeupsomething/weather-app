import React, { Component, Fragment } from "react";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Results from "./components/Results";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return (
      <Fragment>
          <Router>
            <Home path="/" />
            <Results path="/results/:city" />
            <NotFound path="/404" />
          </Router>
      </Fragment>
    );
  }
}

export default App;
