import axios from '../axios.js';

// Analysis Action Types
export const ANALYSIS_REQUEST = 'ANALYSIS_REQUEST';
export const ANALYSIS_SUCCESS = 'ANALYSIS_SUCCESS';
export const ANALYSIS_FAIL = 'ANALYSIS_FAIL';
export const HEALTH_TIPS_REQUEST = 'HEALTH_TIPS_REQUEST';
export const HEALTH_TIPS_SUCCESS = 'HEALTH_TIPS_SUCCESS';
export const HEALTH_TIPS_FAIL = 'HEALTH_TIPS_FAIL';
export const EMERGENCY_ASSESSMENT_REQUEST = 'EMERGENCY_ASSESSMENT_REQUEST';
export const EMERGENCY_ASSESSMENT_SUCCESS = 'EMERGENCY_ASSESSMENT_SUCCESS';
export const EMERGENCY_ASSESSMENT_FAIL = 'EMERGENCY_ASSESSMENT_FAIL';
export const CLEAR_ANALYSIS_ERRORS = 'CLEAR_ANALYSIS_ERRORS';

// AI-powered medical analysis
export const analyzeImage = (imageBase64, prompt, type, userId = null) => async (dispatch) => {
    try {
        dispatch({ type: ANALYSIS_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.post(
            `/analysis/create`,
            {
                imageBase64,
                prompt,
                type: type || 'general',
                userId
            },
            config
        );

        dispatch({
            type: ANALYSIS_SUCCESS,
            payload: data.data
        });

        return data.data;
    } catch (error) {
        dispatch({
            type: ANALYSIS_FAIL,
            payload: error.response?.data?.message || "Analysis failed"
        });
        throw error;
    }
};

// Get analysis history
export const getAnalysisHistory = (userId) => async () => {
    try {
        const { data } = await axios.get(`/analysis/history/${userId}`);

        return data.data;
    } catch (error) {
        console.error('Failed to fetch analysis history:', error);
        throw error;
    }
};

// Get specific analysis
export const getAnalysis = (id) => async () => {
    try {
        const { data } = await axios.get(`/analysis/${id}`);

        return data.data;
    } catch (error) {
        console.error('Failed to fetch analysis:', error);
        throw error;
    }
};

// Generate health tips
export const generateHealthTips = (category = 'general') => async (dispatch) => {
    try {
        dispatch({ type: HEALTH_TIPS_REQUEST });

        const { data } = await axios.get(`/analysis/health-tips?category=${category}`);

        dispatch({
            type: HEALTH_TIPS_SUCCESS,
            payload: data.data
        });

        return data.data;
    } catch (error) {
        dispatch({
            type: HEALTH_TIPS_FAIL,
            payload: error.response?.data?.message || "Failed to generate health tips"
        });
        throw error;
    }
};

// Emergency assessment
export const assessEmergency = (symptoms) => async (dispatch) => {
    try {
        dispatch({ type: EMERGENCY_ASSESSMENT_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.post(
            `/analysis/emergency-assessment`,
            { symptoms },
            config
        );

        dispatch({
            type: EMERGENCY_ASSESSMENT_SUCCESS,
            payload: data.data
        });

        return data.data;
    } catch (error) {
        dispatch({
            type: EMERGENCY_ASSESSMENT_FAIL,
            payload: error.response?.data?.message || "Emergency assessment failed"
        });
        throw error;
    }
};

// Clear errors
export const clearAnalysisErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ANALYSIS_ERRORS });
};
