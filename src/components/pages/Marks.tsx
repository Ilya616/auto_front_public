import React, { useEffect } from 'react'
import { request } from '../Libs/request';
import {  Marks as Markstype, MarkaListResponse, isMarkaListResponse } from '../../types/marka';

export default function Marks() {

    useEffect(() => {
        request({
            method: "GET", 
            url: 'http://127.0.0.1:8000/api/marks',
            body: null, 
            data: null, 
            callback: (response:any) => {
              if (!isMarkaListResponse(response.data)) {
                  throw new Error('Неверный тип данных ответа от API');
              }
              let marks: MarkaListResponse = response.data;
              console.log('Успешно получены марки:', marks);
            },
            error: (response:any) => {
              console.log('Ошибка:', response)
            }
        })
    }, []);
  return (


    <div>Marks</div>
  )
}
