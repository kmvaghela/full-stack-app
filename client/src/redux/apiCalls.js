import { publicRequest, userRequest } from "../requestMethods";
import { loginStart, loginSuccess, loginFailure, logout, RegisterStart, RegisterSuccess, RegisterFailure, } from "./userRedux";
import {
    addImageStart,
    addImageSuccess,
    addImageFailure,
    getImageStart,
    getImageSuccess,
    getImageFailure,
    updateImageStart,
    updateImageSuccess,
    updateImageFailure,
} from "./contributorRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const logoutUser = async (dispatch) => {
    dispatch(logout());
}

export const Register = async (details, dispatch) => {
    dispatch(RegisterStart());
    try {
        const res = await publicRequest.post("/auth/signup", details);
        dispatch(RegisterSuccess(res.data));
    } catch (error) {
        dispatch(RegisterFailure())
    }
};

export const addImage = async (imageData, dispatch) => {
    dispatch(addImageStart());
    try {
        const res = await userRequest.post("/contributor", imageData);
        dispatch(addImageSuccess(res.data));
    } catch (error) {
        dispatch(addImageFailure())
    }
};

export const getImages = async (dispatch) => {
    dispatch(getImageStart());
    try {
        const res = await publicRequest.get("/contributor");
        dispatch(getImageSuccess(res.data));
    } catch (error) {
        dispatch(getImageFailure())
    }
};

export const updateImage = async (id, image, dispatch) => {
    dispatch(updateImageStart());
    try {
        const res = await userRequest.put(`/contributor/${id}`, image);
        dispatch(updateImageSuccess({ id, image }));

    } catch (error) {
        dispatch(updateImageFailure())
    }
};
