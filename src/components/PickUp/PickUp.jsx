import "./pickup.scss";
const PickUp=({setOpenPickUp,matches})=> {
    return (
        <div className={"pickup"}>
            <div className="wrapper">
                <h1>Pick up</h1>
                <form>
                    <label>pick up your child/pet </label>
                    <div>
                        {
                            matches.map((match, i) => (
                                <div className={"list"} key={i}>
                                    <input type={"checkbox"}/>
                                    <label>{"Current match "+match.id+ ": "+match.senior+" is playing with " + (match.pet?match.pet:"")+" "+(match.child?match.child:"") +
                                        " at "+match.date +" from "+ match.start+" to "+match.end}</label>
                                </div>
                            ))
                        }
                    </div>


                    <button type={"submit"}>Confirm</button>
                </form>
                <button className="close" onClick={() => setOpenPickUp(false)}>
                    close
                </button>
            </div>
        </div>
    )
}
export default PickUp;