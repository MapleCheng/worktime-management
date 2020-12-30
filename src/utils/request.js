import { getHostName } from "./HostName";

const hostname = getHostName();

const defParams = {
  state: 503,
  code: 503,
  message: "",
  data: "",
};
const fetchPromise = (url, option) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(defParams);
    }, 30000); // timeout
    const output = Object.assign({}, defParams); // 定義輸出結構
    fetch(`${hostname}/api/worktime/v2/${url}`, option)
      .then((res) => {
        // 获取到的数据处理
        output.state = res.status;
        return res.json();
      })
      .then((data) => {
        // body
        output.code = data.code;
        output.data = data.data;
        output.message = data.message;
        resolve(output);
      })
      .catch((error) => {
        // Error
        console.log(error);
        output.state = 503;
        resolve(output);
      });
  });

export default fetchPromise;
