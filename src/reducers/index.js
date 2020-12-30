import { combineReducers } from "redux";

import student from "./student";

const rootReducer = combineReducers({
  student: student,
});

export default rootReducer;
