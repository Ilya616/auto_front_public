import React, { useEffect, useState } from 'react'
import { request } from '../../Libs/request';
import Button from '../../UI/Components/Button/Button';

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function CreateCard() {

  let [marks, setMarks] = useState([]);

  let [button, setButton] = useState(false);

  let [announcement, setAnnouncement] = useState({year: null, marka: null});


  let [loading, setLoading] = useState(false);


  useEffect(()=>{
    setLoading(true);

    request({method: "GET", url: VITE_BACK_API+"/get-field-cars", callback: (response)=>{
      setMarks(response.data.marks);
      setLoading(false);
    }})
  }, []);
  
  
  function years(){
    let years = [];

    let date = new Date();
    for(let year = date.getFullYear(); year >= 1900; year--){
      years.push(year);
    }
    return years;
  }

  function createAnnouncement(){
    console.log(1);
  }

  function changeYear(evt){
    if(evt.target.value != 0){
      let copy = Object.assign({},announcement);
      copy.year = Number(evt.target.value);
      setAnnouncement(copy);
    }
    
  }

  function changeMarka(evt){
    if(evt.target.value != 0){
      let copy = Object.assign({},announcement);
      copy.marka = evt.target.value;
      setAnnouncement(copy);
    }
  }


  return (
    <div>


      {
        (!loading)?
          <div>
            <select onChange={changeYear}>
              <option key="0" value="0" disabled selected>Выберите год</option>
              {
                years().map((year)=>
                  <option key={year}>{year}</option>
                )
              }
            </select>

            <select onChange={changeMarka}>
              <option key="0" value="0" disabled selected>Выберите марку</option>
              {
                marks.map((mark)=>
                  <option key={mark.id}>{mark.name}</option>
                )
              }
            </select>


            <Button event={createAnnouncement} disabled={!button}>Отправить</Button>


          </div>
        :
          <div>загрузка</div>
      }
      





    </div>
  )
}
