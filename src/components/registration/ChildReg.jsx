import "./childreg.scss";

const ChildReg =({setChildReg})=>{
    return (
        <div className={"reg"}>
            <div className="wrapper">
                <h1>Register Child</h1>
                <form>
                    <label>Child Name</label>
                    <input
                        type="text"
                        name="name"
                    />
                    <label>Age</label>
                    <input
                        type={"number"}
                        min={"1"}
                        max={"30"}
                    />
                    <label>Gender</label>
                    <label className={"radio"}>
                        <input type={"radio"} name={"gender"} value={"male"}/>
                        Boy
                    </label>

                    <label className={"radio"}>
                        <input type={"radio"} name={"gender"} value={"female"}/>
                        Girl
                    </label>

                    <button>Register</button>
                </form>
                <button className="close" onClick={ ()=> setChildReg(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default ChildReg;