import request from "../utils/request";
import { GETurl } from "../utils/utils";

// 學生服務時數列表
export const reqGetWorktimeList = async (params) => {
  const { student_no, semester } = params;

  const payload = GETurl({ student_no, semester });

  return request(`/worktime?${payload}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 刪除學生服務時數
export const reqDeleteWorktime = async (params) => {
  const { id } = params;

  const payload = GETurl({ id });

  return request(`/worktime?${payload}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
