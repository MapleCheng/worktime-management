import {
  reqGetStudentList,
  reqGetStudentDetail,
  reqUpdateStudent,
  reqNewStudent,
  reqDeleteStudent,
  reqGetBeforeStudentList,
  reqExtendsStudent,
} from "../service/student";

export const SET_STUDENT_LIST = "SET_STUDENT_LIST";
export const SET_BEFORE_STUDENT_LIST = "SET_BEFORE_STUDENT_LIST";

const setStudentList = (payload) => ({ type: SET_STUDENT_LIST, payload });
const setBeforeStudentList = (payload) => ({ type: SET_BEFORE_STUDENT_LIST, payload });

// 取得學生列表
export const getStudentList = async (dispatch, payload) => {
  const res = await reqGetStudentList(payload);

  if (res.code === 200) {
    await dispatch(
      setStudentList({
        semester: res.data.semester,
        student_list: res.data.student_list,
      })
    );
  }
};

// 取得學生詳細資料
export const getStudentDetail = async (dispatch, payload) => {
  const res = await reqGetStudentDetail(payload);

  if (res.code === 200) {
    return res.data;
  }
};

// 新增學生
export const newStudent = async (dispatch, payload) => {
  const { semester } = payload;
  const res = await reqNewStudent(payload);

  if (res.code === 201) {
    await getStudentList(dispatch, { semester });
  }
  return res.code;
};

// 更新學生資料
export const updateStudent = async (dispatch, payload) => {
  const { semester } = payload;
  const res = await reqUpdateStudent(payload);

  if (res.code === 201) {
    await getStudentList(dispatch, { semester });
  }
  return res.code;
};

// 刪除學生
export const deleteStudent = async (dispatch, payload) => {
  const { semester } = payload;
  const res = await reqDeleteStudent(payload);

  if (res.code === 204) {
    await getStudentList(dispatch, { semester });
  }
  return res.code;
};

// 取得前學期學生
export const getBeforeStudentList = async (dispatch, payload) => {
  let before_student_list = [];
  const res = await reqGetBeforeStudentList(payload);

  if (res.code === 200) {
    before_student_list = res.data.results;
  }

  await dispatch(
    setBeforeStudentList({
      before_student_list,
    })
  );
};

export const extendStudent = async (dispatch, payload) => {
  const res = await reqExtendsStudent(payload);

  await getStudentList(dispatch, payload);

  return res.code;
};
