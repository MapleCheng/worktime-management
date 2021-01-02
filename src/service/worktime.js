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
