import React,{useContext,useState} from "react"
import "./seniorprofile.scss"
import SignUpTimeSlot from "../../components/signup/SignUpTimeSlot";
import MatchProfile from "../../components/profile/MatchProfile";

import {AuthContext} from "../../context/authContext";
import {makeRequest} from "../../axios";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const SeniorProfile= () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);

    // Query Free Time Slot
    const { isLoading:tIsLoading, error:tError, data:freeTimeList } = useQuery(
        ['time'],
        () => makeRequest.get("/time?sid="+currentUser.id).then((res)=>{return res.data})
    );

    // Query Match
    const { isLoading:mIsLoading, error:mError, data:matchList} = useQuery(
        ['smatch'],
        () => makeRequest.get("/match/senior?sid="+currentUser.id).then((res)=>{return res.data})
    );

    const [openSignUp,setOpenSignUp] = useState(false);

    const [openMatch,setOpenMatch] = useState(false);
    const [clickedMatch,setClickMatch] = useState(null);

    const handleClickMatch =(match)=>{
        setClickMatch(match);
        setOpenMatch(true);
    }

    const handleLogOut =async (e)=>{
        e.preventDefault();
        try {
            const res = makeRequest.post("/auth/logout");
            localStorage.removeItem("user");
            navigate("/login");
        } catch (err) {
            console.log(err.response);
        }
    }

    return (
        <div className={"profile"}>
            <h1>Senior Profile</h1>
            <div className={"middle"}>
                <div className={"Info"}>
                    <span> Name :{currentUser.name}</span>
                    <span> Age: {currentUser.age}</span>
                    <span> Gender: {currentUser.gender}</span>
                    <span> Allergy Pet : {currentUser.allergy}</span>
                    <span> Address : {currentUser.address}</span>
                    <span> Phone: {currentUser.phone}</span>
                    <span> Email:{currentUser.email}</span>
                </div>
                <div className={"freeList"}>

                    <span style={{borderBottom:"solid",padding:"5px"}}>
                        Free Time List
                    </span>
                    {
                        tIsLoading? "Time Slot is loading":
                        freeTimeList.map((time,i)=>(<span style={{borderBottom:"groove",padding:"5px"}} key={i}>
                            {time.year+"/"+time.month+"/"+time.day+": "+time.start+"-"+time.end}
                            {time.type==0 ? "(Both)" : time.type==1 ?"(Pet)":"(Child)"}
                        </span>))
                    }

                </div>

                <div className={"scheduleList"}>
                    <span style={{borderBottom:"solid",padding:"5px"}}>
                        Schedule List
                    </span>

                    {
                        mIsLoading? "Schedule List is loading":
                        matchList.map((match,i)=>(
                            <span
                                style={{borderBottom:"groove",padding:"5px"}}
                                key={i}
                                onClick={()=>handleClickMatch({...match,sName:currentUser.name})}
                            >
                            {"Match"+(i+1)}
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className={"down"}>
                <button style={{background:"#3dfcc5"}} onClick={()=>setOpenSignUp(true)}>
                    Sign Up Time Slot
                </button>
                <button style={{background:"#9c98a9"}} onClick={handleLogOut}>
                    Log Out
                </button>
            </div>
            {openSignUp && <SignUpTimeSlot setOpenSignUp={setOpenSignUp}/>}
            {openMatch &&<MatchProfile setOpenMatchProfile={setOpenMatch} match={clickedMatch} />}
        </div>
    )
}
export default SeniorProfile;