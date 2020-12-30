import React, { Component } from "react";
import { Switch } from "react-router-dom";

// custom params
import { getHostName } from "./utils/HostName";

// custom components
import SetHostName from "./containers/SetHostName";

class Router extends Component {
  render() {
    if (getHostName() !== "") {
      return <Switch></Switch>;
    } else {
      return <SetHostName />;
    }
  }
}

export default Router;
