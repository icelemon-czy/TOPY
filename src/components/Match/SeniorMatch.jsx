import "./seniormatch.scss";
import {useState} from "react";
import axios from "axios";

const SeniorMatch=({setSeniorMatch,setOpenPickSenior,setSeniors,setCurrentMatch,childList,petList})=>{
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = String(today.getFullYear());
    const min_date = yyyy+'-'+mm + '-' + dd ;

    const[inputs,setInputs] = useState({
        child:null,
        pet:null,
        year: yyyy,
        month: mm,
        day:dd,
        start:0,
        end:0,
    });

    const [err,setErr] = useState(null);

    const handleChildAndPetChange = (e)=>{
        const newInput = inputs;
        newInput[e.target.name] = e.target.value;
        setInputs(newInput);
        setCurrentMatch(newInput);
    }

    const handleDateChange = (e) =>{
        const newInput = inputs;
        const newDate = e.target.value;
        newInput["year"] = newDate.split("-")[0];
        newInput["month"]  = newDate.split("-")[1];
        newInput["day"]= newDate.split("-")[2];
        setInputs(newInput);
        setCurrentMatch(newInput);
    }

    const handleHourChange = (e)=>{
        const newInput = inputs;
        if(e.target.checked){
            if(inputs.start == 0){
                newInput.start = parseInt(e.target.value);
                newInput.end = parseInt(e.target.value);
                setInputs(newInput);
                setCurrentMatch(newInput);
                setErr(null);
                return;
            }
            if(inputs.start -1 == parseInt(e.target.value)){
                newInput.start = parseInt(e.target.value);
                setInputs(newInput);
                setCurrentMatch(newInput);
                setErr(null);
                return;
            }
            if(inputs.end+1 == parseInt(e.target.value)){
                newInput.end = parseInt(e.target.value);
                setInputs(newInput);
                setCurrentMatch(newInput);
                setErr(null);
                return;
            }
            setErr("Only can add continuous time slot");
            e.target.checked = false;
        }else{
            if(inputs.start == parseInt(e.target.value)){
                if(inputs.end == inputs.start){
                    newInput.start= 0;
                    newInput.end = 0;
                    setInputs(newInput);
                    setCurrentMatch(newInput);
                    setErr(null);
                    return;
                }
                newInput.start = inputs.start+1;
                setInputs(newInput);
                setCurrentMatch(newInput);
                setErr(null);
                return;
            }
            if(inputs.end == parseInt(e.target.value)){
                newInput.end = inputs.end-1;
                setInputs(newInput);
                setCurrentMatch(newInput);
                setErr(null);
                return;
            }
            setErr("Can not break continuous time slot");
            e.target.checked = true;
        }
    }

    const handleClick = async (e)=>{
        e.preventDefault();
        if(inputs.pet == null && inputs.child == null){
            setErr("Must bring at least one pet or child");
            return;
        }
        if(inputs.start == 0){
            setErr("Must select one time slot");
            return;
        }
        // Match Process
        // Case 1 only pet  (TimeSlot == 0 or 1)
        if(inputs.child == null){
            try {
                const data = await axios.get("http://localhost:8801/api/time/pet", {
                    params: {
                        pet: inputs.pet,
                        year: inputs.year,
                        month: inputs.month,
                        day: inputs.day,
                        start: inputs.start,
                        end: inputs.end+1,
                    },
                    withCredentials:true,
                }).then(
                    (res) => {
                        return res.data;
                    }
                );
                setSeniors(data);
                if(data.length > 0){
                    setOpenPickSenior(true);
                    setSeniorMatch(false);
                }else{
                    setErr("Can not find available seniors");
                }
            }catch (err){
                setErr(err);
            }
            return;
        }

        // Case 2 only child (TimeSolot == 0 or 2)
        if(inputs.pet == null){
            try {
                const data = await axios.get("http://localhost:8801/api/time/child", {
                    params: {
                        child: inputs.child,
                        year: inputs.year,
                        month: inputs.month,
                        day: inputs.day,
                        start: inputs.start,
                        end: inputs.end+1,
                    },
                    withCredentials:true,
                }).then(
                    (res) => {
                        return res.data;
                    }
                );
                setSeniors(data);
                if(data.length > 0){
                    setOpenPickSenior(true);
                    setSeniorMatch(false);
                }else{
                    setErr("Can not find available seniors");
                }
            }catch (err){
                setErr(err);
            }
            return;
        }

        // Case 3 pet and child
        try {
            const data = await axios.get("http://localhost:8801/api/time/petchild", {
                params: {
                    child: inputs.child,
                    pet: inputs.pet,
                    year: inputs.year,
                    month: inputs.month,
                    day: inputs.day,
                    start: inputs.start,
                    end: inputs.end+1,
                },
                withCredentials:true,
            }).then(
                (res) => {
                    return res.data;
                }
            );
            setSeniors(data);
            if(data.length > 0){
                setOpenPickSenior(true);
                setSeniorMatch(false);
            }else{
                setErr("Can not find available seniors");
            }
        }catch (err){
            setErr(err);
        }
    }

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
                                    <div className={"list"} key={i}>
                                        <input type={"radio"} name={"child"} value={child.id} onChange={handleChildAndPetChange} />
                                        <label>{child.name}</label>
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
                                    <div className={"list"} key={i}>
                                        <input type={"radio"} name={"pet"} value={pet.id} onChange={handleChildAndPetChange}/>
                                        <label>{pet.name}</label>
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
                        defaultValue={min_date}
                        onChange={handleDateChange}
                    />
                    <label>Hours</label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={9}  onClick={handleHourChange}/>
                        9 - 10
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={10} onClick={handleHourChange}/>
                        10 - 11
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={11} onClick={handleHourChange}/>
                        11 - 12
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={12} onClick={handleHourChange}/>
                        12 - 13
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={13} onClick={handleHourChange}/>
                        13 - 14
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={14} onClick={handleHourChange}/>
                        14 - 15
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={15} onClick={handleHourChange}/>
                        15 - 16
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={16} onClick={handleHourChange}/>
                        16 - 17
                    </label>
                    {err && err}
                    <button type={"submit"} onClick={handleClick}>Find</button>
                </form>
                <button className="close" onClick={ ()=> setSeniorMatch(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default SeniorMatch;