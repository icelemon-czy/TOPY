import React, {useContext,useState} from "react";
import "./parentprofile.scss"
import PetReg from "../../components/registration/PetReg";
import ChildReg from "../../components/registration/ChildReg";
import SeniorMatch from "../../components/Match/SeniorMatch";
import SeniorPick from "../../components/pick/PickSenior";
import ChildProfile from "../../components/profile/ChildProfile";
import PetProfile from "../../components/profile/PetProfile";
import SuccessPage from "../../components/Congra/SuccessPage";
import MatchProfile from "../../components/profile/MatchProfile";
import PickUp from "../../components/PickUp/PickUp";

import {AuthContext} from "../../context/authContext";
import {makeRequest} from "../../axios";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const ParentProfile= () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);

    // Query Children
    const {isLoading: cIsLoading, error: cError, data: childList} = useQuery(
        ['child'],
        () => makeRequest.get("/child?pid=" + currentUser.id).then((res) => {
            return res.data
        })
    );

    // Query Pets
    const {isLoading: pIsLoading, error: pError, data: petList} = useQuery(
        ['pet'],
        () => makeRequest.get("/pet?pid=" + currentUser.id).then((res) => {
            return res.data
        })
    );

    // Query Match
    const { isLoading:mIsLoading, error:mError, data:matches} = useQuery(
        ['pmatch'],
        () => makeRequest.get("/match/parent?pid="+currentUser.id).then((res)=>{return res.data})
    );

    const [seniors,setSeniors] = useState(null);

    const [openChildReg, setChildReg] = useState(false);
    const [openPetReg, setPetReg] = useState(false);

    const [openSeniorMatch, setSeniorMatch] = useState(false);
    const [openPickSenior, setOpenPickSenior] = useState(false);
    const [openSuccessPage, setOpenSuccessPage] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);

    const [openChildProfile, setOpenChildProfile] = useState(false);
    const [clickedChild, setClickChild] = useState(null);
    const [openPetProfile, setOpenPetProfile] = useState(false);
    const [clickedPet, setClickPet] = useState(null);
    const [openMatchProfile, setOpenMatchProfile] = useState(false);
    const [clickedMatch, setClickMatch] = useState(null);

    const [openPickUp, setOpenPickUp] = useState(false);

    const handleClickChild = (child) => {
        setClickChild(child);
        setOpenChildProfile(true);
    }

    const handleClickPet = (pet) => {
        setClickPet(pet);
        setOpenPetProfile(true);
    }
    const handleClickMatch = (match) => {
        setClickMatch(match);
        setOpenMatchProfile(true);
    }

    const handleLogOut = async (e) => {
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
            <h1>Parent Profile</h1>
            <div className={"middle"}>
                <div className={"Info"}>
                    <span> Name :{currentUser.name}</span>
                    <span> Age: {currentUser.age}</span>
                    <span> Gender: {currentUser.gender}</span>
                    <span> Address : {currentUser.address}</span>
                    <span> Phone: {currentUser.phone}</span>
                    <span> Email:{currentUser.email}</span>
                </div>

                <div className={"childList"}>
                            <span style={{borderBottom: "solid", padding: "5px"}}>
                                Child List
                            </span>
                    {
                        cIsLoading ? "Children List Is Loading" :

                            childList.map((child, i) => (
                                <span
                                    className={"clist"}
                                    style={{borderBottom: "groove", padding: "5px"}}
                                    key={i}
                                    onClick={() => handleClickChild(child)}>
                                    {child.name}
                                    </span>
                            ))
                    }
                </div>


                <div className={"petList"}>
                            <span style={{borderBottom: "solid", padding: "5px"}}>
                                Pet List
                            </span>
                    {
                        pIsLoading ? "Pet List Is Loading" :

                            petList.map((pet, i) => (
                                <span
                                    className={"plist"}
                                    style={{borderBottom: "groove", padding: "5px"}}
                                    key={i}
                                    onClick={() => handleClickPet(pet)}>
                                        {pet.name}
                                    </span>
                            ))
                    }
                </div>


                <div className={"scheduleList"}>
                    <span style={{borderBottom: "solid", padding: "5px"}}>
                        Schedule List
                    </span>
                    {
                        mIsLoading?"Match is Loading":
                        matches.map((match, i) => (
                            <span
                                className={"mlist"}
                                style={{borderBottom: "groove", padding: "5px"}}
                                key={i}
                                onClick={() => handleClickMatch(match)}>
                                {"Match " + (i+1)}
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className={"down"}>
                <button onClick={() => {
                    setPetReg(true)
                }}>
                    Pet Registration
                </button>
                <button onClick={() => {
                    setChildReg(true)
                }}>
                    Child Registration
                </button>
                <button onClick={() => {
                    setSeniorMatch(true)
                }}>
                    Find a senior
                </button>
                <button onClick={() => {
                    setOpenPickUp(true)
                }}>
                    Pick Up
                </button>
                <button onClick={handleLogOut}>
                    Log Out
                </button>
            </div>

            {openPetReg && <PetReg setPetReg={setPetReg}/>}
            {openChildReg && <ChildReg setChildReg={setChildReg}/>}

            {openSeniorMatch &&
                <SeniorMatch setSeniorMatch={setSeniorMatch} setOpenPickSenior={setOpenPickSenior} setSeniors={setSeniors}
                             childList={childList} petList={petList}/>}
            {openPickSenior && <SeniorPick seniors={seniors} setOpenPickSenior={setOpenPickSenior}
                                           setOpenSuccessPage={setOpenSuccessPage}/>}
            {openSuccessPage && <SuccessPage setOpenSuccessPage={setOpenSuccessPage} match={selectedMatch}/>}

            {openChildProfile && <ChildProfile setOpenChildProfile={setOpenChildProfile} child={clickedChild}/>}
            {openPetProfile && <PetProfile setOpenPetProfile={setOpenPetProfile} pet={clickedPet}/>}
            {openMatchProfile && <MatchProfile setOpenMatchProfile={setOpenMatchProfile} match={clickedMatch}/>}

            {openPickUp && <PickUp setOpenPickUp={setOpenPickUp} matches={matches}/>}
        </div>
    )
}
export default ParentProfile;