import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectOptions,selectFormOptions,onCheckBoxToggle} from "./features/customOption/customOptionSlice";
import {randomNumberInRange} from "./App";


const formItems = {
    Input({multi,...rest}){
        return <input type="text" {...rest} />
    },
    Select({options,multi,...rest}){
        return (
            <select {...rest}>
                {options.map(opt=>
                    (<option key={opt.id} value={opt.id}>{opt.name}</option>)
                )}
            </select>
        )
    },
    Checkbox({options,onChange,name,id,multi,...rest}){
        const dispatch = useDispatch();

        // useEffect(()=>{
        //     console.log('state',state);
        //     onChange(null,state)
        // },[state])
        return(
            <div className="form-group row">
                <div className="col-sm-2" {...rest} >{name}</div>
                {options.map(opt=>(
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input name={id} onChange={(e)=>
                                {
                                    const checked = e.target.checked;
                                    const copyOption = JSON.parse(JSON.stringify(opt))
                                    copyOption.parentId = id;

                                    dispatch(onCheckBoxToggle({checked,opt:copyOption}))
                                }
                            }
                                   className="form-check-input" type="checkbox" id={opt.id}/>
                            <label className="form-check-label" htmlFor={opt.id}>
                                {opt.name}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        )
    },
    Number({...rest}){
        return <input type="number" {...rest}/>
    },
    Date({multi,...rest}){
        return <input type="date" {...rest}/>
    }

}

export const App2 = ()=>{
    const [allOptions,setAllOptions] = useState([])
    const options = useSelector(selectOptions)
    console.log(options,'options')

    const onChangeOptions = (e,option,state)=>{
        // console.log('option',option);
        // console.log('state',state);
        // if(!e && option.type!=="Checkbox") return;
        const data = {
            id:randomNumberInRange(),
            mainId:option.id,
            type:option.type,
            // value:e.target.value
        }

        if(option.type === "Checkbox"){
            data.value = state;
        }
        else{
            data.value = e.target.value
        }






        setAllOptions({...allOptions,[option.id]:data})

    }
    useEffect(()=>{
        console.log('allOptions',allOptions)
    },[allOptions])


    const data2 = useSelector(selectFormOptions);

    const submit2 =(e)=>{
        e.preventDefault();
        console.log('data2',data2);
    }

    return(
        <>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/user'>User</NavLink>


            <form>
                {options.map((option,key)=>{
                    const Component = formItems[option.type]
                   return <Component onChange={(e,state)=>onChangeOptions(e,option,state)}
                                     className="custom-select mr-sm-2" {...option} placeholder={option.name}  />
                })}

                <button type="button" onClick={submit2}>SSS</button>
                {/*<div className="form-group row">*/}
                {/*    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>*/}
                {/*    <div className="col-sm-10">*/}
                {/*        <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="form-group row">*/}
                {/*    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>*/}
                {/*    <div className="col-sm-10">*/}
                {/*        <input type="password" className="form-control" id="inputPassword3" placeholder="Password"/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<fieldset className="form-group">*/}
                {/*    <div className="row">*/}
                {/*        <legend className="col-form-label col-sm-2 pt-0">Radios</legend>*/}
                {/*        <div className="col-sm-10">*/}
                {/*            <div className="form-check">*/}
                {/*                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1"*/}
                {/*                       value="option1"/>*/}
                {/*                    <label className="form-check-label" htmlFor="gridRadios1">*/}
                {/*                        First radio*/}
                {/*                    </label>*/}
                {/*            </div>*/}
                {/*            <div className="form-check">*/}
                {/*                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2"*/}
                {/*                       value="option2"/>*/}
                {/*                    <label className="form-check-label" htmlFor="gridRadios2">*/}
                {/*                        Second radio*/}
                {/*                    </label>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</fieldset>*/}
                {/*<div className="form-group row">*/}
                {/*    <div className="col-sm-2">Checkbox</div>*/}
                {/*    <div className="col-sm-10">*/}
                {/*        <div className="form-check">*/}
                {/*            <input className="form-check-input" type="checkbox" id="gridCheck1"/>*/}
                {/*                <label className="form-check-label" htmlFor="gridCheck1">*/}
                {/*                    Example checkbox*/}
                {/*                </label>*/}
                {/*        </div>*/}
                {/*        <div className="form-check">*/}
                {/*            <input className="form-check-input" type="checkbox" id="gridCheck2"/>*/}
                {/*                <label className="form-check-label" htmlFor="gridCheck2">*/}
                {/*                    Example checkbox2*/}
                {/*                </label>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="col-auto my-1">*/}
                {/*    <label className="mr-sm-2 sr-only" htmlFor="inlineFormCustomSelect">Preference</label>*/}
                {/*    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">*/}
                {/*        <option defaultValue={'1'}>Choose...</option>*/}
                {/*        <option value="1">One</option>*/}
                {/*        <option value="2">Two</option>*/}
                {/*        <option value="3">Three</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                {/*<div className="form-group row">*/}
                {/*    <div className="col-sm-10">*/}
                {/*        <button type="submit" className="btn btn-primary">Sign in</button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </form>


        </>
    )
}

export default App2;