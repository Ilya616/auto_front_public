import React, { useEffect } from 'react'
import { request } from '../Libs/request'

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function LkTest() {
    useEffect(() => {
        let token = sessionStorage.getItem("token");

       request({method: 'POST', url: VITE_BACK_API + "/lk-test", 
            headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, callback: (response)=>{console.log(response)}}); 
    }, []);

    
    return (
        <div>LkTest</div>
    )
}
