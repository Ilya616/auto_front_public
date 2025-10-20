import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    mark: {name: null, id: null},
    model: {name: null, id: null},
    year: null,
    bodywork: {name: null, id: null},
    engine: {name: null, id: null},
    drive: {name: null, id: null},
    transmission: {name: null, id: null},
    mileage: null,
    phfoto: null,
    price: null,
    color: {name: null, id: null},
    description: "<p>text</p>",
  },
};


export const createCard = createSlice({
  name: "createCard",
  initialState,
  reducers: {
    changeDataBodyWork: (state, change) => {
      state.value.bodywork = change.payload;
    },
    changeDataYear: (state, change) => {
      state.value.year = change.payload;
    },
    changeDataMark: (state, change) => {
      console.log(change.payload);
      state.value.mark = change.payload;
    },
    changeDataModel: (state, change) => {
      state.value.model = change.payload;
    },
    changeDataColor: (state, change) => {
      state.value.color = change.payload;
    },
    changeDataDescription: (state, change) => {
      state.value.description = change.payload;
    },
    changeDataDrive: (state, change) => {
      state.value.drive = change.payload;
    },
    changeDataEngine: (state, change) => {
      state.value.engine = change.payload;
    },
    changeDataMilege: (state, change) => {
      state.value.mileage = change.payload;
    },
    changeDataPhoto: (state, change) => {
      state.value.phfoto = change.payload;
    },
    changeDataPrice: (state, change) => {
      state.value.price = change.payload;
    },
    changeDataTransmission: (state, change) => {
      state.value.transmission = change.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeDataBodyWork,
  changeDataYear,
  changeDataMark,
  changeDataModel,
  changeDataCategory,
  changeDataColor,
  changeDataDescription,
  changeDataDrive,
  changeDataEngine,
  changeDataMilege,
  changeDataPhoto,
  changeDataPrice,
  changeDataTransmission,
} = createCard.actions;

export default createCard.reducer;
