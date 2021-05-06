import { reqGetSemesterList } from "../service/semester";

export const SET_SEMESTER_LIST = "SET_SEMESTER_LIST";

const setSemesterList = (payload) => ({ type: SET_SEMESTER_LIST, payload });

export const getSemesterList = async (dispatch, payload) => {
  const res = await reqGetSemesterList();

  await dispatch(
    setSemesterList({
      semester_list: res.data.results,
    })
  );
};
