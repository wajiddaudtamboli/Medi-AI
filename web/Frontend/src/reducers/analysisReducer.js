import {
    ANALYSIS_REQUEST,
    ANALYSIS_SUCCESS,
    ANALYSIS_FAIL,
    HEALTH_TIPS_REQUEST,
    HEALTH_TIPS_SUCCESS,
    HEALTH_TIPS_FAIL,
    EMERGENCY_ASSESSMENT_REQUEST,
    EMERGENCY_ASSESSMENT_SUCCESS,
    EMERGENCY_ASSESSMENT_FAIL,
    CLEAR_ANALYSIS_ERRORS,
} from '../actions/analysisActions.js';

// Analysis reducer
export const analysisReducer = (state = {}, action) => {
    switch (action.type) {
        case ANALYSIS_REQUEST:
            return {
                loading: true,
                analysis: null,
                error: null,
            };
        case ANALYSIS_SUCCESS:
            return {
                loading: false,
                analysis: action.payload,
                error: null,
            };
        case ANALYSIS_FAIL:
            return {
                loading: false,
                analysis: null,
                error: action.payload,
            };
        case CLEAR_ANALYSIS_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Health tips reducer
export const healthTipsReducer = (state = {}, action) => {
    switch (action.type) {
        case HEALTH_TIPS_REQUEST:
            return {
                loading: true,
                tips: null,
                error: null,
            };
        case HEALTH_TIPS_SUCCESS:
            return {
                loading: false,
                tips: action.payload,
                error: null,
            };
        case HEALTH_TIPS_FAIL:
            return {
                loading: false,
                tips: null,
                error: action.payload,
            };
        case CLEAR_ANALYSIS_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Emergency assessment reducer
export const emergencyAssessmentReducer = (state = {}, action) => {
    switch (action.type) {
        case EMERGENCY_ASSESSMENT_REQUEST:
            return {
                loading: true,
                assessment: null,
                error: null,
            };
        case EMERGENCY_ASSESSMENT_SUCCESS:
            return {
                loading: false,
                assessment: action.payload,
                error: null,
            };
        case EMERGENCY_ASSESSMENT_FAIL:
            return {
                loading: false,
                assessment: null,
                error: action.payload,
            };
        case CLEAR_ANALYSIS_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
