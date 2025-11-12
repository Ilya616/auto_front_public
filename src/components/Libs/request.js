import axios from "axios";

export function request(
  obj = {
    method: "GET",
    url: "",
    body: null,
    data: null,
    callback,
    error,
    headers: { "Content-Type": "multipart/form-data" },
  }
) {
  axios({
    method: obj.method,
    url: obj.url,
    data: obj.data,
    body: obj.body,
    headers: obj.headers,
  })
    .then(function (response) {
      obj.callback(response);
    })
    .catch(function (error) {
      obj.error(error);
    });
}
