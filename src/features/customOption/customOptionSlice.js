import {  createSlice } from '@reduxjs/toolkit';
import {counterSlice} from "../counter/counterSlice";
import {randomNumberInRange} from "../../App";
import { current } from '@reduxjs/toolkit'

const initialState = {
    options:[],
    formValues:[],
    service:'transport'
}


export const customOptionSlice = createSlice({
    name:'customOptionSlice',
    initialState,
    reducers:{
        setOption:(state,action)=>{
            state.options = action.payload;
        },
        setService2:(state,action)=>{
            state.service = action.payload;
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
            let indexOfObject = options.findIndex(object=>{
                return object.parentId === parentId
            })

            if(indexOfObject === -1) {
                options.push(data);
            }
            else {
                console.log('indexOfObject',indexOfObject)
                options[indexOfObject] = data;
            }
            console.log('ddd',options)
            state.formValues = options;
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
export const serviceNameRedux = (state)=>state.customOption.service


export const {setOption,setService2,onCheckBoxToggle,onChangeEvents} = customOptionSlice.actions;
export default customOptionSlice.reducer;