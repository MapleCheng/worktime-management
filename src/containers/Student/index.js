import React, { Component } from "react";

// custom components
import StudentList from "./StudentList";

class Student extends Component {
  render() {
    return (
      <div>
        <StudentList />
      </div>
    );
  }
}

export default Student;
