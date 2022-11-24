import React, {useState} from "react";
import "./parentprofile.scss"
import PetReg from "../../components/registration/PetReg";
import ChildReg from "../../components/registration/ChildReg";
import SeniorMatch from "../../components/Match/SeniorMatch";
import SeniorPick from "../../components/pick/PickSenior";
import ChildProfile from "../../components/profile/ChildProfile";
import PetProfile from "../../components/profile/PetProfile";
import SuccessPage from "../../components/Congra/SuccessPage";
import MatchProfile from "../../components/profile/MatchProfile";

const ParentProfile= () => {
    const currentUser = {
        name: "Sara",
        location: "Pittsburgh",
        phone: "123-456-789",
    };
    const childList= [
        {
            id:1,
            name:"David",
            age: 4,
            gender: 0,
        },
        {
            id:2,
            name:"Felix",
            age: 6,
            gender: 1,
        },
    ];
    const petList=[
        {
            id:1,
            name:"Jimmy",
            type: "Dog",
        },
    ];
    const matches = [
        {
            id:1,
            pet:"Jimmy",
            child:"",
            senior:"Mark Rober",
            date:"2023-1-1",
            start:"14",
            end:"16",
        }
    ];
    const seniorList = ["Mark Rober","Guga"];

    const [openChildReg,setChildReg] = useState(false);
    const [openPetReg,setPetReg] = useState(false);
    const [openSeniorMatch,setSeniorMatch] = useState(false);
    const [openPickSenior,setOpenPickSenior] = useState(false);
    const [openSuccessPage,setOpenSuccessPage] = useState(false);
    const [selectedMatch,setSelectedMatch] = useState(matches[0]);

    const [openChildProfile,setOpenChildProfile] = useState(false);
    const [clickedChild,setClickChild] = useState(childList[0]);
    const [openPetProfile,setOpenPetProfile] = useState(false);
    const [clickedPet,setClickPet] = useState(petList[0]);
    const [openMatchProfile,setOpenMatchProfile] = useState(false);
    const [clickedMatch,setClickMatch] = useState(petList[0]);

    const handleClickChild =(child)=>{
        setClickChild(child);
        setOpenChildProfile(true);
    }

    const handleClickPet =(pet)=>{
        setClickPet(pet);
        setOpenPetProfile(true);
    }
    const handleClickMatch =(match)=>{
        setClickMatch(match);
        setOpenMatchProfile(true);
    }

    return (
        <div className={"profile"}>
            <h1>Parent Profile</h1>
            <div className={"middle"}>
                <div className={"Info"}>
                    <span> Name :{currentUser.name}</span>
                    <span> Location : {currentUser.location}</span>
                    <span> Phone: {currentUser.phone}</span>
                </div>
                <div className={"childList"}>
                    <span style={{borderBottom:"solid",padding:"5px"}}>
                        Child List
                    </span>
                    {
                        childList.map((child,i)=>(
                            <span style={{borderBottom:"groove",padding:"5px"}} key={i} onClick={()=>handleClickChild(child)}>
                                {child.name}
                            </span>
                        ))
                    }
                </div>

                <div className={"petList"}>
                    <span style={{borderBottom:"solid",padding:"5px"}}>
                        Pet List
                    </span>
                    {
                        petList.map((pet,i)=>(
                            <span style={{borderBottom:"groove",padding:"5px"}} key={i} onClick={()=>handleClickPet(pet)}>
                                {pet.name}
                            </span>
                        ))
                    }
                </div>


                <div className={"scheduleList"}>
                    <span style={{borderBottom:"solid",padding:"5px"}}>
                        Schedule List
                    </span>
                    {
                        matches.map((match,i)=>(
                            <span
                                style={{borderBottom:"groove",padding:"5px"}}
                                key={i}
                                onClick={()=>handleClickMatch(match)}>
                                {"Match"+match.id}
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className={"down"}>
                <button onClick={()=>{setPetReg(true)}}>
                    Pet Registration
                </button>
                <button onClick={()=>{setChildReg(true)}}>
                    Child Registration
                </button>
                <button onClick={()=>{setSeniorMatch(true)}}>
                    Find a senior
                </button>
                <button>
                    Pick Up
                </button>
                <button>
                    Log Out
                </button>
            </div>

            {openPetReg && <PetReg setPetReg={setPetReg}/>}
            {openChildReg && <ChildReg setChildReg={setChildReg}/>}

            {openSeniorMatch && <SeniorMatch setSeniorMatch={setSeniorMatch} setOpenPickSenior={setOpenPickSenior} childList={childList} petList={petList}/>}
            {openPickSenior && <SeniorPick seniorList={seniorList} setOpenPickSenior={setOpenPickSenior} setOpenSuccessPage={setOpenSuccessPage}/>}
            {openSuccessPage && <SuccessPage setOpenSuccessPage={setOpenSuccessPage} match={selectedMatch}/>}

            {openChildProfile && <ChildProfile setOpenChildProfile={setOpenChildProfile} child={clickedChild}/>}
            {openPetProfile && <PetProfile setOpenPetProfile={setOpenPetProfile} pet={clickedPet}/> }
            {openMatchProfile &&<MatchProfile setOpenMatchProfile={setOpenMatchProfile} match={clickedMatch} />}
        </div>
    )
}
export default ParentProfile;