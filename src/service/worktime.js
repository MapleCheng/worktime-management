import request from "../utils/request";
import { GETurl } from "../utils/utils";

// 新增學生服務時數
export const reqNewWorktime = async (params) => {
  const { semester, student_no } = params;

  delete params.semester;
  delete params.student_no;

  const payload = GETurl({ semester, student_no });

  return request(`/worktime?${payload}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
};

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

// 修改學生服務時數
export const reqUpdateWorktime = async (params) => {
  const { id } = params;

  delete params.semester;
  delete params.student_no;
  delete params.id;

  const payload = GETurl({ id });

  return request(`/worktime?${payload}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
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

// 取得學生詳細服務時數
export const reqGetWorktimeDetail = async (params) => {
  const { id } = params;

  const payload = GETurl({ id });

  return request(`/worktime/detail?${payload}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
