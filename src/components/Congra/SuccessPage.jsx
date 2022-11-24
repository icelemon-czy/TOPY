import "./successpage.scss"

const SuccessPage=({setOpenSuccessPage,match})=>{
    return (
        <div className={"success"}>
            <div className="wrapper">
                <h1>
                     Congratulations!
                </h1>
                <p>
                    You have successfully register <br/>
                    {match.child} {match.child && "and"} {match.pet} in with {match.senior} from {match.start} to {match.end}
                </p>
                <button className="close" onClick={ ()=> setOpenSuccessPage(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default SuccessPage;