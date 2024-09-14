import thunk from 'redux-thunk';
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from 'redux-persist/es/persistStore';
import authSlice from './reducer/authSlice';
import petReducer from './reducer/petSlice';
import petDetailReducer from './reducer/petDetailSlice';

const VERSION_KEY = 'reduxVersion';
const DEFAULT_REDUX_VERSION = '1.0';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

// Action type for resetting the state
export const RESET_STATE = 'RESET_STATE';

// Action creator for resetting the state
export const resetState = () => ({ type: RESET_STATE });
export const rootReducer = combineReducers({
    user: authSlice,
    pets: petReducer,
    petDetail: petDetailReducer,
})


const persistedReducer = persistReducer(persistConfig, (state, action) => {
    if (action.type === RESET_STATE) {
        // Reset logic here...
        return rootReducer(undefined, {}); // Reset to initial state
    }
    return rootReducer(state, action);
});

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})
export const persistor = persistStore(store);

// check redux version and reset state if necessary
AsyncStorage.getItem(VERSION_KEY)
    .then((reduxVersion) => {
        if (!reduxVersion) {
            AsyncStorage.removeItem('token')
            store.dispatch(resetState()); // Trigger reset if no version is found
            AsyncStorage.setItem(VERSION_KEY, DEFAULT_REDUX_VERSION); // Set default version in storage
        }
        else if (reduxVersion !== DEFAULT_REDUX_VERSION) {
            AsyncStorage.removeItem('token');
            store.dispatch(resetState());
            AsyncStorage.setItem(VERSION_KEY, DEFAULT_REDUX_VERSION);
        }
    })
    .catch((error) => {
        // Handle AsyncStorage errors if any
        console.error('AsyncStorage error:', error);
    });