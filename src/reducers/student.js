import { SET_STUDENT_LIST } from "../actions/student";
// import AxiosGet from '../AxiosGet'

const data = {
  student_list: [],
};

export default (state = data, action) => {
  switch (action.type) {
    case SET_STUDENT_LIST:
      return { student_list: action.payload.student_list };
    default:
      return state;
  }
};
