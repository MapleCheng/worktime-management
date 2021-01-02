import { reqGetWorktimeList } from "../service/worktime";

export const SET_WORKTIME_LIST = "SET_WORKTIME_LIST";

const setWorktimeList = (payload) => ({ type: SET_WORKTIME_LIST, payload });

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
