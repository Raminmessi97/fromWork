import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { faAdd,faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux";
import {setOption} from "./features/customOption/customOptionSlice"
import {NavLink} from "react-router-dom";

export const customOptions = [
  {
    name:'Input',
    id:1
  },
  {
    name:'Checkbox',
    id:2,
    multi:true
  },
  {
    name:'Date',
    id:3
  },
  {
    name:'Number',
    id:4,
  },
  {
    name:'Select',
    id:5,
    multi:true
  },
]

export function randomNumberInRange(min=10,max=1000) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




function App() {
  const [mainType,setMainType] = React.useState('Input');
  const [options,setOptions] = React.useState([]);
  const [optionvalue,setOptionsValues] = useState([]);
  const dispatch = useDispatch()

  const addOption = (e) => {
    let opt = {
      id:randomNumberInRange(),
      name:'',
      type:mainType
    }
    let multi = customOptions.find(op=>op.name===mainType);
    if(multi.multi){
        opt.options = [];
        opt.multi = true;
    }
    setOptions([...options,opt]);
  }
  const removeOption = (id) => {
    let newOptions = options.filter(option => option.id !== id);
    setOptions(newOptions);
    // setOptionValues(optionValues.slice(0,optionValues.length-1));
  }

  const submitForm = () => {
    // console.log('submitForm');
    dispatch(setOption(options));
  }

  const addValueOption = (id)=>{
    let opt = {
      id: randomNumberInRange(),
      name: '',
    }
    // setOptionsValues([...options,])
    let state1 = JSON.parse(JSON.stringify(options));
    for(let i=0;i<state1.length;i++){
      if(state1[i].id === id){
        state1[i].options.push(opt);
      }
    }

    setOptions(state1)
    // let findOption = options.find(op=>opt.id===id)
  }

  const changeOptionValues = (e,mainId,id)=>{
    e.persist();
    let state1 = JSON.parse(JSON.stringify(options));
    for(let i=0;i<state1.length;i++){
      if(state1[i].id === mainId){
        for(let k=0;k<state1[i].options.length;k++){
         if(state1[i].options[k].id===id){
           state1[i].options[k].name = e.target.value;
         }
        }
      }
    }

    setOptions(state1)

  }

  const changeMainType = (e)=>{
    setMainType(e.target.value)
  }

  const removeOptionValue = (mainId,id)=>{
    let state1 = JSON.parse(JSON.stringify(options));
    let mainObj = state1.find(op=>op.id===mainId);
    let obj = mainObj.options;

    const indexOfObject = obj.findIndex(object => {
      return object.id === id;
    });
    if(indexOfObject!==-1) {
        obj.splice(indexOfObject, 1)
      }

    setOptions(state1)
  }

  const changeMainType2 = (e,mainId)=>{
    e.persist();
    let state1 = JSON.parse(JSON.stringify(options));
    for(let i=0;i<state1.length;i++){
      if(state1[i].id === mainId){
        state1[i].name = e.target.value;
      }
    }

    setOptions(state1)
  }

  return (
        <>
          <NavLink to='/home'>Home</NavLink>
          <NavLink to='/user'>User</NavLink>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <div className="row">
                <div className="col-lg-3">
                <select className="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue="1" onChange={changeMainType}>
                  {customOptions.map((option)=>(
                  <option key={option.id} value={option.name}>{option.name}</option>
                  ))}
                </select>
                </div>

                <div className="col-lg-3">
                 <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={addOption}> <FontAwesomeIcon icon={faAdd} /></button>
                </div>
              </div>
            </div>
          </div>
          <div>
            {options.map((option,index)=>
              <div key={index} className="card m-3 d-inline-block">
                <div className="card-flex">
                  <div className="card">
                    <div className="card-body">

                      <p>Type:{option.type}</p>
                      <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Option name"
                               aria-label="Option name" aria-describedby="button-addon2" value={option.name} onChange={(e)=>changeMainType2(e,option.id)} />
                        {option.multi===true &&
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={() => addValueOption(option.id)}>
                              <FontAwesomeIcon icon={faAdd}/>
                            </button>
                        }
                      </div>
                      {option.multi && option.options && option.options.length!==0 && option.options.map((opt)=>(
                        <div key={opt.id} className="input-group mb-3">
                          <input type="text" value={opt.name} className="form-control" placeholder="Add value"
                                 aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e)=>changeOptionValues(e,option.id,opt.id)} />
                          <button type="button" className="btn btn-outline-danger" onClick={()=>removeOptionValue(option.id,opt.id)}> <FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-btns">
                    <button type="button" className="btn btn-outline-danger" onClick={()=>removeOption(option.id)}> <FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
         <footer className="m-3"> <button  className="btn btn-success " onClick={submitForm}>Submit</button>  </footer>
        </>
  );
}

export default App;
