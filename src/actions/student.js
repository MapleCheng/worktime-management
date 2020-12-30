import { reqGetStudentList } from "../service/student";

export const SET_STUDENT_LIST = "SET_STUDENT_LIST";

const setStudentList = (payload) => ({ type: SET_STUDENT_LIST, payload });

export const getStudentList = async (dispatch, payload) => {
  const req = await reqGetStudentList(payload);

  if (req.code === 200) {
    await dispatch(
      setStudentList({
        student_list: req.data.student_list,
      })
    );
  }
};
