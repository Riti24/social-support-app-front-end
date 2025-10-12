import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    step:0,
    data:{
    }
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setStep(state, action) {
            state.step = action.payload;
        },
        setFormData(state, action) {
            state.data = {...state.data, ...action.payload};
        },
        reset(state) { Object.assign(state, initialState); }
    }
});

export const {setStep, setFormData,reset} = formSlice.actions;
export default formSlice.reducer;