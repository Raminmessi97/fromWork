import {  createSlice } from '@reduxjs/toolkit';
import {counterSlice} from "../counter/counterSlice";
const initialState = {
    options:[],
    formValues:[]
}

export const customOptionSlice = createSlice({
    name:'customOptionSlice',
    initialState,
    reducers:{
        setOption:(state,action)=>{
            state.options = action.payload;
        },
        onCheckBoxToggle:(state,action)=>{
            console.log('actin',action.payload)
            // let option = JSON.parse(JSON.stringify(state));
            // if(e.target.checked){
            //     setState([...state,opt])
            //     // onChange(e,option);
            // }else{
            //     const indexOfObject = option.findIndex(object => {
            //         return object.id === opt.id;
            //     });
            //     if(indexOfObject!==-1) {
            //         option.splice(indexOfObject, 1)
            //     }
            //     setState(option)
            //     // onChange(e,option);
            // }
            // state.formValues = action.payload;
            const {checked,opt} = action.payload;
            let data = state.formValues;
            if(checked) {
                data = [...data,opt]
            }
            else{
                const indexOfObject = opt.findIndex(object => {
                    return object.id === opt.id;
                });
                if(indexOfObject!==-1) {
                    opt.splice(indexOfObject, 1)
                }
                data = opt;
            }
            state.formValues = data
        }
    }
})

export const selectOptions = (state) => state.customOption.options;
export const selectFormOptions = (state) => state.customOption.formValues;


export const {setOption,onCheckBoxToggle} = customOptionSlice.actions;
export default customOptionSlice.reducer;