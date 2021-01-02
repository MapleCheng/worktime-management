import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// custom params
import { getHostName } from "./utils/HostName";

// custom components
import SetHostName from "./containers/SetHostName";
import Student from "./containers/Student";
import Worktime from "./containers/Worktime";

class Router extends Component {
  render() {
    if (getHostName() !== "") {
      return (
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/student" />} />
          <Route path="/student" exact component={Student} />
          <Route path="/student/:semester/:student_no" exact component={Worktime} />
          <Route path="/hostname" exact component={SetHostName} />
        </Switch>
      );
    } else {
      return <SetHostName />;
    }
  }
}

export default Router;
