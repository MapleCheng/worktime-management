import { SET_STUDENT_LIST } from "../actions/student";

const data = {
  student_list: [],
};

const Student = (state = data, action) => {
  switch (action.type) {
    case SET_STUDENT_LIST:
      return { student_list: action.payload.student_list };
    default:
      return state;
  }
};
export default Student;
