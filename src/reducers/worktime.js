import { SET_WORKTIME_LIST } from "../actions/worktime";

const data = {
  worktime_list: [],
};

const Worktime = (state = data, action) => {
  switch (action.type) {
    case SET_WORKTIME_LIST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default Worktime;
