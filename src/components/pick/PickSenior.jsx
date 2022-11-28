import "./picksenior.scss"
import {useState} from "react";
import axios from "axios";

const SeniorPick =({setMatchSenior,setOpenPickSenior,setOpenSuccessPage,seniors,matchInfo})=>{
    const[selectedSenior,setSenior] = useState(null);
    const [err,setErr] = useState(null);
    const handleChange = (e)=>{
        setSenior(e.target.value);
        for(var i = 0;i<seniors.length;i++){
            if(seniors[i].sid == parseInt( e.target.value )){
                setMatchSenior(seniors[i].name);
            }
        }
    };

    const handleClick = async (e)=>{
        e.preventDefault();
        if(selectedSenior == null){
            setErr("Must pick one senior");
            return;
        }
        // Get TimeSlot id and type
        try {
            const data = await axios.get("http://localhost:8801/api/time/pick", {
                params: {
                    sid:selectedSenior,
                    year: matchInfo.year,
                    month: matchInfo.month,
                    day: matchInfo.day,
                    start: matchInfo.start,
                    end: matchInfo.end+1,
                },
                withCredentials:true,
            }).then(
                (res) => {
                    return res.data;
                }
            );
            let tid = data[0].id;
            let type = data[0].type;
            let start = data[0].start;
            let end = data[0].end;
            // Delete the time slot

            // Then add new timeslot

            // setSeniors(data);
            // if(data.length > 0){
            //     setOpenPickSenior(true);
            //     setSeniorMatch(false);
            // }else{
            //     setErr("Can not find available seniors");
            // }
        }catch (err){
            setErr(err);
            return;
        }
        setOpenPickSenior(false);
        setOpenSuccessPage(true);
    }
    return (
        <div className={"pick"}>
            <div className="wrapper">
                <h1>Match a senior</h1>
                <form>
                    <label>Pick a senior</label>
                    <div className={"senior"}>
                    {
                        seniors.map((senior,i)=>(
                            <div className={"pair"} key={i}>
                                <input type={"radio"} name={"senior"} value={senior.sid} onChange={handleChange}/>
                                <label className={"radio"}>
                                    {senior.name}
                                </label>
                            </div>
                        ))
                    }
                    </div>
                    {err && err}
                    <button onClick={handleClick}>Confirm</button>
                </form>
                <button className="close" onClick={ ()=> setOpenPickSenior(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default SeniorPick;