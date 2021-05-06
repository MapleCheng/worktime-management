import {
  reqDeleteWorktime,
  reqGetWorktimeDetail,
  reqGetWorktimeList,
  reqNewWorktime,
  reqUpdateWorktime,
} from "../service/worktime";

export const SET_WORKTIME_LIST = "SET_WORKTIME_LIST";

const setWorktimeList = (payload) => ({ type: SET_WORKTIME_LIST, payload });

// 新增學生服務時數
export const newWorktime = async (dispatch, payload) => {
  const { semester, student_no } = payload;

  const res = await reqNewWorktime(payload);

  await getWorktimeList(dispatch, { semester, student_no });

  if (res.state) {
    return res.code;
  }
};

// 取得學生服務時數列表
export const getWorktimeList = async (dispatch, payload) => {
  let worktime_list = [];

  const res = await reqGetWorktimeList(payload);

  if (res.code === 200) {
    worktime_list = res.data.results;
  }

  await dispatch(
    setWorktimeList({
      worktime_list,
    })
  );
};

// 修改學生服務時數
export const updateWorktime = async (dispatch, payload) => {
  const { semester, student_no } = payload;

  const res = await reqUpdateWorktime(payload);

  await getWorktimeList(dispatch, { semester, student_no });

  if (res.state) {
    return res.code;
  }
};

// 刪除學生服務時數
export const deleteWorktime = async (dispatch, payload) => {
  const res = await reqDeleteWorktime(payload);

  const { semester, student_no } = payload;

  await getWorktimeList(dispatch, { semester, student_no });

  if (res.state === 200) {
    return res.code;
  }
};

// 取得學生詳細服務時數
export const getWorktimeDetail = async (dispatch, payload) => {
  let detail = {};
  const res = await reqGetWorktimeDetail(payload);

  if (res.state === 200) {
    detail = res.data;
  }

  return detail;
};
