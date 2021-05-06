import { combineReducers } from "redux";

import student from "./student";
import semester from "./semester";
import worktime from "./worktime";

const rootReducer = combineReducers({
  student: student,
  semester: semester,
  worktime: worktime,
});

export default rootReducer;
