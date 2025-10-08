import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router";
import { request } from '../../Libs/request';

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function LK() {
    let navigate = useNavigate();
    useEffect(()=>{
        if(!sessionStorage.getItem("token")){
            navigate(`/auth`);
        }
        else{
            request({method:"POST", url: VITE_BACK_API+"/check-user", data: {"token": sessionStorage.getItem("token")}, callback: (response)=>{
                if(!response.data){
                    sessionStorage.removeItem("token");
                    navigate(`/auth`);
                }
            }})
        }



    }, []);


  return (
    <div>
        



        <Link to="/lk/create-card">Подать объявление</Link>

        

    </div>
  )
}
