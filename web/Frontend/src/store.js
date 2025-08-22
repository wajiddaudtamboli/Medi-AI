import { thunk } from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';  // redux-persist for storing data in state

import { allUsersReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer.js';
import { allDoctorsReducer } from './reducers/appointmentReducer';
import {
    analysisReducer,
    healthTipsReducer,
    emergencyAssessmentReducer
} from './reducers/analysisReducer.js';

const persistConfig = {
    key: 'root',
    storage,
}

const persistCombineReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    allDoctors: allDoctorsReducer,
    analysis: analysisReducer,
    healthTips: healthTipsReducer,
    emergencyAssessment: emergencyAssessmentReducer
});

const persistedReducer = persistReducer(persistConfig, persistCombineReducer)

let initialState = {};
const middleware = [thunk];

export const persistReduxStore = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
// export const persistor = persistStore(persistReduxStore);
