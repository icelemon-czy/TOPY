import "./seniormatch.scss";
import {useState} from "react";
import SeniorPick from "../pick/PickSenior";
const SeniorMatch=({setSeniorMatch,setOpenPickSenior,childList,petList})=>{
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = String(today.getFullYear());
    const min_date = yyyy+'-'+mm + '-' + dd ;

    return (
        <div className={"match"}>
            <div className="wrapper">
                <h1>Senior Match</h1>
                <form>
                    <label>Who are you bringing today?</label>
                    <div className={"childAndPet"}>
                        <div className={"child"}>
                            <span>Child List</span>
                            <div>
                            {
                                childList.map((child,i)=>(
                                    <div key={i}>
                                        <label>{child.name}</label>
                                        <input type={"checkbox"} />
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        <div className={"pet"}>
                            <span>PetList</span>
                            <div>
                            {
                                petList.map((pet,i)=>(
                                    <div key={i}>
                                        <label>{pet.name}</label>
                                        <input type={"checkbox"} />
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>

                    <label>Date</label>
                    <input
                        type={"date"}
                        min={min_date}
                        max={"2023-12-31"}
                    />
                    <label>Hours</label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        9 - 10
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        10 - 11
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        11 - 12
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        12 - 13
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        13 - 14
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        14 - 15
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        15 - 16
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        16 - 17
                    </label>

                    <button type={"submit"} onClick={()=>{setOpenPickSenior(true); setSeniorMatch(false)}}>Find</button>
                </form>
                <button className="close" onClick={ ()=> setSeniorMatch(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default SeniorMatch;