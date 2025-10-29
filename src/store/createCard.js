import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    mark: { mark: null, id: null },
    model: { model: null, id: null },
    year: null,
    bodywork: { bodywork: null, id: null },
    engine: { engine: null, id: null },
    drive: { drive: null, id: null },
    transmission: { transmission: null, id: null },
    mileage: null,
    photo: [],
    price: null,
    color: { color: null, id: null },
    description: "<p>text</p>",
    category: 1,
    modification: { mode: "155 л.с. (2.0 MT)", id: 1 },
    user: { name: null, id: null },
    location: "Нижний Новгород",
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
      state.value.photo.push(change.payload);
    },
    deleteDataPhoto: (state, change) => {
      state.value.photo = change.payload;
    },

    changeDataPrice: (state, change) => {
      state.value.price = change.payload;
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
    changeDataLocation: (state, change) => {
      state.value.location = change.payload;
    },
    changeDataUser: (state, change) => {
      state.value.user = change.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeDataLocation,
  changeDataUser,
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
  changeDataMode,
  changeDataAvailability,
  deleteDataPhoto,
} = createCard.actions;

export default createCard.reducer;
