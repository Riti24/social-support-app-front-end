import {configureStore} from '@reduxjs/toolkit';
import formReducer from './slices/form-slice';

const store = configureStore({
    reducer: {
        form: formReducer,
         devTools: true,
    },
});


export default store;  