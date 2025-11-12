import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    year: null,
    bodywork: { bodywork: null, id: null },
    engine: { engine: null, id: null },
    drive: { drive: null, id: null },
    transmission: { transmission: null, id: null },
    photo: [],
    color: { color: null, id: null },
    category: 1,
    modification: { mode: "155 л.с. (2.0 MT)", id: 1 },
    user: { name: null, id: null },
    availability: null,
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
    changeDataColor: (state, change) => {
      state.value.color = change.payload;
    },
    changeDataDrive: (state, change) => {
      state.value.drive = change.payload;
    },
    changeDataEngine: (state, change) => {
      state.value.engine = change.payload;
    },
    changeDataPhoto: (state, change) => {
      state.value.photo.push(change.payload);
    },
    deleteDataPhoto: (state, change) => {
      state.value.photo = change.payload;
    },
    changeDataTransmission: (state, change) => {
      state.value.transmission = change.payload;
    },
    changeDataCategory: (state, change) => {
      state.value.category = change.payload;
    },
    changeDataMode: (state, change) => {
      state.value.modification = change.payload;
    },
    changeDataAvailability: (state, change) => {
      state.value.availability = change.payload;
    },
    changeDataUser: (state, change) => {
      state.value.user = change.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeDataUser,
  changeDataBodyWork,
  changeDataYear,
  changeDataCategory,
  changeDataColor,
  changeDataDrive,
  changeDataEngine,
  changeDataPhoto,
  changeDataTransmission,
  changeDataMode,
  changeDataAvailability,
  deleteDataPhoto,
} = createCard.actions;

export default createCard.reducer;
