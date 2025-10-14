import React, { useEffect, useState, useRef, useMemo } from "react";
import { request } from "../Libs/request";
import Button from "../UI/Components/Button/Button";
import ColorMenu from "../UI/Components/ColorMenu/ColorMenu";
import VisualTextarea from "../UI/Components/VisualTextarea/VisualTextarea";
import SelectAdvertisement from "../UI/Components/Selects/SelectAdvertisement/SelectAdvertisement";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function CreateCard() {
  let [step, setStep] = useState(0);

  let [marksAndModels, setMarksAndModels] = useState([]);

  let [card, setCard] = useState({
    year: null,
    marka: null,
    model: null,
    color: null,
    category: null,
  });

  let [button, setButton] = useState(true);

  let [loading, setLoading] = useState(false);

  //
  //
  //

  useEffect(() => {
    setLoading(true);

    request({
      method: "GET",
      url: VITE_BACK_API + "/get-field-cars",
      callback: (response) => {
        setLoading(false);

        setMarksAndModels(response.data);
        // console.log(marksAndModels);
      },
    });
  }, []);

  // let [auto, setAuto] = useState({ marks: [], color: [] });
  let [validateButton, setValidateButton] = useState({
    year: null,
    marka: null,
    model: null,
  });

  function years() {
    let years = [];

    let date = new Date();
    for (let year = date.getFullYear(); year >= 1900; year--) {
      years.push(year);
    }
    return years;
  }

  function createAnnouncement() {
    setStep(1);
  }

  function checkFormValid() {
    let copy = Object.assign({}, button);
    setButton(
      validateButton.marka != null &&
        validateButton.model != null &&
        validateButton.year != null
        ? !copy
        : copy
    );
  }

  function changeYear(evt) {
    if (evt.target.value != "0") {
      let copyCard = Object.assign({}, validateButton);
      copyCard.year = +evt.target.value;
      setValidateButton(copyCard);
    }

    checkFormValid();
  }
  function changeModel(evt) {
    if (evt.target.value != 0) {
      let copy = Object.assign({}, validateButton);
      copy.model = evt.target.value;
      setValidateButton(copy);
    }

    checkFormValid();
  }
  function changeMarka(evt) {
    let selectedValue = parseInt(evt.target.value);
    let selectedMark = marksAndModels.find(
      (mark) => mark["id"] === selectedValue
    );

    if (selectedMark) {
      let copyCard = Object.assign({}, card);
      copyCard.marka = selectedMark["mark"];
      copyCard.model = selectedMark["models"];
      setCard(copyCard);
    } else {
      let copyCard = Object.assign({}, card);
      copyCard.marka = [];
      copyCard.model = [];
      setCard(copyCard);
    }

    if (evt.target.value != 0) {
      let copy = Object.assign({}, validateButton);
      copy.marka = +evt.target.value;

      setValidateButton(copy);
    }
    console.log(validateButton);
    checkFormValid();
  }

  return (
    <div>
      {!loading ? (
        <div>
          {step == 0 ? (
            <div>
              <SelectAdvertisement
                checkFormValid={checkFormValid}
                setValidateButton={setValidateButton}
                validateButton={validateButton}
                changeMarka={changeMarka}
                marksAndModels={marksAndModels}
              />

              <select defaultValue="0">
                <option key="0" value="0" disabled>
                  Выберите категорию
                </option>

                {marksAndModels.map((mark) =>
                  mark.category != null ? (
                    <option key={mark.id} value={mark.id}>
                      {mark.category}
                    </option>
                  ) : (
                    ""
                  )
                )}
              </select>

              {validateButton.marka && (
                <>
                  <select defaultValue="0" onChange={changeModel}>
                    <option key="0" value="0" disabled>
                      Выберите модель
                    </option>
                    {card.model?.map((el, index) => (
                      <option key={index} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <Button event={createAnnouncement} disabled={button}>
                Далее
              </Button>
            </div>
          ) : (
            ""
          )}

          {step == 1 ? (
            <div>
              <VisualTextarea />

              <Button event={createAnnouncement} disabled={button}>
                Далее
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>загрузка</div>
      )}
    </div>
  );
}
