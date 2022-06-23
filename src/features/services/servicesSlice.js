import {  createSlice } from '@reduxjs/toolkit';
import {counterSlice} from "../counter/counterSlice";
const initialState = {
    services:[],
}

export const servicesSlice = createSlice({
    name:'servicesSlice',
    initialState,
    reducers:{
        setOption:(state,action)=>{
            state.options = action.payload;
        },
        onCheckBoxToggle:(state,action)=>{

        }
    }
})

export const selectServices = (state) => state.services.options;


export const {setOption,onCheckBoxToggle} = servicesSlice.actions;
export default servicesSlice.reducer;