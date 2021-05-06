import request from "../utils/request";

// 取得學期列表
export const reqGetSemesterList = async (params) => {
  return request(`/semester`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 取得現在學期
export const getNowSemester = async (params) => {
  return request(`/semester/now`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
