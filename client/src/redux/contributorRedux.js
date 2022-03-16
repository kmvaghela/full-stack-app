import { createSlice } from "@reduxjs/toolkit";

const contributorSlice = createSlice({
    name: "image",
    initialState: {
        imagesData: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //ADD
        addImageStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addImageSuccess: (state, action) => {
            state.isFetching = false;
            state.imagesData.push(action.payload);
        },
        addImageFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //GET
        getImageStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getImageSuccess: (state, action) => {
            state.isFetching = false;
            state.imagesData = action.payload;
        },
        getImageFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        updateImageStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateImageSuccess: (state, action) => {
            state.isFetching = false;
            state.imagesData[state.imagesData.findIndex((item) => item.id === action.payload.id)] = action.payload.image;
        },
        updateImageFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
})

export const {
    addImageStart,
    addImageSuccess,
    addImageFailure,
    getImageStart,
    getImageSuccess,
    getImageFailure,
    updateImageStart,
    updateImageSuccess,
    updateImageFailure,
} = contributorSlice.actions;
export default contributorSlice.reducer;