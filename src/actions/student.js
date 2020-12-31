import {
  reqGetStudentList,
  reqGetStudentDetail,
  reqUpdateStudent,
  reqNewStudent,
  reqDeleteStudent,
} from "../service/student";

export const SET_STUDENT_LIST = "SET_STUDENT_LIST";

const setStudentList = (payload) => ({ type: SET_STUDENT_LIST, payload });

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
