import axios from '../axios.js';
import {
    CLEAR_ERRORS,
    GET_HISTORY_FAIL,
    GET_HISTORY_REQUEST, GET_HISTORY_SUCCESS,
    LOAD_USER_FAIL, LOAD_USER_SUCCESS,
    LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
    UPLOAD_FAIL,
    UPLOAD_REQUEST, UPLOAD_SUCCESS
} from "../constants/userConstants.js";


export const login = (contact, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.post(
            `/login`,
            { contact, password },
            config
        );

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
}

export const register = (contact, password, name, role) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post(
            `/register`,
            { contact, password, name, role },
            // { email, password, name, role, speciality, availability },
            config
        )

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        const response = await axios.get(`/profile`);
        if (response && response.data && response.data.user) {
            dispatch({ type: LOAD_USER_SUCCESS, payload: response.data.user });
        } else {
            dispatch({ type: LOAD_USER_FAIL, payload: "User data not found" });
        }
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response?.data?.message || "Failed to load user data"
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/logout`)
        dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }
}

export const addMedicalHistory = (analysis, url) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.post(
            `/medical-history/add`,
            {
                analysis,
                imageUrl: url,
            },
            config
        );

        dispatch({
            type: UPLOAD_SUCCESS,
            payload: data.medicalHistory
        });

        return data.medicalHistory;
    } catch (error) {
        dispatch({
            type: UPLOAD_FAIL,
            payload: error.response?.data?.message || "Failed to upload medical history"
        });
        throw error; // Re-throw for component error handling
    }
};

export const getMedicalHistory = () => async (dispatch) => {
    try {
        dispatch({ type: GET_HISTORY_REQUEST });

        const { data } = await axios.get(`/medical-history`);

        // Process the medical history data from Prisma
        const processedHistory = data.data.map(record => ({
            ...record,
            image: {
                url: record.imageUrl,
                type: 'image'
            }
        }));

        dispatch({
            type: GET_HISTORY_SUCCESS,
            payload: processedHistory
        });

        return processedHistory;
    } catch (error) {
        dispatch({
            type: GET_HISTORY_FAIL,
            payload: error.response?.data?.message || "Failed to fetch medical history"
        });
        throw error;
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
