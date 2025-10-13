import React, { useEffect, useState } from "react";
import { request } from "../../Libs/request";
import Button from "../../UI/Components/Button/Button";
import ColorMenu from "../../UI/Components/ColorMenu/ColorMenu";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function CreateCard() {
  let [auto, setAuto] = useState({ marks: [], color: [] });

  // let [marks, setMarks] = useState([]);
  // let [models, setModels] = useState([]);
  let [marksAndModels, setMarksAndModels] = useState([]);

  let [button, setButton] = useState(true);

  let [announcement, setAnnouncement] = useState({
    year: null,
    marka: null,
    model: null,
  });

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(1234);
    request({
      method: "GET",
      url: VITE_BACK_API + "/get-field-cars",
      callback: (response) => {
        setAuto(response.data);
        setLoading(false);
      },
    });
  }, []);

  function years() {
    let years = [];

    let date = new Date();
    for (let year = date.getFullYear(); year >= 1900; year--) {
      years.push(year);
    }
    return years;
  }

  function createAnnouncement() {
    console.log(1);
  }

  function changeYear(evt) {
    if (evt.target.value != 0) {
      let copy = Object.assign({}, announcement);
      copy.year = Number(evt.target.value);
      setAnnouncement(copy);
      if (announcement.marka) {
        checkFormValid();
      }
    }
  }

  function changeMarka(evt) {
    let selectedValue = parseInt(evt.target.value);

    if (evt.target.value != 0) {
      let selectedMark = marksAndModels.find(
        (mark) => mark[0] === selectedValue
      );

      if (selectedMark) {
        let copy = { ...announcement };
        copy.marka = selectedMark[1];
        copy.models = selectedMark[2];
        setAnnouncement(copy);
        if (announcement.marka) {
          checkFormValid();
        }
      }
    }
  }

  function changeModel(evt) {
    let selectedValue = evt.target.value;

    if (selectedValue !== 0) {
      let copy = { ...announcement };
      copy.model = selectedValue;
      setAnnouncement(copy);
      if (announcement.marka) {
        checkFormValid();
      }
    }
  }

  return (
    <div>
      {!loading ? (
        <div>
          <select onChange={changeYear}>
            <option key="0" value="0" disabled selected>
              Выберите год
            </option>
            {years().map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

          <select onChange={changeMarka}>
            <option key="0" value="0" disabled selected>
              Выберите марку
            </option>
            {marksAndModels.map((mark) => (
              <option key={mark[0]} value={mark[0]}>
                {mark[1]}
              </option>
            ))}
          </select>

          {announcement.marka && (
            <select onChange={changeModel}>
              <option key="0" value="" disabled selected>
                Выберите модель
              </option>
              {announcement.models?.map((model, index) => (
                <option key={`${announcement.marka}-${index}`} value={model}>
                  {model}
                </option>
              ))}
            </select>
          )}

          <Button event={createAnnouncement} disabled={button}>
            Отправить
          </Button>
        </div>
      ) : (
        <div>загрузка</div>
      )}
    </div>
  );
}
