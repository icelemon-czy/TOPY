import "./picksenior.scss"

const SeniorPick =({setOpenPickSenior,setOpenSuccessPage,seniorList})=>{
    return (
        <div className={"pick"}>
            <div className="wrapper">
                <h1>Match a senior</h1>
                <form>
                    <label>Pick a senior</label>
                    <div className={"senior"}>
                    {
                        seniorList.map((senior,i)=>(
                            <div className={"pair"} key={i}>
                                <input type={"radio"} name={"senior"} value={senior}/>
                                <label className={"radio"}>
                                    {senior}
                                </label>
                            </div>
                        ))
                    }
                    </div>
                    <button onClick={()=>{setOpenPickSenior(false); setOpenSuccessPage(true);}}>Confirm</button>
                </form>
                <button className="close" onClick={ ()=> setOpenPickSenior(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default SeniorPick;