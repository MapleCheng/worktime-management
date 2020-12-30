import { reqGetStudentList, reqGetStudentDetail, reqUpdateStudent, reqNewStudent } from "../service/student";

export const SET_STUDENT_LIST = "SET_STUDENT_LIST";

const setStudentList = (payload) => ({ type: SET_STUDENT_LIST, payload });

export const getStudentList = async (dispatch, payload) => {
  const res = await reqGetStudentList(payload);

  if (res.code === 200) {
    await dispatch(
      setStudentList({
        student_list: res.data.student_list,
      })
    );
  }
};

export const getStudentDetail = async (dispatch, payload) => {
  const res = await reqGetStudentDetail(payload);

  console.log(res);

  if (res.code === 200) {
    return res.data;
  }
};

export const newStudent = async (dispatch, payload) => {
  const res = await reqNewStudent(payload);

  return res.code;
};

export const updateStudent = async (dispatch, payload) => {
  const res = await reqUpdateStudent(payload);

  return res.code;
};
