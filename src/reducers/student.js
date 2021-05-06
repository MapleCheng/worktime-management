import { SET_BEFORE_STUDENT_LIST, SET_STUDENT_LIST } from "../actions/student";
import getSemester from "../utils/getSemester";

const data = {
  semester: getSemester(),
  student_list: [],
  before_student_list: [],
};

const Student = (state = data, action) => {
  switch (action.type) {
    case SET_STUDENT_LIST:
      return {
        ...state,
        semester: action.payload.semester,
        student_list: action.payload.student_list,
      };
    case SET_BEFORE_STUDENT_LIST:
      return {
        ...state,
        before_student_list: action.payload.before_student_list,
      };
    default:
      return state;
  }
};
export default Student;
