import {  createSlice } from '@reduxjs/toolkit';
import {counterSlice} from "../counter/counterSlice";
import {randomNumberInRange} from "../../App";
import { current } from '@reduxjs/toolkit'

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
            const {checked,opt} = action.payload;
            console.log('opt',opt)
            console.log('checkec',checked);
            // let data = state.formValues;
            // console.log('data',current(data));
            if(checked) {
                state.formValues.push(opt);
            }
            else{
                let options = JSON.parse(JSON.stringify(current(state.formValues)));
                const indexOfObject = options.findIndex(object => {
                    return object.id === opt.id;
                });
                if(indexOfObject!==-1) {
                    options.splice(indexOfObject, 1)
                }
                state.formValues = options;
            }

        },
        onChangeEvents:(state,action)=>{
            const {parentId,name} = action.payload;
            const data = {
                id:randomNumberInRange(),
                parentId,
                name
            }
            let options = JSON.parse(JSON.stringify(current(state.formValues)));
            console.log('options',options);
            console.log('ddd',parentId)
            let indexOfObject = options.findIndex(object=>{
                return object.parentId === parentId
            })
            options[indexOfObject] = data;
            // let findElement = options.find(el=>el.parentId===parentId);
            // if(!findElement){
            //     state.formValues.push(data);
            // }
            // else{
            //     console.log('findElement',findElement);
            // }
            // console.log('findElement',findElement);

            // state.formValues = state1;
        }
    }
})

export const selectOptions = (state) => state.customOption.options;
export const selectFormOptions = (state) => state.customOption.formValues;


export const {setOption,onCheckBoxToggle,onChangeEvents} = customOptionSlice.actions;
export default customOptionSlice.reducer;