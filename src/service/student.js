import request from "../utils/request";
import { GETurl } from "../utils/utils";
import getSemester from "../utils/getSemester";

// 新增學生資料
export const reqNewStudent = async (params) => {
  return request(`/student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
};

// 取得學生列表
export const reqGetStudentList = async (params = { semester: getSemester() }) => {
  const { semester } = params;

  const payload = GETurl({ semester });

  return request(`/student?${payload}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 修改學生資料
export const reqUpdateStudent = async (params) => {
  const { id } = params;

  delete params.id;

  const payload = GETurl({ id });

  return request(`/student?${payload}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
};

// 刪除學生資料
export const reqDeleteStudent = async (params) => {
  const { id } = params;

  delete params.id;

  const payload = GETurl({ id });

  return request(`/student?${payload}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 取得前學期學生列表
export const reqGetBeforeStudentList = async (params) => {
  const { student_no, semester } = params;

  const payload = GETurl({ student_no, semester });

  return request(`/student/extends?${payload}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 繼承學生
export const reqExtendsStudent = async (params) => {
  const { id, semester } = params;

  const payload = GETurl({ id, semester });

  return request(`/student/extends?${payload}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
