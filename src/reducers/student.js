import { SET_STUDENT_LIST } from "../actions/student";
import getSemester from "../utils/getSemester";

const data = {
  semester: getSemester(),
  student_list: [],
};

const Student = (state = data, action) => {
  switch (action.type) {
    case SET_STUDENT_LIST:
      return {
        semester: action.payload.semester,
        student_list: action.payload.student_list,
      };
    default:
      return state;
  }
};
export default Student;
