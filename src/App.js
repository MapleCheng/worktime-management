import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import Router from "./Router";

import "./style.scss";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Router />
      </HashRouter>
    );
  }
}

export default App;
