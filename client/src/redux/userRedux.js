import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user:[],
        currentUser: null,
        isFetching: false,
        error: false,
        loggedIn: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
            state.loggedIn = true;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.loggedIn = false;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loggedIn = false;
        },
        RegisterStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        RegisterSuccess: (state, action) => {
            state.isFetching = false;
            state.user.push(action.payload);
        },
        RegisterFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
})

export const { loginStart, loginSuccess, loginFailure, RegisterStart, RegisterSuccess, RegisterFailure, logout } = userSlice.actions;
export default userSlice.reducer;