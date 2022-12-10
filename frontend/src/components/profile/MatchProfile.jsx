import "./matchprofile.scss"


const MatchProfile =({setOpenMatchProfile,match})=>{
    return (
        <div className={"prof"}>
            <div className="wrapper">
                <h1>Match Info</h1>

                <label> Senior: {match.sName}</label>
                {match.cName ? <label>{"Child: "+ match.cName} </label> : null}
                {match.pName ? <label>{"Pet: "+ match.pName} </label> : null}
                <label> Date : {match.year +"/"+match.month+"/"+match.day}</label>
                <label> Time: {match.start + " to " +match.end}</label>

                <button className="close" onClick={ ()=> setOpenMatchProfile(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default MatchProfile;