import React,{useState} from "react"
import "./seniorprofile.scss"
import SignUpTimeSlot from "../../components/signup/SignUpTimeSlot";
const SeniorProfile= () => {
    const currentUser = {
        name: "Max Rober",
        location: "Pittsburgh",
        phone: "123-456-789",
    };
    const freeTimeList = [[2023,1,3,14,16],[2023,1,4,15,16]]
    const matches = [1,2,3]

    const [openSignUp,setOpenSignUp] = useState(true);

    return (
        <div className={"profile"}>
            <h1>Senior Profile</h1>
            <div className={"middle"}>
                <div className={"Info"}>
                    <span> Name :{currentUser.name}</span>
                    <span> Location : {currentUser.location}</span>
                    <span> Phone: {currentUser.phone}</span>
                </div>
                <div className={"freeList"}>

                    <span style={{borderBottom:"solid",padding:"5px"}}>
                        Free Time List
                    </span>

                    {
                        freeTimeList.map((slot,i)=>(<span style={{borderBottom:"groove",padding:"5px"}} key={i}>
                            {slot[0]+"/"+slot[1]+"/"+slot[2]+": "+slot[3]+"-"+slot[4]}
                        </span>))
                    }

                </div>
                <div className={"scheduleList"}>
                    <span style={{borderBottom:"solid",padding:"5px"}}>
                        Schedule List
                    </span>

                    {
                        matches.map((match,i)=>(<span style={{borderBottom:"groove",padding:"5px"}} key={i}>
                            {"Match"+match}
                        </span>))
                    }
                </div>
            </div>
            <div className={"down"}>
                <button onClick={()=>setOpenSignUp(true)}>
                    Sign Up Time Slot
                </button>
                <button>
                    Log Out
                </button>
            </div>
            {openSignUp && <SignUpTimeSlot setOpenSignUp={setOpenSignUp}/>}
        </div>
    )
}
export default SeniorProfile;