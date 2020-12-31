import { combineReducers } from "redux";

import student from "./student";
import semester from "./semester";

const rootReducer = combineReducers({
  student: student,
  semester: semester,
});

export default rootReducer;
