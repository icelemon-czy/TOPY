import "./signuptimeslot.scss"

const SignUpTimeSlot = ({setOpenSignUp})=> {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = String(today.getFullYear());
    const min_date = yyyy+'-'+mm + '-' + dd ;

    return (
        <div className={"signup"}>
            <div className="wrapper">
                <h1>Sign Up Time Slot</h1>
                <form>
                    <label>Date</label>
                    <input
                        type={"date"}
                        min={min_date}
                        max={"2023-12-31"}
                    />
                    <label>Hours</label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        9 - 10
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        10 - 11
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        11 - 12
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        12 - 13
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        13 - 14
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        14 - 15
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        15 - 16
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={"text"}/>
                        16 - 17
                    </label>

                    <button>Sign Up</button>
                </form>
                <button className="close" onClick={() =>setOpenSignUp(false) }>
                    close
                </button>
            </div>
        </div>
    )
}

export default SignUpTimeSlot;