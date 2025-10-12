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
        }
    }
});

export const {setStep, setFormData} = formSlice.actions;
export default formSlice.reducer;