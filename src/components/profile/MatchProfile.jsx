import "./matchprofile.scss"


const MatchProfile =({setOpenMatchProfile,match})=>{
    return (
        <div className={"prof"}>
            <div className="wrapper">
                <h1>Match Info</h1>

                <label> Senior: {match.senior}</label>
                {match.child ? <label>{"Child: "+ match.child} </label> : null}
                {match.pet ? <label>{"Pet: "+ match.pet} </label> : null}
                <label> Date : {match.date}</label>
                <label> Time: {match.start + " to " +match.end}</label>

                <button className="close" onClick={ ()=> setOpenMatchProfile(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default MatchProfile;