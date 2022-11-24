import "./petreg.scss";

const PetReg =({setPetReg})=>{
    return (
        <div className={"reg"}>
            <div className="wrapper">
                <h1>Register Pet</h1>
                <form>
                    <label>Pet Name</label>
                    <input
                        type="text"
                        name="name"
                    />
                    <label>Pet Type</label>
                    <label className={"radio"}>
                        <input type={"radio"} name={"petType"} value={"cat"}/>
                        Cat
                    </label>

                    <label className={"radio"}>
                        <input type={"radio"} name={"petType"} value={"dog"}/>
                        Dog
                    </label>

                    <button>Register</button>
                </form>
                <button className="close" onClick={ ()=> setPetReg(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default PetReg;