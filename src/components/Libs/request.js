import axios from "axios";

export function request(
  obj = { method: "get", url: "", data: null, callback }
) {
  axios({
    method: obj.method,
    url: obj.url,
    data: obj.data,
  })
    .then(function (response) {
      obj.callback(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
