import  axios  from "axios";

export function request(obj = {method: "GET", url: "", data: null, callback}){
    axios({
        method: obj.method,
        url: obj.url,
        data: obj.data
    })
    .then(
        function(response){
           obj.callback();
        }
    )
    .catch(function (error) {
        console.log(error);
    });
}