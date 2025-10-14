import React from "react";

export default function SelectAdvertisement(props) {
  function years() {
    let years = [];

    let date = new Date();
    for (let year = date.getFullYear(); year >= 1900; year--) {
      years.push(year);
    }
    return years;
  }
  function changeYear(evt) {
    if (evt.target.value != "0") {
      let copyCard = Object.assign({}, props.validateButton);
      copyCard.year = +evt.target.value;
      props.setValidateButton(copyCard);
    }

    props.checkFormValid();
  }
  return (
    <div>
      <select onChange={changeYear} defaultValue="0">
        <option key="0" value="0" disabled>
          Выберите год
        </option>
        {years().map((year) => (
          <option key={year}>{year}</option>
        ))}
      </select>

      <select onChange={props.changeMarka} defaultValue="0">
        <option key="0" value="0" disabled>
          Выберите марку
        </option>
        {props.marksAndModels.map((mark) => (
          <option key={mark.id} value={mark.id}>
            {mark.mark}
          </option>
        ))}
      </select>
    </div>
  );
}
