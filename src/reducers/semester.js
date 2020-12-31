import { SET_SEMESTER_LIST } from "../actions/semester";

const data = {
  semester_list: [],
};

const Semester = (state = data, action) => {
  switch (action.type) {
    case SET_SEMESTER_LIST:
      return {
        ...state,
        semester_list: action.payload.semester_list,
      };
    default:
      return state;
  }
};

export default Semester;
